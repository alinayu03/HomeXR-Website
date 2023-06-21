const express = require('express')
const {
    createHome,
    getHomes,
    getHome,
    deleteHome,
    updateHome
} = require('../controllers/homeController')

const requireAuth = require('../middleware/requireAuth')
const fileUpload = require('../middleware/fileUpload')

const router = express.Router()

router.use(requireAuth)

// GET all Homes
router.get('/', getHomes)

// GET a single Home
router.get('/:id', getHome)

// POST a new Home
router.post('/', fileUpload.single('file'), createHome)

// DELETE a Home
router.delete('/:id', deleteHome)

// UPDATE a Home
router.patch('/:id', updateHome)

module.exports = router