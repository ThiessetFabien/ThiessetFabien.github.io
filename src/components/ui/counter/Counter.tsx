export const Counter: React.FC<{ value: number; max: number }> = ({
  value,
  max,
}) => {
  return (
    <span className='text-xs font-medium'>
      {value + 1} / {max}
    </span>
  );
};
