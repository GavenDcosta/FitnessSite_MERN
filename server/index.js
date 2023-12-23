import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
// import fs from'fs'

// import Exercise from './models/exerciseModel.js'

import exerciseRoutes from './routes/exerciseRoutes.js'


dotenv.config()

const app=express()

app.use(cors({
    origin: '*',
}))


app.use('/exercises', exerciseRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error.message))




// const dataFilePath = 'exercises.json';
// const rawData = fs.readFileSync(dataFilePath);
// const exercisesData = JSON.parse(rawData);  


// Exercise.deleteMany({})
//   .then(() => {
//     console.log('Old exercises deleted successfully.');

//     // Insert new data
//     return Exercise.insertMany(exercisesData);
//   })
//   .then((exercises) => {
//     console.log('New exercises inserted successfully:', exercises);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
