interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

function Input({ value, onChange }: InputProps) {
  return (
    <input
      className="border border-gray-300 rounded px-4 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default Input;
