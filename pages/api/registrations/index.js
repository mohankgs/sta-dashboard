import { prisma } from "@/config/db";

export default async function handler(req, res){
  switch(req.method){
    case "GET":
      return await getRegistrations(req, res);
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
