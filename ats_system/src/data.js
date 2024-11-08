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
        title: "Applicant Overview",
        url: "/applicantOverview",
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
        title: "Manage Job Openings",
        url: "/manageJobOpenings",
        icon: "fa-solid fa-user-shield",
      },
      {
        id: 5,
        title: "Schedule Interviews",
        url: "/interviewScheduling",
        icon: "fa-solid fa-clipboard-question",
      },
      // {
      //   id: 6,
      //   title: "Generate Reports",
      //   url: "/reports", // Adjust URL as necessary
      //   icon: "fa-solid fa-file-alt",
      // },
    ],
  },

  {
    id: 3,
    title: "ACCOUNT",
    listItems: [
      // {
      //   id: 9,
      //   title: "Settings",
      //   url: "/settings", // Add this route if necessary
      //   icon: "fa-solid fa-gear",
      // },
      {
        id: 10,
        title: "Logout",
        url: "/logout", // Handle logout functionality
        icon: "fa-solid fa-sign-out-alt",
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
