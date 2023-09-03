const cors = require('cors') ;

const express = require('express')
const app = express() 
const port = process.env.PORT || 5000 ;

// significans of process.env.port  ??

const dbConnection = require('./db.jsx') ;

app.use(express.json()) ;
app.use(cors()) ;

app.use('/api/cars/' , require('./routes/carsRoute.jsx')) ;
app.use('/api/users/' , require('./routes/usersRoute.jsx')) ;
app.use('/api/bookings/' , require('./routes/bookingsRoute.jsx')) ;

app.get('/' , (req , res) => res.send('Hello World!')) ;  

app.listen(port , () => console.log(`Example app listening on port ${port}`)) ;

