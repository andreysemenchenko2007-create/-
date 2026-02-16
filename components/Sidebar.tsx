
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Панель керування', icon: 'fa-chart-pie' },
    { id: View.CLASSROOM, label: 'Мій клас', icon: 'fa-video' },
    { id: View.SETTINGS, label: 'Налаштування', icon: 'fa-cog' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen hidden md:flex flex-col">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <i className="fas fa-graduation-cap text-white text-xl"></i>
        </div>
        <span className="text-xl font-bold text-slate-800 tracking-tight">EduStream</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <i className={`fas ${item.icon} text-lg w-6`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 flex items-center space-x-3">
          <img src="https://picsum.photos/40/40" className="rounded-full" alt="Avatar" />
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">Проф. Іванченко</p>
            <p className="text-xs text-slate-500">Викладач</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
