interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>Course Name: {props.name}</h1>;
};

export default Header;
