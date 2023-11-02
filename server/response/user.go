package response

import "web-krs/model"

type (
	UserResponse struct {
		ID           uint           `json:"id"`
		Email        string         `json:"email"`
		Nama         string         `json:"nama"`
		Nim          string         `json:"nim"`
		Password     string         `json:"password"`
		Role         string         `json:"role"`
		Image        string         `json:"image"`
		Matkuls      []model.Matkul `json:"matkuls"`
		ProgramStudi ProgramStudiUserResponse `json:"program_studi"`
	}

	ProgramStudiUserResponse struct {
		ID   uint   `json:"id_program_studi"`
		Nama string `json:"nama"`
		Fakultas FakultasUserResponse `json:"fakultas"`
	}

	FakultasUserResponse struct {
		ID   uint   `json:"id_fakultas"`
		Nama string `json:"nama"`
	}
)

func ConvertToUserResponse(u *model.User) UserResponse {
	return UserResponse{
		ID:           u.ID,
		Nim:          u.Nim,
		Nama:         u.Nama,
		Email:        u.Email,
		Password:     u.Password,
		Role:         u.Role,
		Image:        u.Image,
		Matkuls:      u.Matkuls,
		ProgramStudi: ProgramStudiUserResponse{
			ID:       u.ProgramStudiID,
			Nama:     u.ProgramStudi.Nama,
			Fakultas: FakultasUserResponse{
				ID:   u.ProgramStudi.FakultasID,
				Nama: u.ProgramStudi.Fakultas.Nama,
			},
		},
	}
}
