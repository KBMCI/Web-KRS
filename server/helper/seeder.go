package helper

import (
	"web-krs/model"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func SeederRefresh(database *gorm.DB) {

	database.Migrator().DropTable(&model.User{})
	database.Migrator().DropTable(&model.Matkul{})
	database.Migrator().DropTable(&model.Kelas{})
	database.Migrator().DropTable(&model.JadwalKelas{})
	database.Migrator().DropTable(&model.JamKelas{})

	database.AutoMigrate(&model.User{}, &model.Matkul{}, &model.Kelas{}, &model.JadwalKelas{}, &model.JamKelas{}, &model.Plan{})

	hashAdmin, _ := HashPassword("Admin123.")
	hashUser, _ := HashPassword("User123.")

	users := []model.User{
		{Nama: "Admin", Email: "admin@gmail.com", ProgramStudi: "Teknologi Informasi", Nim: "215150700111021", Password: hashAdmin, Role: "admin"},
		{Nama: "User", Email: "user@gmail.com", ProgramStudi: "Teknologi Informasi", Nim: "215150700111022", Password: hashUser, Role: "user"},
	}

	matkuls := []model.Matkul{
		// wajib
		{Kode: "COM60051", Nama: "Metodologi Penelitian dan Penulisan Ilmiah", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CSD60004", Nama: "Keamanan Jaringan", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT61020", Nama: "Administrasi Basis Data", TahunKurikulum: 2020, Sks: 4},
		{Kode: "CIT61021", Nama: "Data Warehouse", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT61022", Nama: "Pemrograman Integratif", TahunKurikulum: 2020, Sks: 4},
		// pilihan
		{Kode: "CIT60024", Nama: "Basis Data Terdistribusi", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CSD60013", Nama: "Pengantar Big Data", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT60028", Nama: "High Availability System", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT60029", Nama: "Internet of Things", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT60031", Nama: "Manajemen Proyek Teknologi Informasi", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CSD60001", Nama: "Sistem Informasi Geografi", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT60035", Nama: "Sistem Terdistribusi", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT60036", Nama: "Teknologi Berbasis Cloud", TahunKurikulum: 2020, Sks: 3},
		{Kode: "CIT60037", Nama: "Microservice Architecture", TahunKurikulum: 2020, Sks: 2},
		{Kode: "CSD60007", Nama: "Digital Financial Platform", TahunKurikulum: 2020, Sks: 2},
		{Kode: "CIT60039", Nama: "Pemrograman Web Lanjut", TahunKurikulum: 2020, Sks: 3},
	}

	jamKelas := []model.JamKelas{
		{
			JamMulai:   "07:00",
			JamSelesai: "08:39",
		},
		{
			JamMulai:   "07:00",
			JamSelesai: "09:29",
		},
		{
			JamMulai:   "07:50",
			JamSelesai: "10:19",
		},
		{
			JamMulai:   "08:40",
			JamSelesai: "10:19",
		},
		{
			JamMulai:   "08:40",
			JamSelesai: "11:09",
		},
		{
			JamMulai:   "09:30",
			JamSelesai: "11:09",
		},
		{
			JamMulai:   "09:30",
			JamSelesai: "11:59",
		},
		{
			JamMulai:   "10:20",
			JamSelesai: "11:59",
		},
		{
			JamMulai:   "12:50",
			JamSelesai: "14:29",
		},
		{
			JamMulai:   "12:50",
			JamSelesai: "15:19",
		},
		{
			JamMulai:   "13:40",
			JamSelesai: "16:19",
		},
		{
			JamMulai:   "14:30",
			JamSelesai: "17:09",
		},
		{
			JamMulai:   "15:30",
			JamSelesai: "18:09",
		},
		{
			JamMulai:   "16:20",
			JamSelesai: "18:09",
		},
	}

	classes := []model.Kelas{
		// Metodologi Penelitian dan Penulisan Ilmiah
		{KodeMatkul: "COM60051", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.5",
			},
		}},
		{KodeMatkul: "COM60051", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:50",
				JamSelesai: "10:19",
				RuangKelas: "F3.4",
			},
		}},
		{KodeMatkul: "COM60051", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.15",
			},
		}},
		{KodeMatkul: "COM60051", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "13:40",
				JamSelesai: "16:19",
				RuangKelas: "F2.8",
			},
		}},

		// Keamanan Jaringan
		{KodeMatkul: "CSD60004", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.1",
			},
		}},
		{KodeMatkul: "CSD60004", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.17",
			},
		}},
		{KodeMatkul: "CSD60004", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.12",
			},
		}},
		{KodeMatkul: "CSD60004", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F2.9",
			},
		}},

		// Administrasi Basis Data
		{KodeMatkul: "CIT61020", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.2",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "13:40",
				JamSelesai: "16:19",
				RuangKelas: "F4.13",
			},
		}},
		{KodeMatkul: "CIT61020", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.11",
			},
		}},
		{KodeMatkul: "CIT61020", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F2.9",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "09:30",
				JamSelesai: "11:09",
				RuangKelas: "G1.4",
			},
		}},
		{KodeMatkul: "CIT61020", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F4.14",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.5",
			},
		}},

		// Data Warehouse
		{KodeMatkul: "CIT61021", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F4.2",
			},
		}},
		{KodeMatkul: "CIT61021", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.8",
			},
		}},
		{KodeMatkul: "CIT61021", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F4.6",
			},
		}},
		{KodeMatkul: "CIT61021", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F3.1",
			},
		}},

		// Pemrograman Integratif
		{KodeMatkul: "CIT61022", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.10",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.4",
			},
		}},
		{KodeMatkul: "CIT61022", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F3.5",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIT61022", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.10",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIT61022", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F3.3",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.5",
			},
		}},

		// Basis Data Terdistribusi
		{KodeMatkul: "CIT60024", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F4.14",
			},
		}},

		// Pengantar Big Data
		{KodeMatkul: "CSD60013", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.16",
			},
		}},
		{KodeMatkul: "CSD60013", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.16",
			},
		}},

		// High Availability System
		{KodeMatkul: "CIT60028", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.6",
			},
		}},

		// IoT
		{KodeMatkul: "CIT60029", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F3.2",
			},
		}},
		{KodeMatkul: "CIT60029", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.6",
			},
		}},

		// MPTI
		{KodeMatkul: "CIT60031", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.14",
			},
		}},

		// Sistem Informasi Geografi
		{KodeMatkul: "CIT60034", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.14",
			},
		}},

		// Sistem Terdistribusi
		{KodeMatkul: "CIT60035", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.5",
			},
		}},

		// Teknologi Berbasis Cloud
		{KodeMatkul: "CIT60036", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F3.10",
			},
		}},

		// Microservice Architecture
		{KodeMatkul: "CIT60037", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "F2.4",
			},
		}},

		// Digital Financial Platform
		{KodeMatkul: "CSD60007", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F2.9",
			},
		}},

		// Pemweb Lanjut
		{KodeMatkul: "CIT60039", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.7",
			},
		}},
	}

	for _, user := range users {
		database.Create(&user)
	}

	for _, matkul := range matkuls {
		database.Create(&matkul)
	}

	for _, jk := range jamKelas {
		database.Create(&jk)
	}

	for _, kelas := range classes {
		database.Create(&kelas)
	}

	// User add matkuls
	var matkulAdmin []model.Matkul
	var userAdmin model.User

	database.First(&userAdmin)
	database.Find(&matkulAdmin, []int{1, 2, 3, 4, 5})

	userAdmin.Matkuls = matkulAdmin

	database.Model(&userAdmin).Updates(&userAdmin)
}
