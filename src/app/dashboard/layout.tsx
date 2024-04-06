import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import UserTable from "@/components/tables/ProductTable";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    {children}
    </>
  );
}
