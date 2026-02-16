import React, { useMemo, useState } from 'react';
import { MOCK_JOURNAL } from '../constants';

const Journal: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Усі класи');

  const classes = useMemo(
    () => ['Усі класи', ...Array.from(new Set(MOCK_JOURNAL.map((s) => s.className)))],
    []
  );

  const filtered = useMemo(
    () =>
      selectedClass === 'Усі класи'
        ? MOCK_JOURNAL
        : MOCK_JOURNAL.filter((student) => student.className === selectedClass),
    [selectedClass]
  );

  const avgAttendance = Math.round(
    filtered.reduce((acc, student) => acc + student.attendance, 0) / (filtered.length || 1)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Електронний журнал ліцею</h1>
          <p className="text-slate-500">Оцінки, відвідування та нотатки по кожному учню.</p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="class-filter" className="text-sm text-slate-500 font-medium">Клас</label>
          <select
            id="class-filter"
            value={selectedClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
          >
            {classes.map((className) => (
              <option key={className} value={className}>{className}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <p className="text-xs uppercase text-slate-400 font-semibold">Учнів у вибірці</p>
          <p className="text-2xl font-bold text-slate-800">{filtered.length}</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <p className="text-xs uppercase text-slate-400 font-semibold">Середня відвідуваність</p>
          <p className="text-2xl font-bold text-slate-800">{avgAttendance}%</p>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <p className="text-xs uppercase text-slate-400 font-semibold">Учнів із ризиком</p>
          <p className="text-2xl font-bold text-rose-600">{filtered.filter((s) => s.averageGrade < 8 || s.attendance < 85).length}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Учень</th>
                <th className="px-4 py-3">Клас</th>
                <th className="px-4 py-3">Відвідуваність</th>
                <th className="px-4 py-3">Середній бал</th>
                <th className="px-4 py-3">Останні оцінки</th>
                <th className="px-4 py-3">Нотатки вчителя</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-700">{student.fullName}</td>
                  <td className="px-4 py-3 text-slate-600">{student.className}</td>
                  <td className="px-4 py-3 text-slate-600">{student.attendance}%</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${student.averageGrade >= 10 ? 'bg-emerald-50 text-emerald-700' : student.averageGrade >= 8 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                      {student.averageGrade.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{student.latestGrades.join(', ')}</td>
                  <td className="px-4 py-3 text-slate-500 text-sm">{student.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Journal;
