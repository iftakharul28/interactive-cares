export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex h-screen bg-blue-300">{children}</main>;
}
