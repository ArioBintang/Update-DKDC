  import React, { useState } from "react";
  import { addPasien } from "../../_services/pasien";
  import SidebarPerawat from "../../components/perawat/sidebar";

  export default function FormPasien() {
    const [form, setForm] = useState({
      nomor_rekam_medis: "",
      nama_lengkap: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      nomor_telepon: "",
      alamat: "",
      email: "",
      riwayat_alergi: "",
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
      try {
        await addPasien(form);
        alert("Data pasien berhasil ditambahkan!");
        window.location.href = "/datapasien"; // redirect
      } catch (err) {
        console.error(err);
        alert("Gagal menyimpan data pasien");
      }
    };

    const handleReset = () => {
  setForm({
    nomor_rekam_medis: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    nomor_telepon: "",
    alamat: "",
    email: "",
    riwayat_alergi: "",
    tanggalDibuat: ""
  });
};

    return (
      <div className="flex bg-white dark:bg-gray-900 min-h-screen">
        {/* Sidebar */}
        <SidebarPerawat isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Content */}
        <div
          className={`flex-1 transition-all duration-300 p-5 ${
            isCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <section className="flex-1 px-6 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-[#e0d9b6] p-8">
            <h2 className="mb-6 text-2xl font-bold text-[#3d342b]">
              Form Pasien
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6 sm:grid-cols-2">
                {/* Nomor Rekam Medis */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="nomor_rekam_medis"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nomor Rekam Medis
                  </label>
                  <input
                    type="text"
                    id="nomor_rekam_medis"
                    name="nomor_rekam_medis"
                    value={form.nomor_rekam_medis}
                    onChange={handleChange}
                    placeholder="Nomor Rekam Medis"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Nama Lengkap */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="nama_lengkap"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama_lengkap"
                    name="nama_lengkap"
                    value={form.nama_lengkap}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Tanggal Lahir */}
                <div>
                  <label
                    htmlFor="tanggal_lahir"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Lahir
                  </label>
                  <input
                    type="date"
                    id="tanggal_lahir"
                    name="tanggal_lahir"
                    value={form.tanggal_lahir}
                    onChange={handleChange}
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label
                    htmlFor="jenis_kelamin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Jenis Kelamin
                  </label>
                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">L</option>
                    <option value="P">P</option>
                  </select>
                </div>

                {/* Nomor Telepon */}
                <div>
                  <label
                    htmlFor="nomor_telepon"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    id="nomor_telepon"
                    name="nomor_telepon"
                    value={form.nomor_telepon}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                 {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-semibold text-[#3d342b]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email@example.com"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                  />
                </div>

                {/* Alamat */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="alamat"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Alamat
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Alamat"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

               

                {/* Riwayat Alergi */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="riwayat_alergi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Riwayat Alergi
                  </label>
                  <textarea
                    id="riwayat_alergi"
                    name="riwayat_alergi"
                    value={form.riwayat_alergi}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Contoh: Debu, Obat tertentu..."
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                  />
                </div>

                {/* Tanggal Dibuat */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="tanggalDibuat"
                  className="block mb-2 text-sm font-semibold text-[#3d342b]"
                >
                  Tanggal Dibuat
                </label>
                <input
                  type="date"
                  id="tanggalDibuat"
                  name="tanggalDibuat"
                  value={form.tanggalDibuat}
                  onChange={handleChange}
                  className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                />
              </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-[#b49b50] hover:bg-[#a38742] focus:ring-4 focus:outline-none focus:ring-[#b49b50]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Upload
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
