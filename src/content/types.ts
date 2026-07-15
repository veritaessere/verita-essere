export type Professional = {
  id: "lucas";
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
  image: string;
};

export type WhatsAppContext =
  | "hero"
  | "generic"
  | "lucas"
  | `specialty:${string}`;
