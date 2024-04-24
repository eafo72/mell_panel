import React, { useState, useEffect, useContext, useRef } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "react-select";
import Button from "@/components/ui/Button";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import clienteAxios from "../../configs/axios";
import { UserContext } from "../context/userContext";

const PrepedidoAlta = () => {
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
  const [cliente, setCliente] = useState();

  const [allProductsInfo, setAllProductsInfo] = useState(); //contiene toda la informacion de productos
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
    } else if (cliente == "" || cliente == undefined) {
      mostrarMensaje("Debes escribir una cliente");
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
          cliente,
          precio,
          total: parseInt(cantidad) * precio,
          status:"Pendiente"
        },
      ]);

      /*
      setFotoPrincipal(null);
      setProducto(null);
      setTalla(null);
      setColor(null);
      setPrecio(null);
       */
      setCantidad(null);
      setCliente(null);

      // document.getElementById("codigo").value = null;
      document.getElementById("cantidad").value = null;
      document.getElementById("cliente").value = null;
    }
  };

  const sendData = () => {
    const createSell = async (dataForm) => {
      try {
        const res = await clienteAxios.post("/pedido/crearprepedido", dataForm);
        mostrarAviso("Prepedido Guardado");
        navigate(0) ;

      } catch (error) {
        console.log(error);
        mostrarMensaje(error.response.data.msg);
      }
    };

    createSell({
      descripcion: cart,
    });
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
        <Card title="Prepedido">
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

              {/*Cliente*/}
              <Textinput
                onChange={(e) => setCliente(e.target.value)}
                placeholder="Cliente"
                id="cliente"
                type="text"
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

        <Card title="Productos">
          <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className=" border-t border-slate-100 dark:border-slate-800">
              <tr>
                <th></th>
                <th></th>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
              {cart &&
                cart.map((row, i) => {
                  return (
                    <tr key={i}>
                      {
                        <>
                          <td></td>
                          <td className="table-td">
                            <img
                              src={row.foto_principal}
                              style={{ width: "60px", height: "60px" }}
                            />
                          </td>
                          <td className="table-td">
                            <h4>{row.nombre_producto}</h4>
                            <h6>Código: {row.codigo}</h6>
                            <h6>Talla: {row.nombre_talla}</h6>
                            <h6>Color: {row.nombre_color}</h6>
                            <h6>Cliente: {row.cliente}</h6>
                          </td>
                          <td className="table-td">{row.cantidad}</td>
                        </>
                      }
                    </tr>
                  );
                })}
            </tbody>
            <tfoot className=" border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  {cart.length > 0 ? (
                    <button
                      className="btn btn-success text-uppercase mt-2"
                      onClick={() => sendData()}
                    >
                      Guardar
                    </button>
                  ) : (
                    <></>
                  )}
                </th>
              </tr>
            </tfoot>
          </table>
        </Card>
      </div>
    </>
  );
};

export default PrepedidoAlta;
