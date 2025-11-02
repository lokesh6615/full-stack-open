const calculateBmi = (height: number, weight: number): String => {
  const heightInMeters = height / 100
  const bmiValue = weight / (heightInMeters * heightInMeters)
  switch (true) {
    case bmiValue < 16.0: {
      return 'Underweight'
    }
    case bmiValue >= 16.0 && bmiValue < 17.0: {
      return 'Underweight (Moderate thinness)'
    }
    case bmiValue >= 17.0 && bmiValue < 18.5: {
      return 'Underweight (Mild thinness)'
    }
    case bmiValue >= 18.5 && bmiValue < 25.0: {
      return 'Normal range'
    }
    case bmiValue >= 25.0 && bmiValue < 30.0: {
      return 'Overweight (Pre-obese)'
    }
    case bmiValue >= 30.0 && bmiValue < 35.0: {
      return 'Obese (Class I)'
    }
    case bmiValue >= 35.0 && bmiValue < 40.0: {
      return 'Obese (Class II)'
    }
    case bmiValue >= 40.0: {
      return 'Obese (Class III)'
    }
    default:
      return 'poor control'
  }
}

console.log(calculateBmi(180, 74))
