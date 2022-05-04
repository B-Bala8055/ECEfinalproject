const multer = require('multer')
const path = require('path')

/**
 * Backend to handle image uploaded from frontend (FINGERPRINT).
 * It uploads image to uploads root folder in fp subfolder
 */

// https://developer.mozilla.org/en-US/docs/Web/API/FormData/get

// used primarily to pass large fileSize error to the user. (Error is not passed from multer
// middleware to the controller function)
const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    res.status(413).json({ confirmation: false, msg: `Oops! ${err.message}. Also, make sure that file size is below 500KB` })
  }
  else {
    next()
  }
}

const multerStorage = multer.diskStorage({
  destination: path.join('python', 'fingerprint', 'got'),
  filename: (req, file, cb) => {
    const { aadhar } = req.query
    const ext = file.mimetype.split('/')[1]
    cb(null, `${aadhar}.${ext}`)
  }
})

const multerFilter = (req, file, cb) => {
  // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //   cb(null, true)
  // }
  // else {
  //   cb(null, false)
  // }
  cb(null, true)
}

const validationFp = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: multerFilter
})

module.exports = { validationFp, multerErrorHandler }
