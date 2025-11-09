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
    const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body;
    const addedPatient = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const patientData = patientService.getNonSensitivePatient(id);
  if (patientData) {
    res.send(patientData);
  } else {
    res.status(400).send({ error: 'patient not found' });
  }
});

export default router;
