export const getDetails=async (req,res)=>{
    db.query('select distinct * from covidDetails',(err,result)=>{
        if(err){
            console.log("error");
        }else{
            res.send(result)
        }
    })
}