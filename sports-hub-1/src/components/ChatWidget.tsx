import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import api from '@/services/api';

type Message = {
  id: string;
  role: 'user' | 'ai';
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const hiddenOnRoutes = useMemo(() => ['/login', '/signup', '/auth'], []);
  const isHidden = hiddenOnRoutes.includes(location.pathname);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await api.post('/chat', { message: text });
      const reply = res.data?.reply || 'I could not generate a response.';
      const aiMsg: Message = { id: crypto.randomUUID(), role: 'ai', text: reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const aiErr: Message = { id: crypto.randomUUID(), role: 'ai', text: 'Oops! Something went wrong.' };
      setMessages((prev) => [...prev, aiErr]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isHidden) return null;

  return (
    <div className="fixed left-4 bottom-4 z-50">
      {/* Chat Bubble */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-bubble"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 focus:outline-none"
            aria-label="Open AI chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-4.9-1.276L4 22l1.276-3.1A9.96 9.96 0 0 1 2 12Z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="w-[88vw] max-w-sm h-[60vh] max-h-[560px] bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
              <div className="text-sm font-semibold text-gray-800">SportsHub AI Assistant</div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
                aria-label="Close chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M16.24 7.76a.75.75 0 0 0-1.06-1.06L12 9.88 8.82 6.7a.75.75 0 1 0-1.06 1.06L10.94 11l-3.18 3.18a.75.75 0 1 0 1.06 1.06L12 12.06l3.18 3.18a.75.75 0 0 0 1.06-1.06L13.06 11l3.18-3.24Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 bg-gray-50/60">
              <div className="space-y-2">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                        m.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-emerald-500/15 text-emerald-900 rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-emerald-500/15 text-emerald-900 rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm">
                      <div className="flex gap-1 items-center">
                        <span className="sr-only">Assistant typing</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="p-2 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about SportsHub..."
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm shadow hover:bg-blue-700 disabled:opacity-60"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


