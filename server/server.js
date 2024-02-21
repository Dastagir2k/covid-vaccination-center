const express=require('express')
const mysql=require('mysql2')
const cors=require('cors')

const app=express();
app.use(express.json());
app.use(cors());

const route=express.Router();
//create connection to database
const db=mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'root',
    database:'userDetails',
})

app.post('/',(req,res)=>{
    const name=req.body.name;
    const password=req.body.password;
    db.query('INSERT INTO userLogin (name,password) values (?,?)',
    [name,password],(err,result)=>{
        if(err){
            console.log("Error while inserting into db");
        }else{
            res.send("Data inserted successfully",result);
        }
    })
})



//inserting data from admin page to database
app.post('/details',(req,res)=>{
    const location=req.body.location;
    const address=req.body.address;
    const slots=req.body.slots;
    const dates=req.body.dates;
    db.query('INSERT INTO covidDetails (location,address,slots,dates) values (?,?,?,?)',
    [location,address,slots,dates],(err,result)=>{
        if(err){
            console.log("Error while inserting into db");
        }else{
            res.send("Data inserted successfully",result);
        }
    })
})

app.get("/getDetails",(req,res)=>{
    db.query('select distinct * from covidDetails',(err,result)=>{
        if(err){
            console.log("error");
        }else{
            res.send(result)
        }
    })
})

//LOGIN
app.post('/login',(req,res)=>{
    //GET TING THE DATA FROM FORM 
    const name=req.body.name;
    const password=req.body.password;
    db.query("SELECT * FROM userLogin where name=? and password=?",[name,password],(err,result)=>{
        const adminUsername = 'admin';
        const adminPassword = '12345678';
        if(err){
            console.log("Error while querying the database");
            res.status(500).send("Internal Server Error");
        }else{
            if(name===adminUsername &&  password===adminPassword){
                
                    res.status(200).json({ role: 'admin' });
                
            }
            if(result.length>0){
                // User authenticated successfully
                res.status(200).json({ role: 'user' });
            }else{
                    // Invalid credentials
                    res.status(401).send("Invalid username or password");
            }
        }
    })
    
})


app.post("/book", (req, res) => {
    const location = req.body.location;
  
    db.query(
      "UPDATE covidDetails SET slots = slots - 1 WHERE location = ? AND slots > 0",
      [location],
      (err, result) => {
        if (err) {
          console.log("Error updating slots:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).send("Slot booked successfully");
        }
      }
    );
  });



  app.post("/bookUpdate", (req, res) => {
    const location = req.body.location;
  
    db.query(
      "UPDATE covidDetails SET slots = slots + 1 WHERE location = ? AND slots >= 0 AND slots <10",
      [location],
      (err, result) => {
        if (err) {
          console.log("Error updating slots:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(200).send("Slot booked successfully");
        }
      }
    );
  });

db.connect((err)=>{
    if(!err) console.log("Database Connected...");
    else console.log("Error on databse...")
}
);

app.get("/home",(req,res)=>{
    db.query('select distinct * from covidDetails',(err,result)=>{
        if(err){
            console.log("error");
        }else{
            res.send(result)
        }
    })
})
app.listen(6060,()=>{
    console.log("Server is running");
})