import PatientData from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import { v4 as uuid } from 'uuid';
import newPatientSchema from '../utils';

const getPatients = (): Patient[] => {
  return PatientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return PatientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (patientEntry: NewPatient): Patient => {
  newPatientSchema.parse(patientEntry);
  const newPatient = {
    id: uuid(),
    ...patientEntry,
  };
  PatientData.push(newPatient);
  return newPatient;
};

const getNonSensitivePatient = (id: string): Patient | undefined => {
  return PatientData.find((patient) => patient.id === id);
};

const addPatientEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  const patientIndex = PatientData.findIndex((p) => p.id === id);
  PatientData[patientIndex].entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
  addPatientEntry,
};
