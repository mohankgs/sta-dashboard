import { prisma } from "@/config/db";
import { timeString } from "@/helpers/util";
import { convert24to12 } from "@/helpers/util";


export default async function handler(req, res){
  switch(req.method){
    case "GET":
      return await getAttendanceByIDDate(req, res);
    case "POST":
        return await checkIn(req, res);
    case "PATCH":
      return await checkOut(req, res);
  }
}

const getAttendanceByIDDate = async (req, res) => {
  try{
    const attendance = await prisma.Attendance.findUnique({
      where: {
        RegistrationID_EventDate : {
            RegistrationID : parseInt(req.query.registrationID),
            EventDate : req.query.eventDate
          }
      },
    })
    if(attendance && attendance.CheckInTime){
      attendance.CheckInTimeFormatted = convert24to12(timeString(attendance.CheckInTime));
    }
    if(attendance && attendance.CheckoutTime){
      attendance.CheckOutTimeFormatted = convert24to12(timeString(attendance.CheckoutTime));
    }
    return res.status(200).json(attendance);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);

  }
}

const checkIn = async (req, res) => {
  try{
    const result = await prisma.Attendance.create({ data : req.body});
    return res.status(201).json({success : true });
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }
}

const checkOut = async (req, res) => {
  try{
    const result = await prisma.Attendance.update({ 
      where: {
        RegistrationID_EventDate : {
            RegistrationID : parseInt(req.body.RegistrationID),
            EventDate : req.body.EventDate
          }
      },
      data : req.body
    });
    return res.status(200).json({success : true });
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }
}

