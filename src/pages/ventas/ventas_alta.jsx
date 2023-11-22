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
import { Label } from "reactstrap";

const VentasAlta = () => {
  const [isDark] = useDarkMode();
  
  
  const [producto, setProducto] = useState();
  const [foto_principal, setFotoPrincipal] = useState();
  const [talla, setTalla] = useState();
  const [color, setColor] = useState();
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);

  const [formaPago, setFormaPago] = useState();
  const [parcialidades, setParcialidades] = useState();

  const [formaEntrega, setFormaEntrega] = useState();
  const [solicitarDatosEnvio, setSolicitarDatosEnvio] = useState(false);

  const [datos_entrega_nombre, setDatosEntregaNombre] = useState();
  const [datos_entrega_direccion, setDatosEntregaDireccion] = useState();
  const [datos_entrega_correo, setDatosEntregaCorreo] = useState();
  const [datos_entrega_telefono, setDatosEntregaTelefono] = useState();

  const [allProductsInfo, setAllProductsInfo] = useState();  //contiene toda la informacion de productos
  const [allProducts, setAllProducts] = useState(); //contiene solo el value(codigo) y label(nombre) de productos
  const [allSizes, setAllSizes] = useState();
  const [allColors, setAllColors] = useState();

  const [cart, setCart] = useState([]);
 
  
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

  const mostrarAviso = (mensaje) => {
    toast.success(mensaje, {
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

  const allFormasPago = [
    {"value":"Mercado Pago","label":"Mercado Pago"},
    {"value":"Transferencia","label":"Transferencia"},
    {"value":"Efectivo","label":"Efectivo"}
  ];

  const allFormasEntrega = [
    {"value":"Tienda","label":"Tienda"},
    {"value":"Envío foráneo","label":"Envío foráneo"},
    {"value":"Envío ciudad","label":"Envío ciudad"}
  ];


  const getProducts = async () => {
    try {
      let res = await clienteAxios.get(`/producto/obtener`);

      //console.log(res.data.productos);
      setAllProductsInfo(res.data.productos);

      let array = [];
      for (let i = 0; i < res.data.productos.length; i++) {
        //console.log(i);
        array.push({"value":res.data.productos[i]["codigo"],"label":res.data.productos[i]["nombre"]+"/"+res.data.productos[i]["marca"]});
      }
      setAllProducts(array);
      
    } catch (error) {
      console.log(error);
    }
  };
 
  
  useEffect(() => {
    getProducts();
  }, []);

  const handleProductChange = (event) => {
    //console.log(event);
    setProducto({"value":event.value,"label":event.label});
    
    
    for (let i = 0; i < allProductsInfo.length; i++) {
        if(allProductsInfo[i].codigo == event.value){

          setFotoPrincipal(allProductsInfo[i].foto_principal);
          setPrecio(allProductsInfo[i].precio);

          setAllColors(allProductsInfo[i].color);
          setAllSizes(allProductsInfo[i].talla);
        }  
    }
    

  };

  const handleFormaEntregaChange = (event) => {
    //console.log(event);
    setFormaEntrega({"value":event.value,"label":event.label});
        
    if(event.value == "Envío foráneo" || event.value == "Envío ciudad"){
      setSolicitarDatosEnvio(true)

    }else{
      setSolicitarDatosEnvio(false)
    }

  };



  const setfillBlanks = (value) => {
    const combo = value.split("-");
    const product_code = combo[0];
    const size_code = combo[1];
    const color_code = combo[2];

    for (let i = 0; i < allProductsInfo.length; i++) {
      if(allProductsInfo[i].codigo == product_code){

        //producto
        setProducto({"value":product_code, "label": allProductsInfo[i].nombre+'/'+allProductsInfo[i].marca});
        
        for (let i = 0; i < allProductsInfo.length; i++) {
          if(allProductsInfo[i].codigo == product_code){
  
            setFotoPrincipal(allProductsInfo[i].foto_principal);
            setPrecio(allProductsInfo[i].precio);
  
            setAllColors(allProductsInfo[i].color);
            setAllSizes(allProductsInfo[i].talla);
          }  
        }


        //talla
        for (let ii = 0; ii < allProductsInfo[i].talla.length; ii++) {
          if(allProductsInfo[i].talla[ii].value == size_code){
            setTalla({"value":size_code, "label": allProductsInfo[i].talla[ii].label });
          }
        }  

        //color
        for (let iii = 0; iii < allProductsInfo[i].color.length; iii++) {
          if(allProductsInfo[i].color[iii].value == color_code){
            setColor({"value":color_code, "label": allProductsInfo[i].color[iii].label });
          }
        }  
       
      }  
    }
    
  
  };  

  const addToCart = (event) => {
    event.preventDefault();

     //validamos campos
    if(producto == "" || producto == undefined) {
      mostrarMensaje("Debes seleccionar un producto");
    }else if(talla == "" || talla == undefined) {
      mostrarMensaje("Debes seleccionar una talla");
    }else if(color == "" || color == undefined) {
      mostrarMensaje("Debes seleccionar un color");
    }else if(cantidad == "" || cantidad == undefined) {
      mostrarMensaje("Debes escribir una cantidad");    
    } else {

      setCart(cart => [...cart, { 
      foto_principal,
      codigo:producto.value+'-'+talla.value+'-'+color.value,
      codigo_producto:producto.value, 
      nombre_producto:producto.label, 
      codigo_talla:talla.value,
      nombre_talla:talla.label,
      codigo_color:color.value, 
      nombre_color:color.label, 
      cantidad,
      precio,
      total:cantidad * precio
     }])
     
      let calculo
      if(subtotal > 0){
        calculo = subtotal + (parseInt(cantidad) * parseInt(precio));
      }else{
        calculo = parseInt(cantidad) * parseInt(precio);
      }  


      setSubtotal(parseInt(calculo));
      const desc = parseInt(calculo) * (porcentaje * .01); 
      setDescuento(desc);
      setTotal(parseInt(calculo) - desc);


      setFotoPrincipal(null);
      setProducto(null);
      setTalla(null);
      setColor(null);
      setPrecio(null);
      setCantidad(null);

      document.getElementById("codigo").value = null;
      document.getElementById("cantidad").value = null;

    }  
  };

  const findDiscount = async () => {
    const codigo = document.getElementById("codigo_descuento").value;

    try {
      let res = await clienteAxios.get(`/codigo/validar/`+codigo);

      //console.log(res.data.single[0]);

      if(res.data.single.length > 0){
        setPorcentaje(res.data.single[0].porcentaje);
        mostrarAviso("Código encontrado " + res.data.single[0].porcentaje + "% de descuento");

        const descuento = subtotal * (res.data.single[0].porcentaje * .01); 
        setDescuento(descuento);

        setTotal(subtotal - descuento);

      }else{
        mostrarMensaje("Código no encontrado");
        setPorcentaje(0);
        setDescuento(0);
        setTotal(subtotal);


      }  
                 
    } catch (error) {
      console.log(error);
    }

  };

  const sendData = (event) => {
    event.preventDefault();

      //validamos campos
      if(formaPago == "" || formaPago == undefined) {
        mostrarMensaje("Debes seleccionar una forma de pago");
      }else if(formaEntrega == "" || formaEntrega == undefined) {
        mostrarMensaje("Debes seleccionar uan forma de entrega");    
      } else {

        
        const createSell = async (dataForm) => {
         try {
            const res = await clienteAxios.put("/venta/crear", dataForm);
            //console.log(res);
            navigate("/ventas/alta");
          
          } catch (error) {
            console.log(error);
            mostrarMensaje(error.response.data.msg);
          }
        };
        createSell({ producto:producto.value, talla:talla.value, color:color.value, cantidad });
        
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
      <div className="grid grid-cols-1 gap-5">
        <Card title="Venta">
          <form onSubmit={(e) => addToCart(e)}>
            <div className="space-y-4">
            
              {/*Codigo*/}
              <Textinput
                onChange={(e) => setfillBlanks(e.target.value)}
                placeholder="Código"
                id="codigo"
                type="text"
              />

             {/*Producto*/}
              <Select
                  styles={customStyles}
                  label="Producto *"
                  placeholder="Seleccione un producto"
                  id="producto"
                  options={allProducts}
                  value={producto}
                  onChange={handleProductChange}
                  isSearchable={true}
              ></Select>

              {/*Talla*/}
              <Select
                  styles={customStyles}
                  label="Talla *"
                  placeholder="Seleccione una talla"
                  id="talla"
                  options={allSizes}
                  value={talla}
                  onChange={setTalla}
                  isSearchable={true}
              ></Select>


              {/*Color*/}
              <Select
                  styles={customStyles}
                  label="Color *"
                  placeholder="Seleccione un color"
                  id="color"
                  options={allColors}
                  value={color}
                  onChange={setColor}
                  isSearchable={true}
              ></Select>
           

              {/*Cantidad*/}
              <Textinput
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Cantidad"
                id="cantidad"
                type="number"
              />

              

              <div className=" space-y-4">
                <Button text="Añadir a carrito" type="submit" className="btn-success" />
              </div>
            </div>
          </form>
        </Card>
      
        <Card title="Carrito de Compras">
          <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className=" border-t border-slate-100 dark:border-slate-800">
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">

              {cart && cart.map((row,i) => {
                    return (
                      <tr key={i}>
                        {
                          <>
                          <td></td>
                          <td className="table-td">
                              <img src={row.foto_principal} style={{width:"60px", height: "60px"}}/>
                          </td>
                          <td className="table-td">
                              <h4>{row.nombre_producto}</h4>
                              <h6>Código: {row.codigo}</h6>
                              <h6>Talla: {row.nombre_talla}</h6>
                              <h6>Color: {row.nombre_color}</h6>
                          </td>
                          <td className="table-td">
                            {row.cantidad}
                          </td>
                          <td className="table-td">
                           $ {row.precio}
                          </td>
                          <td className="table-td">
                           $ {row.total}
                          </td>
                          </>
                        }
                      </tr>
                    );
                  })}
            </tbody>
            {cart.length > 0 ? (
            <tfoot className=" border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Subtotal</th>
                <th align="left">$ {subtotal}</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Descuento</th>
                <th align="left">$ {descuento}</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Total</th>
                <th align="left">$ {total}</th>
              </tr>
              <tr>
                <th colSpan={2}>
                  <div style={{padding:"10px"}}>
                <Textinput
                onChange={(e) => setCantidad(e.target.value)}
                label="Código de descuento"
                placeholder="Código"
                id="codigo_descuento"
                type="text"
              />
              <Button text="Aplicar" onClick={(e) => findDiscount()} className="btn-success mt-4" />
              </div>
              </th>
              <th></th>
                <th colSpan={3}>
                  <form onSubmit={(e) => sendData(e)} className="mt-4">

                    {/*forma pago*/}
                    <Select
                      styles={customStyles}
                      label="Forma de Pago *"
                      placeholder="Seleccione una forma de pago"
                      id="forma_pago"
                      options={allFormasPago}
                      value={formaPago}
                      onChange={setFormaPago}
                      isSearchable={true}
                    ></Select>

                    <div style={{display: 'flex', flexDirection: 'row'}}>

                    {/*Parcialidades*/}
                    <Label style={{textAlign:"start", alignSelf:"end"}}>Parcialidades</Label>
                    <Textinput
                      onChange={(e) => setParcialidades(e.target.value)}
                      placeholder="Núm. de pagos"
                      id="parcialidades"
                      type="number"
                    />
                    </div>

                    {/*forma entrega*/}
                    <Select
                      styles={customStyles}
                      label="Forma de Entrega *"
                      placeholder="Seleccione una forma de entrega"
                      id="forma_entrega"
                      options={allFormasEntrega}
                      value={formaEntrega}
                      onChange={handleFormaEntregaChange}
                      isSearchable={true}
                    ></Select>

                    <div style={solicitarDatosEnvio == true ? {display:"block"} : {display:"none"} }>
                      <Label>Datos de Entrega</Label>

                      {/*Entregar a:*/}
                      <Textinput
                      onChange={(e) => setDatosEntregaNombre(e.target.value)}
                      placeholder="Entregar a:"
                      id="datos_entrega_nombre"
                      type="text"
                      />

                      {/*Direccion de entrega*/}
                      <Textarea
                      onChange={(e) => setDatosEntregaDireccion(e.target.value)}
                      placeholder="Dirección"
                      id="datos_entrega_direccion"
                      type="text"
                      />

                      <Textinput
                      onChange={(e) => setDatosEntregaCorreo(e.target.value)}
                      placeholder="Correo"
                      id="datos_entrega_correo"
                      type="email"
                      />

                      <Textinput
                      onChange={(e) => setDatosEntregaTelefono(e.target.value)}
                      placeholder="Teléfono"
                      id="datos_entrega_telefono"
                      type="tel"
                      />


                    </div>
                    

                    <Button text="Pagar" type="submit" className="btn-success mt-4" />
                  </form>
                </th>
              </tr>
            </tfoot>
            ):
            (
              <></>
            )
            }
          </table>
        </Card>
      </div>  
      
    </>
  );
};

export default VentasAlta;
