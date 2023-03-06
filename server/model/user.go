package model

import (
	"web-krs/request"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email        string `json:"email" binding:"email" gorm:"unique;not null"`
	Nama         string `json:"nama" gorm:"type:varchar(100)"`
	ProgramStudi string `json:"program_studi" gorm:"type:varchar(30)"`
	Nim          string `json:"nim" gorm:"type:varchar(20)"`
	Password     string `json:"password" gorm:"type:varchar(100)"`
	Role         string `json:"role" gorm:"type:enum('admin', 'user');not null"`
}

type UserRepository interface {
	Create(user *User) (*User, error)
	ReadAll() ([]*User, error)
	ReadByID(ID int) (*User, error)
	Update(user *User) (*User, error)
	Delete(user *User) (*User, error)
}

type UserService interface {
	Create(user *request.UserRequest) (*User, error)
	ReadAll() ([]*User, error)
	ReadByID(ID int) (*User, error)
	Update(ID int, user  *request.UserRequest) (*User, error)
	Delete(ID int) (*User, error)
}
