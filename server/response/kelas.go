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
)

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
