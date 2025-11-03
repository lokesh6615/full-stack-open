import PatientData from '../../data/patients';
import { NonSensitivePatient, Patients } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients,
};
