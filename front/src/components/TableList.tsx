import React from "react";

type PropsType = {
  handleOpen: (mode: "add" | "edit") => void;
};

const TableList = ({ handleOpen }: PropsType) => {
  let clientsData = [
    {
      id: 1,
      name: "Osvaldo",
      email: "osbaldo@gmail.com",
      job: "Developer",
      rate: "100",
      isactive: true,
    },
    {
      id: 2,
      name: "Tremaine",
      email: "tremaine@gmail.com",
      job: "Ux Designer",
      rate: "100",
      isactive: true,
    },
    {
      id: 3,
      name: "Mosh",
      email: "moshe@gmail.com",
      job: "Lead dev",
      rate: "100",
      isactive: false,
    },
    {
      id: 4,
      name: "Gregg",
      email: "gregg@gmail.com",
      job: "Project manager",
      rate: "100",
      isactive: false,
    },
    {
      id: 5,
      name: "Giselle",
      email: "gisselle@gmail.com",
      job: "Developer",
      rate: "100",
      isactive: true,
    },
  ];

  return (
    <div>
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
            {clientsData.map((client, index) => (
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
