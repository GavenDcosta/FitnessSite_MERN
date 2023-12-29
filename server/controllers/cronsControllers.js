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
  
    const exercisesData = response.data;

    await Exercise.deleteMany({});
    const insertedExercises = await Exercise.insertMany(exercisesData);
  
    console.log('Data updated successfully:', insertedExercises);
    res.json({ message: 'Data updated successfully', data: insertedExercises });
  
    
    // Exercise.deleteMany({})
    //   .then(() => {
    //     console.log('Old exercises deleted successfully.');
    
    //     return Exercise.insertMany(exercisesData);
    //   })
    //   .then((exercises) => {
    //     console.log('New exercises inserted successfully:', exercises);
    //   })
    //   .catch((err) => {
    //     console.error(err.message);
    //   });

    //   res.send("Data updated successfully : ", exercisesData)

    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: error.message });
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