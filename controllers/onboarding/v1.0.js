const uuid = require('uuid');
const jwtLib = require('jsonwebtoken');
const helpers = require("./../../helpers/shared-functions")
const models = require('./../../models');
const bcrypt = require('bcrypt');
function signIn(req, res) {

    let email = req.body.email;
    let password = req.body.password;
    let jwt = jwtLib.sign({ password, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '3600s' })
    res.status(200).send({ data: { email, password, jwt }, message: "Logged In" });
}

async function signUp(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password,10);
    let userId = uuid.v4();
    let jwt = jwtLib.sign({ userId, name, password, email }, process.env.JWT_TOKEN_SECRET, { expiresIn: '3600s' });
    let dbUser = await models.User.findOne({ email: email});
    if (dbUser){
        res.status(405).send({success:false, message:`user with email ${dbUser.email} already exists` });
    }
    try {
        let resUser =  await models.User.create({ email, name, password, userId }).then(function (users) {
            if (users) {
                console.log('Hi')
                // helpers.decodeJwt(jwt)
                res.cookie("token",jwt,{
                    httpOnly : true,
                    maxAge : 60*60*1000,
                }).status(200).send({ name, email, userId, jwt });
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