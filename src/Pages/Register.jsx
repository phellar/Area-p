import React, { useState } from 'react'
import Header from '../Component/Header'
import supabase from '../Config/SupabaseClient'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
const navigate = useNavigate()

// show notification after successfull registration

    const [form, setForm] = useState({
        FullName: '',
        password: '',
        division: '',
        email: '',
    })

    const [formError, setFormError] = useState(false)

    const handleChange = (e)=>{
        setForm({... form, [e.target.name]: e.target.value});
    }

    // register use 
    const handleSubmit = async(e) =>{
      e.preventDefault()
      
      const {FullName,password, division,email}= form

      if(!FullName || !password || !division || !email){
        handleShow();
      }

      else{
        try {

          handleSpinner();
          const { data, error } = await supabase.auth.signUp(
            {
              email,
              password,
              options: {
                data: {
                  full_name: form.FullName,
                  division: form.division,
                  role: 'user' 
                }
              }
             
            }
          )
          
          setForm({
            FullName: '',
            password: '',
            division: '',
            email: '',
          })

          


          if(data){
            
            navigate("/");
          }

          
        } catch (error) {
            console.log(error);
        } finally{
          setShowSpinner(false)
        }
          

      }
    }


// show modal for error
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // show spinner
  const [ShowSpinner, setShowSpinner] = useState(false);
  const handleSpinner = ()=>{
    setTimeout(setShowSpinner(true), 5000)
  }





  return (
    <>
    <Header/>
    <section className="bg-light" style={{width: '100vw', height: '100vh', overflowX: 'hidden'}}>
        {/* <h2 className="text-center text-darkt mt-4">SPO's Transfer Record Portal</h2> */}
    <div className="card border-0 mx-auto mt-5  p-3" style={{width: '450px'}}>
        <div className="card-header text-center bg-white ">
            <h3>Create an Account</h3>
            <p className="lead">Strictly for Admin Officers/Inspr.Admin</p>
            {/* <p className="lead">sign in below</p> */}
        </div>
        <div className="card-body p-4">
          <div className=""></div>

        

                <div className="form-group mb-3">
                  {/* <label htmlFor="email" className='form-label'>Admin Officer</label> */}
                  <input type="text" className='form-control' 
                  placeholder='Full Name'
                  name='FullName'
                  value={form.FullName}
                  onChange={handleChange}
                />
                </div>

                <div className="form-group mb-3">
                  {/* <label htmlFor="email" className='form-label'>Email</label> */}
                  <input type="email" className='form-control ' 
                  placeholder='Email Address' 
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  />
                </div>

                <div className="form-group  mb-3">
                  {/* <label htmlFor="passowrd" className='form-label'>Password</label> */}
                  <input type="password" 
                  className='form-control' 
                  placeholder='Password'
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                   />
                </div>

                <div className="form-group  mb-3">
                {/* <label htmlFor="password" className='form-label'>Division</label> */}
                  <select class="form-select" 
                  aria-label=""
                  name='division'
                  value={form.division}
                  onChange={handleChange}
                  >
                    <option value="" disabled>Select Division</option>
                    <option value="AreaP">Area P</option>
                    <option value="Alagbado">Alagbado</option>
                    <option value="Ayobo">Ayobo</option>
                    <option value="Ipaja">Ipaja</option>
                    <option value="Oke-odo">Oke Odo</option>
                    <option value="Meiran">Meiran</option>
                    </select>
                </div>
                <div className="form-group mt-4 d-grid">
                    <button className='btn btn-primary' onClick={handleSubmit}>
                      {ShowSpinner ? <Spinner animation="border" size="sm"/> : <h5 className='text-center'>Submit</h5>}
                    </button>
                </div>
        </div>
    </div>
    <ToastContainer />
    </section>


{/* modal and spinner utility */}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ops!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kindly Fill all the field</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  )
}

export default Register