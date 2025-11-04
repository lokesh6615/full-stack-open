import PatientData from '../../data/patients';
import { NonSensitivePatient, Patients } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patients[] => {
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

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patients => {
  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };
  PatientData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
