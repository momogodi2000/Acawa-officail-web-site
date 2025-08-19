import {
  BaseEntity,
  ContactInfo,
  GeoLocation,
  Belt,
  KarateLevel,
  Achievement,
  MediaGallery
} from './types';

/**
 * Member Model - Represents a karate club member
 * Single Responsibility: Handle member data and progression
 */
export interface Member extends BaseEntity {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'M' | 'F';
  belt: Belt;
  level: KarateLevel;
  membershipNumber: string;
  joinDate: Date;
  clubId: string;
  contactInfo: ContactInfo;
  emergencyContact: EmergencyContact;
  medicalInfo?: MedicalInfo;
  parentGuardian?: ParentGuardian; // For minors
  achievements: Achievement[];
  gradings: Grading[];
  attendance: AttendanceRecord[];
  photo?: string;
  isActive: boolean;
  membershipStatus: MembershipStatus;
  notes?: string;
}

/**
 * Champion Model - Represents successful karateka at competitions
 * Single Responsibility: Showcase competition achievements
 */
export interface Champion extends BaseEntity {
  firstName: string;
  lastName: string;
  photo: string;
  currentBelt: Belt;
  clubId: string;
  clubName: string;
  specialization: string[];
  biography: string;
  achievements: CompetitionAchievement[];
  gallery: MediaGallery;
  internationalRanking?: number;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  isCurrentlyCompeting: boolean;
  retirementDate?: Date;
  coachingExperience?: string;
  testimonial?: string;
}

/**
 * Supporting interfaces
 */
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
}

export interface MedicalInfo {
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  doctorContact?: ContactInfo;
  lastMedicalCheckup?: Date;
}

export interface ParentGuardian {
  firstName: string;
  lastName: string;
  relationship: string;
  contactInfo: ContactInfo;
  workLocation?: GeoLocation;
}

export interface Grading {
  id: string;
  date: Date;
  fromBelt: Belt;
  toBelt: Belt;
  examiner: string;
  score: number;
  passed: boolean;
  notes?: string;
  certificateIssued: boolean;
}

export interface AttendanceRecord {
  date: Date;
  present: boolean;
  sessionType: 'Training' | 'Competition' | 'Seminar' | 'Grading';
  duration: number; // minutes
  notes?: string;
}

export interface CompetitionAchievement {
  competitionName: string;
  date: Date;
  location: GeoLocation;
  category: string;
  position: number; // 1 = Gold, 2 = Silver, 3 = Bronze
  level: string; // Regional, National, International, etc.
  organization: string;
  medal?: string;
  video?: string;
  photos: string[];
}

export enum MembershipStatus {
  ACTIVE = 'Actif',
  SUSPENDED = 'Suspendu',
  EXPIRED = 'Expiré',
  PENDING = 'En Attente',
  CANCELLED = 'Annulé'
}

/**
 * Member Service Interface - Following Interface Segregation Principle
 */
export interface IMemberService {
  findAll(): Promise<Member[]>;
  findById(id: string): Promise<Member | null>;
  findByClub(clubId: string): Promise<Member[]>;
  findByBelt(belt: Belt): Promise<Member[]>;
  create(member: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member>;
  update(id: string, member: Partial<Member>): Promise<Member>;
  delete(id: string): Promise<boolean>;
  recordAttendance(memberId: string, attendance: AttendanceRecord): Promise<boolean>;
  processGrading(memberId: string, grading: Grading): Promise<boolean>;
}

/**
 * Champion Service Interface
 */
export interface IChampionService {
  findAll(): Promise<Champion[]>;
  findById(id: string): Promise<Champion | null>;
  findByClub(clubId: string): Promise<Champion[]>;
  findActiveChampions(): Promise<Champion[]>;
  findRetiredChampions(): Promise<Champion[]>;
  create(champion: Omit<Champion, 'id' | 'createdAt' | 'updatedAt'>): Promise<Champion>;
  update(id: string, champion: Partial<Champion>): Promise<Champion>;
  delete(id: string): Promise<boolean>;
}
