import jwt from 'jsonwebtoken';

function jwtTokens({users_id,user_name,user_email}) {
    const user = {user_id,user_name,user_email};
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'20s'});
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'15m'});
    return({accessToken,refreshToken});
}

export {jwtTokens};