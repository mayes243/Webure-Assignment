import React from "react";
import { Blogs, Navbar } from "../../../components";

const Dashboard = () => {
  document.title = "Dashboard";

  return (
    <div className="">
      <Navbar />
      <Blogs />
    </div>
  );
};

export default Dashboard;
