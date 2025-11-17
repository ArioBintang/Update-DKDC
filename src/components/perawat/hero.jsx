export default function HeroPerawat() {
  return (
    <div className="flex-1 p-6 bg-[#f8f8f8] overflow-y-auto">
      <h2 className="text-2xl font-bold text-[#7A6A42]">
        Selamat Datang di Dashboard DK  DENTAL CARE
      </h2>
      <p className="text-gray-600 mb-6">
        Monitor dan kelola data anda dengan mudah dan efisien
      </p>

      <div className="flex justify-center">
        <img
          src="/logo.png"
          alt="DK Dental Care"
          className="rounded-xl shadow-md max-w-lg"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">Total Pasien</p>
          <h3 className="text-3xl font-bold text-[#C0A060]">788</h3>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">Total Dokter</p>
          <h3 className="text-3xl font-bold text-[#C0A060]">5</h3>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <p className="text-gray-500">Terakhir diperbarui</p>
          <h3 className="text-xl text-[#C0A060]">16 Juli 2025</h3>
        </div>
      </div>

      {/* Grafik Placeholder */}
      <div className="bg-white shadow rounded-xl p-6 mt-8">
        <h4 className="text-[#C0A060] font-semibold mb-4">
          Grafik Total Data
        </h4>
        <div className="h-48 flex items-center justify-center text-gray-400">
          (Grafik nanti di sini)
        </div>
      </div>
    </div>
  );
}
