const axios = require('axios');

// POST /api/chat
// Body: { message: string }
// Returns: { reply: string }
exports.postChatMessage = async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    }

    // Gemini Pro generateContent endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    // Minimal prompt format for v1beta generateContent
    const payload = {
      contents: [
        {
          parts: [
            { text: message }
          ]
        }
      ]
    };

    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    const candidates = response.data?.candidates || [];
    const replyText = candidates[0]?.content?.parts?.[0]?.text || 'I could not generate a response.';

    return res.json({ reply: replyText });
  } catch (err) {
    console.error('Gemini chat error:', err?.response?.data || err?.message || err);
    return res.status(500).json({ reply: 'Oops! Something went wrong.' });
  }
};


