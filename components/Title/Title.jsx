export default function Title({ title, subtitle }) {
  return (
    <div className="flex items-center">
      <h3 className="text-[1rem] sm:text-[1.5rem] text-[#f65954]">{title}</h3>
      <span className="text-[1rem] sm:text-[1.25rem] text-[#f65954] font-semibold pl-5">
        ({subtitle})
      </span>
    </div>
  );
}
