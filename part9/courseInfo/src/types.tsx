interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescriptive extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescriptive {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseDescriptive {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartBaseDescriptive {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
