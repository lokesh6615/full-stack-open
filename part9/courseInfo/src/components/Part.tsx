import { CoursePart } from '../types';
const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (part.kind) {
    case 'basic':
      return <div>{part.description}</div>;
    case 'group':
      return <div>project exercises {part.groupProjectCount}</div>;
    case 'background':
      return (
        <div>
          <div>{part.description}</div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case 'special':
      return (
        <div>
          <div>{part.description}</div>
          required skills: {part.requirements.join(', ')}
        </div>
      );

    default:
      assertNever(part);
  }
};

export default Part;
