export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#FFFEF6]  overflow-hidden ${className}`}>
      {children}
    </div>
  );
}