import  Axios  from "axios";
import { useState } from "react";

const AdminPage = () => {
    const[location,setLocation]=useState("")
    const[address,setLAddress]=useState("")
    const[slots,setSlots]=useState("")
    const[dates,setDates]=useState("")
    // const[search,setSearch]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        Axios.post('http://localhost:6060/details',{
            location:location,
            address:address,
            slots:slots,
            dates:dates
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const[details,setDetails]=useState([])
    const detailsData=()=>{
        Axios.get('http://localhost:6060/getDetails').then((res)=>{
            console.log(res);
            setDetails(res.data);
        }).catch(()=>{
            console.log("error in displaying the details");
        })
    }


    const BookMessage = (location) => {
      Axios.post("http://localhost:6060/bookUpdate", { location })
        .then((res) => {
          console.log(res);
          detailsData(); // Refresh details after booking
          
        })
        .catch((err) => {
          console.error("Error booking slot:", err);
        });
    };

  return (
    <div>
      <h1>Welcome to AdminPage</h1>
      <div>
        <h2>Covid Vaccination Details</h2>
        <div>
          <form>
            <label htmlFor="username">Location </label>
            <input type="text" onChange={(e)=>setLocation(e.target.value)} />
            <label htmlFor="username">Address </label>
            <input type="text" onChange={(e)=>setLAddress(e.target.value)} />
            <label htmlFor="username">Slots </label>
            <input type="text" onChange={(e)=>setSlots(e.target.value)} />
            <label htmlFor="username">Date </label>
            <input type="date" onChange={(e)=>setDates(e.target.value)}/>
            <button className="btn" onClick={handleSubmit}>Enter</button>
          </form>
        </div>
        <button className="btn" onClick={detailsData}>Details</button>
      </div>
      <div>
      <table className="table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Addresss</th>
                  <th>Slots</th>
                  <th>Date</th>
                  <th>Slots Add</th>
                </tr>
              </thead>
              <tbody>
                {details.map((val, index) => (
                  <tr key={index} className="employee">
                    <td>{val.location}</td>
                    <td>{val.address}</td>
                    <td>{val.slots}</td>
                    <td>{val.dates}</td>
                    <button
                            className="btn"
                            onClick={() => BookMessage(val.location)}
                            
                          >
                            ADD
                          </button>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </div>
  );
};

export default AdminPage;







