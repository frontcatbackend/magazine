// axios использует доступ к api
import axios from 'axios'

//запросы которые не требуют авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//запросы которые  требуют авторизации
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


//автоматическая подставка токена каждому запросу
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

//подставляет токен как делолось вручную в postman
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
