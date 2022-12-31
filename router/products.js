const router = require('express').Router()
const Products = require('../model/productSchema')
router.get('/', async (req, res) => {
    const products = await Products.find()
    try {
        res.status(200).json(products)
    } catch (error) {
        res.status(403).json(' can not get all products')
    }
})
module.exports = router
