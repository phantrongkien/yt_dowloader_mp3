from flask import Flask, request
import subprocess

app = Flask(__name__)

@app.route("/download")
def download():
    url = request.args.get("url")
    filetype = request.args.get("type", "mp4")
    allow_playlist = request.args.get("playlist", "false").lower() == "true"

    if not url:
        return "Missing 'url' parameter", 400

    cmd = ["yt-dlp"]

    if not allow_playlist:
        cmd.append("--no-playlist")

    if filetype == "mp3":
        cmd += ["-x", "--audio-format", "mp3"]
    else:
        cmd += ["-f", "bestvideo+bestaudio"]

    cmd.append(url)

    try:
        subprocess.Popen(cmd)
        return f"✅ Download started: {filetype.upper()}<br><pre>{url}</pre>", 200
    except Exception as e:
        return f"❌ Error: {e}", 500

if __name__ == "__main__":
    app.run(port=8080)