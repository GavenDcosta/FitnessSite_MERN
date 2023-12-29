import axios from 'axios';
import Exercise from '../models/exerciseModel.js';

// The ExercioseDB API updates its imgUrl everyday at 12pm US central time 
// so i have to update the daily data every day at 11:40pm IST 
// The below code does this work

export const fetchAndUpdateDB = async (req, res) => {

  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY

  const response = await axios.request({
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises',
    params: {limit: '1400'},
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  });

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
      console.error(err.message);
    });
}



// const rule = new schedule.RecurrenceRule();
// rule.hour = 23;
// rule.minute = 40;
// rule.second = 0;
// rule.tz = 'Asia/Kolkata'; 

// schedule.scheduleJob(rule, async () => {
//   console.log('Running fetchAndUpdateDB at time PM IST...');
//   await fetchAndUpdateDB();
// });

// console.log('Scheduled job to run every day at time PM IST.');