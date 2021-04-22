const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req,res, next){
        const{email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Incorrect e-mail or password'))
        }
        const candidate = await User.findOne({where: {email}}) //есть ли пользователь с таким e-mail?
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5) //если candidate не сработал(т.е такого пользователя нет), хешируем пароль из req.body и создаём нового юзера
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id}) //userid получаем из созданого объекта юзера
        const token = generateJwt(user.id, user.emai, user.role)

        return res.json({token}) //возвращаем на клиент
    }

    async login(req,res,next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) //сравниваем хеш введёного пароля с хешем пароля юзера в БД
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req,res, next){
        // const {id} = req.query
        // if(!id){
        //    return next(ApiError.badRequest("ID is NOT Defiend"))
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
        }
    }



module.exports = new UserController() 