package model

import (
	"time"
	"web-krs/request"

	"github.com/gin-gonic/gin"
)

type (
	User struct {
		ID           uint      `gorm:"primaryKey"`
		Email        string    `json:"email" binding:"email" gorm:"unique;not null"`
		Nama         string    `json:"nama" gorm:"type:varchar(100)"`
		ProgramStudi string    `json:"program_studi" gorm:"type:varchar(30)"`
		Nim          string    `json:"nim" gorm:"type:varchar(20)"`
		Password     string    `json:"password" gorm:"type:varchar(100)"`
		Role         string    `json:"role" gorm:"type:enum('admin', 'user')"`
		Image		 string	   `json:"gambar" gorm:"type:varchar(200)"`
		CreatedAt    time.Time `json:"-"`
		UpdatedAt    time.Time `json:"-"`
		Matkuls      []Matkul  `json:"matkuls" gorm:"many2many:user_has_matkuls"`
		Plans        []*Plan   `json:"plans" gorm:"many2many:user_plans;constraint:OnDelete:CASCADE"`
	}

	UserHasMatkuls struct {
		UserId   uint `gorm:"primaryKey"`
		MatkulId uint `gorm:"primaryKey"`
	}

	UserHasMatkulReq struct {
		ID      uint     `gorm:"primaryKey"`
		Matkuls []Matkul `json:"matkuls" gorm:"many2many:user_has_matkuls"`
	}

	UserRepository interface {
		Create(user *User) (*User, error)
		ReadAll() ([]*User, error)
		ReadByID(ID int) (*User, error)
		FindByEmail(email string) (*User, error)
		Update(user *User) (*User, error)
		Delete(user *User) (*User, error)
		DeleteMatkul(userHasMatkuls *UserHasMatkuls, id uint) error
	}

	UserService interface {
		Register(user *request.UserRequest) (*User, error)
		UserHasMatkul(id uint, userHasMatkul *UserHasMatkulReq) (*User, error)
		ReadAll() ([]*User, error)
		ReadByID(ID int) (*User, error)
		GetByEmail(email string) (*User, error)
		Update(ID int, user *request.UserUpdateRequest) (*User, error)
		ForgotPassword(ID int, user *request.ForgotPasswordRequest) (*User, error)
		Delete(ID int) (*User, error)
		UploadImage(c *gin.Context) (string, error)
		DeleteImage(c *gin.Context, id uint) error
	}
)
