package repository

import (
	"web-krs/config"
	"web-krs/model"

	"gorm.io/gorm"
)

type fakultasRepository struct {
	Cfg config.Config
}

func NewFakultasRepository(cfg config.Config) model.FakultasRepository {
	return &fakultasRepository{
		Cfg: cfg,
	}
}

func (f *fakultasRepository) Create(fakultas *model.Fakultas) (*model.Fakultas, error) {
	fakultasModel := new(model.Fakultas)
	if err := f.Cfg.Database().Create(&fakultas).Last(fakultasModel).Error; err != nil {
		return nil, err
	}
	return fakultasModel, nil
}

func (f *fakultasRepository) Fetch() (*[]model.Fakultas, error) {
	fakultas := new([]model.Fakultas)
	if err := f.Cfg.Database().Find(&fakultas).Error; err != nil {
		return nil, err
	}
	return fakultas, nil
}

func (f *fakultasRepository) FindById(id int) (*model.Fakultas, error) {
	fakultasModel := new(model.Fakultas)
	if err := f.Cfg.Database().First(&fakultasModel, id).Error; err != nil {
		return nil, err
	}

	return fakultasModel, nil
}
func (f *fakultasRepository) UpdateById(id uint, fakultas *model.Fakultas) (*model.Fakultas, error) {
	if err := f.Cfg.Database().Model(model.Fakultas{
		Model: gorm.Model{
			ID:        id,
		},
	}).Updates(&fakultas).Error; err != nil {
		return nil, err
	}
	return fakultas, nil
}

func (f *fakultasRepository) Delete(id int) error {
	if err := f.Cfg.Database().Delete(&model.Fakultas{}, id).Error; err != nil {
		return err
	}
	return nil
}
