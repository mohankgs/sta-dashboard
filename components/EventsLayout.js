import EventsAlert from "./EventsAlert";
import EventsNavbar from "./EventsNavbar";
import EventsPagination from "./EventsPagination";
import EventsTable from "./EventsTable";
import {useContext, useState} from 'react';
import appContext from "@/context/appContext";
import { Paginate } from "@/helpers/paginate";
import { Search } from "@/helpers/search";


export default function EventsLayout() {

  const value = useContext(appContext);

  // ****** PAGINATION & SEARCH ************
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 60;
  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  let paginatedUsers;

  const [searchQuery, setSearchQuery] = useState("");
  let searchedResult;
  if(searchQuery.length > 0){
    searchedResult = Search(value.registrations, searchQuery);
    paginatedUsers = Paginate(searchedResult, currentPage, pageSize);
  }else{
    paginatedUsers = Paginate(value.registrations, currentPage, pageSize);
  }
  // ******

  const [checkInUser, setCheckInUser] = useState({
    RegistrationID: "",
    EventDate:"",
    CheckInTime: "",
    CheckedInBy: "",
    CheckInTimeFormatted : ""
  });

  const [checkOutUser, setCheckOutUser] = useState({
    RegistrationID: "",
    EventDate:"",
    CheckoutTime: "",
    CheckedOutBy: "",
    CheckOutTimeFormatted : ""
  });

  const handleCheckIn = async ({taerget : {name, value}}) => {
    setCheckInUser({...checkInUser, [name] : value});
  }

  const handleCheckOut = async ({taerget : {name, value}}) => {
    setCheckOutUser({...checkOutUser, [name] : value});
  }

  const getAttendance = async (regID, eventDate) => {
    const reqOptions = {
      method : 'GET',
      headers : {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
    const queryParams = "registrationID="+regID+"&eventDate="+eventDate;
    const response = await fetch('http://localhost:3000/api/attendance?'+queryParams, reqOptions);
    const result = await response.json();
    return result; 
  }

  const handleCheckInSubmit = async (e) => {
    e.preventDefault();
    const {CheckInTimeFormatted, ...remainingCheckInUser} = checkInUser
    const reqOptions = {
      method : 'POST',
      headers : {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(remainingCheckInUser)
    }

    const response = await fetch('http://localhost:3000/api/attendance', reqOptions);
    const result = await response.json();
    if(result && result.success){
      //TODO:Add alert message
      const attendence = getAttendance(remainingCheckInUser.RegistrationID, remainingCheckInUser.EventDate);
      document.getElementsByClassName("checkInCancel")[0].click();
      const updatedRegistration = value.registrations.filter(reg => {
        return reg.RegistrationID === checkInUser.RegistrationID
      });
      if(updatedRegistration){
        updatedRegistration.attendance = attendence;
      }
      value.setEventRegistrations(value.registrations);
    }

  }

  const handleCheckOutSubmit = async (e) => {
    e.preventDefault();
    const {CheckOutTimeFormatted, ...remainingCheckOutUser} = checkOutUser
    const reqOptions = {
      method : 'PATCH',
      headers : {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(remainingCheckOutUser)
    }

    const response = await fetch('http://localhost:3000/api/attendance', reqOptions);
    const result = await response.json();
    if(result){
      //TODO:Add alert message
      document.getElementsByClassName("checkOutCancel")[0].click();
      const updatedRegistration = value.registrations.filter(reg => {
        return reg.RegistrationID == checkOutUser.RegistrationID
      });
      updatedRegistration.attendance = result;
      value.setEventRegistrations(value.registrations);

    }

  }

  return (
    <>
      <div id="checkInModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCheckInSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Check In</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Check-in by</label>
                  <input type="text" value = {checkInUser.CheckedInBy} onChange={handleCheckIn} className="form-control" name="checkinBy"  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="text" value = {checkInUser.CheckInTimeFormatted} onChange={handleCheckIn} className="form-control" name="checkinTime"  />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default checkInCancel" name="submit" data-dismiss="modal" value="Cancel" />
                <input type="submit" className="btn btn-success" value="Check In" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="checkOutModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleCheckOutSubmit}>
              <div className="modal-header">
                <h4 className="modal-title">Check Out</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Check-out by</label>
                  <input type="text" value = {checkOutUser.CheckedOutBy} onChange={handleCheckOut} className="form-control" name="CheckedOutBy"  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="text" value = {checkOutUser.CheckOutTimeFormatted} onChange={handleCheckOut} className="form-control" name="CheckOutTimeFormatted"  />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default checkOutCancel" name="submit" data-dismiss="modal" value="Cancel" />
                <input type="submit" className="btn btn-success" value="Check Out" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container-xl">
	    <div className="table-responsive d-flex flex-column">
        <EventsAlert/>
        <div className="table-wrapper">
          <EventsNavbar searchQuery = {searchQuery} setSearchQuery = {setSearchQuery}/>
          <EventsTable
            setCheckInUser = {setCheckInUser}
            setCheckOutUser = {setCheckOutUser}
            registrations = { paginatedUsers }
          />
          <EventsPagination registrationCount = {searchQuery.length > 0 ? searchedResult.length : value.registrations.length} 
            currentPage = {currentPage} pageSize={pageSize} onPageChange= {onPageChange}/>
        </div>
      </div>
      </div>
    </>
  )
}