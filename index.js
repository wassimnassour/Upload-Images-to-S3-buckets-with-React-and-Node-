// ## Backend Implementation

const AWS = require("aws-sdk")

const s3 = new AWS.S3()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

app.post("/upload-image", async (req, res) => {
  const { fileName, fileType } = req.query

  const s3Params = {
    // name_of_your_bucket_here
    Bucket: process.env.S3_BUCKET,
    // define name of the resource in the s3 bucket it’s better to use it like this
    // way resourseName +’/’+ random id better to use UID
    Key: fileName,
    // file type Image/Jpeg...
    ContentType: fileType,
    // Expiration Date of the url
    Expires: 60,
  }

  try {
    const signedUrl = await getSignedUrl(s3, s3Params, { expiresIn: 60 })
    console.log(signedUrl)
    res.json({ signedUrl })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

// ## Front-end Implementation

async function uploadImage({ fileName, fileType }) {
  const options = { fileName, fileType }

  const response = await axios.post("/upload-image", options)

  if (response?.url) {
    axios.put(response?.url, file, options)
  }
}


// ## Cors implementation

// S3 Bucket setting
// Create a DNS compliant bucket name
// Set default encryption
// Give appropriate read and write permissions
// Add following CORS rules

<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <CORSRule>
      <AllowedOrigin>/ origins allowed to upload image /</AllowedOrigin>
      <AllowedMethod>GET</AllowedMethod>
      <AllowedMethod>POST</AllowedMethod>
      <AllowedMethod>PUT</AllowedMethod>
      <AllowedMethod>HEAD</AllowedMethod>
      <AllowedMethod>DELETE</AllowedMethod>
      <MaxAgeSeconds>3000</MaxAgeSeconds>
      <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>