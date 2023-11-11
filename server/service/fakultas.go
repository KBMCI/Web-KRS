package service

import (
	"web-krs/model"
	"web-krs/request"
)

type fakultasService struct {
	fakultasRepository model.FakultasRepository
}

func NewFakultasService(fakultas model.FakultasRepository) model.FakultasService {
	return &fakultasService{
		fakultasRepository: fakultas,
	}
}

func (s *fakultasService) StoreFakultas(req *request.FakultasRequest) (*model.Fakultas, error) {
	fakultas := &model.Fakultas{
		Nama: req.Nama,
	}

	newFakultas, err := s.fakultasRepository.Create(fakultas)
	if err != nil {
		return nil, err
	}

	return newFakultas, nil
}

func (s *fakultasService) EditFakultas(id uint, req *request.FakultasRequest) (*model.Fakultas, error) {
	newFakultas, err := s.fakultasRepository.UpdateByID(&model.Fakultas{
		ID:   id,
		Nama: req.Nama,
	})

	if err != nil {
		return nil, err
	}

	return newFakultas, nil
}

func (s *fakultasService) GetByID(id uint) (*model.Fakultas, error) {
	fakultas, err := s.fakultasRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}

func (s *fakultasService) GetJamKelasByFakultasID(id uint) (*model.Fakultas, error) {
	fakultas, err := s.fakultasRepository.FindJamKelasByFakultasID(id)
	if err != nil {
		return nil, err
	}

	return fakultas, nil
}

func (s *fakultasService) CountAllFakultas() (int64, error) {
	fakultas, err := s.fakultasRepository.CountAllFakultas()
	if err != nil {
		return 0, err
	}

	return fakultas, nil
}

func (s *fakultasService) DestroyFakultas(id uint) error {
	fakultas, err := s.fakultasRepository.FindByID(id)
	if err != nil {
		return err
	}

	_, err = s.fakultasRepository.Delete(fakultas)
	if err != nil {
		return err
	}

	return nil
}

func (s *fakultasService) FetchFakultas() ([]*model.Fakultas, error) {
	fakultasData, err := s.fakultasRepository.Fetch()
	if err != nil {
		return nil, err
	}

	return fakultasData, nil
}
