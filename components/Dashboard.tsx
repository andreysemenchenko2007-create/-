
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
        <h1 className="text-2xl font-bold text-slate-800">Вітаємо назад, пане Іванченко!</h1>
        <p className="text-slate-500">У вас 2 уроки сьогодні та 1 активний зараз.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Учнів онлайн', value: '42', icon: 'fa-users', color: 'bg-blue-50 text-blue-600' },
          { label: 'Курсів', value: '8', icon: 'fa-book', color: 'bg-purple-50 text-purple-600' },
          { label: 'Годин викладання', value: '124', icon: 'fa-clock', color: 'bg-amber-50 text-amber-600' },
          { label: 'AI Підказок', value: '1.2k', icon: 'fa-robot', color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
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

      {/* Lessons List */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Розклад уроків</h2>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">Дивитись всі</button>
        </div>
        <div className="divide-y divide-slate-50">
          {MOCK_LESSONS.map((lesson) => (
            <div key={lesson.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-12 rounded-full ${
                  lesson.status === 'live' ? 'bg-red-500 animate-pulse' : 
                  lesson.status === 'upcoming' ? 'bg-indigo-400' : 'bg-slate-300'
                }`}></div>
                <div>
                  <h3 className="font-semibold text-slate-800">{lesson.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                    <span><i className="far fa-clock mr-1"></i> {lesson.time}</span>
                    <span><i className="fas fa-graduation-cap mr-1"></i> {lesson.subject}</span>
                    <span className="flex items-center gap-1">
                      <img src="https://picsum.photos/20/20" className="rounded-full" alt="Inst" />
                      {lesson.instructor}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {lesson.status === 'live' ? (
                  <button 
                    onClick={() => onJoinLesson(lesson)}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold text-sm hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200"
                  >
                    Приєднатися
                  </button>
                ) : (
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    lesson.status === 'upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {lesson.status === 'upcoming' ? 'Очікується' : 'Завершено'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
