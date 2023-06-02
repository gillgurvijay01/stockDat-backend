const jwt =  require('jsonwebtoken');

function decodeJwt(token){
    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
        console.log(err)
    
        if (err) return res.sendStatus(403)
    
        console.log(user)
    
})

}
module.exports = {
    decodeJwt : decodeJwt
}