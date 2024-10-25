export const menu = [
  {
    id: 1,
    title: "DASHBOARD",
    listItems: [
      // {
      //   id: 1,
      //   title: "Home",
      //   url: "/",
      //   icon: "fa-solid fa-house",
      // },
      {
        id: 2,
        title: "Profile",
        url: "/userProfile",
        icon: "fa-regular fa-user",
      },
      // {
      //   id: 3,
      //   title: "Submit Resume",
      //   url: "/apply",
      //   icon: "fa-solid fa-file-upload",
      // },
      {
        id: 4,
        title: "Job Applications",
        url: "/status",
        icon: "fa-solid fa-paper-plane",
      },
      {
        id: 5,
        title: "Application Status",
        url: "/status",
        icon: "fa-solid fa-check-circle",
      },
      // {
      //   id: 6,
      //   title: "Notifications",
      //   url: "/notifications", // Add this route if necessary
      //   icon: "fa-regular fa-bell",
      // },
    ],
  },
  {
    id: 2,
    title: "JOB SEARCH",
    listItems: [
      {
        id: 7,
        title: "Search Job Openings",
        url: "/searchJobs",
        icon: "fa-solid fa-search",
      },
      {
        id: 8,
        title: "Saved Jobs",
        url: "/savedJobs", // Add this route if necessary
        icon: "fa-solid fa-star",
      },
    ],
  },
  {
    id: 3,
    title: "ACCOUNT",
    listItems: [
      {
        id: 9,
        title: "Settings",
        url: "/settings", // Add this route if necessary
        icon: "fa-solid fa-gear",
      },
      {
        id: 10,
        title: "Logout",
        url: "/logout", // Handle logout functionality
        icon: "fa-solid fa-sign-out-alt",
      },
    ],
  },
];
