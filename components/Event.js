import { formatDate } from "@/helpers/util";
import { timeString } from "@/helpers/util";
import { convert24to12 } from "@/helpers/util";
import dayjs from "dayjs";

export default function Event({setCheckInUser, setCheckOutUser, registration, index}) {
  {
    /**
     * <td>
          <span className="custom-checkbox">
            <input type="checkbox" id="data_checkbox" className="data_checkbox" name="data_checkbox" value="" />
            <label htmlFor="data_checkbox"></label>
          </span>
        </td>

        <td>{registration.ContactEmail}</td>
        <td>{registration.CityAndState}</td>
        <td>{registration.ReferredBy}</td>
        <td>{registration.Allergies}</td>
        <td>{registration.SpecialNeeds}</td>
        <td>{registration.SecondaryContactPhone}</td>
     */
  }

  const getDateString = () => {
    const dateWithoutTime = new Date();
    dateWithoutTime.setHours(0,0,0,0);
    var today = dayjs(dateWithoutTime);
    const dateString = today.format('YYYY-MM-DD');
    return dateString;
  }

  const getTimeString = () => {
    const dateWithoutTime = new Date();
    dateWithoutTime.setHours(0,0,0,0);
    var today = dayjs(dateWithoutTime);
    const dateString = today.format('YYYY-MM-DD');
    return dateString;
  }



  const setCheckInDetails = async (reg) => {
    const checkinUser = {
      RegistrationID: reg.RegistrationID,
      EventDate: getDateString(),
      CheckInTime: dayjs().format('HH:mm:ss'),
      CheckedInBy: reg.ParentName,
      CheckInTimeFormatted : dayjs().format('hh:mm:ss a')
    };
    setCheckInUser(checkinUser);

  }

  const setCheckOutDetails = async (reg) => {
    const checkoutUser = {
      RegistrationID: reg.RegistrationID,
      EventDate: getDateString(),
      CheckoutTime: dayjs().format('HH:mm:ss'),
      CheckedOutBy: reg.ParentName,
      CheckOutTimeFormatted : dayjs().format('hh:mm:ss a')
    }
    setCheckOutUser(checkoutUser)

  }

  const renderStatus2 = () => {
    let checkOutTime;
    if(registration.attendance && registration.attendance[0]){
      checkOutTime = registration.attendance[0].CheckoutTime;
    }

    let checkInTime;
    if(registration.attendance && registration.attendance[0]){
      checkInTime = registration.attendance[0].CheckInTime;
    }
    let status = ''
    if(checkOutTime){
      status = "Checked Out: " + checkOutTime;
      registration.Status = status;
      return (
        <div>
          <small>
          <p className="text-secondary">{registration.Status}</p>
          </small>
        </div>
      )
    }
    if(checkInTime){
      status = "Checked In: " + checkInTime;
      registration.Status = status;
      return (
        <div>
          <small>
          <mark>{registration.Status}</mark>
          <a href="#checkOutModal" onClick = {() => setCheckOutDetails(registration)}  className="edit" data-toggle="modal">
            <p className="text-info">Check out</p></a>
          </small>
        </div> );
    }
    return (
      <div>
        <small>
        <a href="#checkInModal" onClick = {() => setCheckInDetails(registration)} className="edit" data-toggle="modal">
         <p className="text-primary">Check in</p></a>
        </small>
      </div>
    )
  }

  const renderStatus = () => {
    if(registration.attendance && registration.attendance.CheckoutTime){
      return (
        <div>
          <small>
          <p className="text-secondary">Checked Out:{registration.attendance.CheckOutTimeFormatted}</p>
          </small>
        </div>
      )
    }
    if(registration.attendance && registration.attendance.CheckInTime){
      return (
        <div>
          <small>
          <mark>Checked In: {registration.attendance.CheckInTimeFormatted}</mark>
          <a href="#checkOutModal" onClick = {() => setCheckOutDetails(registration)}  className="edit" data-toggle="modal">
            <p className="text-info">Check out</p></a>
          </small>
        </div> );
    }
    return (
      <div>
        <small>
        <a href="#checkInModal" onClick = {() => setCheckInDetails(registration)} className="edit" data-toggle="modal">
         <p className="text-primary">Check in</p></a>
        </small>
      </div>
    )
  }
 
  return (
    <>
      <tr key={registration.RegistrationID}>
        <td>{index}</td>
        <td>{registration.RegisteredName}</td>
        <td>{registration.CurrentYearGrade}</td>
        <td>{registration.crew ? registration.crew.CrewName : ""}</td>
        <td>{registration.ParentName}</td>
        <td>{registration.PrimaryContactPhone}</td>
        <td>{registration.Allergies}</td>
        <td>{renderStatus2()}</td>
      </tr>
    </>
  )
}


