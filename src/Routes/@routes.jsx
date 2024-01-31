import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";
import { Carousel } from "../pages/Carousel";
import { Login } from "../pages/Login";
import { Table } from "../pages/Table";
import { Upload } from "../pages/Upload";
import { View } from "../pages/View";

export function RouterProvider() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/carousel" element={<Carousel />} />
        <Route path="/table" element={<Table />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </AuthContextProvider>
  );
}
