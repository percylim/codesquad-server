const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
const multer = require('multer');
//varconst port = process.env.PORT || 9005;

// Databse Connection
//const connection = require('./config/database');

    app.use(cors());

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/', 'uploads'),
    filename: function (req, file, cb) {
        // null as first argument means no error
        cb(null, file.originalname )
    }
})

app.post('/imageupload', async (req, res) => {
  //var companyID = req.params.id;
  // console.log(companyID);
	try {
		 // 'avatar' is the name of our file input field in the HTML form
		let upload = multer({ storage: storage}).single('avatar');

		upload(req, res, function(err) {
			// req.file contains information of uploaded file
			// req.body contains information of text fields

			if (!req.file) {
				return res.send('Please select an image to upload');
			}
			else if (err instanceof multer.MulterError) {
				return res.send('image upload fail');
			}
			else if (err) {
				return res.send(alert('image upload fail'));
			}

			const classifiedsadd = {
				image: req.file.filename
			};
/*
			const sql = "INSERT INTO users SET ?";
			connection.query(sql, classifiedsadd, (err, results) => {  if (err) throw err;
				res.json({ success: 1 })

			});
      */
		});
  } catch (err) {console.log(err)}
});
