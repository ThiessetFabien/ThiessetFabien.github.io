export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>&copy; {year} Created with ❤️ by Thiesset Fabien</p>
    </footer>
  );
};
