const helpers = require("./../../helpers/shared-functions")
const models = require('./../../models');

async function getList(req,res){
    let user =  req.userData
    userId = user.userId
    console.log('userId', userId)
    let productList = await models.Item.findAll({where:{userId}});
    return res.status(201).send({status:201,data:[...productList]})

}
module.exports={
    getList
}   