import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Patient, Entry, PatientEntry } from '../../types';
import { Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import { Alert, Button, Paper, TextField } from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const PatientPage = () => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis[] | null>(null);
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id);
        setPatientData(patient);
        const diagnosis = await diagnosesService.getAll();
        setDiagnosisData(diagnosis);
      } catch (error) {
        console.error('Error fetching patient:', error);
      }
    };

    fetchPatient();
  }, [id]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  if (!id) {
    return <div>No patient found</div>;
  }

  if (!patientData) {
    return <div>Loading patient data...</div>;
  }

  const categorizedFields = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheck entry={entry} diagnosis={diagnosisData} />;
      case 'Hospital':
        return <Hospital entry={entry} diagnosis={diagnosisData} />;
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcare entry={entry} diagnosis={diagnosisData} />
        );
      default:
        assertNever(entry);
    }
  };

  const addPatientEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const diagnosisCodeArray = diagnosisCodes.split(',');
    const newEntry: PatientEntry = {
      date,
      type: 'HealthCheck',
      specialist,
      description,
      healthCheckRating,
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
    <div>
      <h1>
        {patientData.name}
        {patientData.gender === 'male' ? (
          <MaleIcon color="disabled" />
        ) : (
          <FemaleIcon color="disabled" />
        )}
      </h1>
      <h3>{patientData.dateOfBirth}</h3>
      {errorMessage && (
        <Alert severity="error" sx={{ marginY: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {!showForm && (
        <Button
          type="button"
          onClick={() => setShowForm(true)}
          variant="contained"
          sx={{ marginY: 2 }}
        >
          Add New Entry
        </Button>
      )}
      {showForm && (
        <Paper elevation={3} sx={{ padding: 4, marginY: 2 }}>
          <h4>New HealthCheck Entry</h4>
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
              label="Health Check Rating(0-4)"
              size="small"
              type="text"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            />
            <Button
              type="button"
              onClick={() => setShowForm(false)}
              variant="contained"
            >
              Cancel
            </Button>
            <Button type="submit" sx={{ margin: 2 }} variant="contained">
              Add Entry
            </Button>
          </form>
        </Paper>
      )}
      <h2>Entries :</h2>
      {patientData.entries.map((entry) => categorizedFields(entry))}
      <Typography component="legend">Health Rating</Typography>
      <StyledRating
        name="customized-color"
        defaultValue={3}
        getLabelText={(value: number) =>
          `${value} Heart${value !== 1 ? 's' : ''}`
        }
        readOnly
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    </div>
  );
};

export default PatientPage;
