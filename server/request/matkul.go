package request

type (
	MatkulRequest struct {
		ID             string `json:"kode_matkul"`
		Nama           string `json:"nama" binding:"required"`
		TahunKurikulum int16  `json:"tahun_kurikulum" binding:"required,number"`
		Sks            int8   `json:"sks" binding:"required,number"`
	}
)