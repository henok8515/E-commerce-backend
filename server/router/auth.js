const express = require('express')
const User = require('../model/userSchema')
const router = express.Router()
const CryptoJS = require('crypto-js')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
router.get('/', (req, res) => {
    res.json('hello')
})
router.post('/register', async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName })
    const email = await User.findOne({ email: req.body.email })
    if (user || email) {
        res.json('user name already exist')
    } else {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            isAdmin: req.body.isAdmin,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.CRYPTO_SEC
            ).toString(),
        })
        try {
            const savedUser = await newUser.save()
            res.json(_.pick(savedUser, ['userName', 'email']))
        } catch (error) {
            res.status(500).json(error.message, 'register error')
        }
    }
})

router.post('/login', async (req, res) => {
    const email = await User.findOne({ email: req.body.email })

    if (!email) {
        res.status(401).json('no such user')
    } else {
        try {
            const email = await User.findOne({ email: req.body.email })
            !email && res.status(401).json('no such user')
            const hashedPassword = CryptoJS.AES.decrypt(
                email.password,
                process.env.CRYPTO_SEC
            )
            const userPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
            userPassword !== req.body.password &&
                res.status(401).json('password in correct')
            const { password, ...other } = email._doc
            const accesToken = jwt.sign(
                {
                    id: email._id,
                    isAdmin: email.isAdmin,
                },
                '12345678',
                { expiresIn: '3d' }
            )
            res.status(200).json({ ...other, accesToken })
        } catch (err) {
            // res.status(401).json(err.message)
            return
        }
    }
})
// router.put("/", (req, res) => {});
// router.delete("/", (req, res) => {});

module.exports = router
