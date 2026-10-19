import { LocaleCode, TranslationDictionary } from '../types';
import { enDictionary } from './en';
import { enGBDictionary } from './en-GB';
import { enINDictionary } from './en-IN';
import { esDictionary } from './es';
import { frDictionary } from './fr';
import { deDictionary } from './de';
import { ptDictionary } from './pt';
import { jaDictionary } from './ja';
import { zhDictionary } from './zh';

export const DICTIONARIES: Record<LocaleCode, TranslationDictionary> = {
  'en-US': enDictionary,
  'en-GB': enGBDictionary,
  'en-IN': enINDictionary,
  'es-ES': esDictionary,
  'fr-FR': frDictionary,
  'de-DE': deDictionary,
  'pt-BR': ptDictionary,
  'ja-JP': jaDictionary,
  'zh-CN': zhDictionary,
};

export function getDictionary(locale: LocaleCode): TranslationDictionary {
  return DICTIONARIES[locale] || enDictionary;
}
