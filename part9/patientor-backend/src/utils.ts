import { Gender, HealthCheckRating } from './types';
import { z } from 'zod';
import diagnosesData from '../data/diagnoses';

const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  entries: z.array(
    z.object({
      type: z.enum(['HealthCheck', 'OccupationalHealthcare', 'Hospital']),
    })
  ),
});

export const EntryBaseSchema = z.object({
  date: z.iso.date(),
  specialist: z.string(),
  description: z.string(),
  diagnosisCodes: z.array(z.enum(diagnosesData.map((d) => d.code))).optional(),
});

const HospitalSchema = z
  .object({
    date: z.iso.date(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z
      .array(z.enum(diagnosesData.map((d) => d.code)))
      .optional(),
    type: z.literal('Hospital'),
    discharge: z.object({
      date: z.string(),
      criteria: z.string(),
    }),
  })
  .strict();

const OccupationalHealthcareSchema = z
  .object({
    date: z.iso.date(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z
      .array(z.enum(diagnosesData.map((d) => d.code)))
      .optional(),
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z
      .object({
        startDate: z.string(),
        endDate: z.string(),
      })
      .optional(),
  })
  .strict();

const HealthCheckSchema = z
  .object({
    date: z.iso.date(),
    specialist: z.string(),
    description: z.string(),
    diagnosisCodes: z
      .array(z.enum(diagnosesData.map((d) => d.code)))
      .optional(),
    type: z.literal('HealthCheck'),
    healthCheckRating: z.enum(HealthCheckRating),
  })
  .strict();

export const NewEntrySchema = z.discriminatedUnion('type', [
  HospitalSchema,
  OccupationalHealthcareSchema,
  HealthCheckSchema,
]);

export default newPatientSchema;
