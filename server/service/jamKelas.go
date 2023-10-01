package service

import (
	"web-krs/model"
	"web-krs/request"
)

type jamKelasService struct {
	jamKelasRepository model.JamKelasRepository
}

func NewJamKelasService(jamKelas model.JamKelasRepository) model.JamKelasService {
	return &jamKelasService{jamKelasRepository: jamKelas}
}

// StoreJamKelas implements model.JamKelasService.
func (j *jamKelasService) StoreJamKelas(req *request.JamKelasRequest) (*model.JamKelas, error) {
	jamKelas := &model.JamKelas{
		JamMulai:   req.JamMulai,
		JamSelesai: req.JamSelesai,
	}

	newJamKelas, err := j.jamKelasRepository.Create(jamKelas)
	if err != nil {
		return nil, err
	}

	return newJamKelas, err
}

// FetchJamKelas implements model.JamKelasService.
func (j *jamKelasService) FetchJamKelas() ([]*model.JamKelas, error) {
	jamKelass, err := j.jamKelasRepository.Fetch()
	if err != nil {
		return nil, err
	}

	return jamKelass, err
}

// GetByID implements model.JamKelasService.
func (j *jamKelasService) GetByID(id uint) (*model.JamKelas, error) {
	jamKelas, err := j.jamKelasRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return jamKelas, err
}

// EditJamKelas implements model.JamKelasService.
func (j *jamKelasService) EditJamKelas(id uint, req *request.JamKelasRequest) (*model.JamKelas, error) {
	newJamKelas, err := j.jamKelasRepository.UpdateByID(&model.JamKelas{
		ID:         id,
		JamMulai:   req.JamMulai,
		JamSelesai: req.JamSelesai,
	})

	if err != nil {
		return nil, err
	}

	return newJamKelas, err
}

// DestroyJamKelas implements model.JamKelasService.
func (j *jamKelasService) DestroyJamKelas(id uint) error {
	jamKelas, _ := j.jamKelasRepository.FindByID(id)
	
	_, err := j.jamKelasRepository.Delete(jamKelas)
	if err != nil {
		return err
	}
	return err
}
