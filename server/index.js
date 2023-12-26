import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from'fs'
import axios from 'axios';

// import Exercise from './models/exerciseModel.js'

// import exerciseRoutes from './routes/exerciseRoutes.js'


dotenv.config()

const app=express()

app.use(cors({
    origin: '*',
}))


app.use('/exercises', exerciseRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error.message))




const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  },
};

async function fetchAndUpdateDB(){
  const response = await axios.request(options);
  const exercisesData = response.data;

  
  Exercise.deleteMany({})
    .then(() => {
      console.log('Old exercises deleted successfully.');
  
      return Exercise.insertMany(exercisesData);
    })
    .then((exercises) => {
      console.log('New exercises inserted successfully:', exercises);
    })
    .catch((err) => {
      console.error(err);
    });
}


const interval = 10 * 60 * 60 * 1000;  

setInterval(() => {
  fetchAndUpdateDB();
}, interval);


