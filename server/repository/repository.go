package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type Repository struct {
	Matkul   model.MatkulRepository
	Kelas    model.KelasRepository
	JamKelas model.JamKelasRepository
	Plan     model.PlanRepository
	User     model.UserRepository
}

func Init(db *gorm.DB) *Repository {
	return &Repository{
		Matkul:   NewMatkulRepository(db),
		Kelas:    NewKelasRepository(db),
		JamKelas: NewJamKelasRepository(db),
		Plan:     NewPlanRepository(db),
		User:     NewUserRepository(db),
	}
}
