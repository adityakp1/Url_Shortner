import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RedirectPage() {
  const { shortUrl } = useParams();
  const navigate = useNavigate();
  const BACKEND = process.env.BACKEND_URL;

  useEffect(() => {
    fetch(`${BACKEND}/${shortUrl}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.longUrl) {
          window.location.href = data.longUrl; // 🔥 Redirect user
        } else {
          alert("Short URL not found!");
          navigate("/");
        }
      })
      .catch((err) => console.error("Error:", err));
  }, [shortUrl, navigate]);

  return <h2>Redirecting...</h2>;
}

export default RedirectPage;
