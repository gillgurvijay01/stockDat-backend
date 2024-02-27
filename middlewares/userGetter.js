const models = require('./../models');
async function getUser(req, res, next){
    let email = req.userMail.email
    console.log('email', email)
    let dbUser = await models.User.findOne({where:{email}});
    if (!dbUser){
        return res.status(404).send({success:false,message:`Bad Token`})
    }
    else {
        data = {email,name:dbUser.name,userId:dbUser.userId}
        req.userData=data
        next()

    }

}
module.exports = getUser
