import { Lesson, StudentJournalRecord } from './types';

export const MOCK_LESSONS: Lesson[] = [
  { id: '1', title: 'Алгебра: квадратні рівняння', subject: 'Математика', time: '08:30 - 09:15', instructor: 'Олена Ковтун', status: 'live' },
  { id: '2', title: 'Історія України: Козацька доба', subject: 'Історія', time: '09:25 - 10:10', instructor: 'Максим Дяченко', status: 'upcoming' },
  { id: '3', title: 'Українська мова: Складне речення', subject: 'Українська мова', time: '10:20 - 11:05', instructor: 'Ірина Вербова', status: 'upcoming' },
  { id: '4', title: 'Біологія: Клітина і її органели', subject: 'Біологія', time: 'Вчора', instructor: 'Наталія Сергієнко', status: 'completed' },
];

export const MOCK_JOURNAL: StudentJournalRecord[] = [
  { id: 's-101', fullName: 'Артем Шевченко', className: '10-А', attendance: 96, averageGrade: 10.3, latestGrades: [11, 10, 10, 11], notes: 'Висока активність на уроках.' },
  { id: 's-102', fullName: 'Марія Бондар', className: '10-А', attendance: 89, averageGrade: 9.4, latestGrades: [9, 10, 9, 10], notes: 'Потребує більше практики з алгебри.' },
  { id: 's-103', fullName: 'Владислав Гуменюк', className: '10-Б', attendance: 92, averageGrade: 8.8, latestGrades: [8, 9, 9, 9], notes: 'Стабільний прогрес протягом семестру.' },
  { id: 's-104', fullName: 'Софія Лисенко', className: '10-Б', attendance: 98, averageGrade: 11.1, latestGrades: [11, 12, 11, 10], notes: 'Лідер групових проєктів.' },
  { id: 's-105', fullName: 'Данило Петренко', className: '11-А', attendance: 84, averageGrade: 7.9, latestGrades: [8, 7, 8, 9], notes: 'Потрібен індивідуальний план підтримки.' },
];

export const SYSTEM_PROMPT = `
Ти — асистент електронного журналу ліцею.
Відповідай українською мовою, стисло й професійно.
Допомагай вчителям аналізувати успішність, відвідування та планувати підтримку учнів.
`;
