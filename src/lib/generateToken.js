import jwt from "jsonwebtoken";

const generateToken = (type, id) => {
        if(type === "ACCESS") 
            return createJWT(id, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_EXPRIES_IN);
        else if(type === "REFRESH")
            return createJWT(id, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPRIES_IN);
        else 
            return undefined;
}

const createJWT = (id, tokenScret, expiresIn) => {
    const token = jwt.sign(
        {
            id
        },
        tokenScret,
        {
            expiresIn 
        }
    )
    return token;
}

export default generateToken;