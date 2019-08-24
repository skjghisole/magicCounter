const express = require('express')

const app = express();

const port = process.env.PORT || 3333

app.use(express.static('public'))

app.listen(port, () => console.log(`App Started at http://localhost:${port}`))