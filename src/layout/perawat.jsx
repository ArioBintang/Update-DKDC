// src/layout/perawat.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

import Footer from "../components/footer";
import SidebarPerawat from "../components/perawat/sidebar";
import HeroPerawat from "../components/perawat/hero";

function PerawatLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pasienList, setPasienList] = useState([]);

  useEffect(() => {
    console.log("AccessToken di PerawatLayout:", localStorage.getItem("accessToken"));
    console.log("UserInfo di PerawatLayout:", localStorage.getItem("userInfo"));
    fetchPasien();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPasien = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/pasien");
      // asumsi API mengembalikan array pasien
      setPasienList(res.data);
    } catch (err) {
      console.error("Error fetch pasien:", err);
    }
  };

  const addPasien = async (data) => {
    try {
      const payload = {
        nomor_rekam_medis: data.nomorRekam || null,
        nama_lengkap: data.nama,
        tanggal_lahir: data.tanggalLahir,
        jenis_kelamin: data.jenisKelamin,
        nomor_telepon: data.telepon,
        alamat: data.alamat,
        email: data.email,
        riwayat_alergi: data.alergi,
      };

      const res = await axios.post("http://localhost:8000/api/pasien", payload);

      // jika backend mengembalikan record baru, tambahkan ke state
      const created = res.data;
      setPasienList((prev) => [...prev, created]);

      return created;
    } catch (err) {
      console.error("Error addPasien:", err);
      throw err;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8f8]">
      <SidebarPerawat isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <HeroPerawat />

        {/* Outlet: nested routes akan dirender di sini */}
        {/* Kita juga kirimkan context supaya child dapat memanggil addPasien / akses pasienList */}
        <main className="p-6">
          <Outlet context={{ addPasien, pasienList, refreshPasien: fetchPasien, isCollapsed, setIsCollapsed }} />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PerawatLayout;
