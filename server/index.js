import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios';
import Exercise from './models/exerciseModel.js'
import exerciseRoutes from './routes/exerciseRoutes.js'


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


  // The ExercioseDB API updates its imgUrl everyday at 12pm US central time 
  // so i have to update the daily data every day at 11:32pm IST 
  // The below code does this work


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



function scheduleDailyTask(hour, minute, callback) {
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
    0
  );

  // Adjust for IST (UTC+5:30)
  targetTime.setUTCHours(targetTime.getUTCHours() + 5);
  targetTime.setUTCMinutes(targetTime.getUTCMinutes() + 30);

  // If the target time has already passed, set it for the next day
  if (now > targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeDifference = targetTime - now;

  // Set interval to run the task every 24 hours
  setInterval(callback, 24 * 60 * 60 * 1000);

  // Set timeout for the first run
  setTimeout(() => {
    callback();
  }, timeDifference);
}

// Schedule the task to run every day at 11:32 pm IST
scheduleDailyTask(23, 32, fetchAndUpdateDB);