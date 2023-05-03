package service

import (
	"fmt"
	"web-krs/helper"
	"web-krs/model"

	"golang.org/x/exp/slices"
)

type randomKrsService struct {
	matkulRepository model.MatkulRepository
	kelasRepository  model.KelasRepository
}

func NewRandomKrsService(matkul model.MatkulRepository, kelas model.KelasRepository) model.RandomKrsService {
	return &randomKrsService{
		matkulRepository: matkul,
		kelasRepository:  kelas,
	}
}

func (r *randomKrsService) FetchRandomKrs() ([][]model.RandomKrs, error) {
	var allIdMatkul []uint

	allMatkul, err := r.matkulRepository.Fetch()
	if err != nil {
		return nil, err
	}

	for _, id := range allMatkul {
		allIdMatkul = append(allIdMatkul, id.ID)
	}

	matkuls, err := r.matkulRepository.FindBySomeID(allIdMatkul)
	if err != nil {
		return nil, err
	}

	hasilRandomKrs := r.RandomKrs(matkuls, [][]model.RandomKrs{})
	return hasilRandomKrs, nil
}

func (r *randomKrsService) RandomKrs(matkuls []*model.Matkul, hasil [][]model.RandomKrs) [][]model.RandomKrs {
	for i, kelas := range matkuls[0].Kelas {
		namaKelas := r.convertFormatKelasToRandomKrs(matkuls[0], kelas)
		if len(matkuls) == 1 {
			hasil = append(hasil, []model.RandomKrs{})

			hasil[len(hasil)-1] = append(hasil[len(hasil)-1], namaKelas)

			if i == len(matkuls[0].Kelas)-1 {
				return hasil
			}
		} else {
			lenHasilLama := len(hasil)
			hasil = append(hasil, r.RandomKrs(matkuls[1:], [][]model.RandomKrs{})...)

			for i := lenHasilLama; i < len(hasil); i++ {
				isNabrak := false
				for _, kelasHasil := range hasil[i] {
					for _, kelasJadwal := range kelasHasil.JadwalKelas {
						for _, kelasTambah := range namaKelas.JadwalKelas {
							if (kelasJadwal.JamMulai == kelasTambah.JamMulai && kelasJadwal.JamSelesai == kelasTambah.JamSelesai && kelasJadwal.Hari == kelasTambah.Hari) || (kelasJadwal.Hari == kelasTambah.Hari && helper.StringToHours(kelasTambah.JamMulai) >= helper.StringToHours(kelasJadwal.JamMulai) && kelasTambah.JamMulai < kelasJadwal.JamSelesai) || (kelasJadwal.Hari == kelasTambah.Hari && helper.StringToHours(kelasTambah.JamMulai) <= helper.StringToHours(kelasJadwal.JamMulai) && kelasTambah.JamSelesai > kelasJadwal.JamMulai) {
								isNabrak = true
							}
						}
					}
				}
				if !isNabrak {
					hasil[i] = append(hasil[i], namaKelas)
					continue
				}
				hasil = slices.Delete(hasil, i, i+1)
				i--
			}

			if i == len(matkuls[0].Kelas)-1 {
				return hasil
			}
		}
	}

	return hasil
}

// Filter pada random krs dengan memasukkan jadwal kelas dan kelas yang ingin dihindari
func (r *randomKrsService) FilterRandomKrs(filterJadwal []model.FilterJadwal, filterKelas []model.FilterKelas) ([][]model.RandomKrs, error) {
	randomsKrs, err := r.FetchRandomKrs()
	if err != nil {
		return nil, err
	}

	jadwalBaru := [][]model.RandomKrs{}

	for _, randomKrs := range randomsKrs {
		isLibur := false

		for _, kelas := range randomKrs {
			for _, filterK := range filterKelas {
				if kelas.NamaMatkul == filterK.NamaMatkul && kelas.NamaKelas == filterK.NamaKelas {
					isLibur = true
				}
			}
			for _, jadwal := range kelas.JadwalKelas {
				for _, filterJ := range filterJadwal {
					if jadwal.Hari == filterJ.Hari && jadwal.JamMulai == filterJ.JamMulai && jadwal.JamSelesai == filterJ.JamSelesai {
						isLibur = true
					}
				}
			}
		}
		if !isLibur {
			jadwalBaru = append(jadwalBaru, randomKrs)
		}
	}
	fmt.Println(len(jadwalBaru))
	return jadwalBaru, nil
}

func (r *randomKrsService) getMatkulFromFilter(filter []model.FilterKelas) []string {
	var matkul []string

	for _, f := range filter {
		matkul = append(matkul, f.NamaMatkul)
	}

	return matkul
}

func (r *randomKrsService) convertFormatKelasToRandomKrs(matkul *model.Matkul, kelas model.Kelas) model.RandomKrs {
	return model.RandomKrs{
		ID:          kelas.ID,
		NamaMatkul:  matkul.Nama,
		NamaKelas:   kelas.Nama,
		JadwalKelas: kelas.JadwalKelas,
	}
}
