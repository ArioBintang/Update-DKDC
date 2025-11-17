import React, { useState, useEffect } from "react";
import SidebarPerawat from "../../components/perawat/sidebar";
import { Link } from "react-router-dom";
import { deleteRekamMedis, getRekamMedis } from "../../_services/rekamMedis";

export default function DataRekamMedis() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [rekamMedisList, setRekamMedisList] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRekamMedis();

        console.log("RESPONSE BACKEND ===>", res);

        setRekamMedisList(Array.isArray(res) ? res : []);
      } catch (err) {
        console.log("ERROR BACKEND ===>", err);
        setRekamMedisList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = rekamMedisList.filter((rm) =>
    String(rm.id_pasien)?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
    console.log("Edit rekam medis dengan ID:", id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Apakah Anda yakin ingin menghapus data rekam medis ini?");
    if (confirm) {
      try {
        await deleteRekamMedis(id);
        setRekamMedisList(rekamMedisList.filter(rm => rm.id !== id));
        alert("Data rekam medis berhasil dihapus");
      } catch (err) {
        console.error("Gagal menghapus rekam medis:", err);
        alert("Gagal menghapus rekam medis");
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
          <h1 className="text-2xl font-bold">Data Rekam Medis</h1>
          <p className="text-sm opacity-80">Analisis dan visualisasi data rekam medis</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white text-center p-5 rounded-xl shadow border">
            <p className="text-3xl font-bold text-[#b49b50]">788</p>
            <p className="text-sm">Total Pasien Bulan Ini</p>
          </div>

          <div className="bg-white text-center p-5 rounded-xl shadow border">
            <p className="text-3xl font-bold text-green-600">4</p>
            <p className="text-sm">Pasien Baru Bulan Ini</p>
          </div>

          <div className="bg-white text-center p-5 rounded-xl shadow border">
            <p className="text-3xl font-bold text-red-600">6</p>
            <p className="text-sm">Unique Branches</p>
          </div>

          <div className="bg-white text-center p-5 rounded-xl shadow border flex items-center justify-center">
            <p className="text-xl font-semibold">{today}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#3e3e3e]">Data Rekam Medis</h2>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Cari ID Pasien"
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

        {/* TABLE */}
        <div className="bg-white p-4 rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#e8dfc8] text-[#3f3f3f]">
              <tr>
                <th className="p-3 text-center">ID RM</th>
                <th className="p-3">ID Pasien</th>
                <th className="p-3">ID Dokter</th>
                <th className="p-3">Anamnesis</th>
                <th className="p-3">Diagnosa</th>
                <th className="p-3">Tgl Perawatan</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((rm) => (
                  <tr key={rm.id} className="border-b hover:bg-[#faf7ee] transition">

                    <td className="p-3 text-center">
                      {String(rm.id).padStart(2, "0")}
                    </td>

                    <td className="p-3 text-center">{rm.id_pasien}</td>
                    <td className="p-3 text-center">{rm.id_dokter}</td>
                    <td className="p-3 text-left max-w-xs overflow-hidden truncate">{rm.anamnesis}</td>
                    <td className="p-3 text-left max-w-xs overflow-hidden truncate">{rm.diagnosa}</td>
                    <td className="p-3 text-center">{rm.tanggal_perawatan}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <Link
                        to={`/editRekamMedis/${rm.id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </Link>

                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded"
                        onClick={() => handleDelete(rm.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    {loading ? "Memuat data..." : "Tidak ada data rekam medis ditemukan"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4 gap-2 text-sm">
          <button className="px-3 py-1 bg-[#e8dfc8] rounded">Previous</button>
          <button className="px-3 py-1 bg-[#b49b50] text-white rounded">1</button>
          <button className="px-3 py-1 bg-[#e8dfc8] rounded">2</button>
          <button className="px-3 py-1 bg-[#e8dfc8] rounded">3</button>
          <button className="px-3 py-1 bg-[#e8dfc8] rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
