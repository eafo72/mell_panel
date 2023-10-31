import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "react-select";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";

const UsuariosEditar = () => {
  const [isDark] = useDarkMode();

  const [nombre, setNombre] = useState();
  const [apellidoPaterno, setApellidoPaterno] = useState();
  const [apellidoMaterno, setApellidoMaterno] = useState();
  const [correo, setCorreo] = useState();
  const [telefono, setTelefono] = useState();

  const [asistePresencial, setAsistePresencial] = useState();
  const [asisteVirtual, setAsisteVirtual] = useState();

  const opcionesAsistencia = [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" }
  ];

  
  
  const id = localStorage.getItem("EditUser");

  const getUser = async () => {
    try {
      const res = await clienteAxios.post("/user/get",  { user_id:id });
      console.log(res.data.data.user);
      
      setNombre(res.data.data.user.first_name);
      setApellidoPaterno(res.data.data.user.last_name);
      setApellidoMaterno(res.data.data.user.second_surname);
      setCorreo(res.data.data.user.email);
      setTelefono(res.data.data.user.phone);

      if(res.data.data.user.asiste_presencial != null){
        setAsistePresencial({
          label: res.data.data.user.asiste_presencial,
          value: res.data.data.user.asiste_presencial,
        }); 
      }  

      if(res.data.data.user.asiste_virtual != null){
        setAsisteVirtual({
          label: res.data.data.user.asiste_virtual,
          value: res.data.data.user.asiste_virtual,
        }); 
      }  
      
    } catch (error) {
      console.log(error);
      mostrarMensaje(error.code);
    }
  };

  useEffect(() => {
  getUser();
  }, []);

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

  const sendData = (event) => {
    event.preventDefault();

    //validamos campos
    if(nombre == "" || nombre == undefined) {
      mostrarMensaje("Debes escribir al menos un nombre");
    }else if(apellidoPaterno == "" || apellidoPaterno == undefined) {
      mostrarMensaje("Debes escribir el apellido paterno");
    }else if(apellidoMaterno == "" || apellidoMaterno == undefined) {
      mostrarMensaje("Debes escribir el apellido materno");  
    }else if(correo == "" || correo == undefined) {
      mostrarMensaje("Debes escribir un correo");
    }else if(telefono == "" || telefono == undefined) {
      mostrarMensaje("Debes escribir un teléfono");  
    } else if (asistePresencial == "" || asistePresencial == undefined) {
      mostrarMensaje("Debes seleccionar si asiste al evento presencial");  
    } else if (asisteVirtual == "" || asisteVirtual == undefined) {
      mostrarMensaje("Debes seleccionar si asiste al evento virtual");  
    } else {
      const editUser = async () => {
        try {
          const res = await clienteAxios.post("/user/update", {
            user_id:id,
            first_name:nombre,
            last_name:apellidoPaterno,
            second_surname:apellidoMaterno,
            phone:telefono,
            email:correo,
            asiste_presencial:asistePresencial.value,
            asiste_virtual:asisteVirtual.value
          });
          console.log(res);
          navigate("/usuarios");
          
        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };
      editUser();
    }
  };

   const customStyles = {
    control: (base, state) => ({
      ...base,
      background: isDark
        ? "rgb(15 23 42 / var(--tw-bg-opacity))"
        : "transparent",
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
        <Card title="Editar Usuario">
          <form onSubmit={(e) => sendData(e)}>
            <div className="space-y-4">
              {/*Nombres*/}
              <Textinput
                onChange={(e) => setNombre(e.target.value)}
                label="Nombre *"
                placeholder="Nombre"
                id="nombres"
                type="text"
                defaultValue={nombre}
              />

              {/*Apellido Paterno*/}
              <Textinput
                onChange={(e) => setApellidoPaterno(e.target.value)}
                label="Apellido Paterno*"
                placeholder="Apellido Paterno"
                id="apellidoP"
                type="text"
                defaultValue={apellidoPaterno}
              />

              {/*Apellido Materno*/}
              <Textinput
                onChange={(e) => setApellidoMaterno(e.target.value)}
                label="Apellidos Materno *"
                placeholder="Apellido Materno"
                id="apellidoM"
                type="text"
                defaultValue={apellidoMaterno}
              />

              

              {/*telefono*/}
              <Textinput
                onChange={(e) => setTelefono(e.target.value)}
                label="Teléfono *"
                placeholder="Teléfono"
                id="telefono"
                type="tel"
                defaultValue={telefono}
              />


              {/*correo*/}
              <Textinput
                onChange={(e) => setCorreo(e.target.value)}
                label="Correo *"
                placeholder="Correo"
                id="correo"
                type="email"
                defaultValue={correo}
              />

              {/*Asiste Presencial*/}
              <label  className="block capitalize form-label  ">Asiste Presencial *</label>
              <Select
                  styles={customStyles}
                  label="Asiste a evento presencial *"
                  placeholder="Seleccione una opcion"
                  id="evento_presencial"
                  options={opcionesAsistencia}
                  value={asistePresencial}
                  onChange={setAsistePresencial}
                  isSearchable={false}
                ></Select>  

              {/*Asiste Virtual*/}
              <label  className="block capitalize form-label  ">Asiste Virtual *</label>
              <Select
                  styles={customStyles}
                  label="Asiste a evento virtual *"
                  placeholder="Seleccione una opcion"
                  id="evento_virtual"
                  options={opcionesAsistencia}
                  value={asisteVirtual}
                  onChange={setAsisteVirtual}
                  isSearchable={false}
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

export default UsuariosEditar;
