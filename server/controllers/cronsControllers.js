import axios from 'axios';
import Exercise from '../models/exerciseModel.js';
import dotenv from 'dotenv'

dotenv.config()

// The ExercioseDB API updates its imgUrl everyday at 12pm US central time 
// so i have to update the data every day 
// The below code does this work

export const fetchAndUpdateDB = async (req, res) => {

  try {
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

    const exercisesData = response.data

    console.log('Deleting old exercises...');
    await Exercise.deleteMany({});

    console.log('Inserting new exercises...');
    const exercises = await Exercise.insertMany(exercisesData);

    res.send(exercises);

    } catch (error) {
      console.error('Error:', error.message);
      res.json({ message : error });
  }

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