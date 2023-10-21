package model

import "web-krs/request"

type (
	Fakultas struct {
		ID           uint           `gorm:"primaryKey"`
		Nama         string         `json:"nama" gorm:"type:varchar(50)"`
		ProgramStudi []ProgramStudi `json:"program_studi"`
	}

	FakultasRepository interface {
		Create(fakultas *Fakultas) (*Fakultas, error)
		UpdateByID(fakultas *Fakultas) (*Fakultas, error)
		FindByID(id uint) (*Fakultas, error)
		Delete(fakultas *Fakultas) (*Fakultas, error)
		Fetch() ([]*Fakultas, error)
	}

	FakultasService interface {
		StoreFakultas(req *request.FakultasRequest) (*Fakultas, error)
		EditFakultas(id uint, req *request.FakultasRequest) (*Fakultas, error)
		GetByID(id uint) (*Fakultas, error)
		DestroyFakultas(id uint) error
		FetchFakultas() ([]*Fakultas, error)
	}
)
