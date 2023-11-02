package handler

import (
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

func (r *rest) CreateUser(c *gin.Context) {

	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	userRequest.Role = "user"

	createUser, err := r.service.User.Register(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "Create user success", createUser)
}

func (r *rest) CreateAdmin(c *gin.Context) {

	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	userRequest.Role = "admin"

	createUser, err := r.service.User.Register(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "Create admin success", createUser)
}

func (r *rest) UserLogin(c *gin.Context) {
	var userLoginRequset request.UserLoginRequest

	err := c.ShouldBindJSON(&userLoginRequset)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	// cek email
	user, err := r.service.User.GetByEmail(userLoginRequset.Email)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, "invalid email or password", nil)
		return
	}

	// cek password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(userLoginRequset.Password)); err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, "invalid email or password", nil)
		return
	}

	tokenJwt, err := middleware.GenerateToken(user.ID, user.Role) // generate token
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, "error generating token", nil)
		return
	}

	helper.ResponseSuccessJson(c, "User logged in", gin.H{
		"user":  user,
		"token": tokenJwt,
	})

}

func (r *rest) ReadAll(c *gin.Context) {
	users, err := r.service.User.ReadAll()

	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	var usersResponse []response.UserResponse

	for _, v := range users {
		userResponse := response.ConvertToUserResponse(v)

		usersResponse = append(usersResponse, userResponse)
	}

	helper.ResponseSuccessJson(c, "Success Fetch Users", usersResponse)
}

func (r *rest) ReadByID(c *gin.Context) {
	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	readByID, err := r.service.User.ReadByID(id)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	userResponse := response.ConvertToUserResponse(readByID)

	helper.ResponseSuccessJson(c, "Success fetch user", userResponse)
}

func (r *rest) Update(c *gin.Context) {
	var UserRequest request.UserUpdateRequest

	err := c.ShouldBind(&UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	update, err := r.service.User.Update(id, &UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (r *rest) UpdateProfile(c *gin.Context) {
	idUserLogin := c.MustGet("id").(float64)

	file, _ := c.FormFile("image")

	var UserRequest request.UserUpdateRequest

	err := c.ShouldBind(&UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	update, err := r.service.User.UpdateProfile(file, int(idUserLogin), &UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (r *rest) ForgotPassword(c *gin.Context) {

	var UserRequest request.ForgotPasswordRequest

	err := c.ShouldBindJSON(&UserRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	findUser, err := r.service.User.GetByEmail(UserRequest.Email)

	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	if UserRequest.VerifPassword != UserRequest.Password {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	update, _ := r.service.User.ForgotPassword(int(findUser.ID), &UserRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	userResponse := response.ConvertToUserResponse(update)

	helper.ResponseSuccessJson(c, "Success Forgot Password", userResponse)
}

func (r *rest) HasMatkul(c *gin.Context) {
	userId := c.MustGet("id").(float64)

	var user model.UserHasMatkulReq

	err := c.ShouldBindJSON(&user)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	update, err := r.service.User.UserHasMatkul(uint(userId), &user)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusUnprocessableEntity, err.Error(), nil)
		return
	}

	helper.ResponseSuccessJson(c, "success", update)
}

func (r *rest) MatkulUser(c *gin.Context) {
	userId := c.MustGet("id").(float64)

	readByID, err := r.service.User.ReadByID(int(userId))
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	userResponse := response.ConvertToUserResponse(readByID)

	helper.ResponseSuccessJson(c, "success", userResponse)
}

func (r *rest) Delete(c *gin.Context) {
	id := c.Param("id")
	idInt, _ := strconv.Atoi(id)

	user, err := r.service.User.ReadByID(idInt)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
		return
	}

	if user.Image != "" {
		err = r.service.User.DeleteImage(uint(idInt))
		if err != nil {
			helper.ResponseValidationErrorJson(c, http.StatusInternalServerError, err.Error(), nil)
			return
		}
	}

	_, err = r.service.User.Delete(idInt)
	if err != nil {
		helper.ResponseValidationErrorJson(c, http.StatusBadRequest, err.Error(), nil)
	}

	helper.ResponseSuccessJson(c, "delete success", "")
}
