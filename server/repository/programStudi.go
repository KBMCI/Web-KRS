package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type programStudiRepository struct {
	database *gorm.DB
}

func NewProgramStudiRepository(database *gorm.DB) model.ProgramStudiRepository {
	return &programStudiRepository{
		database: database,
	}
}

func (r *programStudiRepository) Create(programStudi *model.ProgramStudi) (*model.ProgramStudi, error) {
	err := r.database.Create(&programStudi).Error
	if err != nil {
		return nil, err
	}

	return programStudi, nil
}

func (r *programStudiRepository) UpdateByID(programStudi *model.ProgramStudi) (*model.ProgramStudi, error) {
	err := r.database.Model(&programStudi).Updates(&programStudi).First(&programStudi).Error
	if err != nil {
		return nil, err
	}

	return programStudi, nil
}

func (r *programStudiRepository) FindByID(id uint) (*model.ProgramStudi, error) {
	programStudi := new(model.ProgramStudi)

	err := r.database.Preload("Fakultas").Preload("Matkuls").First(programStudi, id).Error
	if err != nil {
		return nil, err
	}

	return programStudi, nil
}

func (r *programStudiRepository) Delete(programStudi *model.ProgramStudi) (*model.ProgramStudi, error) {
	err := r.database.Delete(&programStudi).Error
	if err != nil {
		return nil, err
	}

	return programStudi, nil
}

func (r *programStudiRepository) Fetch() ([]*model.ProgramStudi, error) {
	var data []*model.ProgramStudi

	err := r.database.Preload("Fakultas").Preload("Matkuls").Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, nil
}
