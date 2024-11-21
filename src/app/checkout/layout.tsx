import { NavBarStore } from "@/components/NavBarStore";
import { Footer } from "@/components/Footer";
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBarStore />

      {children}

      <Footer />
    </>
  );
}
