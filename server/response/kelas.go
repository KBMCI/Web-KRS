package response

import "web-krs/model"

type (
	KelasResponse struct {
		ID          uint                `json:"id"`
		KodeMatkul  string              `json:"kode_matkul"`
		Nama        string              `json:"nama"`
		JadwalKelas []model.JadwalKelas `json:"jadwal_kelas"`
	}

	KelasResponseDetail struct {
		ID     uint   `json:"id"`
		Nama   string `json:"nama"`
		Matkul struct {
			KodeMatkul     string `json:"kode_matkul"`
			Nama           string `json:"nama"`
			TahunKurikulum int16  `json:"tahun_kurikulum"`
			Sks            int8   `json:"sks"`
		} `json:"matkul"`
		JadwalKelas []model.JadwalKelas `json:"jadwal_kelas"`
	}

	JadwalResponseDetail struct {
		ID uint `json:"id"`
		Hari       string `json:"hari"`
		JamMulai   string `json:"jam_mulai"`
		JamSelesai string `json:"jam_selesai"`
		RuangKelas string `json:"ruang_kelas"`
		Kelas 	   struct {
			ID 			uint   `json:"id_kelas"`
			Nama        string `json:"nama"`
			Matkul		struct {
				Kode			string `json:"kode_matkul"`
				Nama 			string `json:"nama"`
			} `json:"matkul"`
		}`json:"kelas"`
	}
)

func ConvertToJadwalResponse(j model.JadwalKelas) JadwalResponseDetail {
	return JadwalResponseDetail{
		ID: j.ID,
		Hari: j.Hari,
		JamMulai: j.JamMulai,
		JamSelesai: j.JamSelesai,
		RuangKelas: j.JamSelesai,
		Kelas: struct {
			ID uint `json:"id_kelas"`
			Nama string `json:"nama"` 
			Matkul struct {
				Kode string `json:"kode_matkul"`
				Nama string `json:"nama"`
			} `json:"matkul"`
		}{
			ID: j.IDKelas,
			Nama: j.Kelas.Nama,
			Matkul: struct{
				Kode string `json:"kode_matkul"`
				Nama string `json:"nama"`
			}{
				Kode: j.Kelas.Matkul.Kode,
				Nama: j.Kelas.Matkul.Nama,				
			},
		},
	}
}

func ConvertToKelasResponse(k model.Kelas) KelasResponse {
	return KelasResponse{
		ID:          k.ID,
		KodeMatkul:  k.KodeMatkul,
		Nama:        k.Nama,
		JadwalKelas: k.JadwalKelas,
	}
}

func ConvertToKelasResponseDetail(k model.Kelas) KelasResponseDetail {
	return KelasResponseDetail{
		ID:   k.ID,
		Nama: k.Nama,
		Matkul: struct {
			KodeMatkul     string `json:"kode_matkul"`
			Nama           string `json:"nama"`
			TahunKurikulum int16  `json:"tahun_kurikulum"`
			Sks            int8   `json:"sks"`
		}{
			KodeMatkul:     k.KodeMatkul,
			Nama:           k.Matkul.Nama,
			TahunKurikulum: k.Matkul.TahunKurikulum,
			Sks:            k.Matkul.Sks,
		},
		JadwalKelas: k.JadwalKelas,
	}
}
