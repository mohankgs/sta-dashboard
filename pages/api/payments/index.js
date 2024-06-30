import { prisma } from "@/config/db";
import { dbpool } from "@/config/db2";

export default async function handler(req, res){
  switch(req.method){
    case "GET":
      return await getRegistrations(req, res);
    case "POST":
      return await createRegistration(req, res);
  }
}

const getRegistrations = async (req, res) => {
  try{
    const result = await prisma.EventRegistrations.findMany();
    return res.status(200).json(result);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);
  }
}

const createRegistration = async (req, res) => {
  let conn;
  try {
    conn = await dbpool.getConnection();
    await conn.beginTransaction();
    const result = await conn.query("INSERT INTO EventRegistrations(EventID, RegisteredName, PrimaryContactPhone, ContactEmail, Title, AgeCategory) VALUES (?, ?, ?, ?, ?, ?) RETURNING `RegistrationID`", 
      [2, req.body.RegisteredName, req.body.PrimaryContactPhone, req.body.ContactEmail, req.body.Title, req.body.AgeCategory]);
    
    if(result){
      const regID = result[0].RegistrationID;
      const address = await conn.query("INSERT INTO Address(RegistrationID, StreetAddress1, StreetAddress2, City, State, PostalCode, Country) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING `ID`", 
      [regID, req.body.StreetAddress1, req.body.StreetAddress2, req.body.City, req.body.State, req.body.PostalCode, req.body.Country]);
      if(address){
        const payment = await conn.query("INSERT INTO Payment(RegistrationID, Amount, PaymentType) VALUES (?, ?, ?) RETURNING `ID`", 
          [regID, req.body.Amount, req.body.PaymentType]);
        if(payment){
          conn.commit();
          return res.status(201).json({ success: true });
        }
      }
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  } catch (err) {
    await conn.rollback();
    console.log('ROLLBACK');
    console.log(err);
  } finally {
    if (conn) return conn.end();
  }
}
