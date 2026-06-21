import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { LoginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { RegisterAction } from "../actions/register.action";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";
type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters
  isAdmin: () => boolean;

  // Actions
  checkAuthStatus: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    fullName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  user: null,
  token: null,
  authStatus: "checking",

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles || [];

    return roles.includes("admin");
    // return !!get().user?.roles.includes('admin')
  },

  // Actions

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user: user,
        token: token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      set({
        user: undefined,
        token: undefined,
        authStatus: "not-authenticated",
      });
      return false;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const data = await LoginAction(email, password);
      localStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "checking" });
  },

  register: async (fullName: string, email: string, password: string) => {
    try {
      const data = await RegisterAction(fullName, email, password);
      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      set({
        user: null,
        token: null,
        authStatus: "not-authenticated",
      });
      console.log(error);
      return false;
    }
  },
}));
