import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Login = lazy(() => import("./pages/auth/login"));

const Dashboard = lazy(() => import("./pages/dashboard"));


const Usuarios = lazy(() => import("./pages/usuarios"));
const UsuariosEditar = lazy(() => import("./pages/usuarios/editar"));
const UsuariosBorrar = lazy(() => import("./pages/usuarios/borrar"));


const NoPage = lazy(() => import("./pages/404"));
import Loading from "@/components/Loading";

import Layout from "./layout/Layout";

function App() {
  const authenticated = false;
  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route path="/*" element={<Layout />}>
          {/*<Route index element={<Dashboard />} />*/}

          <Route path="dashboard" element={<Dashboard />} />


          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/editar" element={<UsuariosEditar />} />
          <Route path="usuarios/borrar" element={<UsuariosBorrar />} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <NoPage />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
