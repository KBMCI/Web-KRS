package request

type (
	PlanRequest struct{
		IdKelas []uint `json:"id_kelas" binding:"required"`
	}
)