package helper

import (
	"web-krs/config"
	"web-krs/model"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func SeederRefresh() {
	database := config.NewConfig().Database()

	database.Migrator().DropTable(&model.Fakultas{})
	database.Migrator().DropTable(&model.ProgramStudi{})
	database.Migrator().DropTable(&model.User{})
	database.Migrator().DropTable(&model.Matkul{})
	database.Migrator().DropTable(&model.Kelas{})
	database.Migrator().DropTable(&model.JadwalKelas{})
	database.Migrator().DropTable(&model.JamKelas{})

	database.AutoMigrate(&model.Fakultas{}, &model.ProgramStudi{}, &model.User{}, &model.Matkul{}, &model.Kelas{}, &model.JadwalKelas{}, &model.JamKelas{}, &model.Plan{})

	hashAdmin, _ := HashPassword("Admin123.")
	hashUser, _ := HashPassword("User123.")

	users := []*model.User{
		{Nama: "Admin", Email: "admin@gmail.com", ProgramStudiID: 1, Nim: "215150700111021", Password: hashAdmin, Role: "admin"},
		{Nama: "User Teknologi Informasi", Email: "userti@gmail.com", ProgramStudiID: 1, Nim: "215150700111022", Password: hashUser, Role: "user"},
		{Nama: "User Teknik Informatika", Email: "usertif@gmail.com", ProgramStudiID: 2, Nim: "215150700111022", Password: hashUser, Role: "user"},
	}

	fakultas := []model.Fakultas{
		{Nama: "Ilmu Komputer"},
	}

	prodis := []model.ProgramStudi{
		{Nama: "Teknologi Informasi", FakultasID: 1},
		{Nama: "Teknik Informatika", FakultasID: 1},
	}

	matkuls := []model.Matkul{
        // Teknologi Informasi
        {Kode: "CIT62001", Nama: "Dasar Desain Antarmuka Pengguna", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT62002", Nama: "Pemrograman Lanjut", TahunKurikulum: 2020, Sks: 5, ProgramStudiID: 1},
        {Kode: "CIT62003", Nama: "Dasar Pengembangan Sistem Informasi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT62004", Nama: "Pengantar Sistem Operasi", TahunKurikulum: 2020, Sks: 2, ProgramStudiID: 1},
        {Kode: "CIT62005", Nama: "Sistem Basis Data", TahunKurikulum: 2020, Sks: 4, ProgramStudiID: 1},
        {Kode: "CIT62012", Nama: "Pengembangan Aplikasi Mobile", TahunKurikulum: 2020, Sks: 4, ProgramStudiID: 1},
        {Kode: "CIT62013", Nama: "Tata Kelola Teknologi Informasi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT62014", Nama: "Implementasi Dan Evaluasi Sistem Informasi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT62015", Nama: "Administrasi Sistem", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT62016", Nama: "Arsitektur Dan Protokol Internet", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT62017", Nama: "Teknologi Integrasi Sistem", TahunKurikulum: 2020, Sks: 2, ProgramStudiID: 1},
        {Kode: "CIT62018", Nama: "Keamanan Informasi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT60024", Nama: "Basis Data Terdistribusi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT60031", Nama: "Manajemen Proyek Teknologi Informasi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT60033", Nama: "Sistem Forensik Digital", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT60034", Nama: "Sistem Informasi Geografi", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT60036", Nama: "Teknologi Berbasis Cloud", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CIT60039", Nama: "Pemrograman Web Lanjut", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},
        {Kode: "CSD60013", Nama: "Pengatar Big Data", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 1},

        // Teknik Informatika
        {Kode: "CIF62015", Nama: "Pemrograman Web", TahunKurikulum: 2020, Sks: 4, ProgramStudiID: 2},
        {Kode: "CIF62014", Nama: "Sistem Multimedia", TahunKurikulum: 2020, Sks: 3, ProgramStudiID: 2},
        {Kode: "CIF62013", Nama: "Keamanan Informasi", TahunKurikulum: 2020, Sks: 4, ProgramStudiID: 2},
        {Kode: "CIF62017", Nama: "Pengantar Pembelajaran Mesin", TahunKurikulum: 2020, Sks: 4, ProgramStudiID: 2},
        {Kode: "CIF62016", Nama: "Analisis Dan Perancangan Sistem", TahunKurikulum: 2020, Sks: 5, ProgramStudiID: 2},
	}

	jamKelas := []model.JamKelas{
		// Fakultas Ilmu Komputer
		{
			JamMulai:   "07:00",
			JamSelesai: "08:39",
			FakultasID: 1,
		},
		{
			JamMulai:   "07:00",
			JamSelesai: "09:29",
			FakultasID: 1,
		},
		{
			JamMulai:   "07:50",
			JamSelesai: "09:29",
			FakultasID: 1,
		},
		{
			JamMulai:   "08:40",
			JamSelesai: "10:19",
			FakultasID: 1,
		},
		{
			JamMulai:   "08:40",
			JamSelesai: "11:09",
			FakultasID: 1,
		},
		{
			JamMulai:   "09:30",
			JamSelesai: "11:09",
			FakultasID: 1,
		},
		{
			JamMulai:   "09:30",
			JamSelesai: "11:59",
			FakultasID: 1,
		},
		{
			JamMulai:   "10:20",
			JamSelesai: "11:59",
			FakultasID: 1,
		},
		{
			JamMulai:   "12:50",
			JamSelesai: "14:29",
			FakultasID: 1,
		},
		{
			JamMulai:   "12:50",
			JamSelesai: "15:19",
			FakultasID: 1,
		},
		{
			JamMulai:   "14:30",
			JamSelesai: "17:09",
			FakultasID: 1,
		},
		{
			JamMulai:   "15:30",
			JamSelesai: "18:09",
			FakultasID: 1,
		},
		{
			JamMulai:   "16:20",
			JamSelesai: "18:09",
			FakultasID: 1,
		},

		// // Fakultas Teknik
		// {
		// 	JamMulai:   "07:01",
		// 	JamSelesai: "08:00",
		// 	FakultasID: 2,
		// },
		// {
		// 	JamMulai:   "08:01",
		// 	JamSelesai: "09:00",
		// 	FakultasID: 2,
		// },
		// {
		// 	JamMulai:   "09:01",
		// 	JamSelesai: "10:00",
		// 	FakultasID: 2,
		// },
	}

	classes := []model.Kelas{
		// Teknologi Informasi
		// TI - Pemrogram Web Lanjut
		{KodeMatkul: "CIT60039", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F2.2",
			},
		}},
		{KodeMatkul: "CIT60039", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.10",
			},
		}},

		// TI - Pengantar Sistem Operasi
		{KodeMatkul: "CIT62004", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:09",
				RuangKelas: "F2.5",
			},
		}},
		{KodeMatkul: "CIT62004", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F4.12",
			},
		}},
		{KodeMatkul: "CIT62004", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F2.1",
			},
		}},
		{KodeMatkul: "CIT62004", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F3.8",
			},
		}},
		{KodeMatkul: "CIT62004", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F3.11",
			},
		}},

		// TI - Implementasi Dan Evaluasi Sistem Informasi
		{KodeMatkul: "CIT62014", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.13",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F3.6",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.14",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.14",
			},
		}},
		{KodeMatkul: "CIT62014", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.8",
			},
		}},

		// TI - Teknologi Integrasi Sistem
		{KodeMatkul: "CIT62017", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:50",
				JamSelesai: "09:29",
				RuangKelas: "F4.13",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F3.14",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:09",
				RuangKelas: "F2.5",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F2.6",
			},
		}},
		{KodeMatkul: "CIT62017", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F2.4",
			},
		}},

		// TI - Pengantar Big Data
		{KodeMatkul: "CSD60013", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.7",
			},
		}},
		{KodeMatkul: "CSD60013", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F3.15",
			},
		}},

		// TI - Sistem Informasi Geografi
		{KodeMatkul: "CIT60034", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F4.11",
			},
		}},
		{KodeMatkul: "CIT60034", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.3",
			},
		}},

		// TI - Teknologi Berbasis Cloud
		{KodeMatkul: "CIT60036", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.3",
			},
		}},
		{KodeMatkul: "CIT60036", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F2.1",
			},
		}},

		// TI - Sistem Basis Data
		{KodeMatkul: "CIT62005", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.2",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F2.2",
			},
		}},
		{KodeMatkul: "CIT62005", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.8",
			},
		}},
		{KodeMatkul: "CIT62005", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.3",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.7",
			},
		}},
		{KodeMatkul: "CIT62005", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.12",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.3",
			},
		}},
		{KodeMatkul: "CIT62005", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.10",
			},
			{
				Hari:       "Senin",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.6",
			},
		}},

		// TI - Pengembangan Aplikasi Mobile
		{KodeMatkul: "CIT62012", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.9",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.4",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.13",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.1",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.3",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.7",
			},
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIT62012", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.3",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.2",
			},
		}},

		// TI - Administrasi Sistem
		{KodeMatkul: "CIT62015", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.3",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F3.6",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:50",
				JamSelesai: "09:29",
				RuangKelas: "F4.2",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "F4.4",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.4",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.2",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F4.14",
			},
		}},
		{KodeMatkul: "CIT62015", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Senin",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F3.1",
			},
		}},

		// TI - Arsitektur Dan Protokol Internet
		{KodeMatkul: "CIT62016", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.3",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F2.1",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "F3.9",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.3",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F4.6",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F2.5",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIT62016", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "15:30",
				JamSelesai: "17:09",
				RuangKelas: "F4.5",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.3",
			},
		}},

		// TI - Dasar Desain Antarmuka Pengguna
		{KodeMatkul: "CIT62001", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.14",
			},
		}},
		{KodeMatkul: "CIT62001", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.12",
			},
		}},
		{KodeMatkul: "CIT62001", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.14",
			},
		}},
		{KodeMatkul: "CIT62001", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.17",
			},
		}},
		{KodeMatkul: "CIT62001", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.3",
			},
		}},

		// TI - Tata Kelola Teknologi Informasi
		{KodeMatkul: "CIT62013", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F2.2",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.6",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.16",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.11",
			},
		}},
		{KodeMatkul: "CIT62013", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F2.5",
			},
		}},

		// TI - Keamanan Informasi
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
				Hari:       "Senin",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F2.4",
			},
		}},
		{KodeMatkul: "CIT62018", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.12",
			},
		}},
		{KodeMatkul: "CIT62018", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.11",
			},
		}},
		{KodeMatkul: "CIT62018", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.2",
			},
		}},

		// TI - Pemrograman Lanjut
		{KodeMatkul: "CIT62002", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F4.7",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.13",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIT62002", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.16",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.4",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F4.13",
			},
		}},
		{KodeMatkul: "CIT62002", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "09:30",
				JamSelesai: "11:09",
				RuangKelas: "G1.4",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F2.9",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F4.12",
			},
		}},
		{KodeMatkul: "CIT62002", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:09",
				RuangKelas: "F4.6",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.4",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.2",
			},
		}},
		{KodeMatkul: "CIT62002", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.4",
			},
			{
				Hari:       "Senin",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.3",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "F4.7",
			},
		}},

		// TI - Manajemen Proyek Teknologi Informasi
		{KodeMatkul: "CIT60031", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F2.6",
			},
		}},
		{KodeMatkul: "CIT60031", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.5",
			},
		}},

		// TI - Sistem Forensik Digital
		{KodeMatkul: "CIT60033", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F2.6",
			},
		}},
		{KodeMatkul: "CIT60033", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F3.6",
			},
		}},

		// TI - Basis Data Terdistribusi
		{KodeMatkul: "CIT60024", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F2.5",
			},
		}},
		{KodeMatkul: "CIT60024", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.11",
			},
		}},

		// TI - Dasar Pengembangan Sistem Informasi
		{KodeMatkul: "CIT62003", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F3.17",
			},
		}},
		{KodeMatkul: "CIT62003", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.6",
			},
		}},
		{KodeMatkul: "CIT62003", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "15:30",
				JamSelesai: "17:09",
				RuangKelas: "F3.13",
			},
		}},
		{KodeMatkul: "CIT62003", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.17",
			},
		}},
		{KodeMatkul: "CIT62003", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "15:30",
				JamSelesai: "17:09",
				RuangKelas: "F3.10",
			},
		}},

		// Teknik Informatika
		// Pemrograman Web
		{KodeMatkul: "CIF62015", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F2.1",
			},
		}},
		{KodeMatkul: "CIF62015", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.14",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIF62015", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.10",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.4",
			},
		}},
		{KodeMatkul: "CIF62015", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F3.15",
			},
		}},
		{KodeMatkul: "CIF62015", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.2",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.5",
			},
		}},
		{KodeMatkul: "CIF62015", Nama: "F", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F3.9",
			},
		}},
		{KodeMatkul: "CIF62015", Nama: "G", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.2",
			},
		}},

		// Sistem Multimedia
		{KodeMatkul: "CIF62014", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.11",
			},
		}},
		{KodeMatkul: "CIF62014", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.12",
			},
		}},
		{KodeMatkul: "CIF62014", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.2",
			},
		}},
		{KodeMatkul: "CIF62014", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.5",
			},
		}},
		{KodeMatkul: "CIF62014", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "14:30",
				JamSelesai: "17:09",
				RuangKelas: "F4.3",
			},
		}},
		{KodeMatkul: "CIF62014", Nama: "F", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:50",
				JamSelesai: "10:19",
				RuangKelas: "F3.3",
			},
		}},
		{KodeMatkul: "CIF62014", Nama: "G", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F4.5",
			},
		}},

		// Keamanan Informasi
		{KodeMatkul: "CIF62013", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.3",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.9",
			},
		}},
		{KodeMatkul: "CIF62013", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.3",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.3",
			},
		}},
		{KodeMatkul: "CIF62013", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.10",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.3",
			},
		}},
		{KodeMatkul: "CIF62013", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F4.6",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.5",
			},
		}},
		{KodeMatkul: "CIF62013", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIF62013", Nama: "F", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F4.4",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIF62013", Nama: "G", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F3.6",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.2",
			},
		}},

		// Pengantar Pembelajaran Mesin
		{KodeMatkul: "CIF62017", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "15:30",
				JamSelesai: "18:09",
				RuangKelas: "F3.16",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.5",
			},
		}},
		{KodeMatkul: "CIF62017", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "08:40",
				JamSelesai: "11:09",
				RuangKelas: "F3.17",
			},
		}},
		{KodeMatkul: "CIF62017", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.12",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIF62017", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "09:30",
				JamSelesai: "11:59",
				RuangKelas: "F2.1",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIF62017", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F3.3",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIF62017", Nama: "F", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "15:19",
				RuangKelas: "F4.10",
			},
		}},
		{KodeMatkul: "CIF62017", Nama: "G", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "09:29",
				RuangKelas: "F4.12",
			},
		}},

		// Analisis Dan Perancangan Sistem
		{KodeMatkul: "CIF62016", Nama: "A", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Rabu",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F2.5",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "08:40",
				JamSelesai: "10:19",
				RuangKelas: "G1.3",
			},
			{
				Hari:       "Jumat",
				JamMulai:   "09:30",
				JamSelesai: "11:09",
				RuangKelas: "F4.2",
			},
		}},
		{KodeMatkul: "CIF62016", Nama: "B", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F2.6",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "16:20",
				JamSelesai: "18:09",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F4.10",
			},
		}},
		{KodeMatkul: "CIF62016", Nama: "C", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "G1.4",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.8",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "07:00",
				JamSelesai: "08:39",
				RuangKelas: "F3.11",
			},
		}},
		{KodeMatkul: "CIF62016", Nama: "D", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Selasa",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F3.4",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "F3.2",
			},
		}},
		{KodeMatkul: "CIF62016", Nama: "E", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "F3.8",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F4.13",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "G1.2",
			},
		}},
		{KodeMatkul: "CIF62016", Nama: "F", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F2.8",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "F4.14",
			},
			{
				Hari:       "Kamis",
				JamMulai:   "10:20",
				JamSelesai: "11:59",
				RuangKelas: "G1.6",
			},
		}},
		{KodeMatkul: "CIF62016", Nama: "G", JadwalKelas: []model.JadwalKelas{
			{
				Hari:       "Senin",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "G1.6",
			},
			{
				Hari:       "Selasa",
				JamMulai:   "12:50",
				JamSelesai: "14:29",
				RuangKelas: "F2.6",
			},
			{
				Hari:       "Rabu",
				JamMulai:   "14:30",
				JamSelesai: "16:19",
				RuangKelas: "F2.8",
			},
		}},
	}

	for _, f := range fakultas {
		database.Create(&f)
	}

	for _, prodi := range prodis {
		database.Create(&prodi)
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
	var matkuUserTi []model.Matkul
	// var matkuUserTif []model.Matkul
	var userTi model.User
	// var userTif model.User

	database.First(&userTi, 2)
	database.Find(&matkuUserTi, []int{1, 2, 3, 4, 5})

	// database.First(&userTif, 3)
	// database.Find(&matkuUserTif, []int{17, 18})

	userTi.Matkuls = matkuUserTi
	// userTif.Matkuls = matkuUserTif

	database.Model(&userTi).Updates(&userTi)
	// database.Model(&userTif).Updates(&userTif)
}
