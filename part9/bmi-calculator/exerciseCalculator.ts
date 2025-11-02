interface exerciseValues {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseArgs {
  target: number
  dailyHours: number[]
}

const parseExerciseArguments = (args: string[]): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const target = Number(args[2])
  const dailyHours = args.slice(3).map(Number)

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error('All provided values must be numbers')
  }

  return { target, dailyHours }
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): exerciseValues => {
  const periodLength = dailyExerciseHours.length
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length
  const trainingHours = dailyExerciseHours.reduce((a, b) => a + b, 0)
  const targetMetDays = dailyExerciseHours.filter((h) => h >= target).length
  const average = trainingHours / periodLength

  let rating = 1
  let ratingDescription = ''
  if (targetMetDays >= 5) {
    rating = 3
    ratingDescription = 'Good job!'
  } else if (targetMetDays >= 3) {
    rating = 2
    ratingDescription = 'Not too bad but could be better.'
  } else {
    rating = 1
    ratingDescription = 'Poor control, wake up!'
  }

  const success = trainingDays >= 6

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const { target, dailyHours } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(dailyHours, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
