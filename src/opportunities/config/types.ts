export interface IUserRequest extends Request {
  user: {
    id: string;
    email?: string;
  };
}

export enum VolunteerCategory {
  SOCIAL_ASSISTANCE = 'Social Assistance',
  ENVIRONMENTAL_ACTIVITIES = 'Environmental Activities',
  EDUCATION_MENTORING = 'Education and Mentoring',
  MEDICAL_SERVICES = 'Medical Services',
  SUPPORT_FOR_ELDERLY = 'Support for the Elderly',
  ANIMAL_WELFARE = 'Animal Welfare',
  CULTURAL_INITIATIVES = 'Cultural Initiatives',
  HUMANITARIAN_MISSIONS = 'Humanitarian Missions',
  SPORTS_INITIATIVES = 'Sports Initiatives',
  CRISIS_RESPONSE_VOLUNTEERING = 'Crisis Response Volunteering',
}
