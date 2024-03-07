import React, { useState } from "react";

function UserLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform login logic
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h2>Login to Rentpe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-table">
          <label htmlFor="email" className="form-lable">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-table">
          <label htmlFor="password" className="form-lable">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-outline-primary mt-3">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserLogin;
