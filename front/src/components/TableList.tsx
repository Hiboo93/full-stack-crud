import React, { useEffect, useState } from "react";
import { ClientType } from "../types.js";
import axios from "axios";


type PropsType = {
  handleOpen: (mode: "add" | "edit", client?: ClientType) => void; // Ajout du client facultatif
  searchTerm: string;
};

const TableList = ({ handleOpen, searchTerm }: PropsType) => {
  const [tableData, setTableData] = useState<ClientType[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        setError("Impossible de récupérer les données");
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

  const handleDelete = async (clientId: number) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:3000/api/clients/${clientId}`);
      setTableData((prevData) => prevData.filter((client) => client.id !== clientId));
      console.log(`Client avec l'ID ${clientId} supprimé.`);
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
      setError("Erreur lors de la suppression du client.");
    }
  };

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
            {filteredData.map((client) => (
              <tr key={client.id}>
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
                    onClick={() => handleOpen("edit", client)}
                    className="btn btn-secondary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-error" onClick={() => handleDelete(client.id)}>Delete</button>
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
