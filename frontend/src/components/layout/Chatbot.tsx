"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

// You can easily modify these Q&A pairs
const FAQ_DATA = [
  {
    question: "What are your operating hours?",
    answer: "We are available 24/7 to assist you with your luxury travel needs.",
  },
  {
    question: "How do I book a private tour?",
    answer: "You can book a private tour by contacting us via WhatsApp, email, or filling out the inquiry form on our website.",
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes, we offer premium airport transfers in luxury vehicles for all our clients.",
  },
  {
    question: "Can I customize my itinerary?",
    answer: "Absolutely! We specialize in creating fully tailored itineraries based on your preferences and requirements.",
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! Welcome to Tourism. How can I help you today? Please choose a question below.",
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleQuestionClick = (faq: typeof FAQ_DATA[0]) => {
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: faq.question };
    setMessages((prev) => [...prev, userMsg]);
    
    // Simulate bot thinking then replying
    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: "bot", text: faq.answer };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button - Positioned above the WhatsApp button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[5.5rem] right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl border border-gray-700 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[5.5rem] right-6 z-50 flex w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#1A1A1A] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 p-1.5 rounded-full">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">Tourism Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-300">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 transition-colors hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex h-[320px] flex-col overflow-y-auto bg-gray-50 p-4 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] px-4 py-2.5 text-sm ${
                      msg.sender === "user"
                        ? "bg-[#1A1A1A] text-white rounded-2xl rounded-br-sm shadow-sm"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="border-t border-gray-100 bg-white p-3">
              <p className="mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Ask a question</p>
              <div className="flex flex-col gap-2">
                {FAQ_DATA.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionClick(faq)}
                    className="text-left w-full rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-700 transition-colors hover:bg-gray-100 hover:border-gray-200"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
