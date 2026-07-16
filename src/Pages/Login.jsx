import React, { useState } from "react";
import Header from "../Component/Header";
import Logo from "../assets/Nigeria_Police_logo.jpg";
import { useNavigate } from "react-router-dom";
import supabase from "../Config/SupabaseClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const navigate = useNavigate();

  const notify = () => toast.success("Login Successful");

  const [showSpinner, setShowSpinner] = useState(false);
  const [showError, setShowError] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setShowError(false);

    const { email, password } = form;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setShowSpinner(true);

    try {
      // Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setShowError(true);
        alert(error.message);
        return;
      }

      // Get profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        console.log(profileError);
        alert(profileError.message);
        return;
      }

      notify();

      if (profile.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setShowError(true);
    } finally {
      setShowSpinner(false);
    }
  };
  return (
    <>
      <Header />

      <section
        className="bg-light"
        style={{
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <div
          className="card p-2 border-0 mx-auto mt-5 shadow"
          style={{ width: "400px" }}
        >
          <div className="card-header text-center bg-white p-3 border-0">
            <img src={Logo} width={80} alt="Logo" />
          </div>

          <div className="card-body">
            {showError && (
              <p className="alert alert-danger text-center">
                Invalid email or password.
              </p>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="AdminOfficer@gmail.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={showSpinner}
                >
                  {showSpinner ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <ToastContainer />
    </>
  );
};

export default Login;
