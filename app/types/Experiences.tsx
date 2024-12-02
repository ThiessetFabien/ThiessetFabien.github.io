export interface Experiences {
  developer: Developer[];
  projectCoordinator: ProjectCoordinator[];
  nurseAssistant: NurseAssistant[];
}

export interface Developer {
  title: string;
  company: string;
  date: string;
}

export interface ProjectCoordinator {
  title: string;
  company: string;
  date: string;
}

export interface NurseAssistant {
  title: string;
  company: string;
  date: string;
}
