package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Nama         string
	Nim          string
	Role         string
	Email        string
	Password     string
	Fakultas     string
	ProgramStudi string
	ImageUrl     string
	WhatsappUrl  string
	InstagramUrl string
	LineUrl      string
}
