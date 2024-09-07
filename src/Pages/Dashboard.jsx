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


const Dashboard = () => {

  const handleDateChange = (e) => {
    const formattedDate = e.target.value; // This will already be in "yyyy-MM-dd" format
    setSpoForm({
        ...spoForm,
        dateTransfered: formattedDate,
    });
};


  const [spoForm,setSpoForm]= useState({
       FullName: '',
        division: '',
        rank: '',
        dateTransfered:'',
  });
  const [record, setRecord] = useState([]);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [isToggle, setIsToggle]= useState(false);
    const [user,setUser] = useState ('');
    const [divisionData, setDivisionData] = useState([]);

    const handleToggle = ()=>{
        setIsToggle(!isToggle);
    }
    const handleChange = (e)=>{
      setSpoForm({... spoForm, [e.target.name]: e.target.value});
  }



    useEffect(() => {
        const fetchUser = async () => {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            console.error('Error fetching user:', error);
            // navigate('/'); // Redirect to login if there's an error
          } else {
              setUser(data.user);
              setIsAuthenticated(true)
            // console.log(data.user.identities);
          }
        };
    
        fetchUser();
        handleFetchTransfer();
      }, []);

      const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
      };
    
    // show modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


// fetch and display total number of spo transfered in this division
    const handleFetchTransfer = async()=>{
      const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData?.session?.user;

    if(user){
      const { data, error } = await supabase
      .from('Transfer')
      .select('*')
      .eq('user_id', user.id) //
      .limit(200);

      if(error){
        console.log(error)
      } else{
        setDivisionData(data)
        // console.log(data)
      }
    }
      
    }
    
    //Add New Spo Record
    const handleAddRecord = async()=>{
        const {FullName,division,rank,dateTransfered} = spoForm

          // check if form field is empty
            if(!FullName || !rank || !division || !dateTransfered){
            alert('form cannot be empty');
          }

          else{

            const { data: sessionData } = await supabase.auth.getSession();
            const user = sessionData?.session?.user;
            if(user){
              const { error } = await supabase.from('Transfer').insert([
                {FullName,division,rank,dateTransfered,user_id:user.id}
              ]);
            } 

            else{
              console.log(error)

            }
                
          
                // clear the spo form
                  setSpoForm({
                    FullName: '',
                    division: '',
                    rank: '',
                    dateTransfered:'',
                  })  
          }
      
    }
  return (
    <>
    {isAuthenticated ?

    <section className="bg-light d-flex">
        <div className="bg-white shadow-sm"style={{width: '15vw', height: '100vh'}}>
          <ul className='list-group m-3'>
            <Link to='' class="list-group-item list-group-item-action active  " aria-current="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
          </svg> 
            DashBoard
            </Link>
            <button className='btn btn-primary' onClick={handleLogout}>Log Out</button>
          </ul>
        </div>

        <div className=""style={{width: '85vw', height: '100vh'}}>
            <nav className='navbar nav-expand-lg navbar-white bg-white border-bottom p-3 d-flex justify-content-between position-relative'>
                    <h5>Welcome back, Admin {(user.user_metadata.division)} </h5>
                    {/* {JSON.stringify(user.user_metadata.full_name)} */}
              
                    <div className="">
                    <Image src="holder.js/171x180" roundedCircle onClick={handleToggle} className='border border-primary' />
                    </div>
            </nav>
                    {isToggle && <Card className='position-absolute top-5 end-0' style={{ width: '15rem' }}>
                        <Card.Body>                
                            <Card.Text>
                            {user.email}
                            {/* <button onClick={handleLogout}>Logout</button> */}
                            </Card.Text>
                            
                            </Card.Body>
                        </Card>
                    }
                 
            <div className="container">

            <div className="row mt-5 gap-3">
                <div className="col-md">
                  <Card className='p-3'>
                    <div className="">
                    <h1 className='text-center text-primary'>{divisionData.length}</h1>
                     <div className="">
                      {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
                        <h6 className='text-center'>TRANSFERED SPOs</h6>
                        
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
                    <h1 className='text-center text-primary'>15</h1>
                     <div className="">
                      {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
                        <h6 className='text-center'>TRANSFERED SPOs</h6>
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
                    <h1 className='text-center text-primary'>15</h1>
                     <div className="">
                      {/* <button className='btn btn-primary' onClick={handleShow}>Add new record</button> */}
                        <h6 className='text-center'>TRANSFERED SPOs</h6>
                        {/* {record.length} */}
                        {/* {record.map((item)=>(
                          <p>{item.length}</p>
                        ))} */}
                     </div>
                    </div>
                      
                  </Card>
                </div>
                <div className="col-md  ">
                  <Card className='p-3 bg-primary text-white ' role="button" onClick={handleShow}>
                    <div className="">
                    <h1 className='text-center text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                  </svg>
                    </h1>
                     <div className="">
                        <h6 className='text-center'>Add New Record</h6>
                     </div>
                    </div>
                      
                  </Card>
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
                  {divisionData.map((item)=>(
                              
                  <tr key={item.id}>
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


<Modal show={show} onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>ADD NEW RECORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form">
                <div className="form-group mb-3">
                <label htmlFor="dateTransfered" className='form-label'>Rank</label>
                <input type="text" className='form-control' 
                  // placeholder='Rank'
                  name='rank'
                  value={spoForm.rank}
                  onChange={handleChange}
                />

                </div>
                <div className="form-group mb-3">
                <label htmlFor="dateTransfered" className='form-label'>Full Name</label>
                <input type="text" className='form-control' 
                  // placeholder='Full Name'
                  name='FullName'
                  value={spoForm.FullName}
                  onChange={handleChange}
                />
                </div>
                <div className="form-group mb-3">
                <label htmlFor="division" className='form-label'>Division</label>
                <select className="form-select" 
                  aria-label=""
                  name='division'
                  value={spoForm.division}
                  onChange={handleChange}
                  >
                    <option value="" disabled>Select</option>
                    <option value="AreaP">Area P</option>
                    <option value="Alagbado">Alagbado</option>
                    <option value="Ayobo">Ayobo</option>
                    <option value="Ipaja">Ipaja</option>
                    <option value="Oke-odo">Oke Odo</option>
                    <option value="Meiran">Meiran</option>
                    </select>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="dateTransfered" className='form-label'>Date of Transfer</label>
                  <input type="date" className='form-control' 
                    placeholder='dateTransfered:'
                    name='dateTransfered:'
                    value={spoForm.dateTransfered}
                    onChange={handleDateChange}
                  />
                </div>
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
</>
  )
}

export default Dashboard