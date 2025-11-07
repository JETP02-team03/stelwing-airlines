// app/travel-community/layout.tsx
import "../../styles/globals.css";

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-6">
      {children}
    </section>
  );
}
