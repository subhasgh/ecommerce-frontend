

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved
      ? JSON.parse(saved)
      : [{ from: "bot", text: "Hello 👋 How can I help you today?" }];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = {
        from: "bot",
        text: "Thanks for your query! Our team will assist you shortly.",
      };
      setMessages((prev) => [...prev, reply]);

      if (!open) setHasNew(true); // show notification if closed
    }, 1500);
  };

  const clearChat = () => {
    const fresh = [{ from: "bot", text: "Hello 👋 How can I help you today?" }];
    setMessages(fresh);
    localStorage.setItem("chatMessages", JSON.stringify(fresh));
  };

  const toggleChat = () => {
    setOpen(!open);
    if (!open) setHasNew(false); // remove notification when opened
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      {!open && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChat}
          className="relative bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition"
        >
          💬
          {hasNew && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-3 flex justify-between items-center">
              <span className="font-medium">Bijoux Assistant</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-white text-sm bg-pink-400 hover:bg-pink-500 px-2 py-1 rounded-lg transition"
                >
                  Clear
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white text-lg hover:scale-110 transition"
                >
                  ✖
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[75%] ${
                      msg.from === "user"
                        ? "bg-pink-100 text-gray-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 text-gray-500 px-3 py-2 rounded-lg flex space-x-1">
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        •
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                      >
                        •
                      </motion.span>
                      <motion.span
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
                      >
                        •
                      </motion.span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-2 border-t flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button
                onClick={sendMessage}
                className="bg-pink-600 text-white px-3 rounded-lg hover:bg-pink-700 transition"
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
