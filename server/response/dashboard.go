package response

import "web-krs/model"

type DashboardResponse struct {
	Email        string `json:"email"`
	Nama         string `json:"nama"`
	Nim          string `json:"nim"`
	Image        string `json:"image"`
	ProgramStudi struct {
		ID     uint           `json:"id"`
		Nama   string         `json:"nama"`
		Matkul []model.Matkul `json:"prodi_matkul"`
	}
	UserPlan []PlanResponse
}

func ConvertToDashboardResponse(u *model.User, plans []PlanResponse) DashboardResponse {
	return DashboardResponse{
		Nim:   u.Nim,
		Nama:  u.Nama,
		Email: u.Email,
		Image: u.Image,
		ProgramStudi: struct {
			ID     uint           `json:"id"`
			Nama   string         `json:"nama"`
			Matkul []model.Matkul `json:"prodi_matkul"`
		}{
			ID:     u.ProgramStudiID,
			Nama:   u.ProgramStudi.Nama,
			Matkul: u.ProgramStudi.Matkuls,
		},
		UserPlan: plans,
	}

}
