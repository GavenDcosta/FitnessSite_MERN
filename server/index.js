import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios';
import Exercise from './models/exerciseModel.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import schedule from 'node-schedule'

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
  params: {limit: '1400'},
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



// Schedule the function to run every day at 11;40 PM IST
const rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 40;
rule.second = 0;
rule.tz = 'Asia/Kolkata'; // Set the timezone to IST

schedule.scheduleJob(rule, async () => {
  console.log('Running fetchAndUpdateDB at 8 AM IST...');
  await fetchAndUpdateDB();
});

console.log('Scheduled job to run every day at 11:40 PM IST.');