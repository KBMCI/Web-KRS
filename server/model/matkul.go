package model

import (
	"web-krs/request"

	"gorm.io/gorm"
)

type (
	Matkul struct {
		gorm.Model
		Nama 			string	`json:"nama" gorm:"type:varchar(100)"`
		TahunKurikulum 	int16	`json:"tahun_kurikulum"`
		Sks				int8	`json:"sks"`
	}

	MatkulRepository interface {
		Create(matkul *Matkul) (*Matkul, error)
		UpdateByID(matkul *Matkul) (*Matkul, error)
		FindByID(id int) (*Matkul, error)
		Delete(matkul *Matkul) (*Matkul, error)
		Fetch() ([]*Matkul, error)
	}

	MatkulService interface {
		StoreMatkul(req *request.MatkulRequest) (*Matkul, error)
		EditMatkul(id int, req *request.MatkulRequest) (*Matkul, error)
		GetByID(id int) (*Matkul, error)
		DestroyMatkul(id int) error
		FetchMatkul() ([]*Matkul, error)
	}
)