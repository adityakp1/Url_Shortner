import React, { useState } from "react";
import ShortenForm from "../components/ShortenForm";
// import { motion } from "framer-motion";
import axios from "axios";
import "./styles.css";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import illustration from "../assets/develoer.png"; // Update with correct path

const Home = () => {
    const [url, setUrl] = useState("");
    const [shortenedLinks, setShortenedLinks] = useState([]);
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [expiryTime, setExpiryTime] = useState("");
    const [maxClicks, setMaxClicks] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const BACKEND = process.env.BACKEND_URL;

    const handleShorten = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`http://localhost:5000/shorten`, {
                longUrl,
                customAlias,
                expiryTime: expiryTime ? parseInt(expiryTime) : null,
                maxClicks: maxClicks ? parseInt(maxClicks) : null,
            });

            console.log("API Response:", res.data); // ✅ Debugging Step
            setShortUrl(res.data.shortUrl); // ✅ Store the short URL
            setLongUrl(res.data.longUrl);// ✅ Store the short URL

            const timestamp = new Date().toLocaleString();

            const newLink = {
                // original: longUrl,
                shortened: res.data.shortUrl,  // ✅ Ensure it's a string, not an object
                time: timestamp,
                opens: 0,
            };

            setShortenedLinks((prevLinks) => [...prevLinks, newLink]); // ✅ Update state correctly

        } catch (error) {
            console.error("Error shortening URL:", error.response?.data);
        }
    };


    const handleOpen = (index) => {
        const updatedLinks = [...shortenedLinks];
        updatedLinks[index].opens += 1;
        setShortenedLinks(updatedLinks);
        window.open(updatedLinks[index].shortened, "_blank");
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-content">
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        RX Short URL & QR Code Generator
                    </motion.h1>
                    <p>A short link allows you to collect valuable data on your customers & their behaviors.</p>
                    <div className="shorten-box">
                        <input type="text" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Paste a link to shorten it..." />
                        <input type="number" value={expiryTime} onChange={(e) => setExpiryTime(e.target.value)} placeholder="Expire in seconds...(Optional)" />
                        <input type="number" value={maxClicks} onChange={(e) => setMaxClicks(e.target.value)} placeholder="Max Clicks...(Optional)" />
                        <button className="btnShorten" onClick={handleShorten}>
                            <FaRocket /> Shorten
                        </button>
                    </div>
                    <div className="achievements">
                        <span>30+ Premium Links</span>
                        <span>2M+ Active Users</span>
                        <span>Top Companies</span>
                    </div>
                </div>
                <motion.img src={illustration} alt="Illustration" className="hero-image" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} />
            </header>

            {/* Shortened Links Table */}
            <section className="links-section">
                <h2>Shortened Links</h2>
                {shortenedLinks.length > 0 ? (
                    <table className="links-table">
                        <thead>
                            <tr>
                                <th>Shortened URL</th>
                                <th>Time</th>
                                <th>Opens</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shortenedLinks.map((link, index) => (
                                <tr key={index}>
                                    {/* <td><a href={link.original} target="_blank" rel="noopener noreferrer">{link.original}</a></td> */}
                                    <td><a href={link.shortened} target="_blank" rel="noopener noreferrer">{link.shortened}</a></td>
                                    <td>{link.time}</td>
                                    <td>{link.opens}</td>
                                    <td>
                                        <button className="open-btn" onClick={() => handleOpen(index)}>Open</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No links shortened yet.</p>
                )}
            </section>


            {/* Feature Section */}
            <section className="features">
                <h2>One short link, infinite possibilities</h2>
                <p>
                    A short link is a powerful marketing tool when you use it carefully.
                    It is not just a link but a medium between your customer and their destination.
                </p>

                <div className="feature-cards">
                    <div className="feature-card">
                        <img src={require("../assets/smart-targeting.jpg")} alt="Smart Targeting" />
                        <h3>Smart Targeting</h3>
                        <p>
                            Target your customers to increase your reach and redirect them to a relevant page.
                            Add a pixel to retarget them in your social media ad campaign to capture them.
                        </p>
                    </div>

                    <div className="feature-card">
                        <img src={require("../assets/depth-experience.jpg")} alt="In-Depth Analytics" />
                        <h3>In-Depth Analytics</h3>
                        <p>
                            Share your links to your network and measure data to optimize your marketing campaign’s performance.
                            Reach an audience that fits your needs.
                        </p>
                    </div>

                    <div className="feature-card">
                        <img src={require("../assets/digital-experience.jpg")} alt="Digital Experience" />
                        <h3>Digital Experience</h3>
                        <p>
                            Use various powerful tools to increase conversion and provide a non-intrusive experience to your customers
                            without disengaging them.
                        </p>
                    </div>
                </div>
            </section>

            {/* <ShortenForm /> */}
        </div>



    );
};

export default Home;
