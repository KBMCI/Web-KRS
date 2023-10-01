package response

import "web-krs/model"

type (
	JamKelasResponse struct {
		Jam string `json:"jam"`
		Senin string `json:"senin"`
		Selasa string `json:"selasa"`
		Rabu string `json:"rabu"`
		Kamis string `json:"kamis"`
		Jumat string `json:"jumat"`
	
	}
)

func ConvertToJamKelasResponse(j *model.JamKelas) JamKelasResponse {
	return JamKelasResponse{
		Jam:    j.JamMulai + " - " + j.JamSelesai,
		Senin:  "",
		Selasa: "",
		Rabu:   "",
		Kamis:  "",
		Jumat:  "",
	}
}