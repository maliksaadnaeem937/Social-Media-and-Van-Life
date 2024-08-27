export default function Dashboard() {
  return (
    <>
      <div className="container-fluid ">
        <div className="container">
        <div className="row    pt-3 ">
          <div className="col-12 col-md-5 bg-warning ">
            <div className="content">
              <h3>Welcome</h3>
              <div className="income-container d-flex justify-content-between">
                <small>Income last 30 days</small>
                <small>Details</small>
              </div>
              <h2>$2,260</h2>
            </div>
          </div>
          <div className="col-12  col-md-5 bg-success">
            <div className="content d-flex justify-content-between">
              <h4>Review Score 5.0/5</h4>
              <small>Details</small>
            </div>
          </div>
        </div>

        <div className="row mt-3  ">

            <div className="col-12 col-md-10 border d-flex justify-content-between bg-info py-2">
                <h4>Your listed vans</h4>
                <small>View all</small>

            </div>


        </div>
     

      <div className="row  mt-3 ">
        <div className="col-12 col-md-10 ">
            <div className="content d-flex justify-content-between">
                <div className="van-info d-flex gap-2">
                    <img src="" alt=""   style={{height:'70px',width:'70px', borderRadius:''}}/>
                    <div className="written-info flex flex-column">
                        <h5>Modest Explorer</h5>
                        <p>26,600$</p>
                    </div>
                </div>
                <small>Edit</small>

            </div>



        </div>


      </div>
      </div>
      </div>
    </>
  );
}
