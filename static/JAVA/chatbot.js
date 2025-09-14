const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const chatForm = document.getElementById('chatForm');

const imageInput = document.getElementById('imageInput');
const fab = document.getElementById('fab');
const fabMenu = document.getElementById('fabMenu');
const uploadBtn = document.getElementById('uploadBtn');
const cameraBtn = document.getElementById('cameraBtn');

const cameraModal = document.getElementById('cameraModal');
const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const closeCamera = document.getElementById('closeCamera');
const captureCanvas = document.getElementById('captureCanvas');

let stream = null;

function makeTimestamp(){
  const d = new Date();
  return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

function appendMessage(text, who='bot', ts=null){
  const wrapper = document.createElement('div');
  wrapper.className = 'message ' + (who === 'user' ? 'user' : 'bot');

  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;

  const timeSpan = document.createElement('span');
  timeSpan.className = 'ts';
  timeSpan.textContent = ts || makeTimestamp();

  bubble.appendChild(timeSpan);
  wrapper.appendChild(bubble);
  chatArea.appendChild(wrapper);
  chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
}

function appendImageMessage(imgUrl, who='user', ts=null){
  const wrapper = document.createElement('div');
  wrapper.className = 'message ' + (who === 'user' ? 'user' : 'bot');

  const bubble = document.createElement('div');
  bubble.className = 'bubble';

  // image element
  const img = document.createElement('img');
  img.className = 'chat-image';
  img.src = imgUrl;
  img.alt = 'uploaded image';

  const timeSpan = document.createElement('span');
  timeSpan.className = 'ts';
  timeSpan.textContent = ts || makeTimestamp();

  bubble.appendChild(img);
  bubble.appendChild(timeSpan);
  wrapper.appendChild(bubble);
  chatArea.appendChild(wrapper);
  chatArea.scrollTo({ top: chatArea.scrollHeight, behavior: 'smooth' });
}

async function sendMessage(e){
  if (e) e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return false;

  appendMessage(text, 'user', makeTimestamp());
  messageInput.value = '';
  messageInput.focus();

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });

    if (!res.ok) {
      appendMessage('Server error: ' + res.statusText, 'bot');
      return false;
    }

    const data = await res.json();
    const reply = data.reply || 'No reply received';
    const ts = data.timestamp ? new Date(data.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : makeTimestamp();
    appendMessage(reply, 'bot', ts);

  } catch (err) {
    console.error(err);
    appendMessage('Network error: Could not reach server.', 'bot');
  }

  return false;
}

// --- file upload handling ---
imageInput.addEventListener('change', async (ev) => {
  const file = ev.target.files && ev.target.files[0];
  if (!file) return;
  // simple client-side file type check
  if (!file.type.startsWith('image/')) {
    appendMessage('Please select an image file.', 'bot');
    return;
  }
  // show a preview in chat as user image while uploading
  const reader = new FileReader();
  reader.onload = () => appendImageMessage(reader.result, 'user', makeTimestamp());
  reader.readAsDataURL(file);

  // send to server
  const fd = new FormData();
  fd.append('image', file, file.name);
  try {
    const resp = await fetch('/upload', { method: 'POST', body: fd });
    const data = await resp.json();
    if (resp.ok && data.url) {
      // replace last user preview? For simplicity, append a bot reply
      appendMessage('Image uploaded successfully.', 'bot');
      // (optionally) bot can show stored image link as bot message:
      // appendImageMessage(data.url, 'bot', makeTimestamp());
    } else {
      appendMessage('Upload failed: ' + (data.error || data.message || 'unknown'), 'bot');
    }
  } catch (err) {
    console.error(err);
    appendMessage('Network error during upload.', 'bot');
  } finally {
    imageInput.value = '';
  }
});

// --- FAB toggles ---
fab.addEventListener('click', () => {
  fabMenu.classList.toggle('open');
});

// upload button opens file picker
uploadBtn.addEventListener('click', () => {
  fabMenu.classList.remove('open');
  imageInput.click();
});

// --- Camera handling ---
cameraBtn.addEventListener('click', async () => {
  fabMenu.classList.remove('open');
  // open modal
  cameraModal.classList.add('open');
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    video.srcObject = stream;
    await video.play();
  } catch (err) {
    console.error('Camera access denied or not available', err);
    appendMessage('Cannot access camera: ' + (err.message || err), 'bot');
    cameraModal.classList.remove('open');
  }
});

closeCamera.addEventListener('click', () => {
  stopCamera();
  cameraModal.classList.remove('open');
});

function stopCamera(){
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
    video.srcObject = null;
  }
}

// capture and upload
captureBtn.addEventListener('click', async () => {
  if (!stream) return;
  const w = video.videoWidth, h = video.videoHeight;
  captureCanvas.width = w;
  captureCanvas.height = h;
  const ctx = captureCanvas.getContext('2d');
  ctx.drawImage(video, 0, 0, w, h);
  captureCanvas.toBlob(async (blob) => {
    if (!blob) return;
    // show preview
    const url = URL.createObjectURL(blob);
    appendImageMessage(url, 'user', makeTimestamp());

    // prepare formdata
    const fd = new FormData();
    fd.append('image', blob, 'photo.jpg');

    try {
      const resp = await fetch('/upload', { method: 'POST', body: fd });
      const data = await resp.json();
      if (resp.ok && data.url) {
        appendMessage('Photo uploaded successfully.', 'bot');
      } else {
        appendMessage('Upload failed: ' + (data.error || data.message || 'unknown'), 'bot');
      }
    } catch (err) {
      console.error(err);
      appendMessage('Network error during upload.', 'bot');
    } finally {
      stopCamera();
      cameraModal.classList.remove('open');
    }
  }, 'image/jpeg', 0.9);
});

// --- keyboard enter sending ---
messageInput.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' && !ev.shiftKey) {
    ev.preventDefault();
    sendMessage();
  }
});
chatForm.addEventListener('submit', sendMessage);
