// components/AIChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import { BsRobot } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import MarkdownRenderer from "./MarkdownRenderer";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your finance assistant powered by Gemini AI. How can I help you manage your finances today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [inputMessage]);

  const callAIAPI = async (userMessage) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.CHAT,
        {
          message: userMessage,
        },
        {
          timeout: 60000, // 60 seconds timeout for AI endpoint
        }
      );

      return (
        response.data.response ||
        "Maaf, saya tidak bisa memproses permintaan tersebut."
      );
    } catch (error) {
      console.error("AI API Error:", error);

      // Specific error messages
      if (error.code === "ECONNABORTED") {
        return "Maaf, permintaan memakan waktu terlalu lama. Silakan coba lagi dengan pertanyaan yang lebih singkat.";
      } else if (error.response?.status === 500) {
        return "Terjadi kesalahan di server. Mohon coba beberapa saat lagi.";
      } else if (error.response?.status === 401) {
        return "Sesi Anda telah berakhir. Silakan login kembali.";
      } else if (!navigator.onLine) {
        return "Tidak ada koneksi internet. Periksa koneksi Anda dan coba lagi.";
      }

      return "Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessageText = inputMessage.trim();

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: userMessageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call AI API through backend
      const botResponseText = await callAIAPI(userMessageText);

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Message send error:", error);

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group sm:p-4 md:p-4"
          aria-label="Open AI Chatbot"
        >
          <BsRobot className="text-2xl group-hover:animate-pulse" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[600px] sm:rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 sm:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <BsRobot className="text-2xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Finance AI Assistant</h3>
                <p className="text-xs text-emerald-100">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Close Chatbot"
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-emerald-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow-md"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <MarkdownRenderer text={message.text} />
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  )}
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-emerald-100"
                        : "text-gray-400"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none shadow-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      Analyzing your finances...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 sm:rounded-b-2xl">
            <div className="flex gap-2">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about your finances"
                disabled={isTyping}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 resize-none transition-all scrollbar-hide disabled:bg-gray-100 disabled:cursor-not-allowed"
                rows="1"
                style={{
                  minHeight: "44px",
                  maxHeight: "120px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  overflow: "auto",
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-emerald-500 text-white rounded-xl px-4 py-3 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[44px]"
                aria-label="Send Message"
              >
                {isTyping ? (
                  <BiLoaderAlt className="text-xl animate-spin" />
                ) : (
                  <IoSend className="text-xl" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {isTyping
                ? "Please wait while I analyze your data..."
                : "Press Enter to send, Shift + Enter for new line"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
