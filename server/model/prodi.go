package model

import "gorm.io/gorm"

type Prodi struct {
	gorm.Model
	FakultasID int      `json:"fakultas_id"`
	Fakultas   Fakultas `gorm:"constraint:OnDelete:CASCADE" json:"fakultas"`
	Nama       string   `json:"nama"`
}
