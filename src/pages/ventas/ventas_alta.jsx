import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
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

import "./Print_styles.css";

import { useReactToPrint } from "react-to-print";

import { Payment } from "@mercadopago/sdk-react";

import { initMercadoPago } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-84f2c42a-e204-46f0-8dda-57e08f7579a9", {
  locale: "es-MX",
}); //'YOUR_PUBLIC_KEY')

const VentasAlta = () => {
  const [isDark] = useDarkMode();

  const [tipo_venta, setTipoVenta] = useState("Mostrador");

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
  //const porcentaje_iva = .15;
  const porcentaje_iva = 0;
  const [total, setTotal] = useState(0);

  const [costo_envio, setCostoEnvio] = useState(0);

  const [formaPago, setFormaPago] = useState({
    value: "Efectivo",
    label: "Efectivo",
  });
  const [parcialidades, setParcialidades] = useState(1);
  const [solicitarAbono, setSolicitarAbono] = useState(false);
  const [abono, setAbono] = useState();

  const [formaEntrega, setFormaEntrega] = useState({
    value: "Directo en Tienda",
    label: "Directo en Tienda",
  });
  const [solicitarDatosEnvio, setSolicitarDatosEnvio] = useState(false);

  const [datos_entrega_nombre, setDatosEntregaNombre] = useState("Mostrador");
  const [datos_entrega_direccion, setDatosEntregaDireccion] = useState();
  const [datos_entrega_correo, setDatosEntregaCorreo] = useState();
  const [datos_entrega_telefono, setDatosEntregaTelefono] = useState();

  const [allProductsInfo, setAllProductsInfo] = useState(); //contiene toda la informacion de productos
  const [allProducts, setAllProducts] = useState(); //contiene solo el value(codigo) y label(nombre) de productos
  const [allSizes, setAllSizes] = useState();
  const [allColors, setAllColors] = useState();

  const [cart, setCart] = useState([]);

  const [viewMPbutton, setViewMPbutton] = useState(false);
  const [viewContinuebutton, setViewContinuebutton] = useState(true);

  const [preferenceId, setPreferenceId] = useState(null);

  //estados del ticket de prueba
  const [device, setDevice] = useState(null);
  const [message, setMessage] = useState("");

  const printArea = useRef();

  const handlePrint = useReactToPrint({
    content: () => printArea.current,
    onAfterPrint: () => navigate(0),
  });

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
    { value: "Mercado Pago", label: "Mercado Pago" },
    { value: "Transferencia", label: "Transferencia" },
    { value: "Efectivo", label: "Efectivo" },
  ];

  const allFormasEntrega = [
    { value: "Directo en Tienda", label: "Directo en Tienda" },
    {
      value: "Paquetería fuera de Cuernavaca",
      label: "Paquetería fuera de Cuernavaca",
    },
    { value: "Envío por DiDi", label: "Envío por DiDi" },
    {
      value: "Entrega directa Jiutepec, Jojutla, Cuernavaca",
      label: "Entrega directa Jiutepec, Jojutla, Cuernavaca",
    },
  ];

  const getProducts = async () => {
    try {
      let res = await clienteAxios.get(`/producto/obtener`);

      //console.log(res.data.productos);
      setAllProductsInfo(res.data.productos);

      let array = [];
      for (let i = 0; i < res.data.productos.length; i++) {
        //console.log(i);
        array.push({
          value: res.data.productos[i]["codigo"],
          label:
            res.data.productos[i]["nombre"] +
            "/" +
            res.data.productos[i]["marca"],
        });
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
    setProducto({ value: event.value, label: event.label });

    for (let i = 0; i < allProductsInfo.length; i++) {
      if (allProductsInfo[i].codigo == event.value) {
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

  const handleParcialidades = (e) => {
    setParcialidades(e.target.value);

    if (e.target.value > 1) {
      setSolicitarAbono(true);
    } else {
      setSolicitarAbono(false);
    }
  };

  const handleFormaEntregaChange = (event) => {
    //console.log(event);
    setFormaEntrega({ value: event.value, label: event.label });

    if (
      event.value == "Paquetería fuera de Cuernavaca" ||
      event.value == "Envío por DiDi" ||
      event.value == "Entrega directa Jiutepec, Jojutla, Cuernavaca"
    ) {
      setSolicitarDatosEnvio(true);
    } else {
      setSolicitarDatosEnvio(false);
    }
  };

  const setfillBlanks = (value) => {
    const combo = value.split("-");
    const product_code = combo[0];
    const size_code = combo[1];
    const color_code = combo[2];

    for (let i = 0; i < allProductsInfo.length; i++) {
      if (allProductsInfo[i].codigo == product_code) {
        //producto
        setProducto({
          value: product_code,
          label: allProductsInfo[i].nombre + "/" + allProductsInfo[i].marca,
        });

        for (let i = 0; i < allProductsInfo.length; i++) {
          if (allProductsInfo[i].codigo == product_code) {
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
          if (allProductsInfo[i].talla[ii].value == size_code) {
            setTalla({
              value: size_code,
              label: allProductsInfo[i].talla[ii].label,
            });
          }
        }

        //color
        for (let iii = 0; iii < allProductsInfo[i].color.length; iii++) {
          if (allProductsInfo[i].color[iii].value == color_code) {
            setColor({
              value: color_code,
              label: allProductsInfo[i].color[iii].label,
            });
          }
        }
      }
    }
  };

  const addToCart = (event) => {
    event.preventDefault();

    //validamos campos
    if (producto == "" || producto == undefined) {
      mostrarMensaje("Debes seleccionar un producto");
    } else if (talla == "" || talla == undefined) {
      mostrarMensaje("Debes seleccionar una talla");
    } else if (color == "" || color == undefined) {
      mostrarMensaje("Debes seleccionar un color");
    } else if (cantidad == "" || cantidad == undefined) {
      mostrarMensaje("Debes escribir una cantidad");
    } else {
      setCart((cart) => [
        ...cart,
        {
          foto_principal,
          nombre_original,
          marca,
          categoria,
          subcategoria,
          codigo: producto.value + "-" + talla.value + "-" + color.value,
          codigo_producto: producto.value,
          nombre_producto: producto.label,
          codigo_talla: talla.value,
          nombre_talla: talla.label,
          codigo_color: color.value,
          nombre_color: color.label,
          cantidad: parseInt(cantidad),
          precio,
          total: parseInt(cantidad) * precio,
        },
      ]);

      let calculo;
      if (subtotal > 0) {
        calculo = parseFloat(subtotal) + parseInt(cantidad) * parseInt(precio);
      } else {
        calculo = parseInt(cantidad) * parseInt(precio);
      }

      setSubtotal(parseFloat(calculo).toFixed(2));
      const desc = parseFloat(calculo) * (porcentaje * 0.01);
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

  const removeCartItem = (index) => {
    let calculo;
    calculo =
      parseFloat(subtotal) -
      parseInt(cart[index]["cantidad"]) * parseInt(cart[index]["precio"]);

    setSubtotal(parseFloat(calculo).toFixed(2));

    const desc = parseFloat(calculo) * (porcentaje * 0.01);
    setDescuento(desc.toFixed(2));

    const total_iva = (parseInt(calculo) - desc) * porcentaje_iva;
    setIva(total_iva.toFixed(2));

    setTotal((parseInt(calculo) - desc + total_iva).toFixed(2));

    const newCart = cart.filter((item, idx) => idx != index);
    setCart(newCart);
  };

  const findDiscount = async () => {
    const codigo = document.getElementById("codigo_descuento").value;

    if (codigo == "") {
      mostrarMensaje("Ingresa un código");
      return;
    }

    try {
      let res = await clienteAxios.get(`/codigo/validar/` + codigo);

      //console.log(res.data.single[0]);

      if (res.data.single.length > 0) {
        setPorcentaje(res.data.single[0].porcentaje);
        mostrarAviso(
          "Código encontrado " +
            res.data.single[0].porcentaje +
            "% de descuento"
        );

        const descuento = subtotal * (res.data.single[0].porcentaje * 0.01);
        setDescuento(descuento.toFixed(2));

        const total_iva = (subtotal - descuento) * porcentaje_iva;
        setIva(total_iva.toFixed(2));

        setTotal((subtotal - descuento + total_iva).toFixed(2));
      } else {
        mostrarMensaje("Código no encontrado");
        setPorcentaje(0);
        setDescuento(0);

        const total_iva = subtotal * porcentaje_iva;
        setIva(total_iva.toFixed(2));

        setTotal((subtotal + total_iva).toFixed(2));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPreference = async () => {
    try {
      const res = await clienteAxios.post("/mercadopago/create_preference", {
        total,
      });

      const { id } = res.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreferenceId = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const mostrarMPbutton = () => {
    //validamos campos
    if (tipo_venta == "" || tipo_venta == undefined) {
      mostrarMensaje(
        "Debes escribir un nombre de cliente o la palabra Mostrador"
      );
    } else if (formaPago == "" || formaPago == undefined) {
      mostrarMensaje("Debes seleccionar una forma de pago");
    } else if (parcialidades == "" || parcialidades == undefined) {
      mostrarMensaje("Debes escribir el número de parcialidades");
    } else if (formaEntrega == "" || formaEntrega == undefined) {
      mostrarMensaje("Debes seleccionar una forma de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (costo_envio == "" || costo_envio == undefined)
    ) {
      mostrarMensaje("Debes escribir el costo de envío");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_nombre == "" || datos_entrega_nombre == undefined)
    ) {
      mostrarMensaje("Debes escribir el nombre en datos de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_direccion == "" || datos_entrega_direccion == undefined)
    ) {
      mostrarMensaje("Debes escribir la direccion en datos de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_correo == "" || datos_entrega_correo == undefined)
    ) {
      mostrarMensaje("Debes escribir el correo en datos de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_telefono == "" || datos_entrega_telefono == undefined)
    ) {
      mostrarMensaje("Debes escribir el teléfono en datos de entrega");
    } else {
      handlePreferenceId();

      setViewContinuebutton(false);
      setViewMPbutton(true);
    }
  };

  const NOmostrarMPbutton = () => {
    //validamos campos
    if (tipo_venta == "" || tipo_venta == undefined) {
      mostrarMensaje(
        "Debes escribir un nombre de cliente o la palabra Mostrador"
      );
    } else if (formaPago == "" || formaPago == undefined) {
      mostrarMensaje("Debes seleccionar una forma de pago");
    } else if (parcialidades == "" || parcialidades == undefined) {
      mostrarMensaje("Debes escribir el número de parcialidades");
    } else if (formaEntrega == "" || formaEntrega == undefined) {
      mostrarMensaje("Debes seleccionar una forma de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (costo_envio == "" || costo_envio == undefined)
    ) {
      mostrarMensaje("Debes escribir el costo de envío");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_nombre == "" || datos_entrega_nombre == undefined)
    ) {
      mostrarMensaje("Debes escribir el nombre en datos de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_direccion == "" || datos_entrega_direccion == undefined)
    ) {
      mostrarMensaje("Debes escribir la direccion en datos de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_correo == "" || datos_entrega_correo == undefined)
    ) {
      mostrarMensaje("Debes escribir el correo en datos de entrega");
    } else if (
      solicitarDatosEnvio == true &&
      (datos_entrega_telefono == "" || datos_entrega_telefono == undefined)
    ) {
      mostrarMensaje("Debes escribir el teléfono en datos de entrega");
    } else {
      sendData();
    }
  };

  const sendData = async () => {
    const createSell = async (dataForm) => {
      try {
        const res = await clienteAxios.post("/pedido/crear", dataForm);
        //console.log(res);

        /*
            var container = document.getElementById("div-cart");
            var printWindow = window.open('', 'PrintMap');
            printWindow.document.writeln(container.innerHTML);
            printWindow.document.close();
            printWindow.print();
            printWindow.close();
            */

        handlePrint();

        //navigate("/ventas/ventas_alta");
        //navigate(0);
      } catch (error) {
        console.log(error);
        mostrarMensaje(error.response.data.msg);
      }
    };

    let estatus_pago = "";
    if (parcialidades > 1) {
      estatus_pago = "Pendiente";
    } else {
      estatus_pago = "Pagado";
    }

    let estatus_envio = "";
    if (formaEntrega.value == "Tienda") {
      estatus_envio = "Entregado";
    } else {
      estatus_envio = "Pendiente";
    }

    //revisamos si hay stock
    try {
      let res = await clienteAxios.post("/pedido/checkStock", {
        descripcion: cart,
      });

      console.log(res.data);

      if (res.data.disponible == true) {
        createSell({
          tipo_venta,
          subtotal,
          descuento,
          iva,
          total,
          descripcion: cart,
          usuario: "Mostrador",
          entregar_a: datos_entrega_nombre,
          correo: datos_entrega_correo,
          direccion_entrega: datos_entrega_direccion,
          costo_envio: parseFloat(costo_envio),
          telefono: datos_entrega_telefono,
          estatus_pago,
          estatus_envio,
          vendedor: user.nombre,
          forma_entrega: formaEntrega.value,
          forma_pago: formaPago.value,
          num_parcialidades: parcialidades,
          parcialidades: parseFloat(abono),
        });
      } else {
        mostrarMensaje(res.data.msg);
      }
    } catch (error) {
      console.log(error);
      mostrarMensaje(error.response.data.msg);
    }
  };

  //funciones de mercado pago
  const onSubmit = async (formData) => {
    console.log(formData.formData);

    try {
      const res = await clienteAxios({
        method: "post",
        url: "/mercadopago/process_payment",
        data: JSON.stringify(formData.formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      /*tipos de status
          pending : El usuario no completo el proceso de pago todavía.
          approved : El pago fue aprobado y acreditado.
          authorized : El pago fue autorizado pero no capturado todavía.
          in_process : El pago está en revisión.
          in_mediation : El usuario inició una disputa.
          rejected : El pago fue rechazado. El usuario podría reintentar el pago.
          cancelled : El pago fue cancelado por una de las partes o el pago expiró.
          refunded : El pago fue devuelto al usuario.
          charged_back : Se ha realizado un contracargo en la tarjeta de crédito del comprador.
*/

      //si no hubo error en el pago
      if (res.data.status === "approved") {
        sendData();
      } else {
        if (res.data.status === "rejected") {
          mostrarMensaje(
            "Lo sentimos tu pago fué rechazado, inténtalo nuevamente"
          );
        } else if (res.data.status === "pending") {
          mostrarMensaje(
            "Lo sentimos, no se completó el proceso de pago todavía"
          );
        } else if (res.data.status === "authorized") {
          mostrarMensaje(
            "Lo sentimos, el pago fué autorizado pero no capturado todavía"
          );
        } else if (res.data.status === "in_process") {
          mostrarMensaje("Lo sentimos, el pago está en revisión");
        } else if (res.data.status === "cancelled") {
          mostrarMensaje(
            "Lo sentimos, el pago fué cancelado por una de las partes o el pago expiró"
          );
        } else if (res.data.status === "refunded") {
          mostrarMensaje("Lo sentimos, el pago fué devuelto al usuario");
        } else {
          mostrarMensaje(res.data.status);
        }
      }
    } catch (error) {
      console.log(error);
      mostrarMensaje(error);
    }
  };

  const customization = {
    paymentMethods: {
      atm: "all",
      ticket: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
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

  //funciones del ticket de prueba
  const requestDevice = async () => {
    try {
      const usbDevice = await navigator.usb.requestDevice({ filters: [] });
      setDevice(usbDevice);
      setMessage(`Dispositivo conectado: ${usbDevice.productName}`);
    } catch (error) {
      console.error("Error al conectar con el dispositivo:", error);
      setMessage("Error al conectar con el dispositivo.");
    }
  };

  const printTestTicket = async () => {
    if (!device) {
      setMessage("No hay dispositivo conectado.");
      return;
    }

    // Ticket con productos, precios y total
    const ticketCommands = [
      'SIZE 80 mm,200 mm',
      'CLS',
      'TEXT 10,10,"4",0,1,1,"Ticket de Prueba"',
      'TEXT 10,50,"3",0,1,1,"Producto          Precio"',
      'TEXT 10,90,"3",0,1,1,"Blusa             $300.00"',
      'TEXT 10,130,"3",0,1,1,"Pantalón          $500.00"',
      'TEXT 10,170,"3",0,1,1,"--------------------------"',
      'TEXT 10,210,"3",0,1,1,"Total:            $800.00"',
      'BARCODE 10,250,"128",70,1,0,2,2,"1234567890"',
      'TEXT 10,330,"3",0,1,1,"Gracias por su compra!"',
      'PRINT 1',
      'END'
    ];

    try {
      await device.open();
      await device.selectConfiguration(1);
      await device.claimInterface(0);

      const endpoint = device.configuration.interfaces[0].alternate.endpoints.find(e => e.direction === 'out').endpointNumber;

      await device.transferOut(endpoint, new Uint8Array(new TextEncoder().encode(ticketCommands.join('\r\n'))));

      await device.close();
      setMessage("Ticket impreso exitosamente.");
    } catch (error) {
      console.error("Error al imprimir:", error);
      setMessage("Error al imprimir el ticket.");
    }
  }


  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 gap-5">
      <p>Para hacer una prueba de impresion de ticket primero da click en conectar impresora y selecciona tu impresora en la lista que aparece, luego da click en imprimir ticket de prueba</p>  
      <button onClick={requestDevice} className="btn btn-success" style={{width:"200px"}}>Conectar Impresora</button>
      <button onClick={printTestTicket} disabled={!device} className="btn btn-success" style={{width:"300px"}}>Imprimir Ticket de Prueba</button>
        <Card title="Venta">
          <form onSubmit={(e) => addToCart(e)}>
            <div className="space-y-4">
              <div
                style={{
                  border: "solid 1px",
                  padding: "10px",
                  borderRadius: "4px",
                  borderColor: "hsl(0, 0%, 80%)",
                }}
              >
                <Label>Cliente:</Label>
                <Textinput
                  onChange={(e) => setTipoVenta(e.target.value)}
                  placeholder="Cliente"
                  id="tipo_venta"
                  type="text"
                  defaultValue={tipo_venta}
                />
              </div>

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
                <Button
                  text="Añadir a carrito"
                  type="submit"
                  className="btn-success"
                />
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
              {cart &&
                cart.map((row, i) => {
                  const uniqueImageUrl = `${
                    row.foto_principal
                  }?v=${Math.random()}`;
                  return (
                    <tr key={i}>
                      {
                        <>
                          <td>
                            <button
                              type="button"
                              className="text-danger-600 text-2xl"
                              onClick={() => removeCartItem(i)}
                            >
                              <Icon icon="heroicons:trash" />
                            </button>
                          </td>
                          <td className="table-td">
                            <img
                              src={uniqueImageUrl}
                              style={{ width: "60px", height: "60px" }}
                            />
                          </td>
                          <td className="table-td">
                            <h4>{row.nombre_producto}</h4>
                            <h6>Código: {row.codigo}</h6>
                            <h6>Talla: {row.nombre_talla}</h6>
                            <h6>Color: {row.nombre_color}</h6>
                          </td>
                          <td className="table-td">{row.cantidad}</td>
                          <td className="table-td">$ {row.precio}</td>
                          <td className="table-td">$ {row.total}</td>
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
                    <div style={{ padding: "10px" }}>
                      <Textinput
                        label="Código de descuento"
                        placeholder="Código"
                        id="codigo_descuento"
                        type="text"
                      />
                      {viewContinuebutton === true ? (
                        <Button
                          text="Aplicar"
                          onClick={(e) => findDiscount()}
                          className="btn-success mt-4"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </th>
                  <th></th>
                  <th colSpan={3}>
                    {viewContinuebutton === true ? (
                      <>
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

                        <div style={{ display: "flex", flexDirection: "row" }}>
                          {/*Parcialidades*/}
                          <Label
                            style={{ textAlign: "start", alignSelf: "end" }}
                          >
                            Parcialidades
                          </Label>
                          <Textinput
                            onChange={handleParcialidades}
                            placeholder="Núm. de pagos"
                            id="parcialidades"
                            type="number"
                            defaultValue={parcialidades}
                          />
                        </div>

                        <div
                          style={
                            solicitarAbono == true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            {/*Abono*/}
                            <Label
                              style={{ textAlign: "start", alignSelf: "end" }}
                            >
                              Importe Parcialidad
                            </Label>
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

                        <div
                          style={
                            solicitarDatosEnvio == true
                              ? { display: "block" }
                              : { display: "none" }
                          }
                          className="mt-4"
                        >
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
                            onChange={(e) =>
                              setDatosEntregaNombre(e.target.value)
                            }
                            placeholder="Entregar a:"
                            id="datos_entrega_nombre"
                            type="text"
                          />

                          {/*Direccion de entrega*/}
                          <Textarea
                            onChange={(e) =>
                              setDatosEntregaDireccion(e.target.value)
                            }
                            placeholder="Dirección"
                            id="datos_entrega_direccion"
                            type="text"
                          />

                          <Textinput
                            onChange={(e) =>
                              setDatosEntregaCorreo(e.target.value)
                            }
                            placeholder="Correo"
                            id="datos_entrega_correo"
                            type="email"
                          />

                          <Textinput
                            onChange={(e) =>
                              setDatosEntregaTelefono(e.target.value)
                            }
                            placeholder="Teléfono"
                            id="datos_entrega_telefono"
                            type="tel"
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {viewContinuebutton === true &&
                    formaPago.value === "Mercado Pago" ? (
                      <button
                        className="btn btn-success text-uppercase mt-2"
                        onClick={() => mostrarMPbutton()}
                      >
                        Continuar
                      </button>
                    ) : (
                      <></>
                    )}

                    {viewContinuebutton === true &&
                    formaPago.value !== "Mercado Pago" ? (
                      <button
                        className="btn btn-success text-uppercase mt-2"
                        onClick={() => NOmostrarMPbutton()}
                      >
                        Continuar
                      </button>
                    ) : (
                      <></>
                    )}

                    {preferenceId != null && viewMPbutton === true ? (
                      <Payment
                        initialization={{ amount: total, preferenceId }}
                        customization={customization}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                      />
                    ) : (
                      <></>
                    )}
                  </th>
                </tr>
              </tfoot>
            ) : (
              <></>
            )}
          </table>
        </Card>
      </div>

      {/*ticket*/}
      <div id="div-cart" style={{ display: "none" }}>
        <div
          align="center"
          ref={printArea}
          style={{ fontFamily: "Inter", fontSize: "20px" }}
        >
          {cart &&
            cart.map((row, i) => {
              return (
                <p key={i}>
                  {row.nombre_producto +
                    " " +
                    row.cantidad +
                    " " +
                    "$" +
                    row.precio.toFixed(2) +
                    "$" +
                    row.total.toFixed(2)}
                </p>
              );
            })}

          {cart.length > 0 ? (
            <>
              <p>Subtotal $ {subtotal}</p>
              <p>Descuento $ {descuento}</p>
              <p>I.V.A. $ {iva}</p>
              <p>Total $ {total}</p>
            </>
          ) : (
            <></>
          )}

          <p style={{ marginBottom: "0", paddingBottom: "0" }}>
            Atendió: {user && user.nombre}
          </p>
          <br />
          <p style={{ marginBottom: "0", paddingBottom: "0" }}>
            8 días para cualquier cambio con su nota
          </p>
        </div>
      </div>
    </>
  );
};

export default VentasAlta;
