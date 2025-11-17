  import React, { useState } from "react";
  import SidebarPerawat from "../../components/perawat/sidebar";
import { addPerawatan } from "../../_services/perawatan";

  export default function FormPerawatan() {
    const [form, setForm] = useState({
      kode_perawatan: "",
      nama_perawatan: "",
      deskripsi: "",
      harga: "", 
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
        await addPerawatan(form);
        alert("Data perawatan berhasil ditambahkan!");
        window.location.href = "/dataPerawatan"; // redirect
      } catch (err) {
        console.error(err);
        alert("Gagal menyimpan data perawatan");
      }
    };

    const handleReset = () => {
  setForm({
      kode_perawatan: "",
      nama_perawatan: "",
      deskripsi: "",
      harga: "", 
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
              Form Perawatan
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6 sm:grid-cols-2">
                {/* Nomor Rekam Medis */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="kode_perawatan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kode Perawatan
                  </label>
                  <input
                    type="text"
                    id="kode_perawatan"
                    name="kode_perawatan"
                    value={form.kode_perawatan}
                    onChange={handleChange}
                    placeholder="Kode Perawatan "
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Nama Lengkap */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="nama_perawatan"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Perawatan
                  </label>
                  <input
                    type="text"
                    id="nama_perawatan"
                    name="nama_perawatan"
                    value={form.nama_perawatan}
                    onChange={handleChange}
                    placeholder="Nama Perawatan"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Deskripsi */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="deskripsi"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    type=""
                    id="deskripsi"
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Contoh:Pembersihan karang gigi atas dan bawah,..."
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  />
                </div>

                {/* Harga */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="harga"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Harga
                  </label>
                  <input
                  type="number"
                    id="harga"
                    name="harga"
                    value={form.harga}
                    onChange={handleChange}
                    placeholder="Contoh Rp 350000"
                    className="bg-[#f2f0d6] border border-[#c8c19c] text-gray-800 text-sm rounded-lg focus:ring-[#c2ad78] focus:border-[#c2ad78] block w-full p-2.5"
                    required
                  >
                  </input>
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
