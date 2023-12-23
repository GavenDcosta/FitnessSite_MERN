import express from 'express'

import { getExercises, getExercisesByBodyPart, getExerciseById, getExerciseByName, getExercisesByEquipment, getExercisesByTarget, getBodyPartList } from '../controllers/exerciseControllers.js'

const router = express.Router()

router.get('/', getExercises)
router.get('/bodyPart/:bodyPart', getExercisesByBodyPart)
router.get('/exercise/:id', getExerciseById)
router.get('/name/:name', getExerciseByName)
router.get('/target/:target', getExercisesByTarget)
router.get('/equipment/:equipment', getExercisesByEquipment)
router.get('/bodyPartList', getBodyPartList)

export default router