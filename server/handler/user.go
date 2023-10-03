package handler

import (
	"errors"
	"net/http"
	"regexp"
	"strconv"
	"strings"
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
	group.POST("/register", h.CreateUser)		// create
	group.POST("/login", h.UserLogin)		// login
	group.PUT("/forgot", h.ForgotPassword)
	group.POST("/matkul", middleware.ValidateToken(), h.HasMatkul)		// hasMatkul
    group.GET("", middleware.ValidateToken(), h.ReadAll)			// ReadAll
    group.GET("/:id", middleware.ValidateToken(), h.ReadByID)		// ReadByID
    group.PUT("/:id", middleware.ValidateToken(), h.Update)		// Update 
    group.DELETE("/:id", middleware.ValidateToken(), h.Delete)		// Delete
}

func HashPassword(password string) (string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes),err
}

func (h *userHandler) CreateUser(c *gin.Context)  {
	
	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return 
	}
	
	var (
		numeric, lowerCase, upperCase, specialCharacter bool 
	)

	numeric = regexp.MustCompile(`\d`).MatchString(userRequest.Password) 
	lowerCase = regexp.MustCompile(`[a-z]`).MatchString(userRequest.Password)
	upperCase = regexp.MustCompile(`[A-Z]`).MatchString(userRequest.Password)
	specialCharacter = strings.ContainsAny(userRequest.Password, "!@#$%^&*()_+-=/.,:;'`?{}[|]")

	if len(userRequest.Password) <6 {
		helper.ResponseDetailErrorJson(c, "Too short password", err)
		return 
	}

	if !numeric {
		helper.ResponseDetailErrorJson(c, "password need numeric character", err)
		return 
	}
 
	if !lowerCase {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "password need lower case character",
			"data": err,
		})
		return
	}
 
	if !upperCase {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "password need upper case character",
			"data": err,
		})
		return
	}
 
	if !specialCharacter {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "password need spesial character",
			"data": err,
		})
		return
	}

	if userRequest.VerifPassword != userRequest.Password {
		helper.ResponseDetailErrorJson(c, "Password incorrect", err)
		return
	}

	createUser, err := h.userService.Register(&userRequest)

	if err != nil {
		helper.ResponseDetailErrorJson(c, "Cannot create user", err)
		return
	}

	create := response.ConvertToUserResponse(createUser)

	helper.ResponseSuccessJson(c, "Create user success", create)
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
		helper.ResponseDetailErrorJson(c, "Error Fetch Users", err)
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
		helper.ResponseDetailErrorJson(c, "Error fetch user", err)
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

	user, err := h.userService.ReadByID(id)
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
			err := h.userService.DeleteImage(c, uint(id))
			if err != nil {
				helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
				return
			}
		}
		UserRequest.Image = link
	}

	update, err := h.userService.Update(id, &UserRequest)
	if err != nil {
		helper.ResponseDetailErrorJson(c, "Error Update User",err)
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
		helper.ResponseDetailErrorJson(c, "Record not found",err)
		return 
	}

	if UserRequest.VerifPassword != UserRequest.Password {
		helper.ResponseDetailErrorJson(c, "Password incorrect", err)
		return
	}

	update, _ := h.userService.ForgotPassword(int(findUser.ID), &UserRequest)

	if err != nil {
		helper.ResponseDetailErrorJson(c, "Error Update User",err)
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

	err := h.userService.DeleteImage(c, uint(idInt))
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
		return
	}

	delete, err := h.userService.Delete(idInt)
	if err != nil {
		helper.ResponseDetailErrorJson(c, "Error, cannot delete", err)
	}

	helper.ResponseSuccessJson(c, "", delete)

}
