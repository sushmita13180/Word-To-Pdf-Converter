const express = require('express')
const multer = require('multer')
const docxConverter = require('docx-pdf');
const cors = require('cors')
const path= require('path')
const app = express()
const port = 3000
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!........')
})

//setting up the file storage
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })
app.post('/convert', upload.single('file'), (req, res, next)=> {
try {
  if(!req.file){
    return res.status(400).json({
      message:"No file uploaded"
    })
  }
  //defining output path
  let outputpath = path.join(__dirname,`file`,`${req.file.originalname}.pdf`)
  docxConverter(req.file.path,outputpath,(err,result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({
        message: "Error converting docs to pdf"
      })
    }
    res.download(outputpath,()=>{
      console.log('file downloaded');
    })
  });
  
} catch (error) {
  console.log(error);
  return res.status(500).json({
    message: "Error converting docs to pdf"
  })

}
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
