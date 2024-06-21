import { prisma } from "@/config/db";

export default async function handler(req, res){
  switch(req.method){
    case "GET":
      return await getCrewByRegID(req, res);
  }
}

const getCrewByRegID = async (req, res) => {
  try{
    const crew = await prisma.RegisteredCrews.findMany({
      where: {
        RegistrationID : {
            equals : parseInt(req.query.registrationID),
          }
      },
    })
    return res.status(200).json(crew);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);

  }
}


