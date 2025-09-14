from flask import Flask, render_template, request, jsonify
from datetime import datetime
from werkzeug.utils import secure_filename
from pathlib import Path
from GenarativeAi import generated_response

ALLOWED_EXT = {'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_DIR = Path(__file__).parent / "static" / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024  # 8 MB upload limit

def allowed_file(filename: str) -> bool:
    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''
    return ext in ALLOWED_EXT

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chatbot")
def chatbot():
    return render_template("chatbot.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    user_msg = data.get("message", "") if isinstance(data, dict) else ""

    bot_reply = generated_response(user_msg)

    return jsonify({
        "reply": bot_reply,
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@app.route("/upload", methods=["POST"])
def upload():
    if 'image' not in request.files:
        return jsonify({"error": "No image field in request"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    fname = secure_filename(file.filename)
    ts = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")
    save_name = f"{ts}_{fname}"
    save_path = UPLOAD_DIR / save_name
    file.save(save_path)

    url = f"/static/uploads/{save_name}"
    return jsonify({"url": url, "filename": save_name, "message": "Upload successful"})

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
