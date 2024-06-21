import {useState} from 'react';

export default function EventsNavbar({searchQuery, setSearchQuery}) {

  return (
    <>
      <div className="table-title">
        <div className="row">
          <div className="col-6">
            <h5>2024 VBS Breaker Rock Beach</h5>
          </div>
          <div className="col-6">
          <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><span>Add new registration</span></a>
            {/* {
              checkOutEnabled ? 
              (<a href="#editEmployeeModal" className="delete_all_data btn btn-danger" data-toggle="modal"><span>Check Out</span></a>) 
              : (<a className="delete_all_data btn btn-danger"><span>Check Out</span></a>)
            }
            {
              checkInEnabled ? 
              (<a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><span>Check In</span></a>) 
              : (<a className="btn btn-success" data-toggle="modal"><span>Check In</span></a>)
            } */}
            <input type="text" className="form-control" 
              value={searchQuery} onChange = { (e) => setSearchQuery(e.target.value)}
              style={{width : "200px", float : "right", height : "34px"}} 
              name="search_user" placeholder="Search user..." />
          </div>
        </div>
      </div>
    </>
  )
}