// endpoints/userEndpoints.js
export const UserEndpoints = {
    getUser: (userId) => `/users/${userId}`,
    createUser: () => `/users`,
    updateUser: (userId) => `/users/${userId}`,
    deleteUser: (userId) => `/users/${userId}`,
  };
  