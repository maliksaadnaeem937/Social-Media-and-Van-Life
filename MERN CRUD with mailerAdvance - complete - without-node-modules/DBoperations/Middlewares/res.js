const responseMiddleWare=(status,data,res)=>{
    res.status(status).json({
        data:data,
        
    })

    

}
export default responseMiddleWare;