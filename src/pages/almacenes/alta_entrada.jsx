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

const AlmacenEntradaAlta = () => {
  const [isDark] = useDarkMode();

  const [producto, setProducto] = useState();
  const [fechaEntrada, setFechaEntrada] = useState();
  const [cantidad, setCantidad] = useState();
  const [proveedor, setProveedor] = useState();
  const [estante, setEstante] = useState();

  const [allShelfs, setAllShelfs] = useState();
  const [allProducts, setAllProducts] = useState();
  const [allSuppliers, setAllSuppliers] = useState();

  const id_almacen = localStorage.getItem("ViewStorage");
  const nombre_almacen = localStorage.getItem("ViewStorageName");
  
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

  const getShelfs = async () => {
    try {
      let res = await clienteAxios.get(`/estante/obtener`);

      //console.log(res.data.estantes);
      let array = [];
      for (let i = 0; i < res.data.estantes.length; i++) {
        //console.log(i);
        array.push({"value":res.data.estantes[i]["nombre"],"label":res.data.estantes[i]["nombre"]});
      }
      setAllShelfs(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      let res = await clienteAxios.get(`/producto/obtener`);

      //console.log(res.data.productos);
      let array = [];
      for (let i = 0; i < res.data.productos.length; i++) {
        //console.log(i);
        array.push({"value":res.data.productos[i]["nombre"],"label":res.data.productos[i]["nombre"]+"/"+res.data.productos[i]["marca"]+"/"+res.data.productos[i]["talla"]+"/"+res.data.productos[i]["color"]});
      }
      setAllProducts(array);
      
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
    getShelfs();
    getProducts();
    getSuppliers();
  }, []);

  const sendData = (event) => {
    event.preventDefault();

    //validamos campos
    if(producto == "" || producto == undefined) {
      mostrarMensaje("Debes seleccionar el producto");
    }else if(fechaEntrada == "" || fechaEntrada == undefined) {
        mostrarMensaje("Debes seleccionar una fecha");
    }else if(cantidad == "" || cantidad == undefined) {
        mostrarMensaje("Debes escribir una cantidad");
    }else if(proveedor == "" || proveedor == undefined) {
        mostrarMensaje("Debes seleccionar una proveedor");    
    }else if(estante == "" || estante == undefined) {
        mostrarMensaje("Debes seleccionar una estante");    
    } else {
      const createStorage = async (dataForm) => {
        try {
          const res = await clienteAxios.post("/almacen/entrada-alta", dataForm);
          
          //console.log(res);
          navigate("/almacenes/ver");
          
        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };
      createStorage({ producto:producto.value, fechaEntrada, cantidad, proveedor:proveedor.value, id_almacen, nombre_almacen, estante:estante.value });
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
        <Card title="Alta de Entrada al Almacén">
          <form onSubmit={(e) => sendData(e)}>
            <div className="space-y-4">

              {/*Producto*/}
              <label  className="block capitalize form-label  ">Producto *</label>
              <Select
                  styles={customStyles}
                  label="Producto *"
                  placeholder="Seleccione"
                  id="producto"
                  options={allProducts}
                  value={producto}
                  onChange={setProducto}
                  isSearchable={true}
              ></Select>

              {/*Fecha de Entrada*/}
              <Textinput
                onChange={(e) => setFechaEntrada(e.target.value)}
                label="Fecha de Entrada *"
                placeholder="Fecha de Entrada"
                id="fechaEntrada"
                type="date"
              />

              {/*Cantidad*/}
              <Textinput
                onChange={(e) => setCantidad(e.target.value)}
                label="Cantidad*"
                placeholder="Cantidad"
                id="cantidad"
                type="number"
              />

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

              {/*Estante*/}
              <label  className="block capitalize form-label  ">Estante *</label>
                <Select
                  styles={customStyles}
                  label="Estante *"
                  placeholder="Seleccione"
                  id="estante"
                  options={allShelfs}
                  value={estante}
                  onChange={setEstante}
                  isSearchable={true}
              ></Select>

              
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

export default AlmacenEntradaAlta;
