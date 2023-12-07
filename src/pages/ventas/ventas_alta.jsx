import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../context/userContext";
import { Label } from "reactstrap";

const VentasAlta = () => {
  const [isDark] = useDarkMode();
  
  
  const [producto, setProducto] = useState();
  const [foto_principal, setFotoPrincipal] = useState();
  const [nombre_original, setNombreOriginal] = useState();
  const [marca, setMarca] = useState();
  const [categoria, setCategoria] = useState();
  const [subcategoria, setSubcategoria] = useState();
  const [talla, setTalla] = useState();
  const [color, setColor] = useState();
  const [precio, setPrecio] = useState();
  const [cantidad, setCantidad] = useState();
  const [subtotal, setSubtotal] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [iva, setIva] = useState(0);
  const porcentaje_iva = .15;
  const [total, setTotal] = useState(0);

  const [costo_envio, setCostoEnvio] = useState(0);


  const [formaPago, setFormaPago] = useState();
  const [parcialidades, setParcialidades] = useState();
  const [solicitarAbono, setSolicitarAbono] = useState(false);
  const [abono, setAbono] = useState();

  const [formaEntrega, setFormaEntrega] = useState();
  const [solicitarDatosEnvio, setSolicitarDatosEnvio] = useState(false);

  const [datos_entrega_nombre, setDatosEntregaNombre] = useState("Mostrador");
  const [datos_entrega_direccion, setDatosEntregaDireccion] = useState();
  const [datos_entrega_correo, setDatosEntregaCorreo] = useState();
  const [datos_entrega_telefono, setDatosEntregaTelefono] = useState();

  const [allProductsInfo, setAllProductsInfo] = useState();  //contiene toda la informacion de productos
  const [allProducts, setAllProducts] = useState(); //contiene solo el value(codigo) y label(nombre) de productos
  const [allSizes, setAllSizes] = useState();
  const [allColors, setAllColors] = useState();

  const [cart, setCart] = useState([]);
 
  const userCtx = useContext(UserContext);
  const { user, authStatus, verifyingToken } = userCtx;

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
    verifyingToken().then(() => {
      //console.log(user);
    });

    if (authStatus === false) {
      //navigate("/");
    }
    getProducts();
  }, [authStatus]);
  

  const handleProductChange = (event) => {
    //console.log(event);
    setProducto({"value":event.value,"label":event.label});
    
    
    for (let i = 0; i < allProductsInfo.length; i++) {
        if(allProductsInfo[i].codigo == event.value){

          setFotoPrincipal(allProductsInfo[i].foto_principal);
          setNombreOriginal(allProductsInfo[i].nombre);
          setMarca(allProductsInfo[i].marca);
          setCategoria(allProductsInfo[i].categoria);
          setSubcategoria(allProductsInfo[i].subcategoria);
          setPrecio(allProductsInfo[i].precio);
          setAllColors(allProductsInfo[i].color);
          setAllSizes(allProductsInfo[i].talla);
        }  
    }
    

  };

  const  handleParcialidades = (e) => {
     setParcialidades(e.target.value);
        
     if(e.target.value > 1){
       setSolicitarAbono(true)
     }else{
       setSolicitarAbono(false)
     }

  }  

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
            setNombreOriginal(allProductsInfo[i].nombre);
            setMarca(allProductsInfo[i].marca);
            setCategoria(allProductsInfo[i].categoria);
            setSubcategoria(allProductsInfo[i].subcategoria);
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
      nombre_original,
      marca,
      categoria,
      subcategoria,
      codigo:producto.value+'-'+talla.value+'-'+color.value,
      codigo_producto:producto.value, 
      nombre_producto:producto.label, 
      codigo_talla:talla.value,
      nombre_talla:talla.label,
      codigo_color:color.value, 
      nombre_color:color.label, 
      cantidad:parseInt(cantidad),
      precio,
      total:parseInt(cantidad) * precio
     }])
     
      let calculo
      if(subtotal > 0){
        calculo = subtotal + (parseInt(cantidad) * parseInt(precio));
      }else{
        calculo = parseInt(cantidad) * parseInt(precio);
      }  


      setSubtotal(parseInt(calculo));
      const desc = parseInt(calculo) * (porcentaje * .01); 
      setDescuento(desc.toFixed(2));

      const total_iva = (parseInt(calculo) - desc) * porcentaje_iva;
      setIva(total_iva.toFixed(2));

      setTotal((parseInt(calculo) - desc + total_iva).toFixed(2));


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

    if(codigo == ''){
      mostrarMensaje("Ingresa un código");
      return;
    }

    try {
      let res = await clienteAxios.get(`/codigo/validar/`+codigo);

      //console.log(res.data.single[0]);

      if(res.data.single.length > 0){
        setPorcentaje(res.data.single[0].porcentaje);
        mostrarAviso("Código encontrado " + res.data.single[0].porcentaje + "% de descuento");

        const descuento = subtotal * (res.data.single[0].porcentaje * .01); 
        setDescuento(descuento.toFixed(2));

        const total_iva = ((subtotal - descuento) * porcentaje_iva);
        setIva(total_iva.toFixed(2));

        setTotal((subtotal - descuento + total_iva).toFixed(2));

      }else{
        mostrarMensaje("Código no encontrado");
        setPorcentaje(0);
        setDescuento(0);

        const total_iva = (subtotal) * porcentaje_iva;
        setIva(total_iva.toFixed(2));

        setTotal((subtotal + total_iva).toFixed(2));


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
      }else if(parcialidades == "" || parcialidades == undefined) {
        mostrarMensaje("Debes escribir el número de parcialidades");    
      }else if(formaEntrega == "" || formaEntrega == undefined) {
        mostrarMensaje("Debes seleccionar una forma de entrega");   
      }else if(solicitarDatosEnvio == true && (costo_envio == "" || costo_envio == undefined)) {
        mostrarMensaje("Debes escribir el costo de envío");    
      }else if(solicitarDatosEnvio == true && (datos_entrega_nombre == "" || datos_entrega_nombre == undefined)) {
        mostrarMensaje("Debes escribir el nombre en datos de entrega");    
      
      }else if(solicitarDatosEnvio == true && (datos_entrega_direccion == "" || datos_entrega_direccion == undefined)) {
        mostrarMensaje("Debes escribir la direccion en datos de entrega");    
      
      }else if(solicitarDatosEnvio == true && (datos_entrega_correo == "" || datos_entrega_correo == undefined)) {
        mostrarMensaje("Debes escribir el correo en datos de entrega");    
      
      }else if(solicitarDatosEnvio == true && (datos_entrega_telefono == "" || datos_entrega_telefono == undefined)) {
        mostrarMensaje("Debes escribir el teléfono en datos de entrega");      
      } else {

        
        const createSell = async (dataForm) => {
         try {
            const res = await clienteAxios.post("/pedido/crear", dataForm);
            //console.log(res);

            var container = document.getElementById("div-cart");
            var printWindow = window.open('', 'PrintMap');
            printWindow.document.writeln(container.innerHTML);
            printWindow.document.close();
            printWindow.print();
            printWindow.close();

            
            //navigate("/ventas/ventas_alta");
            navigate(0);
          
          } catch (error) {
            console.log(error);
            mostrarMensaje(error.response.data.msg);
          }
        };

        let estatus_pago = "";
        if(parcialidades > 1){
          estatus_pago = "Pendiente"
        }else{
          estatus_pago = "Pagado"
        }

        let estatus_envio = "";
        if(formaEntrega.value == "Tienda"){
          estatus_envio = "Entregado"
        }else{
          estatus_envio = "Pendiente"
        }

        createSell({ 
          tipo_venta:"Mostrador",
          subtotal,
          descuento,
          iva,
          total,
          descripcion:cart,
          usuario:"Mostrador",
          entregar_a:datos_entrega_nombre,
          correo:datos_entrega_correo,
          direccion_entrega:datos_entrega_direccion,
          costo_envio:parseFloat(costo_envio),
          telefono:datos_entrega_telefono,
          estatus_pago,
          estatus_envio,
          vendedor:user.nombre,
          forma_entrega:formaEntrega.value,
          forma_pago:formaPago.value,
          num_parcialidades:parcialidades,
          parcialidades:parseFloat(abono)
        });
        
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
                <th>I.V.A.</th>
                <th align="left">$ {iva}</th>
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
                      onChange={handleParcialidades}
                      placeholder="Núm. de pagos"
                      id="parcialidades"
                      type="number"
                    />
                    </div>

                    <div style={solicitarAbono == true ? {display:"block"} : {display:"none"} }>
                      <div style={{display: 'flex', flexDirection: 'row'}}>

                        {/*Abono*/}
                        <Label style={{textAlign:"start", alignSelf:"end"}}>Importe Parcialidad</Label>
                        <Textinput
                          onChange={(e) => setAbono(e.target.value)}
                          placeholder="Importe"
                          id="abono"
                          type="number"
                        />
                      </div>
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

                    <div style={solicitarDatosEnvio == true ? {display:"block"} : {display:"none"}} className="mt-4">

                      {/*Costo envio:*/}
                      <Textinput
                      onChange={(e) => setCostoEnvio(e.target.value)}
                      placeholder="Costo de envío"
                      id="costo_envio"
                      type="number"
                      />

                      <Label className="mt-2">Datos de Entrega</Label>

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

      {/*ticket*/}
      <div id="div-cart" style={{display:"none"}}>
      <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>

              {cart && cart.map((row,i) => {
                    return (
                      <tr key={i}>
                        {
                          <>
                          <td>
                              {row.nombre_producto}
                          </td>
                          <td align="center">
                            {row.cantidad}
                          </td>
                          <td align="center">
                           $ {row.precio}
                          </td>
                          <td align="right">
                           $ {row.total}
                          </td>
                          </>
                        }
                      </tr>
                    );
                  })}
            </tbody>
            {cart.length > 0 ? (
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th>Subtotal</th>
                <th align="right">$ {subtotal}</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>Descuento</th>
                <th align="right">$ {descuento}</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>I.V.A.</th>
                <th align="right">$ {iva}</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th>Total</th>
                <th align="right">$ {total}</th>
              </tr>
            </tfoot>
            ):
            (
              <></>
            )
            }
          </table>
      </div>
     
    </>
  );
};

export default VentasAlta;
