export type ItemClassification = 'producto' | 'proceso';

export interface CatalogItem {
  id: string;
  name: string;
  category: ItemClassification;
  type: 'product' | 'service';
  quickNumber?: number;
  shortDesc: string;
  specs: string[];
  industrialCode: string;
}

export interface QuoteSession {
  product: string;
  rawProductName: string;
  itemCategory?: ItemClassification;
  clientName: string;
  company: string;
  project: string;
  email: string;
  country: string;
  completedAt?: string;
  quoteReferenceId?: string;
}

export type ChatStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  step: ChatStep;
  title?: string;
  body: string;
  followUp?: string;
  promptHint?: string;
  timestamp: string;
  quickOptions?: { label: string; value: string; num?: number }[];
}
