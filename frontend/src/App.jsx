import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';  // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
      <div className="container">
        <a className="navbar-brand" href="#">Video Summarizer</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setSummary(""); // Clear previous summary
    try {
      const response = await axios.post("http://localhost:5000/summarize", {
        video_url: videoUrl,
        start_time: startTime,
        end_time: endTime,
      });
      console.log(response.data.summary)
      setSummary(response.data.summary);
    } catch (error) {
      setSummary("Error: " + (error.response?.data?.error || "Something went wrong!"));
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient p-4 ">
        <div className="bg-white shadow-lg rounded-lg p-5 w-100 max-w-3xl transition-transform transform hover:scale-105 class1">

          <div className="space-y-4 ">
            <h1 className="text-head">All you want is a summary</h1>
            <br />
            <input
              type="text"
              placeholder="Enter YouTube Video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="form-control p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
            />
            <div className="row">
              <div className="col-md-6 mb-3 mb-md-0" >
                <input
                  type="number"
                  placeholder="Start Time (seconds)"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="form-control p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  placeholder="End Time (seconds)"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="form-control p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out"
                />
              </div>
            </div>

            <button
              onClick={handleSummarize}
              className={`btn btn-primary w-100 p-3 text-white font-bold rounded-lg transition-all duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Summarizing..." : "Create Summary"}
            </button>
          </div>

          {summary && (
            <div className="mt-4 p-4 border-2 border-gray-300 rounded-lg bg-gray-50 shadow-md transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-800">Summary:</h2>
              <p className="text-gray-700 mt-2">{summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;