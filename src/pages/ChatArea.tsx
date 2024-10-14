"use client";
import { useState, useEffect, useRef } from "react";
import UserBox from "../components/UserBox";
import BotBox from "@/components/BotBox";
import ChatInput from "@/components/ChatInput";
import { askAI } from "@/app/api/llm-response/route";
import { proptTemplate } from "@/app/lib/Prompt";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasUserStartedTyping, setHasUserStartedTyping] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom whenever messages are updated
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (inputMessage: string) => {
    if (inputMessage.trim()) {
      setHasUserStartedTyping(true); // Set this to true when the user sends their first message

      // Add user message to the chat
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setLoading(true); // Set loading to true while fetching AI response

      try {
        // Call the askAI function to get the bot's response
        const botResponseText = await askAI(proptTemplate + inputMessage);

        // Create the bot response message
        const botResponse: Message = {
          id: messages.length + 2,
          text: botResponseText, // Set the response from AI
          sender: "bot",
        };

        // Add the bot response to the messages
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error fetching AI response:", error);

        // Display an error message if something goes wrong
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "Sorry, something went wrong while fetching the response.",
          sender: "bot",
        };

        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 relative">
      {/* Conditionally render the initial greeting message */}
      {!hasUserStartedTyping && (
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-3xl font-mono font-bold text-gray-700 animate-fade-in">
            Hello! How can I assist you today?
          </h1>
        </div>
      )}

      {/* Main chat area */}
      <div
        className="flex-1 overflow-y-auto py-4 px-4 mb-12 md:px-28 space-y-4 transition-all duration-500 ease-in-out"
        ref={messagesContainerRef} // Ref for automatic scrolling
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-start ml-12" : "justify-center"
            }`}
          >
            {msg.sender === "user" ? (
              // User message bubble
              <UserBox input={msg.text} />
            ) : (
              // Bot message: Display in a copyable textarea
              <BotBox output={msg.text} />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-center items-center">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}
      </div>

      {/* Input area with sticky behavior */}
      <div className="sticky bottom-0 bg-white w-full border-t border-gray-200">
        <ChatInput handleSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}
