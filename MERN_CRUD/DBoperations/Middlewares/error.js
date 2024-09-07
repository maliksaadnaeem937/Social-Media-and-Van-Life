
const errorMiddleWare=(error,res)=>{
const status=error.status||500;
const message=error.message||'Backend Error';
res.status(status).json({
    message:message,
    status:status,
})

}

export default errorMiddleWare;