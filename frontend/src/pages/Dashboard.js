import { useState } from "react";
import Analytics from "../components/Analytics";

const Dashboard = () => {
  const [shortUrl, setShortUrl] = useState("");

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
      <input
        type="text"
        placeholder="Enter short URL (e.g. xyz123)"
        className="p-2 border rounded"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
      />
      {shortUrl && <Analytics shortUrl={shortUrl} />}
    </div>
  );
};

export default Dashboard;
