const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

// we use cors as we directly don't fetch the the api made in express so we need a middle ware which cors...


app.use(cors())


app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))




app.listen(port, () => {
  console.log(`iNoteBook backend listening at http://localhost:${port}`)
})

