import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [persona, setPersona] = useState("aarav"); // default persona
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, persona }), // send persona to backend
      });
      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages([...newMessages, { sender: "bot", text: "Error: Could not connect to AI." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen items-center bg-[#1a1a1a] text-white ">
      {/* Persona Selector */}
      <div className="p-3 flex gap-2 items-center">
        <label className="font-semibold">Choose Persona:</label>
        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          className="border-nonerounded px-2 py-1 bg-transparent"
        >
          <option value="Piyush" className="bg-transparent text-black">Piyush</option>
          <option value="Hitesh" className="bg-transparent">Hitesh</option>
        </select>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-w-6xl ">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[50%] ${
              msg.sender === "user"
                ? "bg-gray-200 text-black ml-auto"
                : "bg-gray-300 text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 text-sm">{persona} is typing...</div>}
      </div>

      {/* Input Area */}
      <div className="p-3 max-w-4xl flex mb-10">
        <input
          className="flex-1 px-4 py2 border  rounded-full outline-none"
          placeholder="Ask anything"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full hover:bg-white "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
