import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";

const FotosAlta = () => {
  const [image, setImage] = useState();
  const [fotos, setFotos] = useState([]);


  const id = localStorage.getItem("PhotoProduct");

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

  const getFotos = async () => {
    try {
      const res = await clienteAxios.get("/producto/single/"+id);
      //console.log(res.data.single.fotos_carrusel);
      setFotos(res.data.single.fotos_carrusel);
    } catch (error) {
      console.log(error);
      toast.error(error.code, {
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
  };

  useEffect(() => {
    getFotos();
  }, []);

  const goFoto = (idFoto) => {
    localStorage.setItem("DeletePhoto",idFoto);
    navigate("/productos/borrar_foto");
  }

  const sendData = (event) => {
    event.preventDefault();

    //validamos campos
    if (image == "" || image == undefined) {
      mostrarMensaje("Debes seleccionar un archivo");  
    } else {
      const createPhoto = async (dataForm) => {
        try {
          const res = await clienteAxios({
            method: "put",
            url: "/producto/foto",
            data: dataForm,
            headers: { "Content-Type": "multipart/form-data" },
          });
         

          //console.log(res);
          toast.success("Foto guardada", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          document.getElementById("image").value = null;
          getFotos();



        } catch (error) {
          console.log(error);
          toast.error(error.code, {
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
      };
      createPhoto({ id, image });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
           
        <Card title="Alta de Fotos">
          <form onSubmit={(e) => sendData(e)}>
            <div className="space-y-4">
              {/*thumb*/}
              <Textinput
                onChange={(e) => setImage(e.target.files[0])}
                label="Foto *"
                placeholder="Foto"
                id="image"
                type="file"
              />

              <div className=" space-y-4">
                <p>* Campos requeridos</p>
                <Button text="Guardar" type="submit" className="btn-dark" />
              </div>
              
            </div>
          </form>
        </Card>
        <Card title="Carrusel">
            <div className="grid grid-cols-4 gap-5">
                {fotos.map((item, i) => {
                    return <div key={i}><button onClick={() => goFoto(i)} ><img  alt={item.image} src={item.image} className="w-full h-full" /></button></div>;
                })}
           </div>
        </Card> 
      </div>
    </>
  );
};

export default FotosAlta;
