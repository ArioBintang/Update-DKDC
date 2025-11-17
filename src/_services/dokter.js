import { API } from "../_api";

export const addDokter = async (payload) => {
    const {data} = await API.post("/dokter", payload,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return data.data;
};

export const getDokter = async () => {
    const {data} = await API.get("/dokter",{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
    return data;
};

export const updateDokter = async (id, payload) => {
    const { data } = await API.put(`/dokter/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  
    return data;
  };
  
  export const deleteDokter = async (id) => {
    const { data } = await API.delete(`/dokter/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  
    return data;
  };
