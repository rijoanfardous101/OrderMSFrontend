import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import Cookies from "js-cookie";

interface User {
  role: string;
  emailAddress: string;
  jwtToken: string;
}

interface LoginData {
  emailAddress: string;
  password: string;
}

interface SignupData {
  companyName: string;
  emailAddress: string;
  password: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  isLogginIn: boolean;
  isSigninUp: boolean;
  isCheckingAuth: boolean;
  setIsCheckingAuth: (status: boolean) => void;
  user: User | null;
  checkAuth: () => void;
  login: (data: LoginData) => void;
  signup: (data: SignupData) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLogginIn: false,
  isSigninUp: false,
  isCheckingAuth: true,
  user: null,

  setIsCheckingAuth: (status) => {
    set({ isCheckingAuth: status });
  },

  login: async (data: LoginData) => {
    set({ isLogginIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);

      Cookies.set("jwtToken", res.data.jwtToken, { expires: 7 });
      set({ isAuthenticated: true, user: res.data });
    } catch (error: any) {
      toast.error(error?.response?.data);
    } finally {
      set({ isLogginIn: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    const jwtToken: string = Cookies.get("jwtToken");

    try {
      const res = await axiosInstance.get("/auth/check", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      console.log(res);

      set({
        isAuthenticated: true,
        user: res.data,
      });
    } catch (error: any) {
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignupData) => {
    set({ isSigninUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);

      Cookies.set("jwtToken", res.data.jwtToken, { expires: 7 });
      set({ isAuthenticated: true, user: res.data });
    } catch (error: any) {
      toast.error(error?.response?.data);
    } finally {
      set({ isSigninUp: false });
    }
  },
}));
