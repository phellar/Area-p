import { Button } from 'bootstrap'
import { useState, } from 'react'
import React from 'react'
import Header from '../Component/Header'
import Logo from '../assets/Nigeria_Police_logo.jpg'
import { useNavigate } from 'react-router-dom'
import supabase from '../Config/SupabaseClient'

const Login = () => {

  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);

  const [form, setForm] = useState({
    password: '',
    email: '',
    })

    const handleChange = (e)=>{
      setForm({... form, [e.target.name]: e.target.value});
    }


  const handleLogin = async(e)=>{
      e.preventDefault();
      try {    

        const {email, password} = form

        // check if the form is emptys
        if(!email || !password){
          alert('input field cannot be empty');
        }

        else{
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          })

            if (data) {
              const role = data.user?.user_metadata?.role;

              if (role === 'admin') {
                navigate('/admin-dashboard');
              } else if (role === 'user') {
                navigate('/dashboard');
              } else {
                console.log('Role not found');
              }
              
            } else {
              // navigate('/dashboard');
              setShowError(true)
          }
      
        }


      } 
      
      catch (error) {
        setShowError(true);
        console.log(error);
      }

      
     


  }

    





  return (
    <>
    <Header/>
    <section className="bg-light" style={{width: '100vw', height: '100vh', overflowX: 'hidden'}}>
    {/* <h1 className="text-center text-dark mt-4">SPO's Transfer Record Portal</h1> */}
    {/* <h2 className='text-center mt-5'>Login</h2> */}
    <div className="card p-2 border-0 mx-auto mt-5" style={{width: '400px'}}>
        <div className="card-header text-center bg-white p-1">
          <img src={Logo} width={80} alt="" />
        <h1 className='text-center'>Login</h1>

          
        </div>
  
        <div className="card-body">
          
        {showError && 
              <p className="lead alert alert-danger text-center p-2">invalid Login Credentials</p>
              }
              <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className='form-label'>Email</label>
                  <input type="text" className='form-control ' 
                  placeholder='AdminOfficer@gmail.com'
                  name='email'
                  value={form.email}
                  onChange={handleChange} 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passowrd" className='form-label'>Password</label>
                  <input type="password" className='form-control' 
                  placeholder='Password'
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  />
                </div>
                <div className="form-group mt-4 d-grid">
                  <button className='btn btn-primary' >Login</button>
                </div>
              </form>
        </div>
    </div>

    </section>
    </>
  )
}

export default Login