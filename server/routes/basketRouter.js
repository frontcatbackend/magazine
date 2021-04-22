const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/',basketController.add)
router.get('/:id', basketController.getOne)
router.get('/', basketController.getAll)
router.post('/:id',basketController.delete)

module.exports = router
