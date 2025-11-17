import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodedToken } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil token & decode
  const token = localStorage.getItem("accessToken");
  const decodeData = useDecodedToken(token);

  // ⛔ FIX: Jangan redirect kalau belum login
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));

    // kalau belum login → jangan apa2
    if (!token || !savedUser) return;

    // kalau decode data tidak valid → jangan redirect
    if (!decodeData || !decodeData.success) return;

    // redirect berdasarkan role
    if (savedUser.role === "admin") navigate("/admin");
    else if (savedUser.role === "perawat") navigate("/perawat");
    else if (savedUser.role === "dokter") navigate("/dokter");
  }, [decodeData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      console.log("REAL RESPONSE:", response);

      // simpan token & data user
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      console.log("Token di Login.jsx:", localStorage.getItem("accessToken"));

      // redirect setelah login
      const role = response.user.role;

      if (role === "admin") navigate("/admin");
      else if (role === "perawat") navigate("/perawat");
      else if (role === "dokter") navigate("/dokter");
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold md:text-2xl text-gray-900 dark:text-white">
              Sign in to your account
            </h1>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                  focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to={"/register"} className="text-indigo-600 hover:underline dark:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
