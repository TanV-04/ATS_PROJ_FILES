import React, { useEffect } from "react";

const ManageUserRoles = () => {
  useEffect(() => {
    document.title = "Manage User Roles"; // Change this to your desired title
  }, []);
  return (
    <div>
      <h1>Manage User Roles and Permissions</h1>
      <button>Create New Role</button>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{/* Map through user roles data */}</tbody>
      </table>
    </div>
  );
};

export default ManageUserRoles;
