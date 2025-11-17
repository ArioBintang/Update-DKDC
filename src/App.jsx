import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layout/admin";
import Dashboard from "./pages/admin";
import PerawatLayout from "./layout/perawat";
import FormPasien from "./pages/perawat/formPasien";
import DataPasien from "./pages/perawat/dataPasien";
import FormDokter from "./pages/dokter/formDokter";
import DataDokter from "./pages/dokter/dataDokter";
import FormPerawatan from "./pages/perawat/formPerawatan";
import DataPerawatan from "./pages/perawat/dataPerawatan";
import EditPerawatan from "./pages/perawat/editPerawatan";
import EditPasien from "./pages/perawat/editPasien";
import FormJanji from "./pages/janji_temu/formJanji";
import DataJanji from "./pages/janji_temu/dataJanji";
import FormRekamMedis from "./pages/rekam_medis/formRekammedis";
import DataRekamMedis from "./pages/rekam_medis/dataRekammedis";
import EditRekamMedis from "./pages/rekam_medis/editRekammedis";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 👇 default route ke login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Halaman Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Halaman admin (kalau nanti dibutuhkan) */}
                <Route
                    path="/admin"
                    element={
                        
                            <AdminLayout />
                    
                    }
                >
                    <Route index element={<Dashboard />} />
                </Route>

   <Route path="/perawat" element={<PerawatLayout />} />

{/* FORM & DATA TIDAK DIBAWAH PERAWAT */}
<Route path="/formPasien" element={<FormPasien />} />
<Route path="/dataPasien" element={<DataPasien />} />
<Route path="/editPasien/:id" element={<EditPasien />} />

<Route path="/formPerawatan" element={<FormPerawatan />} />
<Route path="/dataPerawatan" element={<DataPerawatan />} />
<Route path="/editPerawatan/:id" element={<EditPerawatan />} />

<Route path="/formJanji" element={<FormJanji />} />
<Route path="/dataJanji" element={<DataJanji />} />
<Route path="/editJanji/:id" element={<EditPerawatan />} />

<Route path="/formDokter" element={<FormDokter />} />
<Route path="/dataDokter" element={<DataDokter />} />

<Route path="/formRekammedis" element={<FormRekamMedis />} />
<Route path="/dataRekammedis" element={<DataRekamMedis />} />
<Route path="/editRekammedis/:id" element={<EditRekamMedis />} />



                {/* fallback route */}
                <Route path="*" element={<h1>404 - Halaman tidak ditemukan</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
