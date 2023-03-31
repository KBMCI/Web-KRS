package helper

import (
	"web-krs/config"
	"web-krs/model"
)

func SeederRefresh(cfg config.Config) {

	cfg.Database().Migrator().DropTable(&model.Matkul{})
	cfg.Database().Migrator().DropTable(&model.Kelas{})

	matkuls := []model.Matkul{
		{Kode: "CIT60031", Nama: "Manajemen Proyek Teknologi Informasi", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62012", Nama: "Pengembangan Aplikasi Mobile", TahunKurikulum: 2022, Sks: 4},
		{Kode: "CIT62013", Nama: "Tata Kelola Teknologi Informasi", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62014", Nama: "Implementasi dan Evaluasi Sistem Informasi", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62015", Nama: "Administrasi Sistem", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62016", Nama: "Arsitektur dan Protokol Internet", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62017", Nama: "Teknologi Integrasi Sistem", TahunKurikulum: 2022, Sks: 2},
		{Kode: "CIT62018", Nama: "Keamanan Informasi", TahunKurikulum: 2022, Sks: 3},
	}

	for _, matkul := range matkuls {
		cfg.Database().Create(&matkul)
	}

	classes := []model.Kelas{
		{KodeMatkul: "CIT60031", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT60031", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},

		{KodeMatkul: "CIT62012", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62012", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62012", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62012", Nama: "D", RuangKelas: "Gedung F FILKOM - F4.4", Hari: "Kamis", JamMulai: "09:30", JamSelesai: "11:59"},
		
		{KodeMatkul: "CIT62013", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62013", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62013", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},

		{KodeMatkul: "CIT62014", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62014", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62014", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62014", Nama: "D", RuangKelas: "Gedung F FILKOM - F4.4", Hari: "Kamis", JamMulai: "09:30", JamSelesai: "11:59"},

		{KodeMatkul: "CIT62015", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62015", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62015", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62015", Nama: "D", RuangKelas: "Gedung F FILKOM - F4.4", Hari: "Kamis", JamMulai: "09:30", JamSelesai: "11:59"},

		{KodeMatkul: "CIT62016", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62016", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62016", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62016", Nama: "D", RuangKelas: "Gedung F FILKOM - F4.4", Hari: "Kamis", JamMulai: "09:30", JamSelesai: "11:59"},

		{KodeMatkul: "CIT62017", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62017", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62017", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},

		{KodeMatkul: "CIT62018", Nama: "A", RuangKelas: "Gedung F FILKOM - F3.1", Hari: "Senin", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62018", Nama: "B", RuangKelas: "Gedung F FILKOM - F3.2", Hari: "Selasa", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62018", Nama: "C", RuangKelas: "Gedung F FILKOM - F4.3", Hari: "Rabu", JamMulai: "09:30", JamSelesai: "11:59"},
		{KodeMatkul: "CIT62018", Nama: "D", RuangKelas: "Gedung F FILKOM - F4.4", Hari: "Kamis", JamMulai: "09:30", JamSelesai: "11:59"},
	}
	
	for _, kelas := range classes {
		cfg.Database().Create(&kelas)
	}
	
}