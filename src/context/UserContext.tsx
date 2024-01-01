import { createContext, useState } from "react";
import { IUserContextType } from "../types";

export const UserContext = createContext<IUserContextType | null>(null);

export const UserProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <UserContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
