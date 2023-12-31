import { React, useState } from "react";
import { DataTable } from "primereact/datatable";

import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllServices } from "../Redux/Slice/serviceSlice";
import { useNavigate } from "react-router-dom";

export default function AllServices() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllServices("tttttttttttttttttttt"));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  console.log(services);
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const updateServices = () => {
    const formattedServices = services.map((service, index) => ({
      ...service,
      number: index + 1,
      createdAt: formatCreatedAt(service.createdAt),
      updatedAt: formatCreatedAt(service.updatedAt),
    }));
    setAllServices(formattedServices);
    setFilteredProducts(formattedServices);
  };

  useEffect(() => {
    if (services.length > 0) {
      updateServices();
    }
  }, [services]);

  const [allServices, setAllServices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const filterDocuments = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);

    const filtered = allServices.filter((service) => {
      return service.title.toLowerCase().includes(value);
    });

    setFilteredProducts(filtered);
  };

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    // dispatch( updateService(newData._id)).unwrap()
    // .then(()=>{})
    // .catch((backEorr)=>{
    //   toast.error(backEorr.error)
    // })
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };
const navigate= useNavigate()
  return (
    <div
      className="col-12 m-auto p-fluid py-4 px-5 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h2
            className="ms-2 mt-2"
            style={{ color: "#4A5568", fontSize: "25px" }}
          >
            All services
          </h2>
        </div>
        <div className="position-relative mb-3 col-4 me-3">
          <FontAwesomeIcon
            className="fs-5 position-absolute"
            icon={faSearch}
            style={{ top: "12px", left: "13px", color: "#9098b1" }}
          />
          <InputText
            className="py-2 px-5 "
            placeholder="Search list..."
            value={filterValue}
            onChange={filterDocuments}
          />
        </div>
      </div>
      <DataTable
        value={filteredProducts}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem" }}
        style={{ fontSize: "18px" }}
        resizableColumns
        sortField="date"
        sortOrder={-1}
        paginator
        rows={5}
      >
        <Column
          field="number"
          header="#"
          editor={(options) => textEditor(options)}
          style={{ width: "20%", height: "80px", padding: "0 20px" }}
        ></Column>
        <Column
          field="title"
          header="service"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>

        <Column
          field="serial_code"
          header="Serial Code"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>

        <Column
          field="updatedAt"
          header="last update"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="createdAt"
          header="Created At"
          sortable
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="action"
          header="Actions"
          body={(option) => (
            <td>
              {" "}
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate(`/service-preview/${option._id}`);
                }}
              >
                show
              </button>
            </td>
          )}
          style={{ width: "20%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
