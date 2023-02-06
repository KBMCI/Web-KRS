package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	FakultasID   int      `json:"fakultas_id"`
	Fakultas     Fakultas `gorm:"constraint:OnDelete:SET NULL" json:"fakultas"`
	ProdiID      int      `json:"prodi_id"`
	Prodi        Prodi    `gorm:"constraint:OnDelete:SET NULL" json:"prodi"`
	Nama         string   `gorm:"not null;" json:"nama"`
	Nim          string   `gorm:"not null;unique" json:"nim"`
	Role         string   `gorm:"not null;" json:"role"`
	IsActive     bool     `gorm:"default:false" json:"is_active"`
	Email        string   `gorm:"not null;unique" json:"email"`
	Password     string   `gorm:"not null;" json:"password"`
	ImageUrl     string   `json:"image_url"`
	WhatsappUrl  string   `json:"whatsapp_url"`
	InstagramUrl string   `json:"instagram_url"`
	LineUrl      string   `json:"line_url"`
}
