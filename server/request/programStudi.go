package request

type (
	ProgramStudiRequest struct {
		Nama       string `json:"nama" binding:"required"`
		FakultasID uint   `json:"id_fakultas" binding:"required"`
	}
)