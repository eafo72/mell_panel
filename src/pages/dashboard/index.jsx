import React, { useState, useEffect, useContext } from "react";
import Card from "@/components/ui/Card";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { Chart } from "react-google-charts";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const userCtx = useContext(UserContext);
  const { user, authStatus, verifyingToken } = userCtx;

  const [ventas, setVentasMes] = useState();
  const [productos, setToursMes] = useState();

  const [loading, setLoading] = useState(true);

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

  

  useEffect(() => {
    verifyingToken().then(() => {
      setLoading(false);
     
    });
    if (authStatus === false) {
      //navigate("/");
    }
   
    
  }, [authStatus]);

  return (
    <div>
      <ToastContainer />

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <></>
        <Card title="Dashboard"></Card>
      </div>
      
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Ventas por mes">
          <Chart 
            chartType="BarChart"
            data={ventas} 
            width="100%" 
            options={{
              //title: "Density of Precious Metals, in g/cm^3",
              //width: 600,
              //height: 400,
              //bar: { groupWidth: "95%" },
              legend: { position: "none" },
            }} />
        </Card>
        <Card title="Productos vendidos">
          <Chart
            chartType="BarChart"
            data={productos}
            width="100%"
            options={{
              //title: "Density of Precious Metals, in g/cm^3",
              //width: 600,
              //height: 400,
              //bar: { groupWidth: "95%" },
              legend: { position: "none" },
            }}
          />
        </Card>
      </div>
     
    </div>
  );
};

export default Dashboard;
