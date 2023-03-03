package model

import (
	"time"
	"web-krs/request"
)

type (
	Matkul struct {
		// gorm.Model
		KodeMatkul		string 	`json:"kode_matkul" gorm:"primaryKey;type:varchar(11)"`
		Nama 			string	`json:"nama" gorm:"type:varchar(100)"`
		TahunKurikulum 	int16	`json:"tahun_kurikulum"`
		Sks				int8	`json:"sks"`
		CreatedAt time.Time
		UpdatedAt time.Time
		// Kelas			[]Kelas // Relationship: One-to-Many (One course has many classes)
	}

	MatkulRepository interface {
		Create(matkul *Matkul) (*Matkul, error)
		UpdateByID(matkul *Matkul) (*Matkul, error)
		FindByID(id string) (*Matkul, error)
		Delete(matkul *Matkul) (*Matkul, error)
		Fetch() ([]*Matkul, error)
	}

	MatkulService interface {
		StoreMatkul(req *request.MatkulRequest) (*Matkul, error)
		EditMatkul(id string, req *request.MatkulRequest) (*Matkul, error)
		GetByID(id string) (*Matkul, error)
		DestroyMatkul(id string) error
		FetchMatkul() ([]*Matkul, error)
	}
)