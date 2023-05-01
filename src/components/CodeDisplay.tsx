import Typewriter from "typewriter-effect";
import "./CodeDisplay.css";

interface CodeDisplayProps {
  query: string;
}

const CodeDisplay = ({ query }: CodeDisplayProps) => {
  return (
    <div className="code-display">
      <div className="buttons">
        <div className="button bg-[#ff5f56]"></div>
        <div className="button bg-[#ffbd2e]"></div>
        <div className="button bg-[#27c93f]"></div>
      </div>
      <div className="code-output">
        <p>
          <Typewriter
            options={{
              strings: query,
              autoStart: true,
              loop: false,
              delay: 22,
              cursor: "",
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default CodeDisplay;
