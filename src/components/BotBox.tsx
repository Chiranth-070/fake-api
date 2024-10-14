"use client";
import { ClipboardCopy } from "lucide-react";
import { useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BotBox({ output }: { output: string }) {
  const router = useRouter();
  return (
    <div className="max-w-5xl w-full p-4 rounded-lg bg-gray-800 text-white shadow-lg">
      {/* Code block with syntax highlighting */}
      <div
        className="overflow-y-auto"
        style={{
          overflowX: "scroll", // Always show the horizontal scrollbar
        }}
      >
        <SyntaxHighlighter
          language="javascript" // Adjust according to the content type
          style={dracula}
          wrapLines={true} // Ensure line wrapping is enabled
          //showLineNumbers={true}
          customStyle={{
            backgroundColor: "#1e1e1e", // Code block background matching dark theme
            borderRadius: "0.5rem",
            padding: "1rem",
            margin: "0px",
            overflowWrap: "break-word", // Allow words to break to prevent overflow
            wordBreak: "break-word", // Ensure long words break
            width: "full", // Prevent line breaks when not necessary
          }}
        >
          {output}
        </SyntaxHighlighter>
      </div>

      <style jsx>
        {`
          /* Custom scrollbar style */
          div::-webkit-scrollbar {
            height: 6px; /* Smaller height for the bottom scrollbar */
            width: 8px; /* Height for vertical scrollbar */
          }

          div::-webkit-scrollbar-thumb {
            background-color: #555; /* Color of the scrollbar */
            border-radius: 4px; /* Rounded corners for a sleek look */
          }

          div::-webkit-scrollbar-track {
            background-color: #1e1e1e; /* Track background matching code block */
          }
        `}
      </style>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        {/* Copy Button */}
        <button
          className="flex items-center text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
          onClick={() => {
            navigator.clipboard.writeText(output);
            alert("Copied to clipboard");
          }}
        >
          <ClipboardCopy className="mr-2" />
          Copy
        </button>

        {/* Edit Response Button */}
        <div className="flex space-x-2">
          <button
            className="text-sm font-semibold text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors duration-200"
            onClick={() => {
              localStorage.setItem("sharedVariable", output);
              router.push("/manual");
            }}
          >
            Edit & generate
          </button>
        </div>
      </div>
    </div>
  );
}
