import React, { createContext, useContext, useState } from "react";
import type { LoginResponse } from "../api/users";

type AppUser = LoginResponse["user"] & { token: string } | null;

interface AppContextType {
  user: AppUser;
  setUser: (user: AppUser) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser>(null);

  return React.createElement(
    AppContext.Provider,
    { value: { user, setUser } },
    children
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro do AppProvider");
  return context;
};
