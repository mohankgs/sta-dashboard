import { formatDate } from "@/helpers/util";
import { timeString } from "@/helpers/util";
import { convert24to12 } from "@/helpers/util";

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


  const setCheckInDetails = async (reg) => {
    const dateWithoutTime = new Date();
    dateWithoutTime.setHours(0,0,0,0);
    const dateString = formatDate(dateWithoutTime)+"T00:00:00.000Z";
    setCheckInUser({
      RegistrationID: reg.RegistrationID,
      EventDate: dateString,
      CheckInTime: new Date().toISOString(),
      CheckedInBy: reg.ParentName,
      CheckInTimeFormatted : convert24to12(timeString(new Date()))
    })
  }

  const setCheckOutDetails = async (reg) => {
    const dateWithoutTime = new Date();
    dateWithoutTime.setHours(0,0,0,0);
    const dateString = formatDate(dateWithoutTime)+"T00:00:00.000Z";
    setCheckOutUser({
      RegistrationID: reg.RegistrationID,
      EventDate: dateString,
      CheckoutTime: new Date().toISOString(),
      CheckedOutBy: reg.ParentName,
      CheckOutTimeFormatted : convert24to12(timeString(new Date()))
    })

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
      <tr>
        <td>{index}</td>
        <td>{registration.RegisteredName}</td>
        <td>{registration.CurrentYearGrade}</td>
        <td>{registration.crew ? registration.crew.CrewName : ""}</td>
        <td>{registration.ParentName}</td>
        <td>{registration.PrimaryContactPhone}</td>
        <td>{registration.Allergies}</td>
        <td>{renderStatus()}</td>
      </tr>
    </>
  )
}


