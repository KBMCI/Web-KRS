package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type matkulRepository struct {
	database *gorm.DB
}

func NewMatkulRepository(database *gorm.DB) model.MatkulRepository {
	return &matkulRepository{
		database: database,
	}
}

func (m *matkulRepository) Create(matkul *model.Matkul) (*model.Matkul, error) {
	err := m.database.Create(&matkul).Error
	if err != nil {
		return nil, err
	}

	return matkul, err
}

func (m *matkulRepository) FindByID(id uint) (*model.Matkul, error) {
	matkul := new(model.Matkul)

	err := m.database.Preload("ProgramStudi").First(matkul, id).Error
	if err != nil {
		return nil, err
	}

	return matkul, err
}

func (m *matkulRepository) FindBySomeID(id []uint) ([]*model.Matkul, error) {
	var data []*model.Matkul

	err := m.database.Preload("Kelas.JadwalKelas").Preload("ProgramStudi").Find(&data, id).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

func (m *matkulRepository) Fetch() ([]*model.Matkul, error) {
	var data []*model.Matkul

	err := m.database.Preload("ProgramStudi").Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

func (m *matkulRepository) CountAllMatkul() (int64, error) {
	var matkul int64

	err := m.database.Model(&model.Matkul{}).Count(&matkul).Error

	if err != nil {
		return 0, err
	}

	return matkul, nil
}

func (m *matkulRepository) UpdateByID(matkul *model.Matkul) (*model.Matkul, error) {
	err := m.database.Model(&matkul).Updates(&matkul).First(&matkul).Error
	if err != nil {
		return nil, err
	}

	return matkul, err
}

func (m *matkulRepository) Delete(matkul *model.Matkul) (*model.Matkul, error) {
	err := m.database.Delete(&matkul).Error
	if err != nil {
		return nil, err
	}

	return matkul, err

}
