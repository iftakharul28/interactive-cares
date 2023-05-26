import Link from "next/link";

type Props = {
  className?: string;
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | "link";
  onClick?: () => void;
  disabled?: boolean;
  url?: string | null;
};
const Button = (props: Props) => {
  if (props.type === "link") {
    return (
      <Link href={props.url || ""} className={props.className}>
        {props.children}
      </Link>
    );
  }
  return (
    <button className={props.className} type={props.type} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;
