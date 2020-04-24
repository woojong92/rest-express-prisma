import jwt from "jsonwebtoken";

const jwtMiddleware = (req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    if(!bearerHeader) return next();

    try {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
              
      const decode = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
      console.log(decode); // 삭제해야 할 코드
      
      req.token = bearerToken;
      next();
    }catch(e){
        // 토큰 검증 실패
        return next();
    }
}

export default jwtMiddleware;