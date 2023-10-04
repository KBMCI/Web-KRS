package handler

import (
	"errors"
	"net/http"
	"strconv"
	"web-krs/helper"
	"web-krs/middleware"
	"web-krs/model"
	"web-krs/request"
	"web-krs/response"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type userHandler struct {
	userService model.UserService
}

type UserHandler interface {
	Mount(group gin.RouterGroup)
}

func NewUserHandler(userService model.UserService) *userHandler  {
	return &userHandler{userService}
}

func (h *userHandler) Mount(group *gin.RouterGroup)  {
	// role admin
	group.POST("/register/admin", h.CreateAdmin)		// create
    group.GET("", middleware.ValidateToken(), h.ReadAll)			// ReadAll
    group.GET("/:id", middleware.ValidateToken(), h.ReadByID)		// ReadByID
    group.PUT("/:id", middleware.ValidateToken(), h.Update)		// Update 
    group.DELETE("/:id", middleware.ValidateToken(), h.Delete)		// Delete
	// role user
	group.POST("/register", h.CreateUser)		// create
	group.POST("/login", h.UserLogin)		// login
	group.POST("/matkul", middleware.ValidateToken(), h.HasMatkul)		// hasMatkul
    group.PUT("/profile", middleware.ValidateToken(), h.UpdateProfile)		// Update 
	group.PUT("/forgot", h.ForgotPassword)
}

func (h *userHandler) CreateUser(c *gin.Context)  {
	
	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return 
	}

	userRequest.Role = "user"

	createUser, err := h.userService.Register(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Cannot create user", err.Error())
		return
	}

	userResponse := response.ConvertToUserResponse(createUser)

	helper.ResponseSuccessJson(c, "Create user success", userResponse)
}

func (h *userHandler) CreateAdmin(c *gin.Context)  {
	
	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return 
	}

	userRequest.Role = "admin"

	createUser, err := h.userService.Register(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Cannot create user", err.Error())
		return
	}

	userResponse := response.ConvertToUserResponse(createUser)

	helper.ResponseSuccessJson(c, "Create admin success", userResponse)
}

func (h *userHandler) UserLogin(c *gin.Context) {
	var userLoginRequset request.UserLoginRequest

	err := c.ShouldBindJSON(&userLoginRequset)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return 
	}
	
	// cek email
	user, err := h.userService.GetByEmail(userLoginRequset.Email)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, errors.New("invalid email or password"))
		return
	}

	// cek password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userLoginRequset.Password)); err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, errors.New("invalid email or password"))
		return
	}

	tokenJwt, err := middleware.GenerateToken(user.ID, user.Role) // generate token
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, errors.New("error generating token"))
		return
	}

	helper.ResponseSuccessJson(c, "User logged in", gin.H{
		"data": user,
		"token": tokenJwt,
	})

}

func (h *userHandler) ReadAll(c *gin.Context)  {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	users, err := h.userService.ReadAll()
	
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Fetch Users", err.Error())
		return 
	}

	var usersResponse []response.UserResponse

	for _, v := range users {
		userResponse := response.ConvertToUserResponse(v)

		usersResponse = append(usersResponse, userResponse)
	}
	
	helper.ResponseSuccessJson(c, "Success Fetch Users", usersResponse)
}

func (h *userHandler) ReadByID(c *gin.Context)  {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}
	
	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	readByID, err := h.userService.ReadByID(id)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	userResponse := response.ConvertToUserResponse(readByID)

	helper.ResponseSuccessJson(c, "Success fetch user", userResponse)
}

func (h *userHandler) Update(c *gin.Context)  {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	var UserRequest request.UserUpdateRequest
	
	err:= c.ShouldBind(&UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return 
	}

	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	update, err := h.userService.Update(id, &UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Update User",err.Error())
		return 
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (h *userHandler) UpdateProfile(c *gin.Context)  {
	idUserLogin := c.MustGet("id").(float64)

	var UserRequest request.UserUpdateRequest
	
	err:= c.ShouldBind(&UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return 
	}

	user, err := h.userService.ReadByID(int(idUserLogin))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return 
	}

	if user.Image == "" {
		link, err := h.userService.UploadImage(c)
		if err != nil {
			helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
			return
		}
		UserRequest.Image = link
	} else {
		link, err := h.userService.UploadImage(c)
		if err == http.ErrMissingFile {
			user.Image = link
		}else {
			err := h.userService.DeleteImage(c, uint(idUserLogin))
			if err != nil {
				helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
				return
			}
		}
		UserRequest.Image = link
	}

	update, err := h.userService.Update(int(idUserLogin), &UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Update User",err.Error())
		return 
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (h *userHandler) ForgotPassword(c *gin.Context)  {

	var UserRequest request.ForgotPasswordRequest

	err:= c.ShouldBindJSON(&UserRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Binding Struct", err)
		return 
	}

	findUser, err := h.userService.GetByEmail(UserRequest.Email)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Record not found",err.Error())
		return 
	}

	if UserRequest.VerifPassword != UserRequest.Password {
		helper.ResponseValidationErrorJson(c, "Password incorrect", err)
		return
	}

	update, _ := h.userService.ForgotPassword(int(findUser.ID), &UserRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Update User",err)
		return 
	}

	userResponse := response.ConvertToUserResponse(update)

	helper.ResponseSuccessJson(c, "Success Forgot Password", userResponse)
}

func (h *userHandler) HasMatkul(c *gin.Context) {
	userId := c.MustGet("id").(float64)

	var user model.UserHasMatkulReq

	err:= c.ShouldBindJSON(&user)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return 
	}

	update, err := h.userService.UserHasMatkul(uint(userId), &user)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", update)
}

func (h *userHandler) Delete(c *gin.Context)  {
	role := c.MustGet("role").(string)
	if role != "admin" {
		helper.ResponseWhenFailOrError(c, http.StatusUnauthorized, errors.New("your role is not admin"))
		return
	}

	id := c.Param("id")
	idInt, _ := strconv.Atoi(id)

	user, err := h.userService.ReadByID(idInt)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	if user.Image != "" {
		err = h.userService.DeleteImage(c, uint(idInt))
		if err != nil {
			helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
			return
		}
	}

	delete, err := h.userService.Delete(idInt)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error, cannot delete", err.Error())
	}

	helper.ResponseSuccessJson(c, "delete success", delete)
}
