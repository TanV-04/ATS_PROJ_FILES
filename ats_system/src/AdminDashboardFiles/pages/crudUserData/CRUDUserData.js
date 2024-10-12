// ManageUsers.js
import React, { useEffect } from 'react';

const ManageUsers = () => {

  useEffect(() => {
    document.title = 'Profile - hello world'
  }, []);

  return (
    <div>
      <h1>Manage Users</h1>
      <button>Create New User</button>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through user data */}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
