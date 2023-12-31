import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AddBlog from "./AddBlog";
// import Updata from "./updata";
import { getAllPapers } from "../Redux/Slice/papersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function PersonalPapers() {
  const { papers } = useSelector((state) => state.papers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPapers(""));
  }, [dispatch]);
  const getSeverity = (value) => {
    switch (value) {
      case "valid":
        return "success";

      case "not valid":
        return "danger";
      default:
        return null;
    }
  };

  const formatCreatedAt = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const updatePapers = () => {
    const companyPapers = papers.filter((paper) => !paper.company);
    const formattedServices = companyPapers.map((paper, index) => ({
      ...paper,
      number: index + 1,
      createdAt: formatCreatedAt(paper.createdAt),
      updatedAt: formatCreatedAt(paper.updatedAt),
    }));
   
    setAllPapers(formattedServices);
    setFilteredPapers(formattedServices);
  };

  useEffect(() => {
    if (papers.length > 0) {
      updatePapers();
    }
  }, [papers]);
  console.log(papers);
  const [allPapers, setAllPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const filterDocuments = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);

    const filtered = allPapers.filter((service) => {
      return service.title.toLowerCase().includes(value);
    });

    setFilteredPapers(filtered);
  };

  const onRowEditComplete = (e) => {
    let _products = [...products];
    let { newData, index } = e;

    _products[index] = newData;

    setProducts(_products);
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
  const statusEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={getSeverity(option)}></Tag>;
        }}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        style={{ padding: "5px" }}
        value={rowData.status}
        severity={getSeverity(rowData.status)}
      ></Tag>
    );
  };
const navigate =useNavigate()
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
            Personal papers
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
        value={filteredPapers}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem" }}
        style={{ fontSize: "18px" }}
        resizableColumns
        sortField="lastModified"
        sortOrder={-1}
        paginator
        rows={5}
      >
        <Column
          field="number"
          header="#"
          editor={(options) => textEditor(options)}
          style={{ width: "10%", padding: "0 20px" }}
        ></Column>
        <Column
          field="title"
          header="document"
          editor={(options) => textEditor(options)}
          style={{ width: "30%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          editor={(options) => statusEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="createdAt"
          header="upload date"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="updatedAt"
          header="last modified"
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
                    navigate(`/user/preview-paper/${option._id}`);
                }}
              >
                Preview
              </button>
            </td>
          )}

          editor={(options) => textEditor(options)}
          style={{ width: "20%", height: "80px" }}
        ></Column>
        <Column
          field=""
          // body={(option) => (
          //   <td key={option.id}>
          //     <h5
          //       type="button"
          //       className="text-danger"
          //       data-bs-toggle="modal"
          //       data-bs-target="#exampleModal"
          //     >
          //       Edit
          //     </h5>

          //     <div
          //       className="modal fade"
          //       id="exampleModal"
          //       tabindex="-1"
          //       aria-labelledby="exampleModalLabel"
          //       aria-hidden="true"
          //     >
          //       <div className="modal-dialog">
          //         <div className="modal-content">
          //           <div className="modal-header">
          //             <h5 className="modal-title" id="exampleModalLabel">
          //               Edit {option.document}{" "}
          //             </h5>
          //             <button
          //               type="button"
          //               className="btn-close"
          //               data-bs-dismiss="modal"
          //               aria-label="Close"
          //             ></button>
          //           </div>
          //           <div className="modal-body">
          //             {/* <Updata type={"personal Papers"} papers={option} /> */}
          //           </div>
          //           <div className="modal-footer">
          //             <button
          //               type="button"
          //               className="btn btn-secondary"
          //               data-bs-dismiss="modal"
          //             >
          //               Close
          //             </button>
          //             <button type="button" className="btn btn-primary">
          //               Save changes
          //             </button>
          //           </div>
          //         </div>
          //       </div>
          //     </div>
          //   </td>
          // )}
          editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
