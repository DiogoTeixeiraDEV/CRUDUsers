import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login.page.tsx";
import RegisterPage from "./pages/register.page.tsx";
import ProductsPage from "./pages/product.page.tsx";
import { useApp } from "./context/App.context.ts";

function App() {
  const { user } = useApp();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/products" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/products" /> : <RegisterPage />} />
      <Route path="/products" element={user ? <ProductsPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
