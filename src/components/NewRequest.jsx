import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../Redux/Slice/serviceSlice";

export default function NewRequest() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { user:currentUser } = useSelector((state) => state.user);

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


const navigate=useNavigate()

  return (
    <div
      className="col-12 m-auto p-fluid py-4 px-5 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between flex-wrap">
        <div className="col-12 col-lg-4 my-3">
          <h2
            className="ms-2 mt-2"
            style={{ color: "#4A5568", fontSize: "25px" }}
          >
            New Request Services
          </h2>
        </div>
     
        <div className="position-relative mb-3 col-12 col-lg-4 my-3 me-3">
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
        // onRowEditComplete={onRowEditComplete}
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
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%", height: "80px", padding: "10px 20px" }}
        ></Column>
        <Column
          field="title"
          header="service"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>

        <Column
          field="serial_code"
          header="Serial Code"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>

        <Column
          field="updatedAt"
          header="last update"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
        <Column
          field="createdAt"
          header="Created At"
          sortable
          editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
        <Column
          field=""
          header="Actions"
          body={(option) => (
            <td>
              {" "}
              <button
                className="btn btn-success"
                onClick={() => {
                  localStorage.setItem("ServicesChat", JSON.stringify(option)),
                    navigate(`/user/Chat/${option._id}/${option.admin}/${currentUser._id}`);
                }}
              >
                ADD
              </button>
            </td>
          )}
          editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
