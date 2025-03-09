import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const Analytics = ({ shortUrl }) => {
  const [data, setData] = useState([]);
  const BACKEND = process.env.BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND}/analytics/${shortUrl}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [shortUrl]);

  return (
    <div>
      <h2 className="text-xl font-bold">Analytics for {shortUrl}</h2>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="ip" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Analytics;
