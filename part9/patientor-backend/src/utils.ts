import { Gender } from './types';
import { z } from 'zod';

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

export default newPatientSchema;
