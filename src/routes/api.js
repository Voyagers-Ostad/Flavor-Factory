const express = require('express')
const router= express.Router()

// API Routing
router.get("/",async (req, res) => {
    try {
        res.status(200).json("hello");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




module.exports=router