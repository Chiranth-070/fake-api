"use client";
import { usePathname, useRouter } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname(); // Get the current path
  const router = useRouter(); // Use router to navigate

  // Define paths for activation
  const isAIGenerateActive = pathname === "/";
  const isWriteManuallyActive = pathname === "/manual";

  return (
    <div className="border-r h-full w-full text-black px-3">
      <div className="flex flex-col mt-14 space-y-2">
        {/* AI Generate Button */}
        <button
          onClick={() => router.push("/")} // Navigate to the home ("/") route
          className={`p-2 rounded-md text-left w-full ${
            isAIGenerateActive ? "bg-[#1e1e1e] text-white" : "bg-gray-200"
          }`}
        >
          AI Generate
        </button>

        {/* Write Manually Button */}
        <button
          onClick={() => router.push("/manual")} // Navigate to the "/manual" route
          className={`p-2 rounded-md text-left w-full ${
            isWriteManuallyActive ? "bg-[#1e1e1e] text-white" : "bg-gray-200"
          }`}
        >
          Write Manually
        </button>
      </div>
    </div>
  );
}
