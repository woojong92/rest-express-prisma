import jwt from "jsonwebtoken";

const decodeToken = (type, token) => {
    try{
        const decode = jwt.verify(token, `process.env.${type}_TOKEN_SECRET`);
        console.log(decode); // 삭제해야 할 코드
        return  decode;
    } catch(e){
        return undefined;
    }
}

export default decodeToken;