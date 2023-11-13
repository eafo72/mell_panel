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

const EstantesAlta = () => {
  const [isDark] = useDarkMode();
  const [nombre, setNombre] = useState();
  const [almacen, setAlmacen] = useState();

  const [allStorages, setAllStorages] = useState([]);
  
  
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

  const getStorages = async () => {
    try {
      let res = await clienteAxios.get(`/almacen/obtener`);

      //console.log(res.data.almacenes);
      let array = [];
      for (let i = 0; i < res.data.almacenes.length; i++) {
        //console.log(i);
        array.push({"value":res.data.almacenes[i]["nombre"],"label":res.data.almacenes[i]["nombre"]});
      }
      setAllStorages(array);
      
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getStorages();
  },[]);

  const sendData = (event) => {
    event.preventDefault();

    //validamos campos
    if(nombre == "" || nombre == undefined) {
      mostrarMensaje("Debes escribir el nombre");
    }else if(almacen == "" || almacen == undefined) {
      mostrarMensaje("Debes seleccionar una almacén");
    } else {
      const createShelf = async (dataForm) => {
        try {
          const res = await clienteAxios.post("/estante/crear", dataForm);
          //console.log(res);
          navigate("/estantes");
          
        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };
      createShelf({ nombre, almacen:almacen.value });
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
        <Card title="Alta de Estantes">
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

               {/*Tipo Almacenes*/}
               <label  className="block capitalize form-label  ">Almacen *</label>
              <Select
                  styles={customStyles}
                  label="Almacén *"
                  placeholder="Seleccione"
                  id="almacen"
                  options={allStorages}
                  value={almacen}
                  onChange={setAlmacen}
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

export default EstantesAlta;
