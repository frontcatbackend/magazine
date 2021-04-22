const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const { nextTick } = require('process')
const ApiError = require('../error/ApiError')


class DeviceController {
    async create(req,res,next){ 
        try{
            const {name, price, brandId, typeId, info} = req.body //info - массив характеристик
            const {img} = req.files //получаем из поля files
            let fileName = uuid.v4() + ".jpg" //генератор уникального имени изображения
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
            //создание девайса
            const device = await Device.create({name, price, brandId, typeId, img: fileName}) //рейтинг не указываем, так как он 0 по дефолту
    
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


            return res.json(device)
        } catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }

    async getAll(req,res){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9 //если не указан лимит, отправляем 9 устройств
        let offset = page * limit - limit // при переходе на след страницу предыдущие 9 таваров нужно скрыть
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})//если нет бренда и типа, возвращаем все девайсы
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset}) //фильтрация по бренду
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }
    
    async getOne(req,res){
        const {id} = req.params //Id получаем из параметров(routes/deviceRouter /id)
        const device = await Device.findOne(
            {
                where: {id}, //условие по которому нужно искать девайс
                include: [{model: DeviceInfo, as: 'info'}] //так же получаем массив характеристик
            },
        )
        return res.json(device)
    }

    async delete(req, res){
        const {id} = req.params
        const device = await Device.destroy(
            {
                where: {id}, //условие по которому нужно удалить девайс
                include: [{model: DeviceInfo, as: 'info'}] //так же получаем массив характеристик
            },
            
        )
        return res.json('message: deleted')
    }
}


module.exports = new DeviceController()