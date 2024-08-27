export default function Income() {
  return (
    <>
      <div className="container-fluid">
        <div className="container border">
          <div className="row mt-3">
            <div className="col-md-5 col-12">
              {" "}
              <h2>Income</h2>
              <small>last 30 days</small>
              <h3 className="fw-bold">$26,600</h3>
            </div>

            <div className="col-md-5 col-12">
              <img
                src="https://plus.unsplash.com/premium_photo-1682309543429-6aaa6d792dae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFyJTIwZ3JhcGh8ZW58MHx8MHx8fDA%3D"
                alt=""
                loading="lazy"
                className="w-100"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md-10">
              <div className="content d-flex justify-content-between">
                <h5>Your transactions</h5>
              </div>
              <small>last 90 days</small>
            </div>
          </div>

          <div className="row  mt-3 ">
            <div className="col-12 col-md-10  bg-warning">
              <div className="content d-flex justify-content-between ">
                <div className="price d-flex ">
                  <h4>$720</h4>
                </div>
                <div className="date">
                  <p>10/12/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
