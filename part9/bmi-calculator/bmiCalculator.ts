interface bmiValues {
  height: number;
  weight: number;
}
const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmiValue = weight / (heightInMeters * heightInMeters);
  switch (true) {
    case bmiValue < 16.0: {
      return 'Underweight';
    }
    case bmiValue >= 16.0 && bmiValue < 17.0: {
      return 'Underweight (Moderate thinness)';
    }
    case bmiValue >= 17.0 && bmiValue < 18.5: {
      return 'Underweight (Mild thinness)';
    }
    case bmiValue >= 18.5 && bmiValue < 25.0: {
      return 'Normal range';
    }
    case bmiValue >= 25.0 && bmiValue < 30.0: {
      return 'Overweight (Pre-obese)';
    }
    case bmiValue >= 30.0 && bmiValue < 35.0: {
      return 'Obese (Class I)';
    }
    case bmiValue >= 35.0 && bmiValue < 40.0: {
      return 'Obese (Class II)';
    }
    case bmiValue >= 40.0: {
      return 'Obese (Class III)';
    }
    default:
      return 'poor control';
  }
};

export default calculateBmi;

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
