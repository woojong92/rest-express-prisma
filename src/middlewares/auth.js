import jwt from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";

export const hydrateUser = async (req, res, next) => {
    if(!req.headers.authorization) {
      return next()
    }
    const accessToken = req.headers.authorization.split(' ')[1]
    try { 
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        //   console.log(payload); // 삭제해야 할 코드
      req.user = {
        id: payload.id,
        email: payload.email
      }
      //= await prisma.user.findOne({ where: { id: payload.id }});
      next();
    }catch(e) { 
      return next();
    }
    next();
}

export const checkLoggedin = async (req, res, next) => {
  if(!req.user) {
    return res
        .status(401)
        .json({
            ok: false,
            data: null,
            error: "Error 7070: Unauthorized"
        })
  }
  return next();
}