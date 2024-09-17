import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Image } from 'react-bootstrap'
import { Card } from 'react-bootstrap';
import { Form, Link, useNavigate } from 'react-router-dom';
import supabase from '../Config/SupabaseClient';
import Login from './Login';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Logo from '../assets/Nigeria_Police_logo.jpg'


const AdminDashboard = () => {

  const navigate = useNavigate();

  
  const [record, setRecord] = useState([]);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const [isToggle, setIsToggle]= useState(false);

    const handleToggle = ()=>{
        setIsToggle(!isToggle);
    }
 


    useEffect(() => {
      const checkUserRole = async () => {
        const { data } = await supabase.auth.getSession();
        const user = data?.session?.user;
  
        if (user && user.user_metadata?.role === 'admin')  {
          setIsAuthenticated(true);
        }
  
        
      };
  
      checkUserRole();
      handleFetchTransfer();
      }, []);

      const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
      };
    
 
// fetch and display total number of spo transfered in this division
    const handleFetchTransfer = async()=>{
      // const { data: sessionData } = await supabase.auth.getSession();
      // const user = sessionData?.session?.user;
  
        const { data, error } = await supabase
        .from('Transfer')
        .select();
      
        if(error){
          console.log(error)
        } else{
          setRecord(data)
          // console.log(data)
        }     
    }


    
   
  return (
    <>
    {isAuthenticated ?

    <section className="bg-light d-flex">
        <div className="bg-white shadow-sm"style={{width: '20vw', height: '100vh', padding: '10px 0px'}}>
          <div className="d-flex justify-content-center">
          <img src={Logo} width={100} alt="Logo" />
          </div>
          <ul className='m-3 list-group list-group-flush pt-2'>
            <Link to='' class="list-group-item d-inline   " aria-current="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door mx-2" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
          </svg> 
            DashBoard
            </Link>
            <Link to='' class="list-group-item list-group-item " aria-current="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-headset mx-2 " viewBox="0 0 16 16">
  <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5"/>
</svg>
            Help and support
            
            </Link>
            <Link to='' class="list-group-item list-group-item  " aria-current="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle mx-2" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
            Account
            </Link>
            <Link to='' class="list-group-item list-group-item" role="button" onClick={handleLogout} aria-current="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-box-arrow-right mx-2" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
            Logout
            </Link>
          </ul>
        </div>

        <div className=""style={{width: '80vw', height: '100vh'}}>
            <nav className='navbar nav-expand-lg navbar-white bg-white border-bottom p-3 d-flex justify-content-between position-relative'>
                    {/* <h5>Welcome back, Admin {(user.user_metadata.full_name)} </h5> */}
                    <h5>Welcome back, Admin </h5>
                    {/* {JSON.stringify(user.user_metadata.full_name)} */}
              
                    <div className="">
                    <Image src="holder.js/171x180" roundedCircle onClick={handleToggle} className='border border-primary' />
                    </div>
            </nav>
                    {isToggle && <Card className='position-absolute top-5 end-0' style={{ width: '15rem' }}>
                        <Card.Body>                
                            <Card.Text>
                            {/* {user.email} */}
                            <button onClick={handleLogout}>Logout</button>
                            </Card.Text>
                            
                            </Card.Body>
                        </Card>
                    }
                 
            <div className="container">

            <div className="row mt-5 gap-3">
                <div className="col-md">
                  <Card className='p-3'>
                    <div className="">
                    <h1 className='text-center text-primary'>{record.length}</h1>
                     <div className="">
                      {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
                        <h6 className='text-center'>TOTAL TRANSFERED SPOs</h6>
                        {/* {record.length} */}
                        {/* {record.map((item)=>(
                          <p>{item.length}</p>
                        ))} */}
                     </div>
                    </div>
                      
                  </Card>
                </div>
                <div className="col-md">
                  <Card className='p-3'>
                    <div className="">
                    <h1 className='text-center text-primary'>5</h1>
                     <div className="">
                      {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
                        <h6 className='text-center'>DIVISIONS</h6>
                        {/* {record.length} */}
                        {/* {record.map((item)=>(
                          <p>{item.length}</p>
                        ))} */}
                     </div>
                    </div>
                      
                  </Card>
                </div>
                <div className="col-md">
                  <Card className='p-3'>
                    <div className="">
                    <h1 className='text-center text-primary'>5</h1>
                     <div className="">
                      {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
                        <h6 className='text-center'>ADMIN OFFICERS</h6>
                        {/* {record.length} */}
                        {/* {record.map((item)=>(
                          <p>{item.length}</p>
                        ))} */}
                     </div>
                    </div>
                      
                  </Card>
                </div>
                <div className="col-md  ">
                  
                </div>
            
            </div>

                        
          

            <table class="table mt-5">
                <thead>
                  <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">RANK</th>
                    <th scope="col">NAME</th>
                    <th scope="col">DIVISION</th>
                    <th scope="col">DATE TRANSFERED</th>
                  </tr>
                </thead>
                <tbody>
                  {record.map((item)=>(
                              
                  <tr>
                    <th scope="row">{item.name}</th>
                    <td>{item.rank}</td> 
                    <td>{item.FullName}</td> 
                    <td>{item.division}</td> 
                    <td>{item.dateTransfered}</td> 
                  </tr>



                    ))}
                </tbody>
              </table>
            </div>
        </div>
    </section>

    : <Login/>

}



</>
  )
}

export default AdminDashboard