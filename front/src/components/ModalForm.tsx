import React, { useEffect, useState } from "react";
import { ClientType, NewClientType } from "../types.js";

// type ModalPropsTypes = {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: ClientType) => void;
//   mode: "add" | "edit";
//   clientData?: ClientType;
// }

//TEST
type ModalPropsTypes = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientType | NewClientType) => void;
  mode: "add" | "edit";
  clientData?: ClientType | null; // Accepte un client ou null
};

const ModalForm = ({
  isOpen,
  onClose,
  mode,
  onSubmit,
  clientData,
}: ModalPropsTypes) => {
  const [rate, setRate] = useState(clientData?.rate.toString() || "");
  const [name, setName] = useState(clientData?.name || "");
  const [email, setEmail] = useState(clientData?.email || "");
  const [job, setJob] = useState(clientData?.job || "");
  const [status, setStatus] = useState(clientData?.isactive || false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const statusElement = event.target as HTMLSelectElement;
    setStatus(statusElement.value === "Active");
  };

  
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const newClientData: ClientType = {
  //       id: clientData?.id, // Inclut l'ID si en mode édition
  //       rate: Number(rate),
  //       name,
  //       email,
  //       job,
  //       isactive: status,
  //     };
  //     onSubmit(newClientData);
  //     console.log("Données du client soumises :", newClientData);
  //   } catch (error) {
  //     console.error("Erreur lors de la soumission du client :", error);
  //   }
  //   onClose();
  // };

  //TEST
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (mode === "edit" && clientData) {
        const updatedClientData: ClientType = {
          id: clientData.id, // 'id' est présent
          rate: Number(rate),
          name,
          email,
          job,
          isactive: status,
        };
        onSubmit(updatedClientData);
      } else {
        const newClientData: NewClientType = {
          rate: Number(rate),
          name,
          email,
          job,
          isactive: status,
        };
        onSubmit(newClientData);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du client :", error);
    }
    onClose();
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate.toString());
      setStatus(clientData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [mode,clientData]);

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Client" : "Client Details"}
          </h3>
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered flex items-center gap-2 my-3">
              Name
              <input
                type="text"
                className="grow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              Email
              <input
                type="text"
                className="grow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              Job
              <input
                type="text"
                className="grow"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>

            <div className="flex mb-4 justify-between">
              <label className="input input-bordered flex items-center gap-2 my-2">
                Rate
                <input
                  type="number"
                  className="grow"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
            </div>
            <select
              value={status ? "Active" : "Inactive"}
              className="select select-bordered w-full max-w-xs"
              onChange={handleStatusChange}
            >
              <option>Inactive</option>
              <option>Active</option>
            </select>

            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
            <br />
            <button className="btn btn-success my-4" type="submit">
              {mode === "edit" ? "Save changes" : "Add Client"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalForm;
