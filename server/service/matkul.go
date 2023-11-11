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
		Kode:           req.KodeMatkul,
		ProgramStudiID: req.ProgramStudiId,
		Nama:           req.Nama,
		TahunKurikulum: req.TahunKurikulum,
		Sks:            req.Sks,
	}

	newMatkul, err := s.matkulRepository.Create(matkul)
	if err != nil {
		return nil, err
	}

	return newMatkul, err
}

func (s *matkulService) EditMatkul(id uint, req *request.MatkulRequest) (*model.Matkul, error) {
	newMatkul, err := s.matkulRepository.UpdateByID(&model.Matkul{
		ID:             id,
		Kode:           req.KodeMatkul,
		ProgramStudiID: req.ProgramStudiId,
		Nama:           req.Nama,
		TahunKurikulum: req.TahunKurikulum,
		Sks:            req.Sks,
	})

	if err != nil {
		return nil, err
	}

	return newMatkul, err
}

func (s *matkulService) GetByID(id uint) (*model.Matkul, error) {
	matkul, err := s.matkulRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return matkul, err
}

func (s *matkulService) CountAllMatkul() (int64, error) {
	matkul, err := s.matkulRepository.CountAllMatkul()
	if err != nil {
		return 0, err
	}

	return matkul, nil
}

func (s *matkulService) DestroyMatkul(id uint) error {
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
