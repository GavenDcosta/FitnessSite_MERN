import express from 'express'
import { fetchAndUpdateDB } from '../controllers/cronsControllers.js'

const router = express.Router()

router.get('/updatedata', fetchAndUpdateDB)

export default router