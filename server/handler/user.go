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

func (r *rest) CreateUser(c *gin.Context) {

	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return
	}

	userRequest.Role = "user"

	createUser, err := r.service.User.Register(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Cannot create user", err.Error())
		return
	}

	userResponse := response.ConvertToUserResponse(createUser)

	helper.ResponseSuccessJson(c, "Create user success", userResponse)
}

func (r *rest) CreateAdmin(c *gin.Context) {

	var userRequest request.UserRequest

	err := c.ShouldBindJSON(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return
	}

	userRequest.Role = "admin"

	createUser, err := r.service.User.Register(&userRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Cannot create user", err.Error())
		return
	}

	userResponse := response.ConvertToUserResponse(createUser)

	helper.ResponseSuccessJson(c, "Create admin success", userResponse)
}

func (r *rest) UserLogin(c *gin.Context) {
	var userLoginRequset request.UserLoginRequest

	err := c.ShouldBindJSON(&userLoginRequset)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err)
		return
	}

	// cek email
	user, err := r.service.User.GetByEmail(userLoginRequset.Email)
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
		"data":  user,
		"token": tokenJwt,
	})

}

func (r *rest) ReadAll(c *gin.Context) {
	users, err := r.service.User.ReadAll()

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

func (r *rest) ReadByID(c *gin.Context) {
	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	readByID, err := r.service.User.ReadByID(id)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	userResponse := response.ConvertToUserResponse(readByID)

	helper.ResponseSuccessJson(c, "Success fetch user", userResponse)
}

func (r *rest) Update(c *gin.Context) {
	var UserRequest request.UserUpdateRequest

	err := c.ShouldBind(&UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	update, err := r.service.User.Update(id, &UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Update User", err.Error())
		return
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (r *rest) UpdateProfile(c *gin.Context) {
	idUserLogin := c.MustGet("id").(float64)

	var UserRequest request.UserUpdateRequest

	err := c.ShouldBind(&UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	update, err := r.service.User.UpdateProfile(c, int(idUserLogin), &UserRequest)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Update User", err.Error())
		return
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (r *rest) ForgotPassword(c *gin.Context) {

	var UserRequest request.ForgotPasswordRequest

	err := c.ShouldBindJSON(&UserRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Binding Struct", err)
		return
	}

	findUser, err := r.service.User.GetByEmail(UserRequest.Email)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Record not found", err.Error())
		return
	}

	if UserRequest.VerifPassword != UserRequest.Password {
		helper.ResponseValidationErrorJson(c, "Password incorrect", err)
		return
	}

	update, _ := r.service.User.ForgotPassword(int(findUser.ID), &UserRequest)

	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error Update User", err)
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
		helper.ResponseValidationErrorJson(c, "Error binding struct", err.Error())
		return
	}

	update, err := r.service.User.UserHasMatkul(uint(userId), &user)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusUnprocessableEntity, err)
		return
	}

	helper.ResponseSuccessJson(c, "success", update)
}

func (r *rest) Delete(c *gin.Context) {
	id := c.Param("id")
	idInt, _ := strconv.Atoi(id)

	user, err := r.service.User.ReadByID(idInt)
	if err != nil {
		helper.ResponseErrorJson(c, http.StatusBadRequest, err)
		return
	}

	if user.Image != "" {
		err = r.service.User.DeleteImage(uint(idInt))
		if err != nil {
			helper.ResponseErrorJson(c, http.StatusInternalServerError, err)
			return
		}
	}

	delete, err := r.service.User.Delete(idInt)
	if err != nil {
		helper.ResponseValidationErrorJson(c, "Error, cannot delete", err.Error())
	}

	helper.ResponseSuccessJson(c, "delete success", delete)
}
