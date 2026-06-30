import Navbar from "@/components/public/Navbar";
import ConditionalFooter from "@/components/public/ConditionalFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <ConditionalFooter />
    </div>
  );
}
