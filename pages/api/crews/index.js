import { prisma } from "@/config/db";

export default async function handler(req, res){
  switch(req.method){
    case "GET":
      return await getCrewByRegID(req, res);
  }
}

const getCrewByRegID = async (req, res) => {
  try{
    const crew = await prisma.RegisteredCrews.findFirst({
      where: {
        RegistrationID : {
            equals : parseInt(req.query.registrationID),
          }
      },
      select: {
        CrewName: true,
      },
    })
    return res.status(200).json(crew);
  }catch(error){
    console.log(error);
    return res.status(500).json(error);

  }
}


