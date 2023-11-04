package response

import "web-krs/model"

type (
	UserResponse struct {
		ID           uint                     `json:"id"`
		Email        string                   `json:"email"`
		Nama         string                   `json:"nama"`
		Nim          string                   `json:"nim"`
		Password     string                   `json:"password"`
		Role         string                   `json:"role"`
		Image        string                   `json:"image"`
		Matkuls      []MatkulUserResponse     `json:"matkuls"`
		ProgramStudi ProgramStudiUserResponse `json:"program_studi"`
	}

	ProgramStudiUserResponse struct {
		ID       uint                 `json:"id_program_studi"`
		Nama     string               `json:"nama"`
		Fakultas FakultasUserResponse `json:"fakultas"`
	}

	FakultasUserResponse struct {
		ID   uint   `json:"id_fakultas"`
		Nama string `json:"nama"`
	}

	MatkulUserResponse struct {
		ID             uint                `json:"id"`
		Kode           string              `json:"kode_matkul"`
		Nama           string              `json:"nama"`
		TahunKurikulum int16               `json:"tahun_kurikulum"`
		Sks            int8                `json:"sks"`
		Kelas          []KelasUserResponse `json:"kelas"`
	}

	KelasUserResponse struct {
		ID          uint                      `json:"id"`
		Nama        string                    `json:"nama"`
		JadwalKelas []JadwalKelasUserResponse `json:"jadwal_kelas"`
	}

	JadwalKelasUserResponse struct {
		ID         uint   `json:"id"`
		Hari       string `json:"hari"`
		JamMulai   string `json:"jam_mulai"`
		JamSelesai string `json:"jam_selesai"`
		RuangKelas string `json:"ruang_kelas"`
	}
)

func ConvertToUserResponse(u *model.User) UserResponse {
	matkuls := []MatkulUserResponse{}
	for _, matkul := range u.Matkuls {
		kelass := []KelasUserResponse{}

		for _, kelas := range matkul.Kelas {
			jadwalKelass := []JadwalKelasUserResponse{}

			for _, jadwalKelas := range kelas.JadwalKelas {
				jadwalKelass = append(jadwalKelass, JadwalKelasUserResponse{
					ID:         jadwalKelas.ID,
					Hari:       jadwalKelas.Hari,
					JamMulai:   jadwalKelas.JamMulai,
					JamSelesai: jadwalKelas.JamSelesai,
					RuangKelas: jadwalKelas.RuangKelas,
				})
			}

			kelass = append(kelass, KelasUserResponse{
				ID:          kelas.ID,
				Nama:        kelas.Nama,
				JadwalKelas: jadwalKelass,
			})
		}

		matkuls = append(matkuls, MatkulUserResponse{
			ID:             matkul.ID,
			Nama:           matkul.Nama,
			Kode:           matkul.Kode,
			TahunKurikulum: matkul.TahunKurikulum,
			Sks:            matkul.Sks,
			Kelas:          kelass,
		})
	}

	return UserResponse{
		ID:       u.ID,
		Nim:      u.Nim,
		Nama:     u.Nama,
		Email:    u.Email,
		Password: u.Password,
		Role:     u.Role,
		Image:    u.Image,
		Matkuls:  matkuls,
		ProgramStudi: ProgramStudiUserResponse{
			ID:   u.ProgramStudiID,
			Nama: u.ProgramStudi.Nama,
			Fakultas: FakultasUserResponse{
				ID:   u.ProgramStudi.FakultasID,
				Nama: u.ProgramStudi.Fakultas.Nama,
			},
		},
	}
}
