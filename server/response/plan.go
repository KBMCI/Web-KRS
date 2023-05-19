package response

import "web-krs/model"

type (
	PlanResponse struct {
		ID    uint              `json:"id"`
		Plan []model.RandomKrs `json:"plan"`
	}
)

func ConvertToPlanResponse(plan model.Plan) PlanResponse {
	var kelas []model.RandomKrs

	for _, k := range plan.Kelas {
		kelas = append(kelas, ConvertFormatKelasToRandomKrs(&k.Matkul, *k))
	}

	return PlanResponse{
		ID:    plan.ID,
		Plan: kelas,
	}
}

func ConvertFormatKelasToRandomKrs(matkul *model.Matkul, kelas model.Kelas) model.RandomKrs {
	return model.RandomKrs{
		ID:          kelas.ID,
		NamaMatkul:  matkul.Nama,
		NamaKelas:   kelas.Nama,
		JadwalKelas: kelas.JadwalKelas,
	}
}