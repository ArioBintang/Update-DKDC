import React, { useState } from "react";
import SidebarPerawat from "../../components/perawat/sidebar";
import { addDokter } from "../../_services/dokter";

export default function FormDokter() {
  const [form, setForm] = useState({
    user_id: "",
    nomor_str: "",
    nama_lengkap: "",
    spesialisasi: "",
    nomor_telepon: "",
    email: "",
    status_aktif: "",
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload wajib sesuai tabel backend
    const payload = {
      user_id: form.user_id,
      nomor_str: form.nomor_str,
      nama_lengkap: form.nama_lengkap,
      spesialisasi: form.spesialisasi,
      nomor_telepon: form.nomor_telepon,
      email: form.email,
      status_aktif: form.status_aktif,
    };

    try {
      await addDokter(payload);
      alert("Data dokter berhasil ditambahkan!");
      window.location.href = "/dataDokter"; 
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data dokter");
    }
  };

  const handleReset = () => {
    setForm({
      user_id: "",
      nomor_str: "",
      nama_lengkap: "",
      spesialisasi: "",
      nomor_telepon: "",
      email: "",
      status_aktif: "",
    });
  };

  return (
    <div className="flex bg-white dark:bg-gray-900 min-h-screen">
      <SidebarPerawat isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className={`flex-1 transition-all duration-300 p-5 ${
        isCollapsed ? "ml-16" : "ml-64"
      }`}>
        <section className="flex-1 px-6 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-[#e0d9b6] p-8">
            <h2 className="mb-6 text-2xl font-bold text-[#3d342b]">
              Form Dokter
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6 sm:grid-cols-2">

              

                {/* USER ID */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    User ID
                  </label>
                  <input
                    type="text"
                    name="user_id"
                    value={form.user_id}
                    onChange={handleChange}
                    placeholder="Contoh: 001"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Nama Lengkap */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Nama Lengkap
                  </label>
                  <input
                    name="nama_lengkap"
                    value={form.nama_lengkap}
                    onChange={handleChange}
                    placeholder="contoh: Hippocrates"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Nomor STR */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Nomor STR
                  </label>
                  <input
                    type="text"
                    name="nomor_str"
                    value={form.nomor_str}
                    onChange={handleChange}
                    placeholder="1821XXXXXXXXXX"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Spesialisasi */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Spesialisasi
                  </label>
                  <input
                    name="spesialisasi"
                    value={form.spesialisasi}
                    onChange={handleChange}
                    placeholder="Contoh: umum"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Nomor Telepon */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="nomor_telepon"
                    value={form.nomor_telepon}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-semibold text-[#3d342b]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email@example.com"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>

                {/* Status Aktif */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Status Aktif
                  </label>
                  <input
                    name="status_aktif"
                    value={form.status_aktif}
                    onChange={handleChange}
                    placeholder="Contoh: Aktif / Tidak Aktif"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg block w-full p-2.5"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-[#b49b50] hover:bg-[#a38742] rounded-lg text-sm px-5 py-2.5"
                >
                  Upload
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded-lg text-sm px-5 py-2.5"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
