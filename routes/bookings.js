const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Bookings Route Working');
});

module.exports = router;