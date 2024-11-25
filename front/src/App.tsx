import { useEffect, useState } from "react";
import ModalForm from "./components/ModalForm.js";
import Navbar from "./components/Navbar.js";
import TableList from "./components/TableList.js";
import axios from "axios";
import { ClientType, NewClientType } from "./types.js";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState<ClientType[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientType | null>(null);

  //TEST
  // const [tableData, setTableData] = useState<ClientType[]>([]);
  
  //TEST
  // useEffect(() => {
  //   fetchData();
  // }, []);

  //TEST
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/clients");
  //     setTableData(response.data);
  //   } catch (err) {
  //     console.error("Impossible de récupérer les données");
  //   }
  // };

  const handleOpen = (mode: "add" | "edit", client?: ClientType) => {
    setModalMode(mode);
    if (mode === "edit" && client) {
      setSelectedClient(client); // Stocke le client sélectionné pour l'édition
    } else {
      setSelectedClient(null); // Réinitialise pour le mode "add"
    }
    setIsOpen(true);
  };

  const handleSubmit = async (newClientData: ClientType | NewClientType) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/clients",
          newClientData
        );
        setClientData((prev) => [...prev, response.data]); // Ajoute le nouveau client au tableau
        console.log("Client ajouté :", response.data);
      } catch (err) {
        console.error("Erreur lors de l'ajout du client :", err);
      }
    } else if (modalMode === "edit" && selectedClient) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${selectedClient.id}`,
          newClientData
        );
        setClientData((prev) =>
          prev.map((client) =>
            client.id === selectedClient.id ? response.data : client
          )
        ); // Met à jour le client dans le tableau
        console.log("Client mis à jour :", response.data);
      } catch (err) {
        console.error("Erreur lors de la mise à jour du client :", err);
      }
    }
    setIsOpen(false);
  };

  //TEST
  // const handleSubmit = async (newClientData: ClientType | NewClientType) => {
  //   if (modalMode === "add") {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:3000/api/clients",
  //         newClientData
  //       );
  //       setTableData((prevData) => [...prevData, response.data]); // Ajoute le nouveau client au tableau
  //       console.log("Client ajouté :", response.data);
  //     } catch (err) {
  //       console.error("Erreur lors de l'ajout du client :", err);
  //     }
  //   } else if (modalMode === "edit" && selectedClient) {
  //     try {
  //       const response = await axios.put(
  //         `http://localhost:3000/api/clients/${clientData.id}`,
  //         newClientData
  //       );
  //       setClientData((prev) =>
  //         prev.map((client) =>
  //           client.id === selectedClient.id ? response.data : client
  //         )
  //       ); // Met à jour le client dans le tableau
  //       console.log("Client mis à jour :", response.data);
  //     } catch (err) {
  //       console.error("Erreur lors de la mise à jour du client :", err);
  //     }
  //   }
  //   setIsOpen(false);
  // };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        //clientData={clientData}
        clientData={selectedClient}
      />
    </>
  );
}
