package response

import "web-krs/model"

type (
	JamKelasResponse struct {
		ID                       uint                     `json:"id"`
		JamMulai                 string                   `json:"jam_mulai"`
		JamSelesai               string                   `json:"jam_selesai"`
		FakultasJamKelasResponse FakultasJamKelasResponse `json:"fakultas"`
	}

	FakultasJamKelasResponse struct {
		ID   uint   `json:"id"`
		Nama string `json:"nama"`
	}
)

func ConvertToJamKelasResponse(j *model.JamKelas) JamKelasResponse {
	return JamKelasResponse{
		ID:         j.ID,
		JamMulai:   j.JamMulai,
		JamSelesai: j.JamSelesai,
		FakultasJamKelasResponse: FakultasJamKelasResponse{
			ID:   j.Fakultas.ID,
			Nama: j.Fakultas.Nama,
		},
	}
}
