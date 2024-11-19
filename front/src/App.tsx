import { useState } from "react";
import ModalForm from "./components/ModalForm.js";
import Navbar from "./components/Navbar.js";
import TableList from "./components/TableList.js";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const handleOpen = (mode: "add" | "edit") => {
    setModalMode(mode)
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      console.log("modal mode Add");
    } else {
      console.log("modal mode Edit");
    }
  };

  return (
    <>
      <Navbar onOpen={() => handleOpen("add")} />
      <TableList handleOpen={handleOpen}/>
      <ModalForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
      />
    </>
  );
}
