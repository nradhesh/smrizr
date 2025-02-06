from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from youtube_transcript_api import YouTubeTranscriptApi
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
GEMINI_API_KEY = "AIzaSyBr2O7ocfTXjo7d4E6fHdCfSygwoW7YlUs"

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Enable CORS for frontend-backend communication

# Initialize Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Function to extract transcript from YouTube video
def get_transcript(video_id, start_time, end_time):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        segment_text = " ".join([entry['text'] for entry in transcript if start_time <= entry['start'] <= end_time])
        return segment_text if segment_text else "No transcript found for the selected segment."
    except Exception as e:
        return str(e)

# Route to summarize video segment
@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        video_url = data.get('video_url')
        start_time = int(data.get('start_time'))
        end_time = int(data.get('end_time'))

        # Extract video ID from URL
        video_id = video_url.split("v=")[-1].split("&")[0]

        # Get transcript for the selected duration
        transcript_text = get_transcript(video_id, start_time, end_time)

        if "No transcript" in transcript_text:
            return jsonify({"error": "No transcript available for this segment"}), 400

        # Use Gemini API for summarization
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(f"Summarize this: {transcript_text} and provide a summary. Make sure that the paragraphs a re in format use a minimi=um of 1 paragraphs and also properly format the codesif present and the paragraphs .Answer in points and do not bold any text.")

        return jsonify({"summary": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=5000)