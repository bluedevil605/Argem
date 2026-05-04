import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-in slide-in-from-bottom-2 fade-in duration-300`}>
      <div className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg
          ${isBot ? 'bg-indigo-600 border border-indigo-400/30' : 'bg-slate-700 border border-slate-500/30'}
        `}>
          {isBot ? <Bot size={18} className="text-white" /> : <User size={18} className="text-slate-200" />}
        </div>

        {/* Message Bubble */}
        <div className={`relative px-5 py-3.5 text-[0.95rem] leading-relaxed shadow-lg
          ${isBot 
            ? 'bg-slate-800/90 border border-white/10 text-slate-100 rounded-2xl rounded-bl-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-md' 
            : 'bg-gradient-to-tr from-indigo-600 to-purple-600 border border-indigo-400/30 text-white rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(79,70,229,0.4)]'
          }
        `}>
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
