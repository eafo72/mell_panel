import React, { useState, useEffect, useContext } from "react";
import Card from "@/components/ui/Card";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { Chart } from "react-google-charts";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  
  const [ventas, setVentas] = useState();

  const [numeroPedidos, setNumeroPedidos] = useState();
  const [ventasTotales, setVentasTotales] = useState();
  
  const [productos, setVentasProducto] = useState();


  const getOrders = async () => {
    
    try {
      
      let res = await clienteAxios.get(`/pedido/ventas`);
      console.log(res.data.ventas);

      //VENTAS
      let array_ventas = [["Mes", "Total", {role:"style"}]];
      let suma_ventas_nov = 0;
      let suma_ventas_dic = 0;
      let total_numero_pedidos = 0;
      let suma_ventas_totales = 0;

      for(let i=0;i<res.data.ventas.length;i++){
        if(res.data.ventas[i].estatus_pago == "Pagado"){
          total_numero_pedidos++;
        }
        for(let ii=0;ii<res.data.ventas[i]['descripcion'].length;ii++){ 
          //formateamos fecha a dd/mm/yyyy
          const combo_fecha = (res.data.ventas[i].fecha).split("-");
          const mes = parseInt(combo_fecha[1]);
          
          if(mes == 11 && res.data.ventas[i].estatus_pago == "Pagado"){
            suma_ventas_nov = suma_ventas_nov + res.data.ventas[i]['descripcion'][ii].total;
            suma_ventas_totales = suma_ventas_totales + res.data.ventas[i]['descripcion'][ii].total 
          }  
          if(mes == 12 && res.data.ventas[i].estatus_pago == "Pagado"){
            suma_ventas_dic = suma_ventas_dic + res.data.ventas[i]['descripcion'][ii].total;
            suma_ventas_totales = suma_ventas_totales + res.data.ventas[i]['descripcion'][ii].total 
          }  

        }
      }

      array_ventas.push(["Noviembre", parseFloat(suma_ventas_nov), "#3ea091"]);
      array_ventas.push(["Diciembre", parseFloat(suma_ventas_dic), "#3ea061"]);

      //console.log(suma_ventas_nov);
      setVentas(array_ventas);
      setNumeroPedidos(total_numero_pedidos);
      setVentasTotales(suma_ventas_totales);


      //PRODUCTOS
      let array_productos = [["Producto", "Total", {role:"style"}]];
      const lista_productos = [];
      for(let i=0;i<res.data.ventas.length;i++){
        for(let ii=0;ii<res.data.ventas[i]['descripcion'].length;ii++){ 
          //formateamos fecha a dd/mm/yyyy
          const olddate = (res.data.ventas[i].fecha).split("-");
          const newdate = olddate[0]+"/"+olddate[1]+"/"+olddate[2];

          lista_productos.push({
            "id":res.data.ventas[i]._id,
            "date":newdate,
            "producto":res.data.ventas[i]['descripcion'][ii].nombre_original,
            "marca":res.data.ventas[i]['descripcion'][ii].marca,
            "categoria":res.data.ventas[i]['descripcion'][ii].categoria,
            "subcategoria":res.data.ventas[i]['descripcion'][ii].subcategoria,
            "talla":res.data.ventas[i]['descripcion'][ii].nombre_talla,
            "color":res.data.ventas[i]['descripcion'][ii].nombre_color,
            "cantidad":res.data.ventas[i]['descripcion'][ii].cantidad,
            "precio":res.data.ventas[i]['descripcion'][ii].precio,
            "total":res.data.ventas[i]['descripcion'][ii].total
          });
        }
      }
      const groupByName = Map.groupBy(lista_productos, product => {
        return product.producto;
      });
      
      //console.log(groupByName); 

      for (const [key, value] of groupByName) {
        let suma = 0;
        for(let jj=0;jj<value.length;jj++){ 
          suma = suma + parseFloat(value[jj].total);
        }
        array_productos.push([key, parseFloat(suma), "#3ea091"]);
      }

      //console.log(array_productos);
      setVentasProducto(array_productos);
      
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <ToastContainer />

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <></>
        <Card title="Dashboard">
          <p>Número total de pedidos: {numeroPedidos}</p>
          <p>Ventas totales: $ {ventasTotales.toFixed(2)}</p>
          <p>Venta promedio: $ {(ventasTotales / numeroPedidos).toFixed(2)}</p>
        </Card>
      </div>
      
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 mt-4">
        
        <Card title="Ventas por mes">
          <Chart 
            chartType="BarChart"
            data={ventas} 
            width="100%" 
            options={{
              //title: "Density of Precious Metals, in g/cm^3",
              //width: 600,
              //height: 400,
              bar: { groupWidth: "95%" },
              legend: { position: "none" },
            }} />
        </Card>
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 mt-4">
        <Card title="Ventas por producto">
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
