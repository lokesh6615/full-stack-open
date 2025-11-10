import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface props {
  entry: OccupationalHealthcareEntry;
  diagnosis: Diagnosis[] | null;
}
const OccupationalHealthcare = ({ entry, diagnosis }: props) => {
  return (
    <div
      style={{
        border: '1px solid gray',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '10px',
      }}
    >
      <h3>
        {entry.date} <HealthAndSafetyIcon />
      </h3>

      <h3>{entry.specialist}</h3>
      <h3>{entry.description}</h3>
      {entry.diagnosisCodes?.map((code) => (
        <div>
          <span>code</span>
          <span>{diagnosis?.find((data) => data.code === code)?.name}</span>
        </div>
      ))}
      <h3>{entry.employerName}</h3>
    </div>
  );
};

export default OccupationalHealthcare;
