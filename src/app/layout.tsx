import Header from "@/components/nav/Header";
import "../styles/scss/styles.scss";
import { AuthContext } from "@/context";
import { headers } from "next/headers";
import getSession from "@/helper/getSession";
export const metadata = {
  title: "Interactive Cares: Best Edtech Startup in Bangladesh",
  description:
    "Interactive Cares: Best Edtech Startup in Bangladesh is Country’s first ever virtual platform for providing academic, career & skill development, through events, online courses and real-time communication in Bangla.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang='en'>
      <body>
        <AuthContext session={session}>
          <Header />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
