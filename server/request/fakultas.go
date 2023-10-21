package request

type (
	FakultasRequest struct {
		Nama string `json:"nama" binding:"required"`
	}
)
