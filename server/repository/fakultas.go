package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type fakultasRepository struct {
	database *gorm.DB
}

func NewFakultasRepository(database *gorm.DB) model.FakultasRepository {
	return &fakultasRepository{
		database: database,
	}
}

func (r *fakultasRepository) Create(fakultas *model.Fakultas) (*model.Fakultas, error) {
	err := r.database.Create(&fakultas).Error
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}

func (r *fakultasRepository) FindByID(id uint) (*model.Fakultas, error) {
	fakultas := new(model.Fakultas)

	err := r.database.Preload("ProgramStudi").First(fakultas, id).Error
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}

func (r *fakultasRepository) FindJamKelasByFakultasID(id uint) (*model.Fakultas, error) {
	fakultas := new(model.Fakultas)

	err := r.database.Preload("JamKelas").First(fakultas, id).Error
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}

func (r *fakultasRepository) Fetch() ([]*model.Fakultas, error) {
	var data []*model.Fakultas

	err := r.database.Preload("ProgramStudi").Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, nil
}

func (r *fakultasRepository) CountAllFakultas() (int64, error) {
	var fakultas int64

	err := r.database.Model(&model.Fakultas{}).Count(&fakultas).Error

	if err != nil {
		return 0, err
	}

	return fakultas, nil
}

func (r *fakultasRepository) UpdateByID(fakultas *model.Fakultas) (*model.Fakultas, error) {
	err := r.database.Model(&fakultas).Updates(&fakultas).First(&fakultas).Error
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}

func (r *fakultasRepository) Delete(fakultas *model.Fakultas) (*model.Fakultas, error) {
	err := r.database.Delete(&fakultas).Error
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}
