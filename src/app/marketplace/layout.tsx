import { NavBarStore } from "@/components/NavBarStore";

export default function MarketplaceLayout({
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
