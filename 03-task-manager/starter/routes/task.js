const express = require('express')
const router = express.Router()

router.route('/').get((res,req)=>{
    res.send('All Iteams')
})

module.exports = router