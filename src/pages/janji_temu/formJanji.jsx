  import React, { useState } from "react";
  import SidebarPerawat from "../../components/perawat/sidebar";
import { addJanji } from "../../_services/janji";

  export default function FormJanji() {
    const [form, setForm] = useState({
      id_pasien: "",
      id_dokter: "",
      tanggal_janji: "",
      waktu_janji: "",
      keluhan: "",
      status: "",
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
        await addJanji(form);
        alert("Data janji temu berhasil ditambahkan!");
        window.location.href = "/dataJanji"; // redirect
      } catch (err) {
        console.error(err);
        alert("Gagal menyimpan data ");
      }
    };

    const handleReset = () => {
  setForm({
     id_pasien: "",
      id_dokter: "",
      tanggal_janji: "",
      waktu_janji: "",
      keluhan: "",
      status: "",
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
              Form Janji Temu
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6 sm:grid-cols-2">
                {/* Nomor ID PASIEN */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="id_pasien"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ID Pasien
                  </label>
                  <input
                    type="text"
                    id="id_pasien"
                    name="id_pasien"
                    value={form.id_pasien}
                    onChange={handleChange}
                    placeholder="ID Pasien"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* ID DOKTER    */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="id_dokter"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ID Dokter
                  </label>
                  <input
                    type="text"
                    id="id_dokter"
                    name="id_dokter"
                    value={form.id_dokter}
                    onChange={handleChange}
                    placeholder="ID Dokter"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Tanggal Janji */}
                <div>
                  <label
                    htmlFor="tanggal_janji"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Janji Temu
                  </label>
                  <input
                    type="date"
                    id="tanggal_janji"
                    name="tanggal_janji"
                    value={form.tanggal_}janji
                    onChange={handleChange}
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* WAKTU JANJI TEMU */}
                <div>
                  <label
                    htmlFor="waktu_janji"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Waktu Janji Temu
                  </label>
                  <input
                    type="time"
                    id="waktu_janji"
                    name="waktu_janji"
                    value={form.waktu_janji}
                    onChange={handleChange}
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  >
            
                  </input>
                </div>

                {/* Keluhan */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="keluhan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Keluhan
                  </label>
                  <textarea
                    type="text"
                    id="keluhan"
                    name="keluhan"
                    value={form.keluhan}
                    onChange={handleChange}
                    placeholder=""
                    rows={2}
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                 {/* Status */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-semibold text-[#3d342b]"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="Contoh:Selesai,Menuggu,...."
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
