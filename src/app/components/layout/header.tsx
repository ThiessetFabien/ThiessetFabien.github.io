export const Header = () => {
  const keys = ['All', 'About', 'Work'];

  return (
    <header>
      <nav>
        <ul>
          {keys.map((item) => (
            <li key={item}> {item}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
