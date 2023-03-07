package handler

import (
	"net/http"
	"strconv"
	"regexp"
	"strings"
	"web-krs/helper"
	"web-krs/model"
	"web-krs/request"
	"web-krs/response"
	"golang.org/x/crypto/bcrypt"
	"github.com/gin-gonic/gin"
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
	group.POST("", h.CreateUser)		// create
    group.GET("", h.ReadAll)			// ReadAll
    group.GET("/:id", h.ReadByID)		// ReadByID
    group.PUT("/:id", h.Update)		// Update 
    group.DELETE("/:id", h.Delete)		// Delete
}

func HashPassword(password string) (string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes),err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password) )
	return err == nil
}

func (h *userHandler) CreateUser(c *gin.Context)  {
	
	var userRequset request.UserRequest

	err := c.ShouldBindJSON(&userRequset)
	
	var (
		numeric, lowerCase, upperCase, specialCharacter bool 
	)

	numeric = regexp.MustCompile(`\d`).MatchString(userRequset.Password) 
	lowerCase = regexp.MustCompile(`[a-z]`).MatchString(userRequset.Password)
	upperCase = regexp.MustCompile(`[A-Z]`).MatchString(userRequset.Password)
	specialCharacter = strings.ContainsAny(userRequset.Password, "!@#$%^&*()_+-=/.,:;'`?{}[|]")

	if len(userRequset.Password) <6 {
		helper.ResponseErrorJson(c, "Too short password", err)
		return 
	}

	if !numeric {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "password need numeric character",
			"data": err,
		})
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

	if err != nil {
		helper.ResponeValidationError(c, err)
		return 
	}

	createUser, err := h.userService.Create(&userRequset)

	if err != nil {
		helper.ResponseErrorJson(c, "Cannot create user", err)
		return
	}

	create := ConvertToUserResponse(createUser)
	
	helper.ResponseSuccessJson(c, "Create user success", create)
}

func (h *userHandler) ReadAll(c *gin.Context)  {
	users, err := h.userService.ReadAll()
	
	if err != nil {
		helper.ResponseErrorJson(c, "Error Fetch Users", err)
		return 
	}

	var usersResponse []response.UserResponse

	for _, v := range users {
		userResponse := ConvertToUserResponse(v)

		usersResponse = append(usersResponse, userResponse)
	}

	helper.ResponseSuccessJson(c, "Success Fetch Users", usersResponse)
}

func (h *userHandler) ReadByID(c *gin.Context)  {

	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	readByID, err := h.userService.ReadByID(id)

	if err != nil {
		helper.ResponseErrorJson(c, "Error fetch user", err)
		return 
	}

	userResponse := ConvertToUserResponse(readByID)

	helper.ResponseSuccessJson(c, "Success fetch user", userResponse)
}

func (h *userHandler) Update(c *gin.Context)  {
	
	var UserRequest request.UserRequest

	err:= c.ShouldBindJSON(&UserRequest)

	idString := c.Param("id")
	id, _ := strconv.Atoi(idString)

	update, _ := h.userService.Update(id, &UserRequest)

	if err != nil {
		helper.ResponseErrorJson(c, "Error Update User",err)
		return 
	}

	helper.ResponseSuccessJson(c, "Success Update User", update)
}

func (h *userHandler) Delete(c *gin.Context)  {
	
	id := c.Param("id")
	idInt, _ := strconv.Atoi(id)

	delete, err := h.userService.Delete(idInt)

	if err != nil {
		helper.ResponseErrorJson(c, "Error, cannot delete", err)
	}

	helper.ResponseSuccessJson(c, "", delete)

}

func ConvertToUserResponse(u *model.User) response.UserResponse {

	user := &model.User{
		Password: u.Password,
	}

	hash,_ := HashPassword(user.Password)

	return response.UserResponse{
		ID: u.ID,
		Nim: u.Nim,
		Nama: u.Nama,
		Email: u.Email,
		Password: hash,
		ProgramStudi: u.ProgramStudi,
		Role: u.Role,
	}
	
}
