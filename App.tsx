
import React, { useState } from 'react';
import { View, Lesson } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Classroom from './components/Classroom';
import Settings from './components/Settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleJoinLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentView(View.CLASSROOM);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onJoinLesson={handleJoinLesson} />;
      case View.CLASSROOM:
        return <Classroom />;
      case View.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard onJoinLesson={handleJoinLesson} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 antialiased overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 flex flex-col h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600" onClick={() => {/* Toggle Mobile Menu logic if needed */}}>
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:bg-white transition-all">
              <i className="fas fa-search text-slate-400 text-sm"></i>
              <input 
                type="text" 
                placeholder="Пошук уроків чи джерел..." 
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
              <i className="far fa-bell text-xl text-slate-500 group-hover:text-indigo-600"></i>
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white">2</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <button 
              onClick={() => setCurrentView(View.SETTINGS)}
              className="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors"
            >
              <img src="https://picsum.photos/32/32" className="rounded-full shadow-sm ring-1 ring-slate-100" alt="Profile" />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none">Проф. Іванченко</p>
                <p className="text-[10px] text-slate-400">Налаштування</p>
              </div>
              <i className="fas fa-chevron-down text-slate-400 text-[10px]"></i>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-50/30">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
