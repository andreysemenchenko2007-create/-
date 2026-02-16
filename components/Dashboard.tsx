import React from 'react';
import { MOCK_LESSONS } from '../constants';
import { Lesson } from '../types';

interface DashboardProps {
  onJoinLesson: (lesson: Lesson) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onJoinLesson }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Вітаємо в системі ліцею!</h1>
        <p className="text-slate-500">Швидкий доступ до розкладу та показників успішності.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Усього учнів', value: '428', icon: 'fa-users', color: 'bg-blue-50 text-blue-600' },
          { label: 'Класів', value: '16', icon: 'fa-school', color: 'bg-purple-50 text-purple-600' },
          { label: 'Середня відвідуваність', value: '92%', icon: 'fa-user-check', color: 'bg-amber-50 text-amber-600' },
          { label: 'Середній бал', value: '9.3', icon: 'fa-star', color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Розклад уроків</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {MOCK_LESSONS.map((lesson) => (
            <div key={lesson.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-semibold text-slate-800">{lesson.title}</p>
                <p className="text-sm text-slate-500">{lesson.subject} • {lesson.time} • {lesson.instructor}</p>
              </div>
              <button
                onClick={() => onJoinLesson(lesson)}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Відкрити
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
