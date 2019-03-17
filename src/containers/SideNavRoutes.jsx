const SideNavRoutes = [
  {
    path: "/ManageMenu",
    name: "Menu",
    icon: "pe-7s-graph",
  },
  {
    path: "/ActivityLog",
    name: "Activity Log",
    icon: "pe-7s-user"
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "pe-7s-note2",
  },
  {
    path: "",
    name: "Logout",
    icon: "pe-7s-news-paper",
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default SideNavRoutes;
