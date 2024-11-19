import React, { useState } from "react";
import { type } from '../../node_modules/typescript/lib/typescript.d';

type ModalPropsTypes = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  mode: "add" | "edit";
}

const ModalForm = ({ isOpen, onClose, onSubmit, mode }: ModalPropsTypes) => {
  const [ rate, setRate ] = useState("");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ job, setJob ] = useState("");
  const [ status, setStatus ] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const statusElement = event.target as HTMLSelectElement;
    setStatus(statusElement.value === "Active");
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();
    onClose();
  }

  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">{mode === "edit" ? "Edit Client" : "Client Details"}</h3>
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered flex items-center gap-2 my-3">
              Name
              <input type="text" className="grow" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              Email
              <input type="text" className="grow" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="input input-bordered flex items-center gap-2 my-3">
              Job
              <input type="text" className="grow" value={job} onChange={(e) => setJob(e.target.value)} />
            </label>

            <div className="flex mb-4 justify-between">
              <label className="input input-bordered flex items-center gap-2 my-2">
                Rate
                <input type="number" className="grow" value={rate} onChange={(e) => setRate(e.target.value)} />
              </label>
            </div>
            <select value={status ? "Active" : "Inactive"} className="select select-bordered w-full max-w-xs" onChange={handleStatusChange}>
              <option>Inactive</option>
              <option>Active</option>
            </select>

            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose} type="button">
              ✕
            </button>
            <br />
            <button className="btn btn-success my-4" type="button">{mode === "edit" ? "Save changes" : "Add Client"}</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalForm;
