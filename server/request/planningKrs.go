package request

type (
	SuggestionRequest struct {
		IdKelas     []uint `json:"id_kelas" binding:"required"`
	}
)