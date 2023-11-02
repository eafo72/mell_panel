import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Login = lazy(() => import("./pages/auth/login"));

const Dashboard = lazy(() => import("./pages/dashboard"));


const Usuarios       = lazy(() => import("./pages/usuarios"));
const UsuariosAlta   = lazy(() => import("./pages/usuarios/alta"));
const UsuariosEditar = lazy(() => import("./pages/usuarios/editar"));
const UsuariosBorrar = lazy(() => import("./pages/usuarios/borrar"));

const Categorias       = lazy(() => import("./pages/categorias"));
const CategoriasAlta   = lazy(() => import("./pages/categorias/alta"));
const CategoriasEditar = lazy(() => import("./pages/categorias/editar"));
const CategoriasBorrar = lazy(() => import("./pages/categorias/borrar"));

const Subcategorias       = lazy(() => import("./pages/subcategorias"));
const SubcategoriasAlta   = lazy(() => import("./pages/subcategorias/alta"));
const SubcategoriasEditar = lazy(() => import("./pages/subcategorias/editar"));
const SubcategoriasBorrar = lazy(() => import("./pages/subcategorias/borrar"));

const Productos           = lazy(() => import("./pages/productos"));

const Marcas       = lazy(() => import("./pages/marcas"));
const MarcasAlta   = lazy(() => import("./pages/marcas/alta"));
const MarcasEditar = lazy(() => import("./pages/marcas/editar"));
const MarcasBorrar = lazy(() => import("./pages/marcas/borrar"));

const Colores       = lazy(() => import("./pages/colores"));
const ColoresAlta   = lazy(() => import("./pages/colores/alta"));
const ColoresEditar = lazy(() => import("./pages/colores/editar"));
const ColoresBorrar = lazy(() => import("./pages/colores/borrar"));

const Proveedores       = lazy(() => import("./pages/proveedores"));
const ProveedoresAlta   = lazy(() => import("./pages/proveedores/alta"));
const ProveedoresEditar = lazy(() => import("./pages/proveedores/editar"));
const ProveedoresBorrar = lazy(() => import("./pages/proveedores/borrar"));

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
          <Route path="usuarios/alta" element={<UsuariosAlta />} />
          <Route path="usuarios/editar" element={<UsuariosEditar />} />
          <Route path="usuarios/borrar" element={<UsuariosBorrar />} />

          <Route path="categorias" element={<Categorias />} />
          <Route path="categorias/alta" element={<CategoriasAlta />} />
          <Route path="categorias/editar" element={<CategoriasEditar />} />
          <Route path="categorias/borrar" element={<CategoriasBorrar />} />

          <Route path="subcategorias" element={<Subcategorias />} />
          <Route path="subcategorias/alta" element={<SubcategoriasAlta />} />
          <Route path="subcategorias/editar" element={<SubcategoriasEditar />} />
          <Route path="subcategorias/borrar" element={<SubcategoriasBorrar />} />

          <Route path="productos" element={<Productos />} />

          <Route path="marcas" element={<Marcas />} />
          <Route path="marcas/alta" element={<MarcasAlta />} />
          <Route path="marcas/editar" element={<MarcasEditar />} />
          <Route path="marcas/borrar" element={<MarcasBorrar />} />

          <Route path="colores" element={<Colores />} />
          <Route path="colores/alta" element={<ColoresAlta />} />
          <Route path="colores/editar" element={<ColoresEditar />} />
          <Route path="colores/borrar" element={<ColoresBorrar />} />

          <Route path="proveedores" element={<Proveedores />} />
          <Route path="proveedores/alta" element={<ProveedoresAlta />} />
          <Route path="proveedores/editar" element={<ProveedoresEditar />} />
          <Route path="proveedores/borrar" element={<ProveedoresBorrar />} />

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
