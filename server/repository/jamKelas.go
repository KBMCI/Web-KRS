package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type JamKelasRepository struct {
	database *gorm.DB
}


func NewJamKelasRepository(database *gorm.DB) model.JamKelasRepository {
	return &JamKelasRepository{
		database: database,
	}
}

func (j *JamKelasRepository) Create(jamKelas *model.JamKelas) (*model.JamKelas, error) {
	err := j.database.Create(&jamKelas).Error
	if err != nil {
		return nil, err
	}
	
	return jamKelas, err
}

// Fetch implements model.JamKelasRepository.
func (j *JamKelasRepository) Fetch() ([]*model.JamKelas, error) {
	var data []*model.JamKelas

	err := j.database.Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

// FindByID implements model.JamKelasRepository.
func (j *JamKelasRepository) FindByID(id uint) (*model.JamKelas, error) {
	data := new(model.JamKelas)

	err := j.database.Find(&data, id).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

// UpdateByID implements model.JamKelasRepository.
func (j *JamKelasRepository) UpdateByID(jamKelas *model.JamKelas) (*model.JamKelas, error) {
	err := j.database.Model(&jamKelas).Updates(&jamKelas).First(&jamKelas).Error
	if err != nil {
		return nil, err
	}
	
	return jamKelas, err
}

// Delete implements model.JamKelasRepository.
func (j *JamKelasRepository) Delete(jamKelas *model.JamKelas) (*model.JamKelas, error) {
	err := j.database.Delete(&jamKelas).Error
	if err != nil {
		return nil, err
	}

	return jamKelas, err
}
