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

const Productos       = lazy(() => import("./pages/productos"));
const ProductosAlta   = lazy(() => import("./pages/productos/alta"));
const ProductosEditar = lazy(() => import("./pages/productos/editar"));
const ProductosBorrar = lazy(() => import("./pages/productos/borrar"));
const ProductosAltaFoto   = lazy(() => import("./pages/productos/alta_foto"));
const ProductosBorrarFoto   = lazy(() => import("./pages/productos/borrar_foto"));

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

const Tallas       = lazy(() => import("./pages/tallas"));
const TallasAlta   = lazy(() => import("./pages/tallas/alta"));
const TallasEditar = lazy(() => import("./pages/tallas/editar"));
const TallasBorrar = lazy(() => import("./pages/tallas/borrar"));

const Almacenes       = lazy(() => import("./pages/almacenes"));
const AlmacenesAlta   = lazy(() => import("./pages/almacenes/alta"));
const AlmacenesEditar = lazy(() => import("./pages/almacenes/editar"));
const AlmacenesBorrar = lazy(() => import("./pages/almacenes/borrar"));
const AlmacenesVer    = lazy(() => import("./pages/almacenes/ver"));
const AlmacenesEstantes    = lazy(() => import("./pages/almacenes/estantes"));
const AlmacenesEstantesAlta= lazy(() => import("./pages/almacenes/estantes_alta"));
const AlmacenesEstantesEditar= lazy(() => import("./pages/almacenes/estantes_editar"));
const AlmacenesEstantesBorrar= lazy(() => import("./pages/almacenes/estantes_borrar"));


const AlmacenEntradaAlta = lazy(() => import("./pages/almacenes/alta_entrada"));
const AlmacenEntradaBorrar = lazy(() => import("./pages/almacenes/borrar_entrada"));



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
          <Route path="productos/alta" element={<ProductosAlta />} />
          <Route path="productos/editar" element={<ProductosEditar />} />
          <Route path="productos/borrar" element={<ProductosBorrar />} />
          <Route path="productos/alta_foto" element={<ProductosAltaFoto />} />
          <Route path="productos/borrar_foto" element={<ProductosBorrarFoto />} />

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

          <Route path="tallas" element={<Tallas />} />
          <Route path="tallas/alta" element={<TallasAlta />} />
          <Route path="tallas/editar" element={<TallasEditar />} />
          <Route path="tallas/borrar" element={<TallasBorrar />} />

          <Route path="almacenes" element={<Almacenes />} />
          <Route path="almacenes/alta" element={<AlmacenesAlta />} />
          <Route path="almacenes/editar" element={<AlmacenesEditar />} />
          <Route path="almacenes/borrar" element={<AlmacenesBorrar />} />
          <Route path="almacenes/ver" element={<AlmacenesVer />} />
          <Route path="almacenes/estantes" element={<AlmacenesEstantes />} />
          <Route path="almacenes/estantes_alta" element={<AlmacenesEstantesAlta />} />
          <Route path="almacenes/estantes_editar" element={<AlmacenesEstantesEditar />} />
          <Route path="almacenes/estantes_borrar" element={<AlmacenesEstantesBorrar />} />


          <Route path="almacenes/alta_entrada" element={<AlmacenEntradaAlta />} />
          <Route path="almacenes/borrar_entrada" element={<AlmacenEntradaBorrar />} />


         


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
