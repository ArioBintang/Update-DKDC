import { API } from "../_api";


// Fungsi untuk menambahkan dokter baru
export const addDokter = async (payload) => {
    const {data} = await API.post("/dokter", payload,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return data.data;
};




// Bisa ditambahkan fungsi lain, misal getDokter, updateDokter, deleteDokter
export const getDokter = async () => {
    const {data} = await API.get("/dokter",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return data;
};


