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
		Nama:       req.Nama,
		JadwalKelas: []model.JadwalKelas{
			{
				Hari:       req.Hari,
				JamMulai:   req.JamMulai,
				JamSelesai: req.JamSelesai,
				RuangKelas: req.RuangKelas,
			},
		},
	}

	newKelas, err := s.kelasRepository.Create(kelas)
	if err != nil {
		return nil, err
	}

	return newKelas, err
}

func (s *kelasService) EditKelas(idKelas uint, idJadwal uint, req *request.KelasRequest) (*model.Kelas, error) {
	newKelas, err := s.kelasRepository.UpdateByKelasID(&model.Kelas{
		ID:         idKelas,
		KodeMatkul: req.KodeMatkul,
		Nama:       req.Nama,
	})

	if err != nil {
		return nil, err
	}

	newJadwalKelas, err := s.kelasRepository.UpdateByJadwalID(&model.JadwalKelas{
		ID:         idJadwal,
		Hari:       req.Hari,
		JamMulai:   req.JamMulai,
		JamSelesai: req.JamSelesai,
		RuangKelas: req.RuangKelas,
	})

	if err != nil {
		return nil, err
	}

	newKelas.JadwalKelas = []model.JadwalKelas{*newJadwalKelas}

	return newKelas, err
}

func (s *kelasService) GetByID(id uint) (*model.Kelas, error) {
	kelas, err := s.kelasRepository.FindByID(id)
	if err != nil {
		return nil, err
	}

	return kelas, err
}

func (s *kelasService) GetByIDJadwal(idJadwal uint, idKelas uint) (*model.JadwalKelas, error) {
	jadwal, err := s.kelasRepository.FindByJadwalID(idJadwal, idKelas)
	if err != nil {
		return nil, err
	}

	return jadwal, nil

}

func (s *kelasService) CountAllKelas() (int64, error) {
	kelas, err := s.kelasRepository.CountAllKelas()
	if err != nil {
		return 0, err
	}

	return kelas, nil
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
