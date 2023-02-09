package model

import (
	"gorm.io/gorm"
)

type (
	Fakultas struct {
		gorm.Model
		Nama string `json:"nama"`
	}

	FakultasRepository interface {
		Create(fakultas *Fakultas) (*Fakultas, error)
		Fetch() (*[]Fakultas, error)
		FindById(id int) (*Fakultas, error)
		UpdateById(id uint, fakultas *Fakultas) (*Fakultas, error)
		Delete(id int) error
	}
)
