package response

import "web-krs/model"

type UserResponse struct {
	ID           uint `json:"id"`
	Email    string         `json:"email"`
	Nama     string         `json:"nama"`
	Nim      string         `json:"nim"`
	Password string         `json:"password"`
	Role     string         `json:"role"`
	Image    string         `json:"image"`
	ProgramStudi struct {
		ID     uint           `json:"id"`
		Nama   string         `json:"nama"`
		Matkul []model.Matkul `json:"prodi_matkul"`
	}
	Matkuls  []model.Matkul `json:"matkuls"`
}

func ConvertToUserResponse(u *model.User) UserResponse {
	return UserResponse{
		ID: u.ID,
		Nim:      u.Nim,
		Nama:     u.Nama,
		Email:    u.Email,
		Password: u.Password,
		Role:     u.Role,
		Image:    u.Image,
		ProgramStudi: struct {
			ID     uint           `json:"id"`
			Nama   string         `json:"nama"`
			Matkul []model.Matkul `json:"prodi_matkul"`
		}{
			ID:     u.ProgramStudiID,
			Nama:   u.ProgramStudi.Nama,
			Matkul: u.ProgramStudi.Matkuls,
		},
		Matkuls:  u.Matkuls,
	}
}
