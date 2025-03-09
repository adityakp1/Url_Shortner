// import { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const ShortenForm = () => {
//   const [longUrl, setLongUrl] = useState("");
//   const [customAlias, setCustomAlias] = useState("");
//   const [expiryTime, setExpiryTime] = useState("");
//   const [maxClicks, setMaxClicks] = useState("");
//   const [shortUrl, setShortUrl] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/shorten", {
//         longUrl,
//         customAlias,
//         expiryTime: expiryTime ? parseInt(expiryTime) : null,
//         maxClicks: maxClicks ? parseInt(maxClicks) : null,
//       });

//       setShortUrl(res.data.shortUrl);
//     } catch (error) {
//       console.error("Error shortening URL:", error.response?.data);
//     }
//   };

//   return (
//     <motion.div 
//       className="p-6 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto"
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
//         🔗 Shorten Your URL
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="url"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Enter long URL"
//           value={longUrl}
//           onChange={(e) => setLongUrl(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Custom Alias (optional)"
//           value={customAlias}
//           onChange={(e) => setCustomAlias(e.target.value)}
//         />
//         <input
//           type="number"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Expire in seconds (optional)"
//           value={expiryTime}
//           onChange={(e) => setExpiryTime(e.target.value)}
//         />
//         <input
//           type="number"
//           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder="Max Clicks (optional)"
//           value={maxClicks}
//           onChange={(e) => setMaxClicks(e.target.value)}
//         />
//         <motion.button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-blue-600 transition duration-200"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           🚀 Shorten
//         </motion.button>
//       </form>
//       {shortUrl && (
//         <motion.p
//           className="mt-4 text-center text-lg font-medium"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           Short URL:{" "}
//           <a
//             href={shortUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-600 font-bold underline"
//           >
//             {shortUrl}
//           </a>
//         </motion.p>
//       )}
//     </motion.div>
//   );
// };

// export default ShortenForm;



import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";

// Styled Components
const FormContainer = styled(motion.div)`
  max-width: 450px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 12px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4a90e2;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }
`;

const ShortenForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [maxClicks, setMaxClicks] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const BACKEND = process.env.BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BACKEND}/shorten`, {
        longUrl,
        customAlias,
        expiryTime: expiryTime ? parseInt(expiryTime) : null,
        maxClicks: maxClicks ? parseInt(maxClicks) : null,
      });

      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error.response?.data);
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>🔗 Shorten Your URL</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Custom Alias (optional)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Expire in seconds (optional)"
          value={expiryTime}
          onChange={(e) => setExpiryTime(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max Clicks (optional)"
          value={maxClicks}
          onChange={(e) => setMaxClicks(e.target.value)}
        />
        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🚀 Shorten
        </SubmitButton>
      </form>
      {shortUrl && (
        <p style={{ marginTop: "16px", fontSize: "16px", fontWeight: "bold" }}>
          Short URL:{" "}
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff", textDecoration: "underline" }}
          >
            {shortUrl}
          </a>
        </p>
      )}
    </FormContainer>
  );
};

export default ShortenForm;
