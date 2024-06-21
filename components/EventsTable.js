import Event from "./Event";


export default function EventsTable(props) {

  const {registrations, setCheckInUser, setCheckOutUser} = props;

  const registrationGenerator = () => {
    let index = 1;
    return (
      <>
        {
          registrations.map(reg => {
            return (
              <Event setCheckInUser = {setCheckInUser} setCheckOutUser = {setCheckOutUser} key = {reg} registration = {reg} index = {index++}/>
            )
          })
        }
      </>
    )
  }

   {/* <th>
              <span className="custom-checkbox">
                <input type="checkbox" id="selectAll" onChange={() => {
                  if (checkInEnabled && checkOutEnabled) {
                    return;
                  }
                  if (checkInEnabled) {
                    setCheckOutEnabled(true);
                  }
                  if (checkOutEnabled) {
                    setCheckInEnabled(true);
                  }
                }} />
                <label htmlFor="selectAll"></label>
              </span>
            </th> */}

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Team</th>
            <th>Parent</th>
            {
              /**<th></th>
               * 
            <th>Secondary Contact</th>
            <th>Email</th>
            <th>Locality</th>
            <th>ReferredBy</th>
            <th>SpecialNeeds</th>
               */
            }
            <th>Contact</th>
            <th>Allergies</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {registrationGenerator()}
        </tbody>
      </table>
    </>
  )
}
