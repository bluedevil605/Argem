import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSendMessage, isGenerating }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isGenerating) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-end w-full bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.2)] focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500/80 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 z-10"
    >
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your query to Argem..."
        className="w-full max-h-32 min-h-[44px] bg-transparent text-slate-100 placeholder-slate-400/80 border-none resize-none focus:outline-none focus:ring-0 py-3 px-4 scrollbar-hide text-[0.95rem]"
        rows={1}
        disabled={isGenerating}
      />
      
      <button
        type="submit"
        disabled={!input.trim() || isGenerating}
        className="absolute right-3 bottom-3 p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] disabled:shadow-none flex-shrink-0"
      >
        {isGenerating ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} className="ml-0.5" />
        )}
      </button>
    </form>
  );
};

export default ChatInput;
