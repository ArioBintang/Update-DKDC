import { API } from "../_api";
export const addRekamMedis = async (payload) => {

  const { data } = await API.post("/rekam-medis", payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};

export const getRekamMedis = async () => {
  const { data } = await API.get("/rekam-medis", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};

export const getRekamMedisById = async (id) => {
  const { data } = await API.get(`/rekam-medis/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};

export const updateRekamMedis = async (id, payload) => {  
  const { data } = await API.put(`/rekam-medis/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;  
};

export const deleteRekamMedis = async (id) => {
  const { data } = await API.delete(`/rekam-medis/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return data;
};
