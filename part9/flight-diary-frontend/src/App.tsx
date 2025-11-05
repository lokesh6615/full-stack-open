import { useEffect, useState } from 'react';
import { Diary } from './types';
import { getAllDiaries } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h4>{diary.id}</h4>
          <div>Visibility: {diary.visibility}</div>
          <div>Weather: {diary.weather}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
