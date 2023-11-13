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

const ProductosEditarStock = () => {
  const [isDark] = useDarkMode();
  
  const [nombre, setNombre] = useState();
  const [stock, setStock] = useState();
  const [apartado, setApartado] = useState();
  const [estropeado, setEstropeado] = useState();
 
  
  const id_almacen = localStorage.getItem("ViewStorage");
  const id_producto = localStorage.getItem("EditStock");

  const navigate = useNavigate();

  const mostrarMensaje = (mensaje) => {
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
  };


  const getProduct = async () => {
    try {
      const res = await clienteAxios.get("/producto/single/"+id_producto);
      //console.log(res.data.single);
      
      setNombre(res.data.single.nombre);


    
      for (let i = 0; i < res.data.single.almacen.length; i++) {
        if(res.data.single.almacen[i]['id_almacen'] == id_almacen ){
          setStock(res.data.single.almacen[i]['stock']);
          setApartado(res.data.single.almacen[i]['apartado']);
          setEstropeado(res.data.single.almacen[i]['estropeado']);
        }
      }


    } catch (error) {
      console.log(error);
      mostrarMensaje(error.code);
    }
  };
  
  useEffect(() => {
    getProduct();
  },[]);


  const sendData = (event) => {
    event.preventDefault();

    //validamos campos
    const editProduct = async () => {
       try {
          const res = await clienteAxios.put("/producto/actualizar", {
            id:id,
            almacen
          });
          //console.log(res);
          navigate("/almacenes/ver");
          
        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };
      editProduct();
    
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
        <Card title="Editar Producto">
          <form onSubmit={(e) => sendData(e)}>
            <div className="space-y-4">
            
               {/*Nombre*/}
               <Textinput
                onChange={(e) => setNombre(e.target.value)}
                label="Nombre *"
                placeholder="Nombre"
                id="nombre"
                type="text"
                defaultValue={nombre}
                readonly
              />

  
              {/*Stock*/}
              <Textinput
                onChange={(e) => setStock(e.target.value)}
                label="Stock"
                placeholder="Stock"
                id="stock"
                type="number"
                defaultValue={stock}
              />

              {/*Apartado*/}
              <Textinput
                onChange={(e) => setApartado(e.target.value)}
                label="Apartado"
                placeholder="Apartado"
                id="apartado"
                type="number"
                defaultValue={apartado}
              />

              {/*Estropeado*/}
              <Textinput
                onChange={(e) => setEstropeado(e.target.value)}
                label="Estropeado"
                placeholder="Estropeado"
                id="estropeado"
                type="number"
                defaultValue={estropeado}
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

export default ProductosEditarStock;
