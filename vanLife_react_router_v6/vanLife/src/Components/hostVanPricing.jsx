import { useOutletContext } from "react-router-dom"

export default function Pricing(){

    const {hostVan}=useOutletContext()

    return(

       <div className="container-fluid">
        <div className="container">
            <h4>{hostVan.price}</h4>
        </div>
       </div>
    )
}