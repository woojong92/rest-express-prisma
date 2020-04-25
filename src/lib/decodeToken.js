import jwt from "jsonwebtoken";

const decodeToken = (type, token) => {
    let tokenSecret;

    if( type === "ACCESS") {
        tokenSecret = process.env.ACCESS_TOKEN_SECRET
    }else if(  type === "REFRESH" ) {
        tokenSecret = process.env.REFRESH_TOKEN_SECRET
    }else {
        return undefined;
    }

    try{
        const decode = jwt.verify(token, tokenSecret);
        console.log(decode); // 삭제해야 할 코드
        return  decode;
    } catch(e){
        return undefined;
    }
}

export default decodeToken;