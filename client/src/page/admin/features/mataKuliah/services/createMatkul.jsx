import { url } from "../../../../../api/url";

const createMatkul = async (token, matkul) => {
  try {
    const result = await url
      .post(
        "/matkul",
        {
          kode_matkul: matkul.kode_matkul,
          nama: matkul.nama,
          tahun_kurikulum: parseInt(matkul.tahun_kurikulum),
          sks: parseInt(matkul.sks),
          id_program_studi: parseInt(matkul.id_program_studi),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        return result;
      })
      .catch((result) => {
        return result;
      });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { createMatkul };
