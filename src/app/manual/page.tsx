"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Copy } from "lucide-react";

export default function TextBlock() {
  const [jsonData, setJsonData] = useState<string>(""); // JSON input for API response
  const [link, setLink] = useState<string>(""); // Generated API link
  // const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    // Get the initial editText value from localStorage when the component mounts (if needed)
    const editText = localStorage.getItem("sharedVariable");
    if (editText) {
      setJsonData(editText);
    }
  }, []);

  const handleEditorChange = (value: any) => {
    setJsonData(value); // Update JSON data from editor
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link); // Copy generated link to clipboard
  };

  const handleGenerate = async () => {
    const endpointName = `mock-api-${Date.now()}`; // Generate a unique endpoint name

    // Make a request to your backend to store the mock API
    try {
      const response = await fetch("/user-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: endpointName,
          response: jsonData, // Store the JSON data as the mock API response
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate API");
      }

      setLink(`${window.location.origin}/user-api?endpoint=${endpointName}`); // Set the link to the generated API

      // Optionally, make a request to the generated API to test it
      // const apiTestResponse = await fetch(`/user-api?endpoint=${endpointName}`);
      // const data = await apiTestResponse.json();
      // setApiResponse(data); // Display API response
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full p-4 space-y-4 overflow-hidden">
      <div className="w-full h-4/5 relative">
        <div className="w-full h-full rounded-lg overflow-hidden border border-[#333333]">
          <Editor
            height="100%"
            defaultLanguage="json"
            value={jsonData}
            theme="vs-dark"
            onChange={handleEditorChange}
            options={{
              fontSize: 20,
              minimap: { enabled: false },
              lineNumbers: "on",
              folding: true,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              quickSuggestions: false,
              suggestOnTriggerCharacters: false,
              acceptSuggestionOnEnter: "off",
            }}
          />
        </div>
      </div>
      <div className="flex space-x-2 w-full">
        <div className="flex-grow h-auto relative">
          <div className="flex items-center">
            <textarea
              className="resize-none focus:outline-none focus:ring-0 w-full h-12 p-2 text-[#d4d4d4] bg-[#1e1e1e] border border-[#333333] rounded-md"
              placeholder="copy link here"
              value={link}
              readOnly // Make it read-only
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
        <button
          className="bg-[#1e1e1e] h-12 rounded-md px-2"
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>

      {/* {apiResponse && (
        <div className="bg-gray-800 p-4 rounded-md mt-4 text-white">
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )} */}
    </div>
  );
}
