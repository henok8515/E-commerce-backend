const router = require('express').Router()
const CryptoJS = require('crypto-js')
const User = require('../model/userSchema')
const { verifyTokenAndAutorization } = require('./verifyToken')
router.get('/users', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error.message)
    }
})

router.put('/:id', verifyTokenAndAutorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.CRYPTO_SEC
        ).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        )
        const { password, ...others } = updatedUser._doc

        res.status(200).json(others)
    } catch (error) {
        res.status(401).json('you cant update the user')
    }
})
// router.delete('/:id' ,verifyTokenAndAutorization,(req, res) =>{
//     await User.findByIdAndDelete()
// })
module.exports = router
