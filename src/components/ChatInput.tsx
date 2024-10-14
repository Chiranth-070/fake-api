import { useState } from "react";
import { Loader, Send } from "lucide-react";

interface ChatInputProps {
  handleSend: (message: string) => void;
  loading: boolean; // Add loading state prop
}

export default function ChatInput({ handleSend, loading }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState("");

  const onSend = async () => {
    if (inputMessage.trim()) {
      await handleSend(inputMessage); // Call handleSend with await
      setInputMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onSend()}
          placeholder="Type your message here..."
          className="flex-1 appearance-none border rounded-full py-2 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
        />
        <button
          onClick={onSend}
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <Loader className="h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
