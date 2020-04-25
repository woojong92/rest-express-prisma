import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const hydrateUser = async (req, res, next) => {
    if(!req.headers.authorization) {
      return next()
    }
    const accessToken = req.headers.authorization.split(' ')[1]
    try { 
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      console.log(payload); // 삭제해야 할 코드
      req.user = await prisma.user.findOne({ where: { id: payload.id }});
      next();
    }catch(e) { 
      return next();
    }
    next();
}
