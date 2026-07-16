import React, { useState } from "react";
import Header from "../Component/Header";
import supabase from "../Config/SupabaseClient";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const notify = () => toast.success("Account Created Successfully");

  const [showSpinner, setShowSpinner] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    FullName: "",
    email: "",
    password: "",
    division: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // REGISTER USER
  // =============================

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { FullName, password, division, email } = form;

  if (!FullName || !password || !division || !email) {
    handleShow();
    return;
  }

  setShowSpinner(true);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: FullName,
          division: division,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    notify();

    setForm({
      FullName: "",
      password: "",
      division: "",
      email: "",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
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
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <div
          className="card border-0 mx-auto mt-5 p-3 shadow"
          style={{ width: "450px" }}
        >
          <div className="card-header bg-white text-center border-0">
            <h3>Create an Account</h3>
            <p className="lead">
              Strictly for Admin Officers / Inspector Admin
            </p>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="FullName"
                  value={form.FullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <select
                  className="form-select"
                  name="division"
                  value={form.division}
                  onChange={handleChange}
                >
                  <option value="">Select Division</option>

                  <option value="Alagbado">Alagbado Division</option>

                  <option value="Ayobo">Ayobo Division</option>

                  <option value="Ipaja">Ipaja Division</option>

                  <option value="Oke-Odo">Oke Odo Division</option>

                  <option value="Meiran">Meiran Division</option>
                </select>
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
                    "Create Account"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <ToastContainer />
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Incomplete Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>Kindly fill in all required fields.</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
