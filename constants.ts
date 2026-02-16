
import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  { id: '1', title: 'Основи Quantum Physics', subject: 'Фізика', time: '10:00 - 11:30', instructor: 'Д-р Олексій Тарасов', status: 'live' },
  { id: '2', title: 'Українська література: Модернізм', subject: 'Література', time: '13:00 - 14:00', instructor: 'Марія Коваль', status: 'upcoming' },
  { id: '3', title: 'Advanced React Hooks', subject: 'Програмування', time: '15:30 - 17:00', instructor: 'Сергій Петренко', status: 'upcoming' },
  { id: '4', title: 'History of Renaissance', subject: 'Історія', time: 'Вчора', instructor: 'Анна Сидоренко', status: 'completed' },
];

export const SYSTEM_PROMPT = `
Ти — висококваліфікований онлайн-репетитор. Твоє завдання — допомагати студентам під час уроку.
Відповідай українською мовою. Будь ввічливим, чітким та стимулюй критичне мислення.
Якщо студент запитує про тему уроку, надавай короткі та змістовні пояснення.
`;
