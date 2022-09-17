interface Props {
  amount: number;
  max?: number;
  onChange?: (newAmount: number) => void;
}

const Trackable = ({amount, max = 5, onChange}: Props) => {
  const circles = Array.from({length: max}, (v, i) => i);

  return (
    <div className="flex flex-row">
      {circles.map((i) => (
        <div
          key={i}
          className={`rounded-2xl w-8 h-8 border-2 border-gray-500 mr-1 hover:border-blue-500 ${
            i < amount ? "bg-gray-900" : ""
          }`}
          onClick={() => onChange && onChange(i)}
        />
      ))}
    </div>
  );
};

export default Trackable;
