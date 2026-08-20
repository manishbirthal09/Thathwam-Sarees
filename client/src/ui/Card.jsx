export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-[#E2DED3]  overflow-hidden ${className}`}>
      {children}
    </div>
  );
}