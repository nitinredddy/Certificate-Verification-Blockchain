import { useState } from "react";
import Issue from "./pages/Issue";
import Verify from "./pages/Verify";

function App() {
  const [tab, setTab] = useState("issue");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      
      <h1 className="text-3xl font-bold mb-6">
        Certificate Verification (Blockchain)
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-[400px]">
        
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 rounded-l-lg ${
              tab === "issue" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("issue")}
          >
            Issue
          </button>

          <button
            className={`flex-1 py-2 rounded-r-lg ${
              tab === "verify" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setTab("verify")}
          >
            Verify
          </button>
        </div>

        {tab === "issue" ? <Issue /> : <Verify />}
      </div>
    </div>
  );
}

export default App;