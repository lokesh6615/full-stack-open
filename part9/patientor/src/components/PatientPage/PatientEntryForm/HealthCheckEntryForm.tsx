import { Button, Paper, TextField } from '@mui/material';
import patientService from '../../../services/patients';
import { Patient, HealthCheckEntry } from '../../../types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MultipleSelect from '../../MultipleSelect';

interface props {
  setErrorMessage: (message: string | null) => void;
  setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>;
  onClose: () => void;
}
const HealthCheckEntryForm = ({
  setErrorMessage,
  setPatientData,
  onClose,
}: props) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>No patient found</div>;
  }
  const addPatientEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry: HealthCheckEntry = {
      date,
      type: 'HealthCheck',
      specialist,
      description,
      healthCheckRating,
    };
    if (diagnosisCodes && diagnosisCodes.length > 0) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }
    patientService
      .addPatientEntry(id, newEntry)
      .then((entry) => {
        setPatientData((prev) =>
          prev ? { ...prev, entries: [...prev.entries, entry] } : prev
        );
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data[0].message);
        setTimeout(() => setErrorMessage(null), 3000);
      });
  };
  return (
    <Paper elevation={3} sx={{ padding: 4, marginY: 2 }}>
      <h4>New HealthCheck Entry</h4>
      <form onSubmit={addPatientEntry}>
        <TextField
          variant="standard"
          fullWidth
          label="Date"
          size="small"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          variant="standard"
          fullWidth
          label="Specialist"
          size="small"
          type="text"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <TextField
          variant="standard"
          fullWidth
          label="Description"
          size="small"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <MultipleSelect
          selectedValues={diagnosisCodes}
          setSelectedValues={setDiagnosisCodes}
        />
        <TextField
          variant="standard"
          fullWidth
          label="Health Check Rating(0-4)"
          size="small"
          type="text"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
        />
        <Button type="button" onClick={() => onClose()} variant="contained">
          Cancel
        </Button>
        <Button
          type="submit"
          sx={{ margin: 2 }}
          variant="contained"
          onClick={addPatientEntry}
        >
          Add Entry
        </Button>
      </form>
    </Paper>
  );
};

export default HealthCheckEntryForm;
