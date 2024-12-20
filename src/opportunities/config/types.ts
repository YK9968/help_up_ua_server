export interface IUserRequest extends Request {
  user: {
    id: string;
    email?: string;
  };
}

export enum VolunteerType {
  SOCIAL_ASSISTANCE = 'SOCIAL_ASSISTANCE',
  ENVIRONMENTAL_ACTIVITIES = 'ENVIRONMENTAL_ACTIVITIES',
  EDUCATION_MENTORING = 'EDUCATION_MENTORING',
  MEDICAL_SERVICES = 'MEDICAL_SERVICES',
  SUPPORT_FOR_ELDERLY = 'SUPPORT_FOR_ELDERLY',
  ANIMAL_WELFARE = 'ANIMAL_WELFARE',
  CULTURAL_INITIATIVES = 'CULTURAL_INITIATIVES',
  HUMANITARIAN_MISSIONS = 'HUMANITARIAN_MISSIONS',
  SPORTS_INITIATIVES = 'SPORTS_INITIATIVES',
  CRISIS_RESPONSE_VOLUNTEERING = 'CRISIS_RESPONSE_VOLUNTEERING',
}
