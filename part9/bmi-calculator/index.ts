import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    return res.json({
      weight,
      height,
      bmi,
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (daily_exercises.length != 7) {
    return res.status(400).json({ error: 'Provide exact 7days data' });
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const resultObj = calculateExercises(
    daily_exercises.map(Number),
    Number(target as number)
  );

  return res.json(resultObj);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
