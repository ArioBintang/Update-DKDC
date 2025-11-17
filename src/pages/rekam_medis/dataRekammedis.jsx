import React, { useState, useEffect } from "react";
import SidebarPerawat from "../../components/perawat/sidebar";
import { Link } from "react-router-dom";
import { getPerawatan } from "../../_services/perawatan";

export default function DataRekamMedis() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [perawatanList, setPerawatanList] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPerawatan();

        console.log("RESPONSE BACKEND ===>", res);

        // kalau res bukan array (undefined/null), jadikan array kosong
        setPerawatanList(Array.isArray(res) ? res : []);
      } catch (err) {
        console.log("ERROR BACKEND ===>", err);
        setPasienList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = perawatanList.filter((p) =>
    p.kode_perawatan?.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (id) => {
  console.log("Edit perawatan dengan ID:", id);
  // bisa redirect ke halaman edit, misal:
  // navigate(`/edit-pasien/${id}`);
};

const handleDelete = async (id) => {
  const confirm = window.confirm("Apakah Anda yakin ingin menghapus pasien ini?");
  if (confirm) {
    try {
      await deletePerawatan(id); // pastikan ada function deletePasien di _services/pasien
      setPerawatanList(perawatanList.filter(p => p.id !== id)); // update UI setelah delete
      alert("Data perawatan berhasil dihapus");
    } catch (err) {
      console.error("Gagal menghapus perawatan:", err);
      alert("Gagal menghapus perawatan");
    }
  }
};

 

  return (
    <div className="flex bg-[#f6f5ef] min-h-screen">
      <SidebarPerawat
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
        {/* Konten utama */}
    <div
      className={`flex-1 p-6 transition-all duration-300`}
      style={{ marginLeft: isCollapsed ? "64px" : "320px" }} // sesuaikan lebar sidebar
    >
          
        {/* HEADER */}
        <div className="bg-[#b49b50] text-white p-6 rounded-xl shadow-md mb-6">
          <h1 className="text-2xl font-bold">Data Perawatan</h1>
          <p className="text-sm opacity-80">Analisis dan visualisasi data</p>
        </div>

        {/* STAT CARDS */}
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

        {/* TITLE + SEARCH */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#3e3e3e]">Data Perawatan</h2>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Cari Perawatan"
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
                <th className="p-3 text-center">ID</th>
                <th className="p-3">Kode Perawatan</th>
                <th className="p-3">Nama Perawatan</th>
                <th className="p-3">Deskripsi</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Action</th> {/* Tambah kolom Action */}
              </tr>
            </thead>

           <tbody>
  {filtered.length > 0 ? (
    filtered.map((item, index) => (
      <tr key={item.id} className="border-b hover:bg-[#faf7ee] transition">

        {/* ID */}
        <td className="p-3 text-center">
          {String(item.id).padStart(2, "0")}
        </td>

        {/* Kolom lain */}
        <td className="p-3 text-center">{item.kode_perawatan}</td>
        <td className="p-3 text-center">{item.nama_perawatan}</td>
        <td className="p-3 text-center">{item.deskripsi}</td>
        <td className="p-3 text-center">{item.harga}</td>

        {/* Action */}
        <td className="p-3 flex justify-center gap-2">
          <Link
            to={`/editPerawatan/${item.id}`}
            className="px-3 py-1 bg-yellow-500 text-white rounded"
          >
            Edit
          </Link>

          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center py-6 text-gray-500">
        Tidak ada data ditemukan
      </td>
    </tr>
  )}
</tbody>


          </table>
        </div>

        {/* PAGINATION */}
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
