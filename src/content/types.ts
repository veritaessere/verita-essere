export type Professional = {
  id: "lucas" | "tamara";
  name: string;
  firstName: string;
  crp: string;
  shortBio: string;
  fullBio: string;
  areas: string[];
  photo?: string;
};

export type Specialty = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon:
    | "Brain"
    | "CloudDrizzle"
    | "Puzzle"
    | "Baby"
    | "Users"
    | "Activity"
    | "Heart"
    | "MessagesSquare"
    | "Sprout";
};

export type WhatsAppContext =
  | "hero"
  | "generic"
  | "lucas"
  | "tamara"
  | `specialty:${string}`;
