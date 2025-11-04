import express from 'express';
import { NonSensitivePatient } from '../types';
import { Response } from 'express';
import patientService from '../services/patientService';
import z from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;
