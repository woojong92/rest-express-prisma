import jwt from "jsonwebtoken";

const generateToken = (type, id) => {
        return createJWT(id, `process.env.${type}_TOKEN_SECRET`, `process.env.${type}_TOKEN_EXPRIES_IN`);
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