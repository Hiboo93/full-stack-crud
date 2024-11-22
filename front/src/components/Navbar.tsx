import React from "react";

type NavbarPropsTypes = {
  onOpen: () => void;
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar = ({ onOpen, onSearch }: NavbarPropsTypes) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  }
  return (
    <div className="navbar bg-base-100 p-4">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Clients</a>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-48 md:w-auto"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="navbar-end">
        <a className="btn btn-primary" onClick={onOpen}>Add Client</a>
      </div>
    </div>
  );
};

export default Navbar;
