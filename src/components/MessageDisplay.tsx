import "./MessageDisplay.css";

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay = ({ message }: MessageDisplayProps) => {
  return <p className="message-display">{message}</p>;
};

export default MessageDisplay;
