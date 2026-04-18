import { Navigate, Route, Routes } from "react-router-dom";
import PortfolioPage from "./components/PortfolioPage";
import { AdminApp } from "./AdminComponents";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin" element={<AdminApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
