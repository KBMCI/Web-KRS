package service

import (
	"web-krs/model"
	"web-krs/request"
)

type kelasService struct {
	kelasRepository model.KelasRepository
}

func NewKelasService(kelas model.KelasRepository) model.KelasService {
	return &kelasService{kelasRepository: kelas}
}

func (s *kelasService) StoreKelas(req *request.KelasRequest) (*model.Kelas, error) {
	kelas := &model.Kelas{
		KodeMatkul: req.KodeMatkul,
		Nama: req.Nama,
		RuangKelas: req.RuangKelas,
		Hari: req.Hari,
		JamMulai: req.JamMulai,
		JamSelesai: req.JamSelesai,
	}

	newKelas, err := s.kelasRepository.Create(kelas)
	if err != nil {
		return nil, err
	}

	return newKelas, err
}

func (s *kelasService) EditKelas(id uint, req *request.KelasRequest) (*model.Kelas, error) {
	kelas, err := s.kelasRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	kelas.KodeMatkul = req.KodeMatkul
	kelas.Nama = req.Nama
	kelas.RuangKelas = req.RuangKelas
	kelas.Hari = req.Hari
	kelas.JamMulai = req.JamMulai
	kelas.JamSelesai = req.JamSelesai

	newKelas, err := s.kelasRepository.UpdateByID(kelas)
	if err != nil {
		return nil, err
	}

	return newKelas, err
}

func (s *kelasService) GetByID(id uint) (*model.Kelas, error) {
	kelas, err := s.kelasRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return kelas, err
}

func (s *kelasService) DestroyKelas(id uint) error {
	kelas, _ := s.kelasRepository.FindByID(id)

	_, err := s.kelasRepository.Delete(kelas)
	if err != nil {
		return err
	}

	return err
}

func (s *kelasService) FetchKelas() ([]*model.Kelas, error) {
	kelas, err := s.kelasRepository.Fetch()
	if err != nil {
		return nil, err
	}

	return kelas, err
}