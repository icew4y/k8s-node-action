const express = require('express')
const router = express.Router()
const { signup, login, protect } = require('../controllers/authController');


router.post('/signup', signup)
router.post('/login', login)

router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  })
})


module.exports = router
