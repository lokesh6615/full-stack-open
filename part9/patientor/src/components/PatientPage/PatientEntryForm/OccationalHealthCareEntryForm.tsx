import { Button, Paper, TextField } from '@mui/material';
import patientService from '../../../services/patients';
import { Patient, OccupationalHealthcareEntry } from '../../../types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

interface props {
  setErrorMessage: (message: string | null) => void;
  setPatientData: React.Dispatch<React.SetStateAction<Patient | null>>;
  onClose: () => void;
}
const OccupationalHealthcareEntryForm = ({
  setErrorMessage,
  setPatientData,
  onClose,
}: props) => {
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>No patient found</div>;
  }
  const addPatientEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodeArray = diagnosisCodes.split(',');
    const newEntry: OccupationalHealthcareEntry = {
      date,
      type: 'OccupationalHealthcare',
      specialist,
      employerName,
      description,
      sickLeave: {
        startDate,
        endDate,
      },
    };
    if (diagnosisCodeArray[0] !== '') {
      newEntry.diagnosisCodes = diagnosisCodeArray;
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
      <h4>New Occational HealthCare Entry</h4>
      <form onSubmit={addPatientEntry}>
        <TextField
          variant="standard"
          fullWidth
          label="Date"
          size="small"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
        <TextField
          variant="standard"
          fullWidth
          label="Diagnosis Codes"
          size="small"
          type="text"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
        />

        <TextField
          variant="standard"
          fullWidth
          label="Employer Name"
          size="small"
          type="text"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />

        <h3>Sick Leave (optional):</h3>

        <TextField
          variant="standard"
          fullWidth
          label="Start Date"
          size="small"
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          variant="standard"
          fullWidth
          label="End Date"
          size="small"
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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

export default OccupationalHealthcareEntryForm;
