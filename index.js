const port = process.env.PORT || 1000
import dotenv from 'dotenv'
dotenv.config()

import app from "./App.js"
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
