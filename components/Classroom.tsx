
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GroundingSource } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const Classroom: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCamOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Media error:", err));
    } else {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
    }
  }, [isCamOn]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsAiLoading(true);

    const { text, sources } = await getGeminiResponse(messages, inputValue);
    
    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: text,
      timestamp: new Date(),
      sources: sources
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsAiLoading(false);
  };

  return (
    <div className="flex h-full gap-4 overflow-hidden">
      {/* Video Area */}
      <div className="flex-1 flex flex-col bg-slate-900 rounded-2xl relative overflow-hidden">
        <div className="flex-1 relative group">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted={!isMicOn}
            className="w-full h-full object-cover rounded-t-2xl"
          />
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Наживо: Квантова Фізика
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2">
             <div className="w-10 h-10 bg-slate-800/80 rounded-lg flex items-center justify-center text-white">
                <i className="fas fa-users mr-1"></i> 12
             </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="h-20 bg-slate-800 flex items-center justify-center gap-6 px-6 shadow-2xl">
          <button 
            onClick={() => setIsMicOn(!isMicOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isMicOn ? 'bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
          >
            <i className={`fas ${isMicOn ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
          </button>
          <button 
            onClick={() => setIsCamOn(!isCamOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${isCamOn ? 'bg-slate-700 text-white' : 'bg-red-500 text-white'}`}
          >
            <i className={`fas ${isCamOn ? 'fa-video' : 'fa-video-slash'}`}></i>
          </button>
          <button className="w-12 h-12 rounded-full bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-all hover:scale-105 active:scale-95">
            <i className="fas fa-desktop"></i>
          </button>
          <div className="h-8 w-[1px] bg-slate-600 mx-2"></div>
          <button className="px-6 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
            <i className="fas fa-phone-slash"></i>
            Завершити
          </button>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <div className="w-96 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50">
          <div className="flex items-center gap-2 text-indigo-600 font-bold">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-white text-sm"></i>
            </div>
            <span>Google AI Tutor</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Online</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-2xl"></i>
              </div>
              <h3 className="font-semibold text-slate-800">Пошук у реальному часі</h3>
              <p className="text-sm text-slate-500 mt-2">Я можу шукати інформацію в Google, щоб допомогти тобі з уроком. Просто запитай!</p>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
              }`}>
                {msg.text}
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <i className="fas fa-globe"></i> Джерела з Google:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-indigo-600 text-[11px] px-2 py-1 rounded-md transition-all truncate max-w-full"
                          title={source.title}
                        >
                          <i className="fas fa-external-link-alt text-[10px]"></i>
                          <span className="truncate">{source.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isAiLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex gap-2 items-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
                </div>
                <span className="text-xs text-slate-400 italic">Шукаю в Google...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Запитайте щось у Google AI..."
                className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300">
                <i className="fas fa-search text-xs"></i>
              </div>
            </div>
            <button 
              onClick={handleSendMessage}
              disabled={isAiLoading || !inputValue.trim()}
              className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">
            AI може помилятися. Перевіряйте важливу інформацію.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
