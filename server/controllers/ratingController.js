const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')


class RatingController{

    async add(req,res){  
        const{rate, deviceId, userId,} = req.body
        const rating = await Rating.create({rate, deviceId, userId})
        
        return res.json(rating)
    }
 


    async delete(req,res){ 

        const{id} = req.params
        const deleterate = await Rating.destroy(
            {
               where:{id}
            },
        )   
        return res.json("You have been  deleted ypur voice")
}

}

module.exports = new RatingController()