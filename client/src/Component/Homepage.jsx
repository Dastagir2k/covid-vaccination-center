import { useLocation } from "react-router-dom";
import "./Homepage.css"
import  Axios  from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Homepage = () => {
    const location=useLocation();
    const name=new URLSearchParams(location.search).get("name")
    const [details,setDetails]=useState([]);
    const[search,setSearch]=useState('')
    const[message,setMessage]=useState(false)
    const Details=()=>{
        Axios.get('http://localhost:6060/home').then((res)=>{
            console.log(res);
            setDetails(res.data);
        }).catch(()=>{
            console.log("error in displaying the details");
        })
    }
    
    const BookMessage = (location) => {
      Axios.post("http://localhost:6060/book", { location })
        .then((res) => {
          console.log(res);
          setMessage(true);
          Details(); // Refresh details after booking
          toast.success("Slot booked successfully", {
            position: "top-right",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((err) => {
          console.error("Error booking slot:", err);
        });
    };
  return (
    <div>
        <h1>Welcome {name} !</h1>
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Enter Location"  onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <button className="btn" onClick={Details}>Details</button>
            <div className="body">
            <div>
          <div >
            <table className="table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Addesss</th>
                  <th>Slots</th>
                  <th>Date</th>
                  <th>Book</th>
                </tr>
              </thead>
              <tbody>
                {details.filter((item)=>{
                    return search.toLowerCase()===''?item:item.location.toLowerCase().includes(search)
                }).map((val, index) => (
                  <tr key={index} className="employee">
                    <td>{val.location}</td>
                    <td>{val.address}</td>
                    <td>{val.slots}</td>
                    <td>{val.dates}</td>
                    <td>
                    <button
                            onClick={() => BookMessage(val.location)}
                            disabled={val.slots === 0}
                          >
                            {val.slots === 0 ? "Booked" : "Book"}
                            {message}
                          </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
            </div>
        </div>
    </div>
  )
}

export default Homepage