import "./All.css";
import { MyButtonProps } from "./components/Interfaces";

const MyButton: React.FC<MyButtonProps> = ({ link, text, addfunc, submit, dark }) => {
  return (
    <a href={link}>
      <button
        className={`custom-button ${dark ? "btn-dark" : ""} `}
        onClick={addfunc ? () => addfunc() : undefined}
        type={submit ? "submit" : "button"}>
        <span className="button-text">{text}</span>
      </button>
    </a>
  );
};

export default MyButton;
