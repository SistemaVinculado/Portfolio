import * as ptBR from '../../assets/i18n/pt-BR.json';

// The 'default' property is often added during module interop.
// This handles both cases where it's present and where it's not.
const ptBRTranslations = (ptBR as any).default || ptBR;

export const TRANSLATIONS: { [key: string]: any } = {
  'pt-BR': ptBRTranslations
};
