const fs = require('fs')

function logreqres(filename){
  return (req, res, next) =>{
    fs.appendFile(
      filename,
      `Request URL: ${req.url} \n--Request Method: ${req.method} \n--Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n`,
      (err, data) => {
        next();
      }
    )
  }

}

module.exports = {
  logreqres,
}