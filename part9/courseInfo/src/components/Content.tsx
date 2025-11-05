import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
  parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.name}>
          <div style={{ paddingTop: '1rem' }}>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <Part part={part} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
