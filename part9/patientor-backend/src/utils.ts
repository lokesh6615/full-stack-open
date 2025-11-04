import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseStringField = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDOB = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatientEntry: NewPatient = {
      name: parseStringField(object.name),
      dateOfBirth: parseDOB(object.dateOfBirth),
      ssn: parseStringField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation),
    };

    return newPatientEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
