import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5">
      <h2>Welcome to Admin Panel</h2>
      <hr />
      <Link to={"/existing-hotels"}>Manage Hotels</Link> <br />
      <Link to={"/existing-plans"}>Manage Plans</Link>
    </section>
  );
};

export default Admin;
