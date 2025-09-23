export interface ServiceOffering {
  name: string;
  description: string;
  price: string;
  details?: string;
  quotePrompt: string;
  isHighlighted?: boolean;
  badge?: string;
  benefits?: string[];
  techStack?: string[];
  scope?: string[];
}
