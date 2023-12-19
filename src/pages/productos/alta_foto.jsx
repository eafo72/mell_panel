import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";

import { Cropper, getCroppedImg } from 'react-cropper-custom';
import "react-cropper-custom/dist/index.css";

const FotosAlta = () => {
  const [image, setImage] = useState();
  const [fotos, setFotos] = useState([]);

  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);

  
  const [croppedImage, setCroppedImage] = useState();


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

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onCropComplete = async (croppedArea) => {
    try {
      const newimage = await getCroppedImg(URL.createObjectURL(image), croppedArea, { width: 1200, height: 1200 * aspect });
      setCroppedImage(newimage); //save image64 cropped image
    } catch (e) {
      console.error(e);
    }
  };

  const goFoto = (idFoto) => {
    localStorage.setItem("DeletePhoto",idFoto);
    navigate("/productos/borrar_foto");
  }

  const sendData = async (event) => {
    event.preventDefault();

    //validamos campos
    if (image == "" || image == undefined) {
      mostrarMensaje("Debes seleccionar un archivo");  
    } else {

        const createPhoto = async (dataForm) => {
          try {

            const res = await clienteAxios.put("/producto/fotobase64", dataForm);
          
  
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
        createPhoto({id, name:image.name, imgbase64:croppedImage});

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
                onChange={(e) => imageChange(e)} 
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
          {image && (
            <Cropper
              src={URL.createObjectURL(image)}
              width={400}
              height={600}
              zoom={zoom}
              aspect={aspect}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            )}  
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
