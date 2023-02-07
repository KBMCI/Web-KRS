package repository

import (
	"web-krs/config"
	"web-krs/model"
)

type fakultasRepository struct {
	Cfg config.Config
}

func NewFakultasRepository(cfg config.Config) model.FakultasRepository {
	return &fakultasRepository{
		Cfg: cfg,
	}
}

func (f *fakultasRepository) Create(fakultas *model.Fakultas) (*model.Fakultas, error)  {
	fakultasModel := new(model.Fakultas)
	if err := f.Cfg.Database().Create(&fakultas).Order("id desc").Limit(1).Find(fakultasModel).Error; err != nil {
		return nil, err
	}
	return fakultasModel, nil
}

func (f *fakultasRepository) Fetch() (*[]model.Fakultas, error) {
	fakultas := new([]model.Fakultas)
	if err := f.Cfg.Database().Find(&fakultas).Error; err != nil{
		return nil, err
	}
	return fakultas, nil
}

func (f *fakultasRepository) FindById(id int) (*model.Fakultas, error){
	return nil, nil
}
func (f *fakultasRepository) UpdateById(id int, fakultas *model.Fakultas) (*model.Fakultas, error){
	return nil, nil
}

func (f *fakultasRepository) Delete(id int) error {
	if err := f.Cfg.Database().Delete(&model.Fakultas{}, id).Error; err != nil {
		return err
	}
	return nil
}