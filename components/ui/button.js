export default function Button({ children, className = "", ...args }) {
  return (
    <button
      className={`bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded ${className}`}
      {...args}
    >
      {children}
    </button>
  );
}
