import type { Session } from "next-auth";
export type IconType = {
  className?: string | null;
};
export type AuthContextProps = {
  children: React.ReactNode;
  session: Session;
};
