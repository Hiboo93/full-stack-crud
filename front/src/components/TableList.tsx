import React, { useEffect, useState } from "react";
import { ClientType } from "../types.js";
import axios from "axios";

type PropsType = {
  handleOpen: (mode: "add" | "edit") => void;
  searchTerm: string;
};

const TableList = ({ handleOpen, searchTerm }: PropsType) => {
  // let clientsData = [
  //   {
  //     id: 1,
  //     name: "Osvaldo",
  //     email: "osbaldo@gmail.com",
  //     job: "Developer",
  //     rate: "100",
  //     isactive: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Tremaine",
  //     email: "tremaine@gmail.com",
  //     job: "Ux Designer",
  //     rate: "100",
  //     isactive: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Mosh",
  //     email: "moshe@gmail.com",
  //     job: "Lead dev",
  //     rate: "100",
  //     isactive: false,
  //   },
  //   {
  //     id: 4,
  //     name: "Gregg",
  //     email: "gregg@gmail.com",
  //     job: "Project manager",
  //     rate: "100",
  //     isactive: false,
  //   },
  //   {
  //     id: 5,
  //     name: "Giselle",
  //     email: "gisselle@gmail.com",
  //     job: "Developer",
  //     rate: "100",
  //     isactive: true,
  //   },
  // ];

  const [tableData, setTableData] = useState<ClientType[]>([]);
  const [error, setError] = useState(null);

  //Version avec fetch()
  // useEffect(() => {
  //   const fetchData = async () => {
  //   try {
  //     const data = await fetch("http://localhost:3000/api/clients");
  //     const dataJson = await data.json();
  //     setTableData(dataJson);
  //   } catch (error) {
  //     console.log("data not found", error);
  //   }};

  //   fetchData();

  // },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clients");
        setTableData(response.data);
      } catch (err) {
        //setError(err.message);
      }
    };

    fetchData();
  }, []);

  const filteredData = tableData.filter((client) => {
    return (
      client.name.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLocaleLowerCase().includes(searchTerm.toLowerCase()) ||
      client.job.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {error && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="hover">
            {/* row 1 */}
            {filteredData.map((client, index) => (
              <tr key={index}>
                <th>{client.id}</th>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.job}</td>
                <td>{client.rate}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      client.isactive
                        ? "btn-success"
                        : "btn-outline btn-warning"
                    }`}
                  >
                    {client.isactive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleOpen("edit")}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableList;
