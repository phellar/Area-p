import React, { useState, useEffect } from "react";
import { Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import supabase from "../Config/SupabaseClient";
import Login from "./Login";
import Logo from "../assets/Nigeria_Police_logo.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  // ==========================
  // STATES
  // ==========================

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [divisionData, setDivisionData] = useState([]);
  const [isToggle, setIsToggle] = useState(false);

  const [show, setShow] = useState(false);

  const [spoForm, setSpoForm] = useState({
    FullName: "",
    division: "",
    rank: "",
    dateTransfered: "",
  });

  // ==========================
  // MODAL
  // ==========================

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setSpoForm({
      ...spoForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setSpoForm({
      ...spoForm,
      dateTransfered: e.target.value,
    });
  };

  // ==========================
  // PROFILE MENU
  // ==========================

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  // ==========================
  // GET USER
  // ==========================

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.log(error);
      return;
    }

    setUser(user);
    setIsAuthenticated(true);

    handleFetchTransfer(user.id);
  };

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // ==========================
  // FETCH TRANSFER RECORDS
  // ==========================

  const handleFetchTransfer = async (userId) => {
    const { data, error } = await supabase
      .from("transfer")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setDivisionData(data);
  };

  // ==========================
  // ADD RECORD
  // ==========================

  const handleAddRecord = async () => {
    const { FullName, division, rank, dateTransfered } = spoForm;

    if (!FullName || !division || !rank || !dateTransfered) {
      alert("All fields are required.");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      alert("User not authenticated.");
      return;
    }

    const { data, error } = await supabase
      .from("transfer")
      .insert([
        {
          full_name: FullName,
          division,
          rank,
          date_transferred: dateTransfered,
          user_id: session.user.id,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Record added successfully.");

    setSpoForm({
      FullName: "",
      division: "",
      rank: "",
      dateTransfered: "",
    });

    handleFetchTransfer(session.user.id);

    handleClose();
  };

  return (
    <>
      {isAuthenticated ? (
        <section className="bg-light d-flex">
          {/* Sidebar */}
          <div
            className="bg-white shadow-sm"
            style={{ width: "20vw", height: "100vh" }}
          >
            <div className="d-flex justify-content-center pt-3">
              <img src={Logo} width={100} alt="Logo" />
            </div>

            <ul className="m-3 list-group list-group-flush pt-2">
              <Link to="" className="list-group-item">
                Dashboard
              </Link>

              <Link to="" className="list-group-item">
                Help & Support
              </Link>

              <Link to="" className="list-group-item">
                Account
              </Link>

              <Link to="" className="list-group-item" onClick={handleLogout}>
                Logout
              </Link>
            </ul>
          </div>

          {/* Main */}
          <div style={{ width: "80vw", height: "100vh" }}>
            <nav className="navbar bg-white border-bottom p-3 d-flex justify-content-between position-relative">
              <h5>Welcome back, Admin {user?.user_metadata?.division} &#x1F44B;</h5>

              <Image
                src="holder.js/171x180"
                roundedCircle
                className="border border-primary"
                onClick={handleToggle}
              />
            </nav>

            {isToggle && (
              <Card
                className="position-absolute top-5 end-0"
                style={{ width: "15rem" }}
              >
                <Card.Body>
                  <Card.Text>{user?.email}</Card.Text>
                </Card.Body>
              </Card>
            )}

            <div className="container">
              {/* Dashboard Cards */}

              <div className="row mt-5 g-3">
                <div className="col-md-3">
                  <Card className="p-3">
                    <h1 className="text-center text-primary">
                      {divisionData.length}
                    </h1>

                    <h6 className="text-center">
                      TRANSFERRED SPOs
                    </h6>
                  </Card>
                </div>

                {/* <div className="col-md-3">
                  <Card className="p-3">
                    <h1 className="text-center text-primary">
                     {user?.user_metadata?.division}
                    </h1>

                    <h6 className="text-center">DIVISION</h6>
                  </Card>
                </div> */}

                <div className="col-md-3">
                  <Card className="p-3">
                    <h1 className="text-center text-primary">
                      115
                      {/* {divisionData.filter((item) => item.rank).length} */}
                    </h1>

                    <h6 className="text-center">OFFICERS</h6>
                  </Card>
                </div>

                <div className="col-md-3">
                  <Card
                    className="bg-primary text-white p-3"
                    role="button"
                    onClick={handleShow}
                  >
                    <h1 className="text-center">+</h1>

                    <h6 className="text-center">Add New Record</h6>
                  </Card>
                </div>
              </div>

              {/* Table */}

              <div className="table-responsive mt-5">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Rank</th>
                      <th>Full Name</th>
                      <th>Division</th>
                      <th>Date Transferred</th>
                    </tr>
                  </thead>

                  <tbody>
                    {divisionData.length > 0 ? (
                      divisionData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>

                          <td>{item.rank}</td>

                          <td>{item.full_name}</td>

                          <td>{item.division}</td>

                          <td>{item.date_transferred}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Add Record Modal */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Record</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className="mb-3">
                  <label className="form-label">Rank</label>

                  <input
                    type="text"
                    className="form-control"
                    name="rank"
                    value={spoForm.rank}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="FullName"
                    value={spoForm.FullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Division</label>

                  <select
                    className="form-select"
                    name="division"
                    value={spoForm.division}
                    onChange={handleChange}
                  >
                    <option value="">Select Division</option>

                    <option value="Area P">Area P</option>

                    <option value="Alagbado">Alagbado</option>

                    <option value="Ayobo">Ayobo</option>

                    <option value="Ipaja">Ipaja</option>

                    <option value="Oke Odo">Oke Odo</option>

                    <option value="Meiran">Meiran</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Transfer</label>

                  <input
                    type="date"
                    className="form-control"
                    name="dateTransfered"
                    value={spoForm.dateTransfered}
                    onChange={handleDateChange}
                  />
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>

                <Button variant="primary" onClick={handleAddRecord}>
                  Save Record
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Dashboard;
