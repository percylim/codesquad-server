const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // Note: using promise version
const moment = require('moment');

router.post("/", async function(req, res, next) {
    try {
        const companyID = req.body.companyID;
        const productID = req.body.productID;
        
        if (!companyID || !productID) {
            return res.status(400).json({ error: 'companyID and productID are required' });
        }

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: "+00:00",
        });

        try {
            const sql = "SELECT * FROM product WHERE companyID = ? AND productID = ?";
            console.log(sql, [companyID, productID]);
            
            const [results] = await connection.execute(sql, [companyID, productID]);
            
            if (results.length > 0) {
                console.log('Product fetched successfully');
                res.json(results);
            } else {
                console.log('No product found');
                res.status(404).json(null);
            }
        } finally {
            // Always close the connection
            await connection.end();
        }
    } catch (err) {
        console.error('Error while fetching Product Record:', err);
        res.status(500).json({ error: 'Failed to load Product data' });
    }
});

module.exports = router;