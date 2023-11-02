package response

import "web-krs/model"

type (
	JamKelasFakultasResponse struct {
		ID                    uint                  `json:"id"`
		Nama                  string                `json:"nama"`
		JamKelasTableResponse []JamKelasTableResponse `json:"jam-kelas"`
	}
	JamKelasTableResponse struct {
		ID     uint   `json:"id_jam_kelas"`
		Jam    string `json:"jam"`
		Senin  string `json:"senin"`
		Selasa string `json:"selasa"`
		Rabu   string `json:"rabu"`
		Kamis  string `json:"kamis"`
		Jumat  string `json:"jumat"`
	}
)

func ConvertToJamKelasFakultasResponsea(j *model.Fakultas) JamKelasFakultasResponse {
	jamKelas := []JamKelasTableResponse{}
	for _, jk := range j.JamKelas {
		jamKelas = append(jamKelas, convertJamKelasTableResponse(&jk))
	}

	return JamKelasFakultasResponse{
		ID:   j.ID,
		Nama: j.Nama,
		JamKelasTableResponse: jamKelas,
	}
}

func convertJamKelasTableResponse(j *model.JamKelas) JamKelasTableResponse {
	return JamKelasTableResponse{
		ID:     j.ID,
		Jam:    j.JamMulai + " - " + j.JamSelesai,
		Senin:  "",
		Selasa: "",
		Rabu:   "",
		Kamis:  "",
		Jumat:  "",
	}
}
