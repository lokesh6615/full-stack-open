import { Diagnosis, HealthCheckEntry } from '../../types';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { styled } from '@mui/material/styles';
import Rating, { IconContainerProps } from '@mui/material/Rating';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

interface props {
  entry: HealthCheckEntry;
  diagnosis: Diagnosis[] | null;
}
const HealthCheck = ({ entry, diagnosis }: props) => {
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
        {entry.date} <MonitorHeartIcon />
      </h3>
      <h3>{entry.specialist}</h3>
      <h3>{entry.description}</h3>
      {entry.diagnosisCodes?.map((code) => (
        <div>
          <span>code</span>
          <span>{diagnosis?.find((data) => data.code === code)?.name}</span>
        </div>
      ))}
      <h3>Rating: </h3>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={5 - entry.healthCheckRating}
        readOnly
        IconContainerComponent={IconContainer}
        getLabelText={(value: number) => customIcons[value].label}
        highlightSelectedOnly
      />
    </div>
  );
};

export default HealthCheck;
