export const menu = [
  {
    id: 1,
    title: "MAIN",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/",
        icon: "fa-solid fa-house",
      },
      {
        id: 2,
        title: "Profile",
        url: "/profile",
        icon: "fa-regular fa-user",
      },
      {
        id: 3,
        title: "CRUD User Data",
        url: "/user",
        icon: "fa-solid fa-users",
      },
    ],
  },
  {
    id: 2,
    title: "MANAGEMENT",
    listItems: [
      {
        id: 4,
        title: "Manage User Roles",
        url: "/userRoles",
        icon: "fa-solid fa-user-shield",
      },
      {
        id: 5,
        title: "Monitor Performance",
        url: "/monitorPerformance",
        icon: "fa-solid fa-chart-line",
      },
      {
        id: 6,
        title: "Generate Reports",
        url: "/reports", // Adjust URL as necessary
        icon: "fa-solid fa-file-alt",
      },
    ],
  },

  // can add logout functionality

  // {
  //   id: 3,
  //   title: "AUTHENTICATION",
  //   listItems: [
  //     {
  //       id: 7,
  //       title: "Login",
  //       url: "/login",
  //       icon: "fa-solid fa-sign-in-alt"
  //     },
  //   ]
  // }
];
