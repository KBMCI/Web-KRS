package request

type (
	KelasRequest struct {
		KodeMatkul string `json:"kode_matkul" binding:"required"`
		Nama       string `json:"nama" binding:"required"`
		RuangKelas string `json:"ruang_kelas" binding:"required"`
		Hari       string `json:"hari" binding:"required"`
		JamMulai   string `json:"jam_mulai" binding:"required"`
		JamSelesai string `json:"jam_selesai" binding:"required"`
	}
)