package repository

import (
	"web-krs/config"
	"web-krs/model"
)

type matkulRepository struct {
	cfg config.Config
}

func NewMatkulRepository(cfg config.Config) model.MatkulRepository  {
	return &matkulRepository{cfg: cfg}
}

func (m *matkulRepository) Create(matkul *model.Matkul) (*model.Matkul, error) {
	err := m.cfg.Database().Create(&matkul).Error
	if err != nil{
		return nil, err
	}

	return matkul, err
}

func (m *matkulRepository) FindByID(id uint) (*model.Matkul, error){
	matkul := new(model.Matkul)

	err := m.cfg.Database().Preload("Kelas").First(matkul, id).Error
	if err != nil {
		return nil, err
	}

	return matkul, err
}

func (m *matkulRepository) FindBySomeID(id []string) ([]*model.Matkul, error) {
	var data []*model.Matkul

	err := m.cfg.Database().Preload("Kelas").Find(&data, id).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

func (m *matkulRepository) Fetch() ([]*model.Matkul, error) {
	var data []*model.Matkul

	err := m.cfg.Database().Preload("Kelas").Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

func (m *matkulRepository) UpdateByID(matkul *model.Matkul) (*model.Matkul, error){
	err := m.cfg.Database().Model(&matkul).Updates(&matkul).First(&matkul).Error
	if err != nil {
		return nil, err
	}
	
	return matkul, err
}

func (m *matkulRepository) Delete(matkul *model.Matkul) (*model.Matkul, error) {
	err := m.cfg.Database().Delete(&matkul).Error
	if err != nil {
		return nil, err
	}

	return matkul, err
	
}