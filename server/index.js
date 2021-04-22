require ('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { response } = require('express')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

// app.get('/', (req, res) => {
//     res.status(200).json({message:"hello"})
// })

const start = async () => {
    try {
        await sequelize.authenticate() //функция подключения к bd по конфигу  process.env.DB_NAME, // Название БД И ТД
        await sequelize.sync() //сверяет состояние bd со схемой
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()