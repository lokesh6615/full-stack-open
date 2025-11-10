import { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface props {
  entry: HospitalEntry;
  diagnosis: Diagnosis[] | null;
}
const Hospital = ({ entry, diagnosis }: props) => {
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
        {entry.date}
        <LocalHospitalIcon />
      </h3>
      <h3>{entry.specialist}</h3>
      <h3>{entry.description}</h3>
      {entry.diagnosisCodes?.map((code) => (
        <div>
          <span>code</span>
          <span>{diagnosis?.find((data) => data.code === code)?.name}</span>
        </div>
      ))}
      <h3>
        discharge: {entry.discharge.date} {entry.discharge.criteria}
      </h3>
    </div>
  );
};

export default Hospital;
