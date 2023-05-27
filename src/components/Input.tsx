type Props = {
  type: "textarea" | "text" | "number" | "email" | "password";
  children: React.ReactNode;
  onChange: React.Dispatch<React.SetStateAction<string>>;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
const Input = (props: Props) => {
  if (props.type === "textarea") {
    return (
      <>
        {props.children}
        <textarea className={props.className} value={props.value} id={props.id} onChange={(e) => props?.onChange?.(e.target.value)}></textarea>
      </>
    );
  }
  return (
    <>
      {props.children}
      <input type={props.type} className={props.className} value={props.value} id={props.id} name={props.name} placeholder={props.placeholder} onChange={(e) => props.onChange?.(e.target.value)} />
    </>
  );
};

export default Input;
