/**
 * Google OAuth Handler
 * Menangani redirect dan token dari Google OAuth callback
 */

export const handleGoogleAuthCallback = (updateUser, navigate) => {
  try {
    // Ambil token dan userId dari URL parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    if (token && userId) {
      // Simpan token ke localStorage
      localStorage.setItem("token", token);

      // Fetch user info menggunakan token yang baru
      fetchUserAfterOAuth(token, updateUser, navigate);

      // Bersihkan URL dari parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  } catch (error) {
    console.error("Error handling Google auth callback:", error);
  }
};

const fetchUserAfterOAuth = async (token, updateUser, navigate) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL || "https://befinanceapp.vercel.app"
      }/api/v1/auth/getUser`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      updateUser(data.user);
      navigate("/dashboard");
    } else {
      console.error("Failed to fetch user info");
      localStorage.removeItem("token");
      navigate("/login");
    }
  } catch (error) {
    console.error("Error fetching user after OAuth:", error);
    localStorage.removeItem("token");
    navigate("/login");
  }
};

export const initiateGoogleLogin = () => {
  try {
    const backendURL =
      import.meta.env.VITE_API_URL || "https://befinanceapp.vercel.app";
    window.location.href = `${backendURL}/api/v1/auth/google`;
  } catch (error) {
    console.error("Error initiating Google login:", error);
  }
};
