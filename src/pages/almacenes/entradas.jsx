import React, { useEffect, useState, useMemo, useContext } from "react";
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
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Entradas = () => {
  const COLUMNS = [
    {
      Header: "Id",
      accessor: "_id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Código",
      accessor: "codigo",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Producto",
      accessor: "producto",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Marca",
      accessor: "marca",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Talla",
      accessor: "talla",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Color",
      accessor: "color",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Estante",
      accessor: "estante",
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
      Header: "Fecha de Entrada",
      accessor: "fechaEntrada",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Proveedor",
      accessor: "proveedor",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    /*
    {
      Header: "Editar",
      Cell: (row) => {
        return (
          <button
            onClick={() =>
              goToEditar(row.row.original._id, row.row.original.nombre)
            }
            className="hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
        first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse"
          >
            <span className="text-base">
              <Icon icon="heroicons:pencil-square" />
            </span>
          </button>
        );
      },
    },
    */

    {
      Header: "Borrar",
      Cell: (row) => {
        return (
          <button
            onClick={() =>
              goToBorrar(row.row.original._id, row.row.original.producto)
            }
            className="text-danger-500 hover:bg-danger-500 hover:bg-opacity-100 hover:text-white border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
        first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse"
          >
            <span className="text-base">
              <Icon icon="heroicons-outline:trash" />
            </span>
          </button>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const [datos, setDatos] = useState([]);
  

  const userCtx = useContext(UserContext);
  const { user, authStatus, verifyingToken } = userCtx;

  const navigate = useNavigate();

  const id = localStorage.getItem("ViewStorage");
  const name = localStorage.getItem("ViewStorageName");
   
  const getStorageData = async () => {
    try {
      const res = await clienteAxios.get("/almacen/entradas/" + id);
      //console.log(res.data.entradas);
      //console.log(id);

     let array = [];
     for (let i = 0; i < res.data.entradas.length; i++) {
       //console.log(i);
       array.push({
         "_id": res.data.entradas[i]['_id'],
         "codigo": res.data.entradas[i]['codigo'],
         "producto": res.data.entradas[i]['datos_producto']['nombre'],
         "marca": res.data.entradas[i]['datos_producto']['marca'],
         "talla": res.data.entradas[i]['datos_talla'][0]['nombre'],
         "color": res.data.entradas[i]['datos_color'][0]['nombre'],
         "estante": res.data.entradas[i]['estante'],
         "cantidad": res.data.entradas[i]['cantidad'],
         "fechaEntrada": res.data.entradas[i]['fechaEntrada'].substr(0, 10),
         "proveedor": res.data.entradas[i]['proveedor']

       });
     }

      setDatos(array);

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
    getStorageData();
  }, [authStatus]);

  const handleAlta = () => {
    navigate("/almacenes/alta_entrada");
  };

  const header = ["Id","Código", "Producto", "Marca", "Talla", "Color", "Estante", "Cantidad", "Fecha Entrada", "Proveedor"];
  function handleDownloadExcel() {
    let newDatos = [];
    for (let i = 0; i < datos.length; i++) {
      newDatos.push({
        id: datos[i]["_id"],
        codigo: datos[i]["codigo"],
        producto: datos[i]["producto"],
        marca: datos[i]["marca"],
        talla: datos[i]["talla"],
        color: datos[i]["color"],
        estante: datos[i]["estante"],
        cantidad: datos[i]["cantidad"],
        fechaEntrada: datos[i]["fechaEntrada"],
        proveedor: datos[i]["proveedor"]

      });
    }

    downloadExcel({
      fileName: "mell_" + name + "_entradas",
      sheet: name+ "entradas",
      tablePayload: {
        header,
        body: newDatos,
      },
    });
  }

  const goToEditar = (id, name) => {
    localStorage.setItem("EditinStorage", id);
    navigate("/almacenes/editar_entrada");
  };

  const goToBorrar = async (id, name) => {
    localStorage.setItem("DeleteinStorage", id);
    navigate("/almacenes/borrar_entrada");
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
          <h4>Entradas</h4>
          <button onClick={(e) => handleAlta(e)} className="btn btn-success">
            Agregar nueva
          </button>
          <button
            className="btn btn-success m-2"
            onClick={handleDownloadExcel}
          >
            Exportar
          </button>
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
      </Card>
    </>
  );
};

export default Entradas;
