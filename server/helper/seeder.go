package helper

import (
	"web-krs/config"
	"web-krs/model"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error){
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes),err
}

func SeederRefresh(cfg config.Config) {

	cfg.Database().Migrator().DropTable(&model.User{})
	cfg.Database().Migrator().DropTable(&model.Matkul{})
	cfg.Database().Migrator().DropTable(&model.Kelas{})
	cfg.Database().Migrator().DropTable(&model.JadwalKelas{})

	hashAdmin, _ := HashPassword("Admin123.")
	hashUser, _ := HashPassword("User123.")

	users := []model.User{
		{Nama: "Admin", Email: "admin@gmail.com", ProgramStudi: "Teknologi Informasi", Nim: "215150700111021", Password: hashAdmin, Role: "admin"},
		{Nama: "User", Email: "user@gmail.com", ProgramStudi: "Teknologi Informasi", Nim: "215150700111022", Password: hashUser, Role: "user"},
	}

	matkuls := []model.Matkul{
		{Kode: "CIT62012", Nama: "Pengembangan Aplikasi Mobile", TahunKurikulum: 2022, Sks: 4},
		{Kode: "CIT62013", Nama: "Tata Kelola Teknologi Informasi", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62014", Nama: "Implementasi dan Evaluasi Sistem Informasi", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62015", Nama: "Administrasi Sistem", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62016", Nama: "Arsitektur dan Protokol Internet", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT62017", Nama: "Teknologi Integrasi Sistem", TahunKurikulum: 2022, Sks: 2},
		{Kode: "CIT62018", Nama: "Keamanan Informasi", TahunKurikulum: 2022, Sks: 3},
		{Kode: "CIT60031", Nama: "Manajemen Proyek Teknologi Informasi", TahunKurikulum: 2022, Sks: 3},
	}

	classes := []model.Kelas{
		// PAM
		{KodeMatkul: "CIT62012", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.9",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "15:30",
				JamSelesai: "18:00",
				RuangKelas: "F3.13",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "16:20",
				JamSelesai: "18:00",
				RuangKelas: "G1.3",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F4.4",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.2",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.5",
			},
		}},
		
		// TKTI
		{KodeMatkul: "CIT62013", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.2",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.13",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.6",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F2.9",
			},
		}},

		// IDESI
		{KodeMatkul: "CIT62014", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.1",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F2.8",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F2.1",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.6",
			},
		}},

		// AS
		{KodeMatkul: "CIT62015", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.2",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "F3.6",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F4.3",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F3.1",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F4.6",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "16:20",
				JamSelesai: "18:00",
				RuangKelas: "G1.6",
			},
		}},

		// ARPI
		{KodeMatkul: "CIT62016", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.15",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.4",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F3.9",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F2.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.5",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F2.6",
			},
		}},

		// TIS
		{KodeMatkul: "CIT62017", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F4.11",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "F3.13",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F4.12",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F3.3",
			},
		}},

		// KI
		{KodeMatkul: "CIT62018", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.14",
			},
		}},
		{KodeMatkul: "CIT62018", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.6",
			},
		}},
		{KodeMatkul: "CIT62018", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.14",
			},
		}},
		{KodeMatkul: "CIT62018", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.5",
			},
		}},

		// MPTI
		{KodeMatkul: "CIT60031", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F2.6",
			},
		}},
		{KodeMatkul: "CIT60031", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.6",
			},
		}},
	}
	
	for _, user := range users {
		cfg.Database().Create(&user)
	}

	for _, matkul := range matkuls {
		cfg.Database().Create(&matkul)
	}

	for _, kelas := range classes {
		cfg.Database().Create(&kelas)
	}
	
	// User add matkuls
	var matkulAdmin []model.Matkul
	var userAdmin model.User

	cfg.Database().First(&userAdmin)
	cfg.Database().Find(&matkulAdmin, []int{1,2,3,4,5,6,7,8})

	userAdmin.Matkuls = matkulAdmin
	
	cfg.Database().Model(&userAdmin).Updates(&userAdmin)
}