import { TranslationDictionary } from '../types';
import { enDictionary } from './en';

export const enGBDictionary: TranslationDictionary = {
  ...enDictionary,
  'term.resume': 'Curriculum Vitae (CV)',
  'term.coverLetter': 'Covering Letter',
  'term.entryLevel': 'Graduate / Junior Role',
  'term.internship': 'Internship / Placement Year',
  'term.compensation': 'Annual Salary (£ / yr)',
  'term.collegeOrUniversity': 'University / College',
  'term.degree': 'Degree / Course (e.g. BSc Hons)',
  'term.graduationYear': 'Graduation Cohort',
  'nav.resume': 'CV & Portfolio',
  'header.cloudSynced': 'Firestore Ready (Europe-West)',
};
