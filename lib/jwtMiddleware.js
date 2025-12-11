    import jwt from "jsonwebtoken";
    export default function authorizedUser(req, res, next){
        const header = req.header("Authorization")//header එකේ Authrization කියල මොනා හරි (Token එක) ආව නම් ඒක print කරනව
        
        if (header!=null){
            const token = header.replace("Bearer ", "")
            console.log(token) //එකේ එන "Bearer "(Bearerහිස්තැනක්) කියන එක අයින් කරගන්නව

            jwt.verify(token, "i-computers-54!",
                (err, decoded)=>{
                    if (decoded == null){
                        res.status(401).json({ //බොරු Token එකක් දාල එව්වොත් "Invalid token...."වැටෙනව 
                            message:"Invalid token, Please login again..."
                        })
                    }
                    else{
                        req.user = decoded //ඊලග කෙනාට forward වෙන request එක
                        next()
                    }
                })
        }
        else{
            next() //මේ ෆන්ක්ශන් එකෙන් කරන්නෙ - අදාල වැඩේ කරා ඊලගට ඉන්න කෙනාට request එක යැව්ව
        }
    }