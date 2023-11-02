package response

import "web-krs/model"

type (
	ProdiResponseDetail struct {
		ID       uint   `json:"id"`
		Nama     string `json:"nama"`
		Fakultas struct {
			ID   uint   `json:"id_fakultas"`
			Nama string `json:"nama"`
		} `json:"fakultas"`
	}
)

func ConvertToProdiResponseDetail(p model.ProgramStudi) ProdiResponseDetail {
	return ProdiResponseDetail{
		ID: p.ID,
		Nama: p.Nama,
		Fakultas: struct {
			ID   uint   `json:"id_fakultas"`
			Nama string `json:"nama"`
		}{
			ID:   p.Fakultas.ID,
			Nama: p.Fakultas.Nama,
		},
	}
}
