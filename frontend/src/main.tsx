import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [status, setStatus] = useState("Checking the API and database…");

  useEffect(() => {
    const request = new AbortController();

    async function checkHealth() {
      try {
        const response = await fetch("/api/health", { signal: request.signal });
        if (!response.ok) {
          throw new Error("Health check failed");
        }
        const health = await response.json();
        if (health.status !== "ok") {
          throw new Error("Unexpected health response");
        }
        setStatus("API and database connected.");
      } catch {
        if (!request.signal.aborted) {
          setStatus("Could not connect to the API and database.");
        }
      }
    }

    void checkHealth();
    return () => request.abort();
  }, []);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold">WhatTurtDo</h1>
      <p className="mt-4 text-slate-600" role="status">{status}</p>
    </main>
  );
}

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
