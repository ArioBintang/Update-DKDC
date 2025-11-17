import { useState } from "react";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function SidebarPerawat({ isCollapsed, setIsCollapsed }) {
  const [openAdmin, setOpenAdmin] = useState(false);
  const navigate = useNavigate();

  // === ICONS ===
  const svgUpload = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-[#b08e4a]">
      <path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z" />
    </svg>
  );

  const svgDatabase = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-[#b08e4a]">
      <path d="M544 269.8C529.2 279.6 512.2 287.5 494.5 293.8C447.5 310.6 385.8 320 320 320C254.2 320 192.4 310.5 145.5 293.8C127.9 287.5 110.8 279.6 96 269.8L96 352C96 396.2 196.3 432 320 432C443.7 432 544 396.2 544 352L544 269.8zM544 192L544 144C544 99.8 443.7 64 320 64C196.3 64 96 99.8 96 144L96 192C96 236.2 196.3 272 320 272C443.7 272 544 236.2 544 192zM494.5 453.8C447.6 470.5 385.9 480 320 480C254.1 480 192.4 470.5 145.5 453.8C127.9 447.5 110.8 439.6 96 429.8L96 496C96 540.2 196.3 576 320 576C443.7 576 544 540.2 544 496L544 429.8C529.2 439.6 512.2 447.5 494.5 453.8z" />
    </svg>
  );

  // === MENU ADMIN ===
  const adminMenu = [
    { icon: svgUpload, label: "Form Pasien", to: "/formPasien" },
    { icon: svgDatabase, label: "Data Pasien", to: "/dataPasien" },
    { icon: svgUpload, label: "Form Dokter", to: "/formDokter" },
    { icon: svgDatabase, label: "Data Dokter", to: "/dataDokter" },
    { icon: svgUpload, label: "Form Perawatan", to: "/formPerawatan" },
    { icon: svgDatabase, label: "Data Perawatan", to: "/dataPerawatan" },
    { icon: svgUpload, label: "Form Janji Temu", to: "/formJanji" },
    { icon: svgDatabase, label: "Data Janji Temu", to: "/dataJanji" },
    { icon: svgUpload, label: "Form Rekam Medis", to: "/formRekammedis" },
    { icon: svgDatabase, label: "Data Rekam Medis", to: "/dataRekammedis" },
    { icon: svgDatabase, label: "Data Detail Rekam Medis", to: "/dataDetailRM" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className={`fixed top-0 left-0 h-screen bg-[#ffffff] text-[#4b3f2f] border-r border-gray-200 shadow-[4px_0_15px_rgba(0,0,0,0.1)] p-3 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h1 className="text-lg font-bold text-[#b08e4a]">Perawat Panel</h1>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="text-[#b08e4a]" />
        </button>
      </div>

      {/* Dashboard */}
      <div className="mb-3">
        <Link to="/perawat" className="w-full flex items-center justify-center gap-2 bg-[#b08e4a] text-white py-2 rounded-md font-semibold hover:bg-[#a37d3c] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-6 h-6 fill-white">
            <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/>
          </svg>
          {!isCollapsed && "Dashboard"}
        </Link>
      </div>

      {/* Admin Section */}
      <div className="mt-4">
        <button onClick={() => setOpenAdmin(!openAdmin)} className="w-full flex items-center justify-between py-2 px-3 hover:bg-[#f5e6c8] rounded-md font-medium">
          <span>👨‍💼 {!isCollapsed && "Perawat"}</span>
          {!isCollapsed && (openAdmin ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
        </button>

        {!isCollapsed && openAdmin && (
          <ul className="pl-6 mt-2 space-y-1 text-sm">
            {adminMenu.map((item, i) => (
              <li key={i}>
                {item.to ? (
                  <Link to={item.to} className="flex items-center gap-2 hover:bg-[#f5e6c8] p-2 rounded-md">
                    {item.icon}
                    {item.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 p-2 rounded-md cursor-not-allowed opacity-50">
                    {item.icon}
                    {item.label}
                  </div>
                )}
                {["Data Pasien", "Data Dokter", "Data Perawatan", "Data Janji Temu", "Data Rekam Medis"].includes(item.label) && (
                  <hr className="border-t border-[#e0d3b8] my-1 p-1 hover:bg-gray-100 rounded-lg" />
                )}
                
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dokter Section */}
      <div className="mt-4">
        <Link to="/dokter" className="w-full flex items-center py-2 px-3 hover:bg-[#f5e6c8] rounded-md">
          🧑‍⚕️ {!isCollapsed && "Dokter"}
        </Link>
      </div>

      {/* Logout */}
      <div className="absolute bottom-4 left-3 right-3">
        <button onClick={handleLogout} className="w-full bg-[#b08e4a] text-white py-2 rounded-md font-semibold hover:bg-[#a37d3c] transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}
