import {
  BaseEntity,
  EventType,
  GeoLocation,
  ContactInfo,
  MediaGallery,
  KarateLevel,
  AgeGroup
} from './types';

/**
 * Event Model - Represents training sessions, seminars, competitions
 * Single Responsibility: Manage event information and registration
 */
export interface Event extends BaseEntity {
  title: string;
  description: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  location: GeoLocation;
  organizer: EventOrganizer;
  instructors: string[]; // Instructor IDs
  targetAudience: {
    levels: KarateLevel[];
    ageGroups: AgeGroup[];
    minExperience?: number; // in years
  };
  capacity: number;
  currentRegistrations: number;
  registrationDeadline: Date;
  fees: EventFee[];
  requirements: string[];
  benefits: string[];
  schedule: EventSession[];
  gallery: MediaGallery;
  materials: EventMaterial[];
  certificates: boolean;
  isPublic: boolean;
  registrationOpen: boolean;
  waitingList: string[]; // Member IDs
  tags: string[];
}

/**
 * Training Model - Specific type of event for regular training
 */
export interface Training extends Event {
  type: EventType.TRAINING;
  recurring: {
    isRecurring: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly';
    daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
    endRecurrence?: Date;
  };
  clubId: string;
  level: KarateLevel;
  ageGroup: AgeGroup;
}

/**
 * Seminar Model - Specific type of event for seminars and workshops
 */
export interface Seminar extends Event {
  type: EventType.SEMINAR | EventType.WORKSHOP;
  masterInstructor: {
    name: string;
    title: string;
    biography: string;
    photo: string;
    achievements: string[];
  };
  specialization: string[];
  language: string[];
  accreditation?: {
    organization: string;
    certificateType: string;
    validityPeriod: number; // in months
  };
}

/**
 * Competition Model - Specific type of event for competitions
 */
export interface Competition extends Event {
  type: EventType.COMPETITION;
  competitionLevel: 'Regional' | 'National' | 'International';
  categories: CompetitionCategory[];
  rules: string[];
  judges: Judge[];
  prizes: Prize[];
  registrationFee: number;
  weightCategories: WeightCategory[];
  ageCategories: AgeCategory[];
}

/**
 * Supporting interfaces
 */
export interface EventOrganizer {
  name: string;
  organization: string;
  contactInfo: ContactInfo;
  logo?: string;
}

export interface EventFee {
  category: string; // 'Early Bird', 'Regular', 'Student', etc.
  amount: number;
  currency: string;
  validUntil?: Date;
  includes: string[];
}

export interface EventSession {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  instructor: string;
  location: string;
  capacity?: number;
}

export interface EventMaterial {
  name: string;
  description: string;
  type: 'Required' | 'Recommended' | 'Provided';
  supplier?: string;
  estimatedCost?: number;
}

export interface CompetitionCategory {
  name: string;
  description: string;
  rules: string[];
  minAge: number;
  maxAge: number;
  belt: string[];
  gender: 'M' | 'F' | 'Mixed';
}

export interface Judge {
  name: string;
  qualification: string;
  experience: number;
  photo?: string;
}

export interface Prize {
  position: number;
  description: string;
  value?: number;
  sponsor?: string;
}

export interface WeightCategory {
  name: string;
  minWeight: number;
  maxWeight: number;
  unit: 'kg' | 'lbs';
}

export interface AgeCategory {
  name: string;
  minAge: number;
  maxAge: number;
}

/**
 * Event Registration Model
 */
export interface EventRegistration extends BaseEntity {
  eventId: string;
  memberId: string;
  registrationDate: Date;
  status: RegistrationStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  medicalInfo?: string;
  tshirtSize?: string;
  dietaryRestrictions?: string[];
}

export enum RegistrationStatus {
  PENDING = 'En Attente',
  CONFIRMED = 'Confirmé',
  CANCELLED = 'Annulé',
  WAITLISTED = 'Liste d\'Attente',
  ATTENDED = 'Participé',
  NO_SHOW = 'Absent'
}

export enum PaymentStatus {
  PENDING = 'En Attente',
  PAID = 'Payé',
  PARTIALLY_PAID = 'Partiellement Payé',
  REFUNDED = 'Remboursé',
  CANCELLED = 'Annulé'
}

/**
 * Event Service Interface - Following Single Responsibility Principle
 */
export interface IEventService {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  findByType(type: EventType): Promise<Event[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<Event[]>;
  findByLocation(location: string): Promise<Event[]>;
  findUpcoming(): Promise<Event[]>;
  create(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event>;
  update(id: string, event: Partial<Event>): Promise<Event>;
  delete(id: string): Promise<boolean>;
  registerMember(eventId: string, memberId: string, registration: Omit<EventRegistration, 'id' | 'eventId' | 'memberId' | 'createdAt' | 'updatedAt'>): Promise<EventRegistration>;
  cancelRegistration(registrationId: string): Promise<boolean>;
  getAvailableSpots(eventId: string): Promise<number>;
}

/**
 * Training Service Interface
 */
export interface ITrainingService extends IEventService {
  findByClub(clubId: string): Promise<Training[]>;
  findByLevel(level: KarateLevel): Promise<Training[]>;
  createRecurringSessions(training: Training): Promise<Training[]>;
}

/**
 * Seminar Service Interface
 */
export interface ISeminarService extends IEventService {
  findByInstructor(instructorName: string): Promise<Seminar[]>;
  findBySpecialization(specialization: string): Promise<Seminar[]>;
}

/**
 * Competition Service Interface
 */
export interface ICompetitionService extends IEventService {
  findByLevel(level: string): Promise<Competition[]>;
  getCompetitionResults(competitionId: string): Promise<CompetitionResult[]>;
  submitResults(competitionId: string, results: CompetitionResult[]): Promise<boolean>;
}

export interface CompetitionResult {
  participantId: string;
  category: string;
  position: number;
  score?: number;
  notes?: string;
}
