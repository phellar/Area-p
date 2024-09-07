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


const AdminDashboard = () => {

  
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
      }, []);

      const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
      };
    
 
// fetch and display total number of spo transfered in this division
    const handleFetchTransfer = async()=>{
      const { data, error } = await supabase
      .from('Transfer')
      .select();
      // .eq('user_id', user.id); //

      if(error){
        console.log(error)
      } else{
        setRecord(data)
        console.log(data)
      }
      
    }
    
   
  return (
    <>
    {isAuthenticated ? <p>welcome admin</p>

    // <section className="bg-light d-flex">
    //     <div className="bg-white shadow-sm"style={{width: '15vw', height: '100vh'}}>
    //       <ul className='list-group m-3'>
    //         <Link to='' class="list-group-item list-group-item-action active  " aria-current="true">
    //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
    //         <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
    //       </svg> 
    //         DashBoard
    //         </Link>
    //       </ul>
    //     </div>

    //     <div className=""style={{width: '85vw', height: '100vh'}}>
    //         <nav className='navbar nav-expand-lg navbar-white bg-white border-bottom p-3 d-flex justify-content-between position-relative'>
    //                 <h5>Welcome back, Admin {(user.user_metadata.full_name)} </h5>
    //                 {/* {JSON.stringify(user.user_metadata.full_name)} */}
              
    //                 <div className="">
    //                 <Image src="holder.js/171x180" roundedCircle onClick={handleToggle} className='border border-primary' />
    //                 </div>
    //         </nav>
    //                 {isToggle && <Card className='position-absolute top-5 end-0' style={{ width: '15rem' }}>
    //                     <Card.Body>                
    //                         <Card.Text>
    //                         {user.email}
    //                         <button onClick={handleLogout}>Logout</button>
    //                         </Card.Text>
                            
    //                         </Card.Body>
    //                     </Card>
    //                 }
                 
    //         <div className="container">

    //         <div className="row mt-5 gap-3">
    //             <div className="col-md">
    //               <Card className='p-3'>
    //                 <div className="">
    //                 <h1 className='text-center text-primary'>0</h1>
    //                  <div className="">
    //                   {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
    //                     <h6 className='text-center'>TRANSFERED SPOs</h6>
    //                     {/* {record.length} */}
    //                     {/* {record.map((item)=>(
    //                       <p>{item.length}</p>
    //                     ))} */}
    //                  </div>
    //                 </div>
                      
    //               </Card>
    //             </div>
    //             <div className="col-md">
    //               <Card className='p-3'>
    //                 <div className="">
    //                 <h1 className='text-center text-primary'>15</h1>
    //                  <div className="">
    //                   {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
    //                     <h6 className='text-center'>TRANSFERED SPOs</h6>
    //                     {/* {record.length} */}
    //                     {/* {record.map((item)=>(
    //                       <p>{item.length}</p>
    //                     ))} */}
    //                  </div>
    //                 </div>
                      
    //               </Card>
    //             </div>
    //             <div className="col-md">
    //               <Card className='p-3'>
    //                 <div className="">
    //                 <h1 className='text-center text-primary'>15</h1>
    //                  <div className="">
    //                   {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
    //                     <h6 className='text-center'>TRANSFERED SPOs</h6>
    //                     {/* {record.length} */}
    //                     {/* {record.map((item)=>(
    //                       <p>{item.length}</p>
    //                     ))} */}
    //                  </div>
    //                 </div>
                      
    //               </Card>
    //             </div>
    //             <div className="col-md  ">
    //               <Card className='p-3 bg-primary text-white ' role="button" onClick={handleShow}>
    //                 <div className="">
    //                 <h1 className='text-center text-white'>
    //                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
    //                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
    //               </svg>
    //                 </h1>
    //                  <div className="">
    //                     <h6 className='text-center'>Add New Record</h6>
    //                  </div>
    //                 </div>
                      
    //               </Card>
    //             </div>
            
    //         </div>

                        
          

    //         <table class="table mt-5">
    //             <thead>
    //               <tr>
    //                 <th scope="col">S/N</th>
    //                 <th scope="col">RANK</th>
    //                 <th scope="col">NAME</th>
    //                 <th scope="col">DIVISION</th>
    //                 <th scope="col">DATE TRANSFERED</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {record.map((item)=>(
                              
    //               <tr>
    //                 <th scope="row">{item.name}</th>
    //                 <td>{item.rank}</td> 
    //                 {/* <td>{item.FullName}</td>  */}
    //                 {/* <td>{item.division}</td>  */}
    //                 {/* <td>{item.dateTransfered}</td>  */}
    //               </tr>



    //                 ))}
    //             </tbody>
    //           </table>
    //         </div>
    //     </div>
    // </section>

    : <Login/>

}



</>
  )
}

export default AdminDashboard