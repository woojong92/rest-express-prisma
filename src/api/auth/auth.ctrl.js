import { PrismaClient } from "@prisma/client";
import generateToken from "../../lib/generateToken";
import decodeToken from "../../lib/decodeToken";

const prisma = new PrismaClient();
import cuid from "cuid";


export const register = async (req, res) => {
    const { email } = req.body;
    try{
        const existingUser = await prisma.user.findOne({where: {email}});
        if(!existingUser){
            res.status(409).json({
                ok: false,
                error: "이미 존재하는 이메일 입니다."
            })
            return;
        }else{
            const _cuid = cuid();
            await prisma.user.create({
                data: {
                    ...req.body,
                    id: _cuid
                }
            })
            res.json({
                ok: true,
                error: null
            })
            return;
        }
    }catch(e) {
        res.status().json({
            ok: false,
            error: e.message
        })
        return;
    }
};

export const login = async (req, res) => {
    // username, password를 넘겨주면,
    // access token, refresh token을 반환함
    const { username, email, password } = req.body;
    if(!username || password ){
        res.status(401); // Unauthorized;
        return;
    }

    try{
        const user = await prisma.user.findOne({where: { email }});
        if(!user){
            res.status(403).json({
                ok: false,
                error: "유저가 존재하지 않습니다.",
                accessToken: null,
                refreshToken: null
            })
            return;
        } 
        if(!user.verifiedEmail){
            res.json({
                ok: false,
                error: "이메일이 인증되지 않았습니다.",
                accessToken: null,
                refreshToken: null
            });
            return
        }
        if(password === user.password){
            const accessToken = generateToken("ACCESS", user.id);
            const refreshToken = generateToken("REFRESH", user.id)
            res.json({
                ok: true,
                error: null,
                accessToken: accessToken,
                refreshToken: refreshToken
            })
            return;
        }else{
            res.json({
                ok: false,
                error: "비밀번호가 틀렸습니다.",
                accessToken: null,
                refreshToken: null
            });
            return;
        }

    }catch(e){
        res.status(500).json({
            ok: false,
            error: e.message,
            accessToken: null,
            refreshToken: null
        });
        return;
    }
};

export const refresh = (req, res) => {
    const {refreshToken} = req.body;
    if(!refreshToken) {
        return res
            .status(400)
            .json({
                error: 'Error 61058: Refresh token is required'
            })
    }

    try{
        const payload = decodeToken("REFRESH", refreshToken); 
        
        const userId = payload.userId;
        const accessToken = generateToken("REFRESH", userId)
        const newRefreshToken = generateToken("REFRESH", userId)
        return res
            .status(200)
            .json({
            accessToken,
            refreshToken: newRefreshToken,
            })
    }catch(e){
        return res
            .status(403)
            .json({
                error: "Error 57533: Refresh token is not valid"
            })
    }
    // refresh token을 넘겨주면
    // 새로운 access token과 refresh token을 반환함.
};

export const check = async (req, res) => {
  res.send("check");
};

export const logout = async (req, res) => {
    res.send("logout");
};
