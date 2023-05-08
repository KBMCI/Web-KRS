package response

import "web-krs/model"

type (
	PlanResponse struct {
		ID    uint                  `json:"id"`
		Kelas []KelasResponseDetail `json:"kelas"`
	}
)

func ConvertToPlanResponse(plan model.Plan) PlanResponse {
	var kelas []KelasResponseDetail

	for _, k := range plan.Kelas {
		kelas = append(kelas, ConvertToKelasResponseDetail(*k))
	}

	return PlanResponse{
		ID:    plan.ID,
		Kelas: kelas,
	}
}