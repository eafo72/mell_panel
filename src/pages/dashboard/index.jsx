import React, { useState, useEffect, useContext } from "react";
import Card from "@/components/ui/Card";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { Chart } from "react-google-charts";

import { useNavigate } from "react-router-dom";

import clienteAxios from "../../configs/axios";
import { UserContext } from "../context/userContext";

import Datepicker from "react-tailwindcss-datepicker";

const Dashboard = () => {
  
  const [ventas, setVentas] = useState();

  const [numeroPedidosPagados, setNumeroPedidosPagados] = useState(0);
  const [numeroPedidosPendientes, setNumeroPedidosPendientes] = useState(0);


  const [ventasTotales, setVentasTotales] = useState(0);
  const [ventasPendientes, setVentasPendientes] = useState(0);

  const [ventasAPagosPendiente, setVentasAPagosPendiente] = useState(0);
  const [ventasAPagosAbonos, setVentasAPagosAbonos] = useState(0);

  
  const [productos, setVentasProducto] = useState();

  const userCtx = useContext(UserContext);
  const { user } = userCtx;

  const navigate = useNavigate();
  
  //datepicker setup
  const today = new Date();
     
  const [value, setValue] = useState({
    startDate: new Date(today.getFullYear(), today.getMonth(), "01"),
    endDate: new Date(today.getFullYear(), today.getMonth()+1, 0)
  });

  const handleValueChange = newValue => {
    //console.log("newValue:", newValue);
    setValue(newValue);
    getOrders(new Date(newValue.startDate), new Date(newValue.endDate));
  };


  const getOrders = async (inicio,final) => {

    const fecha_inicial = inicio.getFullYear() + "-" + ("0"+(inicio.getMonth()+1)).slice(-2) + "-" + ("0" + inicio.getDate()).slice(-2); 
    const fecha_final = final.getFullYear() + "-" + ("0"+(final.getMonth()+1)).slice(-2) + "-" + ("0" + final.getDate()).slice(-2);     
    
    try {
      
      let res = await clienteAxios.get(`/pedido/ventas`);
      //console.log(res.data.ventas);

      //VENTAS
      let array_ventas = [["Mes", "Total", {role:"style"}]];
      //let suma_ventas_nov = 0;
      //let suma_ventas_dic = 0;
      let total_numero_pedidos_pagados = 0;
      let total_numero_pedidos_pendientes = 0;

      
      let suma_ventas_totales = 0;
      let suma_ventas_pendientes = 0;

      let suma_ventas_a_pagos_abonos = 0;
      let suma_ventas_a_pagos_restante = 0;

      for(let i=0;i<res.data.ventas.length;i++){
        
        for(let ii=0;ii<res.data.ventas[i]['descripcion'].length;ii++){ 
          
          const fecha_pedido = new Date(res.data.ventas[i].fecha);

          /*
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
          */ 
          if( (inicio.getTime() <= (fecha_pedido.getTime())) && (final.getTime() >= fecha_pedido.getTime()) && res.data.ventas[i].estatus_pago == "Pagado"){
            total_numero_pedidos_pagados++;
            suma_ventas_totales = suma_ventas_totales + res.data.ventas[i]['descripcion'][ii].total 
          }
          if( (inicio.getTime() <= (fecha_pedido.getTime())) && (final.getTime() >= fecha_pedido.getTime()) && res.data.ventas[i].estatus_pago == "Pendiente"){
            total_numero_pedidos_pendientes++;
            suma_ventas_pendientes = suma_ventas_pendientes + res.data.ventas[i]['descripcion'][ii].total 

            //suma de las parcialidades
            let total_parcialidades = 0;
            for(let x = 0; x < res.data.ventas[i]['parcialidades'].length; x++ ){

              total_parcialidades = total_parcialidades + res.data.ventas[i]['parcialidades'][x].importe
               
            }
            suma_ventas_a_pagos_abonos = suma_ventas_a_pagos_abonos + total_parcialidades
            suma_ventas_a_pagos_restante = suma_ventas_a_pagos_restante + (res.data.ventas[i]['descripcion'][ii].total - total_parcialidades)

           
          }

        }
      }

      /*
      array_ventas.push(["Noviembre", parseFloat(suma_ventas_nov), "#3ea091"]);
      array_ventas.push(["Diciembre", parseFloat(suma_ventas_dic), "#3ea061"]);
      */
      array_ventas.push(["Del: "+fecha_inicial+" al: "+fecha_final, parseFloat(suma_ventas_totales), "#3ea091"]);
      array_ventas.push(["Pendientes", parseFloat(suma_ventas_pendientes), "#cb3234"]);

      //console.log(suma_ventas_nov);
      setVentas(array_ventas);

      setNumeroPedidosPagados(total_numero_pedidos_pagados);
      setNumeroPedidosPendientes(total_numero_pedidos_pendientes);

      setVentasTotales(suma_ventas_totales);
      setVentasPendientes(suma_ventas_pendientes);

      setVentasAPagosPendiente(suma_ventas_a_pagos_restante)
      setVentasAPagosAbonos(suma_ventas_a_pagos_abonos)


      //PRODUCTOS
      let array_productos = [];
      //console.log(array_productos);
      const lista_productos = [];
      for(let i=0;i<res.data.ventas.length;i++){
        for(let ii=0;ii<res.data.ventas[i]['descripcion'].length;ii++){ 
          
          const fecha_pedido = new Date(res.data.ventas[i].fecha);

          if( (inicio.getTime() <= (fecha_pedido.getTime())) && (final.getTime() >= fecha_pedido.getTime()) && res.data.ventas[i].estatus_pago == "Pagado"){

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
      }
      const groupByName = Map.groupBy(lista_productos, product => {
        return product.producto;
      });
      
      //console.log(groupByName); 
      if(lista_productos.length > 0){
        array_productos.push(["Producto", "Total", {role:"style"}])

        for (const [key, value] of groupByName) {
          let suma = 0;
          for(let jj=0;jj<value.length;jj++){ 
            suma = suma + parseFloat(value[jj].total);
          }
          array_productos.push([key, parseFloat(suma), "#3ea091"]);
        }
  
        //console.log(array_productos);
        setVentasProducto(array_productos);

      }else{
        array_productos.push(["Producto", "Total", {role:"style"}])
        array_productos.push(["", 0, ""]);
        setVentasProducto(array_productos);
      }

      
      
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    if(user && user.tipo == "Punto de venta"){
      navigate("/ventas/ventas_alta")      
    }else if(user && user.tipo == "Almacenista"){
      navigate("/almacenes")
    }else{
      (getOrders(value.startDate,value.endDate)) 
    }
     
  }, [user]);

  return (
    <div>
      <ToastContainer />

      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
        <></>
        <Card title="Dashboard">
          <span>Periodo:
            <Datepicker value={value} onChange={handleValueChange} /> 
          </span>  
          <p>Número total de pedidos pagados: {numeroPedidosPagados}</p>
          <p>Ventas totales: $ {ventasTotales.toFixed(2)}</p>
          <p>Venta promedio: $ {(ventasTotales / numeroPedidosPagados).toFixed(2)}</p>
          <br/>
          <p>Número total de pedidos pendientes: {numeroPedidosPendientes}</p>
          <p>Ventas pendientes: $ {ventasPendientes.toFixed(2)}</p>
          <p>Ventas pendientes (abonos): $ {ventasAPagosAbonos.toFixed(2)}</p>
          <p>Ventas pendientes (restante): $ {ventasAPagosPendiente.toFixed(2)}</p>
                   

        </Card>
      </div>
      
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 mt-4">
        
        <Card title="Ventas por periodo">
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
