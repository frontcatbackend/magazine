const Router = require('express')
const router = new Router()
const raitingController = require('../controllers/ratingController')

router.post('/',raitingController.add)
router.post('/:id',raitingController.delete)

module.exports = router