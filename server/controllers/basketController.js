const {BasketDevice, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')


class BasketController{

    async add(req,res){  
        try{
       const{deviceId, basketId, info} = req.body
       const basketdevice = await BasketDevice.create({deviceId, basketId})

       if (info) {
        info = JSON.parse(info)
        info.forEach(i =>
            DeviceInfo.create({
                title: i.title,
                description: i.description,
                deviceId: device.id
            })
        )
    }
       return res.json(basketdevice)
    } catch(e){
        next(ApiError.badRequest(e.message))
    }
    }
 
    async getOne(req,res){
        const {id} = req.params
        const basketinfo = await BasketDevice.findOne(
            {
                where: {id}, //условие по которому нужно искать девайс
                include: [{model: DeviceInfo, as: 'info'}] //так же получаем массив характеристик
            },
        )
        return res.json(basketinfo)
    }

    async getAll(req,res){
        const baskets = await BasketDevice.findAll()
        return res.json(baskets)
    }

    async delete(req,res){ 
         const{id} = req.params
         const basket = await BasketDevice.destroy(
             {
                where:{id}
             },
         )   
         return res.json("basket device deleted")
    }
    
}


module.exports = new BasketController()