 const express = require('express');
 const router = express.Router();
 const db = require('./dbDatabase'); // use
 
 router.get("/", async (req, res) => {
  
  try {
        const { companyID} = req.query;

        if (!companyID) {
            return res.status(400).send("Missing required parameters");
        }
const [result] = await db.execute(
            `SELECT * FROM employee 
             WHERE companyID = ? ORDER BY employeeNo ASC`,
            [companyID]
        );

        if (result.length === 0) {
            return res.status(404).send("No User Data available");
        }

        console.log('User Data loaded successfully');
        console.log(result);

        return res.json(result);

    

    } catch (err) { // 'try' block to catch errors
        console.error("Error loading User Profile:", err);
        res.status(500).send("Failed to load User profit and loss");
    }
});
module.exports = router;
