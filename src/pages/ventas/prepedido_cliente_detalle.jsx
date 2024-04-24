import React, { useEffect, useState, useMemo, useContext } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "react-select";
import { Label } from "reactstrap";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../table/react-tables/GlobalFilter";

import { useNavigate } from "react-router-dom";
import clienteAxios from "../../configs/axios";
import { UserContext } from "../context/userContext";
import { downloadExcel } from "react-export-table-to-excel";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const PreSalesDetails = () => {
  const [isDark] = useDarkMode();

  const COLUMNS = [
    {
      Header: "Id PrePedido",
      accessor: "id_pedido",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Imagen",
      Cell: (row) => {
        return (
          <img
            src={row.row.original.foto_principal}
            style={{ width: "60px", height: "60px" }}
          />
        );
      },
    },
    {
      Header: "Producto",
      accessor: "nombre_producto",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Talla",
      accessor: "nombre_talla",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Color",
      accessor: "nombre_color",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Cantidad",
      accessor: "cantidad",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Precio",
      accessor: "precio",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Total",
      accessor: "total",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (row) => {
        
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === "Realizado" ? "text-success-500 bg-success-500" : "text-danger-500 bg-danger-500"
              } `}
            >
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const [datos, setDatos] = useState([]);

  const [total, setTotal] = useState([]);

  const [formaPago, setFormaPago] = useState();
  const [formaEntrega, setFormaEntrega] = useState();
  const [solicitarDatosEnvio, setSolicitarDatosEnvio] = useState(false);

  const [datos_entrega_nombre, setDatosEntregaNombre] = useState();
  const [datos_entrega_direccion, setDatosEntregaDireccion] = useState();
  const [datos_entrega_correo, setDatosEntregaCorreo] = useState();
  const [datos_entrega_telefono, setDatosEntregaTelefono] = useState();

  const allFormasPago = [
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

  const userCtx = useContext(UserContext);
  const { user, authStatus, verifyingToken } = userCtx;

  const navigate = useNavigate();

  const cliente = localStorage.getItem("SeePreSaleClient");

  const getPreOrder = async () => {
    try {
      let res = await clienteAxios.get(`/pedido/prepedidos`);
      //console.log(res.data.prepedidos);

      const prepedidos = [];
      let tot = 0;

      for (let i = 0; i < res.data.prepedidos.length; i++) {
        //formateamos fecha a dd/mm/yyyy
        const olddate = res.data.prepedidos[i].fecha.split("-");
        const newdate = olddate[0] + "/" + olddate[1] + "/" + olddate[2];

        for (
          let ii = 0;
          ii < res.data.prepedidos[i]["descripcion"].length;
          ii++
        ) {
          if (res.data.prepedidos[i]["descripcion"][ii]["cliente"] == cliente) {
            prepedidos.push({
              id_pedido: res.data.prepedidos[i]._id,
              indice:i,
              fecha: newdate,
              status: res.data.prepedidos[i]["descripcion"][ii]["status"],
              foto_principal: res.data.prepedidos[i]["descripcion"][ii]["foto_principal"],
              nombre_original: res.data.prepedidos[i]["descripcion"][ii]["nombre_original"],
              marca: res.data.prepedidos[i]["descripcion"][ii]["marca"],
              categoria:res.data.prepedidos[i]["descripcion"][ii]["categoria"],
              subcategoria:res.data.prepedidos[i]["descripcion"][ii]["subcategoria"],
              codigo:res.data.prepedidos[i]["descripcion"][ii]["codigo"],
              codigo_producto:res.data.prepedidos[i]["descripcion"][ii]["codigo_producto"],
              nombre_producto: res.data.prepedidos[i]["descripcion"][ii]["nombre_producto"],
              codigo_talla:res.data.prepedidos[i]["descripcion"][ii]["codigo_talla"],
              nombre_talla: res.data.prepedidos[i]["descripcion"][ii]["nombre_talla"],
              codigo_color:res.data.prepedidos[i]["descripcion"][ii]["codigo_color"],        
              nombre_color: res.data.prepedidos[i]["descripcion"][ii]["nombre_color"],
              cantidad: res.data.prepedidos[i]["descripcion"][ii]["cantidad"],
              precio: res.data.prepedidos[i]["descripcion"][ii]["precio"],
              total: res.data.prepedidos[i]["descripcion"][ii]["total"],
            });
            tot = tot + res.data.prepedidos[i]["descripcion"][ii]["total"];
          }
        }
      }

      setDatos(prepedidos);
      setTotal(tot);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPreOrder();
  }, []);

  const backToPreOrders = () => {
    navigate("/ventas/prepedidos_cliente");
  };

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

  const createOrder = () => {
    //validamos campos
    if (formaPago == "" || formaPago == undefined) {
      mostrarMensaje("Debes seleccionar una forma de pago");
    } else if (formaEntrega == "" || formaEntrega == undefined) {
      mostrarMensaje("Debes seleccionar una forma de entrega");
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
      const createSell = async (dataForm) => {
        try {
          const res = await clienteAxios.post("/pedido/crear", dataForm);

          for (let i = 0; i < datos.length; i++) {
             await clienteAxios.post("/pedido/prepedido_actualizar", {id_pedido:datos[i].id_pedido, indice:datos[i].indice, status:"Realizado"}); 
          }  


          mostrarAviso("Pedido Realizado");

          
          setTimeout(() => {
            navigate("/ventas/prepedidos_cliente");
          }, "2000");


        } catch (error) {
          console.log(error);
          mostrarMensaje(error.response.data.msg);
        }
      };

      createSell({
        tipo_venta: "PrePedido",
        subtotal: total,
        descuento: 0,
        iva: 0,
        total: total,
        descripcion: datos,
        usuario: cliente,
        costo_envio: 0,
        estatus_pago: "Pagado",
        estatus_envio: "Pendiente",
        vendedor: "PrePedido",
        entregar_a: datos_entrega_nombre,
        correo: datos_entrega_correo,
        direccion_entrega: datos_entrega_direccion,
        telefono: datos_entrega_telefono,
        forma_entrega: formaEntrega.value,
        forma_pago: formaPago.value,
      });
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

  const data = useMemo(() => datos, [datos]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <ToastContainer />
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">PrePedido:</h4>
        </div>
        <div>
          <p>Cliente: {cliente}</p>
        </div>

        <div className="md:flex justify-between items-center mb-6 mt-6">
          <h4 className="card-title">Descripcion:</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div></div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot className=" border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total</th>
                    <th align="left">$ {total}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex flex-wrap items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        <div align="center" className="m-6">
          <button
            className="btn btn-success m-2"
            onClick={() => backToPreOrders()}
          >
            Regresar
          </button>
        </div>
      </Card>
      <br />
      <Card noborder>
        <div className="mb-6">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <br />

            {/*forma pago*/}
            <Label className="mt-2">Forma de pago:</Label>
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
            <br />

            {/*forma entrega*/}
            <Label className="mt-2">Forma de Entrega:</Label>
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
              <Label className="mt-2">Datos de Entrega:</Label>

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
          </div>
        </div>

        <div align="center" className="m-6">
          <button
            className="btn btn-secondary m-2"
            onClick={() => createOrder()}
          >
            Crear Pedido
          </button>
        </div>
      </Card>
    </>
  );
};

export default PreSalesDetails;
