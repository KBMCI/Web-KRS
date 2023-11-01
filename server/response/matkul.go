package response

import "web-krs/model"

type (
	MatkulResponse struct {
		KodeMatkul     string `json:"kode_matkul"`
		ProgramStudi   uint   `json:"id_program_studi"`
		Nama           string `json:"nama"`
		TahunKurikulum int16  `json:"tahun_kurikulum"`
		Sks            int8   `json:"sks"`
	}
)

func ConvertToMatkulResponse(m model.Matkul) MatkulResponse {
	return MatkulResponse{
		KodeMatkul:     m.Kode,
		ProgramStudi:   m.ProgramStudiID,
		Nama:           m.Nama,
		TahunKurikulum: m.TahunKurikulum,
		Sks:            m.Sks,
	}
}
