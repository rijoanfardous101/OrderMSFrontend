import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./hooks/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

function App() {
  const { isAuthenticated, checkAuth, isCheckingAuth, setIsCheckingAuth } =
    useAuthStore();

  useEffect(() => {
    const jwtToken: string = Cookies.get("jwtToken");

    if (jwtToken) {
      checkAuth();
    }

    setIsCheckingAuth(false);
  }, []);

  if (isCheckingAuth) {
    return <h2>Authenticating....</h2>;
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
