import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import patientService from '../../services/patients';
import diagnosesService from '../../services/diagnoses';
import { Diagnosis, Patient, Entry } from '../../types';
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
