package response

import "web-krs/model"

type (
	MatkulResponse struct {
		KodeMatkul     string `json:"kode_matkul"`
		Nama           string `json:"nama"`
		TahunKurikulum int16  `json:"tahun_kurikulum"`
		Sks            int8   `json:"sks"`
	}

	MatkulResponseDetail struct {
		KodeMatkul     string `json:"kode_matkul"`
		Nama           string `json:"nama"`
		TahunKurikulum int16  `json:"tahun_kurikulum"`
		Sks            int8   `json:"sks"`
		Kelas          struct {
			Nama       string `json:"nama"`
			RuangKelas string `json:"ruang_kelas"`
			Hari       string `json:"hari"`
			JamMulai   string `json:"jam_mulai"`
			JamSelesai string `json:"jam_selesai"`
		} `json:"kelas"`
	}
)

func ConvertToMatkulResponse(m model.Matkul) MatkulResponse {
	return MatkulResponse{
		KodeMatkul: m.KodeMatkul,
		Nama: m.Nama,
		TahunKurikulum: m.TahunKurikulum,
		Sks: m.Sks,
	}
}

func ConvertToMatkulResponseDetail(m model.Matkul) MatkulResponseDetail {

	return MatkulResponseDetail{
		KodeMatkul: m.KodeMatkul,
		Nama: m.Nama,
		TahunKurikulum: m.TahunKurikulum,
		Sks: m.Sks,
		Kelas: struct {
			Nama       string `json:"nama"`
			RuangKelas string `json:"ruang_kelas"`
			Hari       string `json:"hari"`
			JamMulai   string `json:"jam_mulai"`
			JamSelesai string `json:"jam_selesai"`
		}{
		},
	}
}