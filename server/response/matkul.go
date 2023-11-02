package response

import "web-krs/model"

type (
	MatkulResponse struct {
		ID             uint                       `json:"id"`
		KodeMatkul     string                     `json:"kode_matkul"`
		Nama           string                     `json:"nama"`
		TahunKurikulum int16                      `json:"tahun_kurikulum"`
		Sks            int8                       `json:"sks"`
		ProgramStudi   ProgramStudiMatkulResponse `json:"program_studi"`
	}

	ProgramStudiMatkulResponse struct {
		ID   uint   `json:"id_program_studi"`
		Nama string `json:"nama"`
	}
)

func ConvertToMatkulResponse(m model.Matkul) MatkulResponse {
	return MatkulResponse{
		ID:             m.ID,
		KodeMatkul:     m.Kode,
		Nama:           m.Nama,
		TahunKurikulum: m.TahunKurikulum,
		Sks:            m.Sks,
		ProgramStudi: ProgramStudiMatkulResponse{
			ID:   m.ProgramStudiID,
			Nama: m.ProgramStudi.Nama,
		},
	}
}
