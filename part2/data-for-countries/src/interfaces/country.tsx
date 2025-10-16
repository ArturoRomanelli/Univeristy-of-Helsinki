export interface Country {
  name: { common: string };
  capital: string[];
  population: number;
  area: number;
  languages: Record<string, string>;
  flags: { png: string };
}
