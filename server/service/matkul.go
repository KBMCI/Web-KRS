package service

import (
	"web-krs/model"
	"web-krs/request"
)

type matkulService struct {
	matkulRepository model.MatkulRepository
}

func NewMatkulService(matkul model.MatkulRepository) model.MatkulService {
	return &matkulService{matkulRepository: matkul}
}

func (s *matkulService) StoreMatkul(req *request.MatkulRequest) (*model.Matkul, error) {
	matkul := &model.Matkul{
		KodeMatkul: req.ID,
		Nama: req.Nama,
		TahunKurikulum: req.TahunKurikulum,
		Sks: req.Sks,
	}

	newMatkul, err := s.matkulRepository.Create(matkul)

	if err != nil {
		return nil, err
	}

	return newMatkul, err
}

func (s *matkulService) EditMatkul(id string, req *request.MatkulRequest) (*model.Matkul, error) {
	matkul, err := s.matkulRepository.FindByID(id)
	if err != nil {
		return nil, err
	}
	
	matkul.Nama = req.Nama
	matkul.TahunKurikulum = req.TahunKurikulum
	matkul.Sks = req.Sks

	newMatkul, err := s.matkulRepository.UpdateByID(matkul)

	if err != nil {
		return nil, err
	}

	return newMatkul, err
}

func (s *matkulService) GetByID(id string) (*model.Matkul, error) {
	matkul, err := s.matkulRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return matkul, err
}

func (s *matkulService) DestroyMatkul(id string) error {
	matkul, _ := s.matkulRepository.FindByID(id)

	_, err := s.matkulRepository.Delete(matkul)

	if err != nil {
		return err
	}
	return err
}

func (s *matkulService) FetchMatkul() ([]*model.Matkul, error) {
	matkuls, err := s.matkulRepository.Fetch()
	if err != nil {
		return nil, err
	}

	return matkuls, err
}