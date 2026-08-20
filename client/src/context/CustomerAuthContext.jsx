import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const CustomerAuthContext = createContext();

export function CustomerAuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => {
    const saved = localStorage.getItem("customerInfo");
    return saved ? JSON.parse(saved) : null;
  });

  const register = async (name, email, password, phone) => {
    const { data } = await api.post("/customer/auth/register", { name, email, password, phone });
    localStorage.setItem("customerToken", data.token);
    localStorage.setItem("customerInfo", JSON.stringify(data.customer));
    setCustomer(data.customer);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post("/customer/auth/login", { email, password });
    localStorage.setItem("customerToken", data.token);
    localStorage.setItem("customerInfo", JSON.stringify(data.customer));
    setCustomer(data.customer);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerInfo");
    setCustomer(null);
  };

  return (
    <CustomerAuthContext.Provider
      value={{ customer, login, register, logout, isAuthenticated: !!customer }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export const useCustomerAuth = () => useContext(CustomerAuthContext);