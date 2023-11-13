import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "react-select";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";

const ProductosAlta = () => {
  const [isDark] = useDarkMode();

  const [nombre, setNombre] = useState();
  const [descripcion, setDescripcion] = useState();
  const [codigo_comun, setCodigoComun] = useState();
  const [genero, setGenero] = useState();
  const [edad, setEdad] = useState();
  const [categoria, setCategoria] = useState();
  const [subcategoria, setSubcategoria] = useState();
  const [marca, setMarca] = useState();
  const [talla, setTalla] = useState();
  const [color, setColor] = useState();
  const [proveedor, setProveedor] = useState();
  //const [estatus, setEstatus] = useState();
  const [precio, setPrecio] = useState();
  const [almacen, setAlmacen] = useState();
  const [estante, setEstante] = useState();
  const [stock, setStock] = useState();
  const [apartado, setApartado] = useState();
  const [estropeado, setEstropeado] = useState();
  const [calificacion, setCalificacion] = useState();
  
  
  const allGenders = [
    { value: "Hombre", label: "Hombre" },
    { value: "Mujer", label: "Mujer" },
    { value: "Niño", label: "Niño" },
    { value: "Niña", label: "Niña" }
  ];

  const [allCategories, setAllCategories] = useState();
  const [allSubcategories, setAllSubcategories] = useState();
  const [allBrands, setAllBrands] = useState();
  const [allSizes, setAllSizes] = useState();
  const [allColors, setAllColors] = useState();
  const [allSuppliers, setAllSuppliers] = useState();
  
  /*
  const allEstatus = [
    { value: "Activo", label: "Activo" },
    { value: "Desactivado", label: "Desactivado" }
  ];
  */


  const navigate = useNavigate();

  const mostrarMensaje = (mensaje) =>{
    toast.error(mensaje, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }

  const getCategories = async () => {
    try {
      let res = await clienteAxios.get(`/categoria/obtener`);

      //console.log(res.data.categorias);
      let array = [];
      for (let i = 0; i < res.data.categorias.length; i++) {
        //console.log(i);
        array.push({"value":res.data.categorias[i]["nombre"],"label":res.data.categorias[i]["nombre"]});
      }
      setAllCategories(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getSubcategories = async () => {
    try {
      let res = await clienteAxios.get(`/subcategoria/obtener`);

      //console.log(res.data.subcategorias);
      let array = [];
      for (let i = 0; i < res.data.subcategorias.length; i++) {
        //console.log(i);
        array.push({"value":res.data.subcategorias[i]["nombre"],"label":res.data.subcategorias[i]["nombre"]});
      }
      setAllSubcategories(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getBrands = async () => {
    try {
      let res = await clienteAxios.get(`/marca/obtener`);

      //console.log(res.data.marcas);
      let array = [];
      for (let i = 0; i < res.data.marcas.length; i++) {
        //console.log(i);
        array.push({"value":res.data.marcas[i]["nombre"],"label":res.data.marcas[i]["nombre"]});
      }
      setAllBrands(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getSizes = async () => {
    try {
      let res = await clienteAxios.get(`/talla/obtener`);

      //console.log(res.data.tallas);
      let array = [];
      for (let i = 0; i < res.data.tallas.length; i++) {
        //console.log(i);
        array.push({"value":res.data.tallas[i]["nombre"],"label":res.data.tallas[i]["nombre"]});
      }
      setAllSizes(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getColors = async () => {
    try {
      let res = await clienteAxios.get(`/color/obtener`);

      //console.log(res.data.colores);
      let array = [];
      for (let i = 0; i < res.data.colores.length; i++) {
        //console.log(i);
        array.push({"value":res.data.colores[i]["nombre"],"label":res.data.colores[i]["nombre"]});
      }
      setAllColors(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getSuppliers = async () => {
    try {
      let res = await clienteAxios.get(`/proveedor/obtener`);

      //console.log(res.data.proveedores);
      let array = [];
      for (let i = 0; i < res.data.proveedores.length; i++) {
        //console.log(i);
        array.push({"value":res.data.proveedores[i]["nombre"],"label":res.data.proveedores[i]["nombre"]});
      }
      setAllSuppliers(array);
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getCategories();
    getSubcategories();
    getBrands();
    getSizes();
    getColors();
    getSuppliers();
  },[]);



  const sendData = (event) => {
    event.preventDefault();

    //validamos campos
    if(nombre == "" || nombre == undefined) {
      mostrarMensaje("Debes escribir el nombre");
    }else if(genero == "" || genero == undefined) {
      mostrarMensaje("Debes seleccionar el género");
    }else if(edad == "" || edad == undefined) {
      mostrarMensaje("Debes seleccionar la edad");  
    }else if(categoria == "" || categoria == undefined) {
      mostrarMensaje("Debes seleccionar la categoría");  
    }else if(subcategoria == "" || subcategoria == undefined) {
      mostrarMensaje("Debes seleccionar la subcategoría");    
    }else if(marca == "" || marca == undefined) {
      mostrarMensaje("Debes seleccionar la marca");      
    }else if(talla == "" || talla == undefined) {
      mostrarMensaje("Debes seleccionar una talla");        
    }else if(color == "" || color == undefined) {
      mostrarMensaje("Debes seleccionar un color");          
    }else if(proveedor == "" || proveedor == undefined) {
      mostrarMensaje("Debes seleccionar un proveedor");                
    } else {
      const createProduct = async (dataForm) => {
        try {
          const res = await clienteAxios.post("/producto/crear", dataForm);
          //console.log(res);
          navigate("/productos");
          
        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };
      createProduct({ 
        nombre,
        descripcion,
        codigo_comun,
        genero:genero.value,
        edad,
        categoria:categoria.value,
        subcategoria:subcategoria.value,
        marca:marca.value,
        talla:talla.value,
        color:color.value,
        proveedor:proveedor.value,
        estatus:"Activo",
        precio,
        almacen,
        estante,
        stock,
        apartado,
        estropeado,
        calificacion
       });
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: isDark
        ? "rgb(15 23 42 / var(--tw-bg-opacity))"
        : "transparent",
    }),
    singleValue: (base, state) => ({
      ...base,
      color: isDark ? "white" : "rgb(15 23 42 / var(--tw-text-opacity))",
    }), 
    multiValueRemove: (base, state) => ({
      ...base,
      color: "red",
    }), 
    option: (base, state) => {
      return {
        ...base,
        background: isDark ? "rgb(15 23 42 / var(--tw-bg-opacity))" : "",
        color: state.isFocused ? (isDark ? "white" : "black") : "grey",
      };
    },
  };

  return (
    <>
      <ToastContainer />
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Alta de Productos">
          <form onSubmit={(e) => sendData(e)}>
            <div className="space-y-4">

              {/*Nombre*/}
              <Textinput
                onChange={(e) => setNombre(e.target.value)}
                label="Nombre *"
                placeholder="Nombre"
                id="nombre"
                type="text"
              />

              {/*descripcion*/}
              <Textarea
                  onChange={(e) => setDescripcion(e.target.value)}
                  label="Descripción"
                  placeholder="Descripción"
                  id="descripcion"
                  type="text"
                />

              {/*Codigo común*/}
              <Textinput
                onChange={(e) => setCodigoComun(e.target.value)}
                label="Código común"
                placeholder="Código común"
                id="codigo_comun"
                type="text"
              />  

              {/*Genero*/}
              <label  className="block capitalize form-label  ">Género *</label>
              <Select
                  styles={customStyles}
                  label="Género *"
                  placeholder="Seleccione"
                  id="genero"
                  options={allGenders}
                  value={genero}
                  onChange={setGenero}
                  isSearchable={true}
                ></Select>

              {/*Edad*/}
              <Textinput
                onChange={(e) => setEdad(e.target.value)}
                label="Edad *"
                placeholder="Edad"
                id="edad"
                type="text"
              />

              {/*Categoria*/}
              <label  className="block capitalize form-label  ">Categoría *</label>
              <Select
                  styles={customStyles}
                  label="Categoría *"
                  placeholder="Seleccione"
                  id="categoria"
                  options={allCategories}
                  value={categoria}
                  onChange={setCategoria}
                  isSearchable={true}
                ></Select>

              {/*Subcategoria*/}
              <label  className="block capitalize form-label  ">Subcategoría *</label>
              <Select
                  styles={customStyles}
                  label="Subcategoría *"
                  placeholder="Seleccione"
                  id="subcategoria"
                  options={allSubcategories}
                  value={subcategoria}
                  onChange={setSubcategoria}
                  isSearchable={true}
                ></Select>

              {/*Marca*/}
              <label  className="block capitalize form-label  ">Marca *</label>
              <Select
                  styles={customStyles}
                  label="Marca *"
                  placeholder="Seleccione"
                  id="marca"
                  options={allBrands}
                  value={marca}
                  onChange={setMarca}
                  isSearchable={true}
                ></Select>

              {/*Talla*/}
              <label  className="block capitalize form-label  ">Talla *</label>
              <Select
                  styles={customStyles}
                  label="Talla *"
                  placeholder="Seleccione"
                  id="talla"
                  options={allSizes}
                  value={talla}
                  onChange={setTalla}
                  isSearchable={true}
                ></Select>

              {/*Color*/}
              <label  className="block capitalize form-label  ">Color *</label>
              <Select
                  styles={customStyles}
                  label="Color *"
                  placeholder="Seleccione"
                  id="color"
                  options={allColors}
                  value={color}
                  onChange={setColor}
                  isSearchable={true}
                ></Select>

              {/*Proveedor*/}
              <label  className="block capitalize form-label  ">Proveedor *</label>
              <Select
                  styles={customStyles}
                  label="Proveedor *"
                  placeholder="Seleccione"
                  id="proveedor"
                  options={allSuppliers}
                  value={proveedor}
                  onChange={setProveedor}
                  isSearchable={true}
                ></Select>

  
              {/*Precio*/}
              <Textinput
                onChange={(e) => setPrecio(e.target.value)}
                label="Precio"
                placeholder="Precio"
                id="precio"
                type="number"
              />


              <div className=" space-y-4">
                <p>* Campos requeridos</p>
                <Button text="Guardar" type="submit" className="btn-dark" />
              </div>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ProductosAlta;