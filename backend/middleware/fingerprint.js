const multer = require('multer')
const path = require('path')

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
  destination: path.join('uploads', 'fp'),
  filename: (req, file, cb) => {
    // Setting req.voter to req.body(text data from xhr)
    req.voter = req.body
    const ext = file.mimetype.split('/')[1]
    cb(null, `fp-${Date.now()}.${ext}`)
  }
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  }
  else {
    cb(null, false)
  }
}

const fingerprint = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: multerFilter
})

module.exports = { fingerprint, multerErrorHandler }
