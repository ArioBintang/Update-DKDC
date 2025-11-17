import React, { useState, useEffect } from "react";
import SidebarPerawat from "../../components/perawat/sidebar";
import { getDokter, deleteDokter } from "../../_services/dokter";
import { Link } from "react-router-dom";

export default function DataDokter() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [dokterList, setDokterList] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDokter();

        console.log("RESPONSE BACKEND ===>", res);

        setDokterList(Array.isArray(res) ? res : []);
      } catch (err) {
        console.log("ERROR BACKEND ===>", err);
        setDokterList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = dokterList.filter((d) =>
    d.nama_lengkap?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus dokter ini?");
    if (confirmDelete) {
      try {
        await deleteDokter(id);
        setDokterList(dokterList.filter((d) => d.id !== id));
        alert("Dokter berhasil dihapus");
      } catch (err) {
        console.error("Gagal menghapus dokter:", err);
        alert("Gagal menghapus dokter");
      }
    }
  };

  return (
    <div className="flex bg-[#f6f5ef] min-h-screen">
      <SidebarPerawat
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div
        className={`flex-1 p-6 transition-all duration-300`}
        style={{ marginLeft: isCollapsed ? "64px" : "320px" }}
      >
        <div className="bg-[#b49b50] text-white p-6 rounded-xl shadow-md mb-6">
          <h1 className="text-2xl font-bold">Data Dokter</h1>
          <p className="text-sm opacity-80">Daftar seluruh dokter terdaftar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white text-center p-5 rounded-xl shadow border">
            <p className="text-3xl font-bold text-[#b49b50]">{dokterList.length}</p>
            <p className="text-sm">Total Dokter</p>
          </div>

          <div className="bg-white text-center p-5 rounded-xl shadow border">
            <p className="text-xl font-semibold">{today}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#3e3e3e]">Data Dokter</h2>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Cari Dokter"
              className="w-full pl-10 p-2 border rounded-xl bg-[#f8f5e7]"
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="w-5 h-5 absolute left-3 top-2.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#e8dfc8] text-[#3f3f3f]">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Nomor STR</th>
                <th className="p-3">Nama Lengkap</th>
                <th className="p-3">Spesialisasi</th>
                <th className="p-3">No Telepon</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status Aktif</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-[#faf7ee] transition">
                    <td className="p-3 text-center">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="p-3">{item.nomor_str}</td>
                    <td className="p-3">{item.nama_lengkap}</td>
                    <td className="p-3">{item.spesialisasi}</td>
                    <td className="p-3">{item.nomor_telepon}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">
                      {item.status_aktif === 1 ? (
                        <span className="text-green-600 font-semibold">Aktif</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Nonaktif</span>
                      )}
                    </td>

                    <td className="p-3 flex gap-2">
                      <Link
                        to={`/editDokter/${item.id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Edit
                      </Link>

                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-500">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 gap-2 text-sm">
          <button className="px-3 py-1 bg-[#e8dfc8] rounded">Previous</button>
          <button className="px-3 py-1 bg-[#b49b50] text-white rounded">1</button>
          <button className="px-3 py-1 bg-[#e8dfc8] rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
