interface exerciseValues {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: String
  target: number
  average: number
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): exerciseValues => {
  let trainingDays = 0
  let trainingHours = 0
  let targetMetDays = 0
  let rating = 1
  let ratingDescription = ''
  for (let i = 0; i < dailyExerciseHours.length; i++) {
    if (dailyExerciseHours[i] != 0) {
      trainingDays += 1
    }
    if (dailyExerciseHours[i] >= target) {
      targetMetDays += 1
    }
    trainingHours += dailyExerciseHours[i]
  }
  const success = trainingDays >= 6 ? true : false
  const average = trainingHours / 7
  if (targetMetDays >= 5) {
    rating = 3
    ratingDescription = 'Good Job'
  } else if (targetMetDays >= 3 && targetMetDays < 5) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'poor control , wake up'
  }

  return {
    periodLength: 7,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
