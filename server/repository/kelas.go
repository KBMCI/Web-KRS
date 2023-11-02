package repository

import (
	"web-krs/model"

	"gorm.io/gorm"
)

type kelasRepository struct {
	database *gorm.DB
}

func NewKelasRepository(database *gorm.DB) model.KelasRepository {
	return &kelasRepository{
		database: database,
	}
}

func (k *kelasRepository) Create(kelas *model.Kelas) (*model.Kelas, error) {
	kelasExist := new(model.Kelas)
	rowEffect := k.database.Find(&kelasExist, "kode_matkul = ? AND nama = ?", kelas.KodeMatkul, kelas.Nama)

	if rowEffect.Error != nil {
		return nil, rowEffect.Error
	}

	if rowEffect.RowsAffected != 0 {
		kelas.ID = kelasExist.ID
		if err := k.database.Model(&kelasExist).Preload("Matkul").Association("JadwalKelas").Append(&kelas.JadwalKelas[0]); err != nil {
			return nil, err
		}
		return kelasExist, nil
	}

	result := k.database.Create(&kelas)
	if result.Error != nil {
		return nil, result.Error
	}

	kelasOutput := model.Kelas{
		ID:          kelas.ID,
		KodeMatkul:  kelas.KodeMatkul,
		Nama:        kelas.Nama,
		JadwalKelas: kelas.JadwalKelas,
		Matkul:      kelas.Matkul,
	}

	if err := k.database.Model(&kelas).Preload("Matkul").Association("JadwalKelas").Append(&kelas.JadwalKelas[0]); err != nil {
		return nil, err
	}
	return &kelasOutput, nil
}

func (k *kelasRepository) FindByID(id uint) (*model.Kelas, error) {
	kelas := new(model.Kelas)

	err := k.database.Preload("Matkul").Preload("JadwalKelas").First(kelas, id).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
}

func (k *kelasRepository) FindByJadwalID(idJadwal uint, idKelas uint) (*model.JadwalKelas, error) {
	jadwal := new(model.JadwalKelas)

	err := k.database.Where("id = ? AND id_kelas = ?", idJadwal, idKelas).Preload("Kelas.Matkul").First(&jadwal).Error
	if err != nil {
		return nil, err
	}

	return jadwal, err
}

func (k *kelasRepository) FindBySomeID(id []uint) ([]*model.Kelas, error) {
	var kelas []*model.Kelas

	err := k.database.Preload("Matkul").Preload("JadwalKelas").Find(&kelas, id).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
}

func (k *kelasRepository) Fetch() ([]*model.Kelas, error) {
	var data []*model.Kelas

	err := k.database.Preload("Matkul").Find(&data).Error
	if err != nil {
		return nil, err
	}

	return data, err
}

func (k *kelasRepository) UpdateByKelasID(kelas *model.Kelas) (*model.Kelas, error) {
	err := k.database.Model(&kelas).Updates(&kelas).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
}
func (k *kelasRepository) UpdateByJadwalID(jadwalKelas *model.JadwalKelas) (*model.JadwalKelas, error) {
	err := k.database.Model(&jadwalKelas).Updates(&jadwalKelas).Error
	if err != nil {
		return nil, err
	}

	return jadwalKelas, err
}

func (k *kelasRepository) Delete(kelas *model.Kelas) (*model.Kelas, error) {
	err := k.database.Delete(&kelas).Error
	if err != nil {
		return nil, err
	}

	return kelas, err
}
