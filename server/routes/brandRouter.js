const Router = require('express')
const router = new Router()
const brandControler = require('../controllers/brandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), brandControler.create)
router.get('/', brandControler.getAll)

module.exports = router
