package model

import "web-krs/request"

type (
	ProgramStudi struct {
		ID         uint     `json:"id" gorm:"primaryKey"`
		Nama       string   `json:"nama" gorm:"type:varchar(50)"`
		FakultasID uint     `json:"id_fakultas"`
		Fakultas   Fakultas `json:"-"`
		Matkuls    []Matkul `json:"-"`
		Users      []User   `json:"-"`
	}

	ProgramStudiRepository interface {
		Create(programStudi *ProgramStudi) (*ProgramStudi, error)
		UpdateByID(programStudi *ProgramStudi) (*ProgramStudi, error)
		FindByID(id uint) (*ProgramStudi, error)
		Delete(programStudi *ProgramStudi) (*ProgramStudi, error)
		Fetch() ([]*ProgramStudi, error)
	}

	ProgramStudiService interface {
		StoreProgramStudi(req *request.ProgramStudiRequest) (*ProgramStudi, error)
		EditProgramStudi(id uint, req *request.ProgramStudiRequest) (*ProgramStudi, error)
		GetByID(id uint) (*ProgramStudi, error)
		DestroyProgramStudi(id uint) error
		FetchProgramStudi() ([]*ProgramStudi, error)
	}
)
