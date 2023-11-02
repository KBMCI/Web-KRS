package model

import (
	"mime/multipart"
	"time"
	"web-krs/request"
)

type (
	User struct {
		ID             uint          `json:"id" gorm:"primaryKey"`
		ProgramStudiID uint          `json:"id_program_studi"`
		Email          string        `json:"email" binding:"email" gorm:"unique;not null"`
		Nama           string        `json:"nama" gorm:"type:varchar(100)"`
		Nim            string        `json:"nim" gorm:"type:varchar(20)"`
		Password       string        `json:"password" gorm:"type:varchar(100)"`
		Role           string        `json:"role" gorm:"type:enum('admin', 'user')"`
		Image          string        `json:"gambar" gorm:"type:varchar(200)"`
		CreatedAt      time.Time     `json:"-"`
		UpdatedAt      time.Time     `json:"-"`
		Matkuls        []Matkul      `json:"matkuls" gorm:"many2many:user_has_matkuls"`
		Plans          []*Plan       `json:"plans" gorm:"many2many:user_plans;constraint:OnDelete:CASCADE"`
		ProgramStudi   *ProgramStudi `json:"program_studi"`
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
		MatkulUser(ID int) (*User, error)
		ReadAll() ([]*User, error)
		ReadByID(ID int) (*User, error)
		GetByEmail(email string) (*User, error)
		UpdateProfile(file *multipart.FileHeader, ID int, user *request.UserUpdateRequest) (*User, error)
		Update(ID int, user *request.UserUpdateRequest) (*User, error)
		ForgotPassword(ID int, user *request.ForgotPasswordRequest) (*User, error)
		Delete(ID int) (*User, error)
		UploadImage(file *multipart.FileHeader) (string, error)
		DeleteImage(id uint) error
	}
)
