const uuid = require('uuid');
const jwtLib = require('jsonwebtoken');
const helpers = require("./../../helpers/shared-functions")
const models = require('./../../models');
const bcrypt = require('bcrypt');

async function signIn(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let jwt = jwtLib.sign({ password, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '3600s' })
    let dbUser = await models.User.findOne({where:{ email}});
    if (!dbUser){
        return res.status(404).send({success:false,message:`No user found with ${email} credentials`})
    }
    else{
        try{ 
        let match = await bcrypt.compare(password,dbUser.password)
        if(match){      
          return res.status(200).send({status:200,success:true,message:"Logged in Successfully",data:{email,name:dbUser.name,jwt,userId:dbUser.userId}})
            
        }
        else{
            return res.status(200).send({status:200,success:false,message:"Wrong Password"})
        }
    }
        catch(error){
            return next(new Error())
        }
    }}

async function signUp(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password,10);
    let userId = uuid.v4();
    let jwt = jwtLib.sign({ userId, name, password, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '3600s' });
    let dbUser = await models.User.findOne({where: {email}});
    if (dbUser){
       return res.status(405).send({success:false, message:`user with email ${dbUser.email} already exists` });
    }
    try {
        let resUser =  await models.User.create({ email, name, password, userId }).then((users) => {
            if (users) {
                // helpers.decodeJwt(jwt)
                res.cookie("token",jwt,{
                    httpOnly : true,
                    maxAge : 60*60*1000,
                })
                res.status(200).send({success:true,status:200, data :{ name, email, userId, jwt }});
            } else { 
                res.status(400).send('Database Error');
            }
        });
    } catch (error) {
 console.log('error', error)
    }
}
module.exports = {
    signIn,
    signUp
}