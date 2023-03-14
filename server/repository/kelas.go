package repository

import (
	"web-krs/config"
	"web-krs/model"
)

type kelasRepository struct {
	cfg config.Config
}

func NewKelasRepository(cfg config.Config) model.KelasRepository {
	return &kelasRepository{cfg: cfg}
}

func (k *kelasRepository) Create(kelas *model.Kelas) (*model.Kelas, error) {
	err := k.cfg.Database().Create(&kelas).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
}

func (k *kelasRepository) FindByID(id uint) (*model.Kelas, error) {
	kelas := new(model.Kelas)

	err := k.cfg.Database().Preload("Matkul").First(kelas, id).Error
	if err != nil {
		return nil, err
	}
	
	return kelas, err
}

func (k *kelasRepository) Fetch() ([]*model.Kelas, error) {
	var data []*model.Kelas

	err := k.cfg.Database().Preload("Matkul").Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

func (k *kelasRepository) UpdateByID(kelas *model.Kelas) (*model.Kelas, error) {
	err := k.cfg.Database().Model(&kelas).Updates(&kelas).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
}

func (k *kelasRepository) Delete(kelas *model.Kelas) (*model.Kelas, error) {
	err := k.cfg.Database().Delete(&kelas).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
} 