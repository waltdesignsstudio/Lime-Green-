export interface Milestone {
  year: number;
  title: string;
  subtitle: string;
  description: string;
  emotion: string;
  highlightTag: string;
  archivedRuleRef?: number;
}

export interface RuleItem {
  id: number;
  category: "public" | "authorised" | "private";
  title: string;
  text: string;
  yearAdded: number;
  status: string;
}

export interface CharacterItem {
  id: number;
  code: string;
  name: string;
  title: string;
  nature: string;
  status: "Founded" | "Lost in Echoes" | "Wandering" | "Active Guardian";
  affinity: number;
  symbol: string;
  notes: string;
}

export interface UserProfile {
  name: string;
  status: "General" | "Authorised" | "Candidate" | "Observer";
  nature: string;
  timeScore: number;
  trustScore: number;
  loyaltyScore: number;
  notes: string;
}
