package request

type (
	JamKelasRequest struct {
		JamMulai   string `json:"jam_mulai" binding:"required"`
		JamSelesai string `json:"jam_selesai" binding:"required"`
	}
)