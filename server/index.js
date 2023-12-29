import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import exerciseRoutes from './routes/exerciseRoutes.js'
import cronsRoutes from './routes/crons.js'
import Exercise from './models/exerciseModel.js'
import axios from 'axios'
import schedule from 'node-schedule'

dotenv.config()

const app=express()

app.use(cors({
    origin: '*',
}))


app.use('/exercises', exerciseRoutes)
app.use('/crons', cronsRoutes)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error.message))



  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY

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
  
  
  
  const rule = new schedule.RecurrenceRule();
  rule.hour = 16;
  rule.minute = 26;
  rule.second = 0;
  rule.tz = 'Asia/Kolkata'; 
  
  schedule.scheduleJob(rule, async () => {
    console.log('Running fetchAndUpdateDB at time PM IST...');
    await fetchAndUpdateDB();
  });
  
  console.log('Scheduled job to run every day at time PM IST.');