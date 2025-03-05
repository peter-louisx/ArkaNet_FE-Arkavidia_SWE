export default function NavItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}
