import { prisma } from "@/config/db";
import { dbpool } from "@/config/db2";


export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getAttendanceDetails(req, res);
    case "POST":
      return await checkIn2(req, res);
    case "PATCH":
      return await checkOut2(req, res);
  }
}

const getAttendanceDetails = async (req, res) => {
  let conn;
  try {
    conn = await dbpool.getConnection();
    const query = "SELECT RegistrationID, EventDate,  CheckInTime, CheckedInBy, CheckoutTime, CheckedOutBy from Attendance "+
      " where RegistrationID=" + parseInt(req.query.registrationID) + " and EventDate='" + req.query.eventDate + "'";
    const rows = await conn.query(query);
    //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    //return rows[0];
    const rowsS = JSON.stringify(rows);
    return res.status(200).json(rows);

  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

const getAttendanceByIDDate = async (req, res) => {
  try {
    const attendance = await prisma.Attendance.findUnique({
      where: {
        RegistrationID_EventDate: {
          RegistrationID: parseInt(req.query.registrationID),
          EventDate: req.query.eventDate
        }
      },
    })
    if (attendance && attendance.CheckInTime) {
      attendance.CheckInTimeFormatted = attendance.CheckInTime;
    }
    if (attendance && attendance.CheckoutTime) {
      //console.log("********" + attendance.CheckoutTime);
      attendance.CheckOutTimeFormatted = attendance.EventDate + attendance.CheckoutTime;
    }
    return res.status(200).json(attendance);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);

  }
}

const checkIn2 = async (req, res) => {
  let conn;
  try {
    conn = await dbpool.getConnection();
    const result = await conn.query("INSERT INTO Attendance (RegistrationID, EventDate, CheckInTime, CheckedInBy) VALUES (?, ?, ?, ?)", 
      [req.body.RegistrationID, req.body.EventDate, req.body.CheckInTime, req.body.CheckedInBy]);
    //console.log(result); 
    return res.status(201).json({ success: true });
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

const checkOut2 = async (req, res) => {
  let conn;
  try {
    conn = await dbpool.getConnection();
    const result = await conn.query("UPDATE Attendance set CheckoutTime = ?, CheckedOutBy=?, CheckedInBy=? Where RegistrationID = ? and EventDate = ?", 
      [req.body.CheckoutTime, req.body.CheckedOutBy,req.body.CheckedOutBy, req.body.RegistrationID, req.body.EventDate]);

    console.log(result); 
    return res.status(201).json({ success: true });
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

const checkIn = async (req, res) => {
  try {
    const result = await prisma.Attendance.create({ data: req.body });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const checkOut = async (req, res) => {
  try {
    const result = await prisma.Attendance.update({
      where: {
        RegistrationID_EventDate: {
          RegistrationID: parseInt(req.body.RegistrationID),
          EventDate: req.body.EventDate
        }
      },
      data: req.body
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

