import { useOutletContext } from "react-router-dom"


export default function HostVanDetails(){
    const {hostVan}=useOutletContext();


    return(
        <>
        <div className="container-fluid">
            <div className="container ">
                <div className="row mt-3">
                    <div className="col-12 col-lg-5">
                    <p>{hostVan.description}</p>

                    </div>
                </div>
               
            </div>
        </div>
        </>
    )



}