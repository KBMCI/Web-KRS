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
		Create(Fakultas *Fakultas) (*Fakultas, error)
	}
)
