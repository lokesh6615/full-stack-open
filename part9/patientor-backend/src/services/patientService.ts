import PatientData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return PatientData;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return PatientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientEntry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patientEntry,
  };
  PatientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
