import { useState } from "react";
import { useQueryStore } from "./store";
import CodeDisplay from "./components/CodeDisplay";
import MessagesDisplay from "./components/MessagesDisplay";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState<string>("");
  const [displayError, setDisplayError] = useState<boolean>(false);

  const selectedQuery = useQueryStore((state) => state.selectedQuery);
  const setSelectedQuery = useQueryStore((state) => state.setSelectedQuery);
  const queries = useQueryStore((state) => state.queries);
  const setQueries = useQueryStore((state) => state.setQueries);
  const clearQueries = useQueryStore((state) => state.clearQueries);

  const getQuery = async () => {
    setDisplayError(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    };
    const response = await fetch(
      "https://openai-api-nodejs-server.onrender.com/sql-generator/completions",
      // "http://localhost:8000/sql-generator/completions",
      options
    );
    if (response.status === 429) {
      setDisplayError(true);
      return;
    }
    const data = await response.json();
    setQueries(message, data.content);
    setSelectedQuery(queries.length);
  };

  return (
    <div className="app">
      <MessagesDisplay />
      <div className="query-container">
        <input
          type="text"
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getQuery();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <CodeDisplay
        query={selectedQuery != -1 ? queries[selectedQuery].queryOutput : ""}
      />
      <div className="btn-container">
        <button className="get-query" onClick={getQuery}>
          Get Query
        </button>
        <button
          className="clear-chat"
          onClick={() => {
            clearQueries();
            setMessage("");
            setSelectedQuery(-1);
            setDisplayError(false);
          }}
        >
          Clear Chat
        </button>
      </div>
      {displayError && (
        <div
          className="absolute top-6 right-6 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-[30%]"
          role="alert"
        >
          <p className="font-bold">
            Too many requests, please try again later.
          </p>
          <p>
            Due to the usage of OpenAI's free API in this project, the number of
            responses is limited to a maximum of 5 requests per day.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
