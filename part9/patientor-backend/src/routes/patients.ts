import express from 'express';
import { NonSensitivePatient } from '../types';
import { Response } from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
  res.send('Saving patient!');
});

export default router;
