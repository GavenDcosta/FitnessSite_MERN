import mongoose from 'mongoose'

import Exercise from '../models/exerciseModel.js'

export const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find()
        
        res.send(exercises)

    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const getExercisesByBodyPart = async (req, res) => {
    try {
        const { bodyPart } = req.params

        const bodyPartData = await Exercise.find({"bodyPart": bodyPart}) 

        res.send(bodyPartData)
        
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params

        const exercise = await Exercise.findById(id)

        res.send(exercise)

    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const getExerciseByName = async (req, res) => {
    try {
        const { name } = req.params

        const nameData = await Exercise.find({"name": name}) 

        res.send(nameData)
        
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const getExercisesByTarget = async (req, res) => {
    try {
        const { target } = req.params

        const targetData = await Exercise.find({"target": target}) 

        res.send(targetData)
        
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const getExercisesByEquipment = async (req, res) => {
    try {
        const { equipment } = req.params

        const equipmentData = await Exercise.find({"equipment": equipment}) 

        res.send(equipmentData)
        
    } catch (error) {
        res.status(404).json({message: error})
    }
}

export const getBodyPartList = async (req, res) => {
    try {
        const bodyParts = await Exercise.distinct("bodyPart");

        res.send(bodyParts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};