import 'server-only';
import es from '@/dictionaries/es.json';
import en from '@/dictionaries/en.json';

const dictionaries: Record<string, any> = {
  es,
  en,
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale] || dictionaries['es'];
};
