import { NavBarStore } from "@/components/NavBarStore";
export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarStore />
      {children}
    </>
  );
}
