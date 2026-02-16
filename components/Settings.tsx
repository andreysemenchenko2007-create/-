
import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    lessons: false,
  });

  const [aiPreferences, setAiPreferences] = useState({
    autoSearch: true,
    saveTranscript: true,
    voiceAssistant: 'Zephyr',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Налаштування</h1>
        <p className="text-slate-500">Керуйте своїм профілем, сповіщеннями та параметрами AI.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Navigation Tabs - Mock */}
        <div className="space-y-1">
          {['Профіль', 'Безпека', 'Сповіщення', 'AI та Навчання', 'Оплата'].map((tab, i) => (
            <button
              key={tab}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                i === 0 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Ваш Профіль</h2>
            <div className="flex items-center gap-6 mb-8">
              <div className="relative group">
                <img src="https://picsum.photos/80/80" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-slate-50 shadow-sm" alt="Profile" />
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-indigo-600 shadow-sm hover:scale-110 transition-transform">
                  <i className="fas fa-camera text-xs"></i>
                </button>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Проф. Іванченко</h3>
                <p className="text-sm text-slate-500">ivanchenko.edu@example.com</p>
                <div className="flex gap-2 mt-2">
                   <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded border border-indigo-100">Викладач</span>
                   <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase rounded border border-emerald-100">Активний</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Повне ім'я</label>
                <input type="text" defaultValue="Проф. Іванченко" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase">Спеціалізація</label>
                <input type="text" defaultValue="Фізика та Математика" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
            </div>
          </section>

          {/* AI Settings Section */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Параметри AI Помічника</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Автоматичний пошук у Google</p>
                  <p className="text-xs text-slate-500">AI автоматично шукатиме факти для підтвердження відповідей</p>
                </div>
                <button 
                  onClick={() => setAiPreferences(p => ({...p, autoSearch: !p.autoSearch}))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${aiPreferences.autoSearch ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${aiPreferences.autoSearch ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-50">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Зберігати транскрипти уроків</p>
                  <p className="text-xs text-slate-500">Автоматично створювати текстовий запис кожного уроку</p>
                </div>
                <button 
                  onClick={() => setAiPreferences(p => ({...p, saveTranscript: !p.saveTranscript}))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${aiPreferences.saveTranscript ? 'bg-indigo-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${aiPreferences.saveTranscript ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-50">
                <label className="text-xs font-bold text-slate-400 uppercase">Голос асистента</label>
                <select 
                  value={aiPreferences.voiceAssistant}
                  onChange={(e) => setAiPreferences(p => ({...p, voiceAssistant: e.target.value}))}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="Zephyr">Zephyr (Дружелюбний)</option>
                  <option value="Kore">Kore (Формальний)</option>
                  <option value="Puck">Puck (Енергійний)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button className="px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-white transition-colors">Скасувати</button>
            <button className="px-8 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
              Зберегти зміни
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
