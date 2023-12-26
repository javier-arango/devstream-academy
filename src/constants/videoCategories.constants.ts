export type CategoryKey =
  | 'all'
  | 'algorithms'
  | 'ai'
  | 'db'
  | 'cybersecurity'
  | 'datascience'
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'iot'
  | 'ml'
  | 'mobile'
  | 'os'
  | 'programming_languages'
  | 'uiux'
  | 'web_development'
  | 'software_engineering'
  | 'networking'
  | 'cloud_computing'
  | 'blockchain'
  | 'virtual_reality'

export interface Category extends Record<CategoryKey, string> {}

export const VIDEO_CATEGORIES: Category = {
  all: 'All',
  algorithms: 'Algorithms and Data Structures',
  ai: 'Artificial Intelligence',
  db: 'Database Management',
  cybersecurity: 'Cybersecurity',
  datascience: 'Data Science',
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  fullstack: 'Full Stack Development',
  iot: 'Internet of Things (IoT)',
  ml: 'Machine Learning',
  mobile: 'Mobile App Development',
  os: 'Operating Systems',
  programming_languages: 'Programming Languages',
  uiux: 'UI/UX Design',
  web_development: 'Web Development',
  software_engineering: 'Software Engineering Principles',
  networking: 'Computer Networking',
  cloud_computing: 'Cloud Computing',
  blockchain: 'Blockchain Technology',
  virtual_reality: 'Virtual and Augmented Reality',
}
