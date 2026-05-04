import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { BotMessageSquare } from 'lucide-react';

const API_KEY = "AIzaSyAON9V87c1Y4-rTvwkXqsLkc87espz-seY"; // Keep from original file
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

// System prompt to enforce specific election results
const SYSTEM_PROMPT = `You are ElectIQ, an AI Election Forecasting Bot. 
Your purpose is to provide the most accurate, data-driven election forecasts, analysis, and polling information based on your latest knowledge base.
When asked about any election, whether upcoming, ongoing, or past, provide your current predictions, analysis of the political landscape, and relevant opinion poll data. 
Be confident, objective, and analytical in your responses.`;

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am Argem. How can I assist you today?", sender: "bot" }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isGenerating]);

  const handleSendMessage = async (text) => {
    // 1. Add user message
    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      // 2. Call API
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [{ parts: [{ text }] }]
        }),
      });

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const botResponseText = data.candidates[0].content.parts[0].text;

        // 3. Add bot message
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: botResponseText,
          sender: "bot"
        }]);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot"
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 relative">

      {/* Decorative ambient background glow behind the panel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-tr from-indigo-500/30 to-fuchsia-500/30 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Main Glass Panel */}
      <div className="w-full max-w-4xl h-full max-h-[85vh] rounded-3xl flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20 bg-slate-900/60 backdrop-blur-xl z-10">

        {/* Header */}
        <div className="h-20 border-b border-white/10 flex items-center px-8 flex-shrink-0 bg-white/5 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <BotMessageSquare size={24} className="text-white drop-shadow-md" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">Argem</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
                </span>
                <span className="text-[0.65rem] text-emerald-400 font-bold tracking-wider uppercase">Systems Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 scrollbar-hide flex flex-col">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Typing Indicator */}
          {isGenerating && (
            <div className="flex justify-start mb-4 animate-in fade-in duration-300">
              <div className="flex gap-3 items-end">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)] border border-white/20">
                  <BotMessageSquare size={16} className="text-white" />
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center h-[46px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce shadow-[0_0_5px_rgba(165,180,252,0.8)]" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce shadow-[0_0_5px_rgba(165,180,252,0.8)]" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce shadow-[0_0_5px_rgba(165,180,252,0.8)]" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 sm:p-8 border-t border-white/10 bg-black/20 backdrop-blur-xl flex-shrink-0 relative overflow-hidden">
          {/* Subtle gradient overlay at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none"></div>
          <ChatInput onSendMessage={handleSendMessage} isGenerating={isGenerating} />
        </div>

      </div>
    </div>
  );
}

export default App;
