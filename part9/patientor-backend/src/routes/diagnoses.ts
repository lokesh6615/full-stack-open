import express from 'express';
import { Diagnoses } from '../types';
import { Response } from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnoses[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;
