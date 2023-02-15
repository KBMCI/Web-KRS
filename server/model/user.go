package model

import "web-krs/request"

type User struct {
	ID           int    `json:"id"`
	Email        string `json:"email"`
	Nama         string `json:"nama"`
	ProgramStudi string `json:"program_studi"`
	Nim          string `json:"nim"`
	Password     string `json:"password"`
	Role         string `json:"role"`
}

type UserRepository interface {
	Create(user User) (User, error)
	ReadAll() ([]User, error)
	ReadByID(ID int) (User, error)
	Update(user User) (User, error)
	Delete(user User) (User, error)
}

type UserService interface {
	Create(user request.UserRequest) (User, error)
	ReadAll() ([]User, error)
	ReadByID(ID int) (User, error)
	Update(ID int, user  request.UserRequest) (User, error)
	Delete(ID int) (User, error)
}
