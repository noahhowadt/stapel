"use client";
interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}

const primary =
  "bg-black text-white font-semibold w-full border-black hover:bg-gray-900 transition-colors rounded";
const secondary = "bg-white text-black text-sm w-full border-gray-100";

function Button({ children, onClick, primary: isPrimary }: Props) {
  return (
    <button
      className={`shadow rounded px-3 py-2 border-[1px] ${
        isPrimary ? primary : secondary
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
