export const LoginInsert= async (req,res)=>{
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
}