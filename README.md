# SMRIZR - A VIDEO SUMMARIZER based on duration using AI.

This project allows you to summarize specific segments of a YouTube video. By providing a video link and selecting a time segment, the application extracts the transcript of the video and generates a summary using the **Google Gemini API**.

![image](https://github.com/user-attachments/assets/97ef9a6c-560b-4333-8b6f-5051a46d0a8f)

![image](https://github.com/user-attachments/assets/209b08a8-8855-4eb6-8468-31ac3652fb59)

## Features

- **YouTube Video URL Input**: Input a valid YouTube URL.
- **Time Segment Selection**: Specify the start and end time in seconds for the segment you want to summarize.
- **Summary Generation**: Summarizes the transcript of the selected video segment using **Google Gemini API**.
- **Responsive Design**: The frontend is responsive and works well on both desktop and mobile.

## Tech Stack

- **Frontend**: React.js with **Vite**, **Bootstrap** for styling.
- **Backend**: Python with **Flask**, **Flask-CORS**, and **Google Gemini API**.
- **Other Libraries**: **YouTube Transcript API** to extract transcripts from YouTube videos.

## Setup Instructions

### Prerequisites

- **Python 3.x** installed
- **Node.js** (for React frontend)
- **Google Gemini API Key** (for summarization)

### Backend Setup (Python)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/youtube-video-summarizer.git
   cd youtube-video-summarizer
   ```

2. Create a `.env` file in the root directory and add your **Gemini API Key**:
   ```plaintext
   GEMINI_API_KEY=your_api_key_here
   ```

3. Install the required Python packages:
   ```bash
   pip install Flask Flask-CORS google-generativeai youtube-transcript-api python-dotenv
   ```

4. Start the Flask server:
   ```bash
   python app1.py
   ```

The backend will run on `http://localhost:5000`.

### Frontend Setup (React)

1. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the React app:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

### CORS Configuration

Ensure that CORS is properly configured in the Flask backend to allow cross-origin requests from the React frontend.

## Usage

1. Open the React app in your browser.
2. Enter the **YouTube Video URL**.
3. Specify the **Start Time** and **End Time** in seconds for the segment you want to summarize.
4. Click on **Create Summary** to generate a summary of the video segment.

## Example

### Input:

- **Video URL**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- **Start Time**: `30 s`
- **End Time**: `600 s`

### Output:

- A summarized text based on the segment from `30s` to `60s` of the video.

## Project Structure

```
youtube-video-summarizer/
│
├── app.py               # Backend: Flask application
├── frontend/            # Frontend: React app
│   ├── public/          # Public assets (index.html)
│   ├── src/             # React components
│   │   ├── App.jsx      # Main React component
│   │   └── App.css      # Custom styles
│   └── package.json     # React app dependencies
└── README.md            # This file
```
