import { useQueryStore } from "../store";
import MessageDisplay from "./MessageDisplay";
import "./MessagesDisplay.css";

const MessagesDisplay = () => {
  const setSelectedQuery = useQueryStore((state) => state.setSelectedQuery);
  const queries = useQueryStore((state) => state.queries);

  return (
    <div className="messages-display">
      {queries.map((query, index) => (
        <div
          onClick={() => setSelectedQuery(index)}
          key={query.queryMessage + "_" + query.queryOutput}
        >
          <MessageDisplay message={query.queryMessage} />
        </div>
      ))}
    </div>
  );
};

export default MessagesDisplay;
