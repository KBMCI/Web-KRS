package response

import "web-krs/model"

type (

	KelasResponse struct {
		ID         uint   `json:"id"`
		KodeMatkul string `json:"kode_matkul"`
		Nama       string `json:"nama"`
		RuangKelas string `json:"ruang_kelas"`
		Hari       string `json:"hari"`
		JamMulai   string `json:"jam_mulai"`
		JamSelesai string `json:"jam_selesai"`
	}

	KelasResponseDetail struct {
		ID         uint   `json:"id"`
		Nama       string `json:"nama"`
		RuangKelas string `json:"ruang_kelas"`
		Hari       string `json:"hari"`
		JamMulai   string `json:"jam_mulai"`
		JamSelesai string `json:"jam_selesai"`
		Matkul     struct {
			KodeMatkul     string `json:"kode_matkul"`
			Nama           string `json:"nama"`
			TahunKurikulum int16  `json:"tahun_kurikulum"`
			Sks            int8   `json:"sks"`
		} `json:"matkul"`
	}
)

func ConvertToKelasResponse(k model.Kelas) KelasResponse {
	return KelasResponse{
		ID: k.ID,
		KodeMatkul: k.KodeMatkul,
		Nama: k.Nama,
		RuangKelas: k.RuangKelas,
		Hari: k.Hari,
		JamMulai: k.JamMulai,
		JamSelesai: k.JamSelesai,
	}
}

func ConvertToKelasResponseDetail(k model.Kelas) KelasResponseDetail {
	return KelasResponseDetail{
		ID:         k.ID,
		Nama:       k.Nama,
		RuangKelas: k.RuangKelas,
		Hari:       k.Hari,
		JamMulai:   k.JamMulai,
		JamSelesai: k.JamSelesai,
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
	}
}