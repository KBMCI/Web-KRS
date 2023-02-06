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
