import {
  BaseEntity,
  GeoLocation,
  ContactInfo,
  SocialMedia,
  Schedule,
  MediaGallery,
  KarateLevel,
  AgeGroup,
  Belt,
  Achievement
} from './types';

/**
 * Instructor Model - Represents a karate instructor
 * Single Responsibility: Handle instructor data and behavior
 */
export interface Instructor extends BaseEntity {
  firstName: string;
  lastName: string;
  title: string; // Sensei, Maître, etc.
  belt: Belt;
  yearsOfExperience: number;
  specializations: string[];
  biography: string;
  photo: string;
  contactInfo: ContactInfo;
  achievements: Achievement[];
  certifications: Certification[];
}

/**
 * Club Model - Represents a karate club/dojo
 * Single Responsibility: Manage club information and operations
 */
export interface Club extends BaseEntity {
  name: string;
  description: string;
  location: GeoLocation;
  contactInfo: ContactInfo;
  socialMedia?: SocialMedia;
  instructor: Instructor;
  assistantInstructors: Instructor[];
  schedule: Schedule[];
  facilities: Facility[];
  membershipFees: MembershipFee[];
  gallery: MediaGallery;
  maxCapacity: number;
  currentMembers: number;
  foundedDate: Date;
  isHeadquarters: boolean;
  affiliationNumber: string;
}

/**
 * Facility Model - Represents club facilities
 */
export interface Facility {
  name: string;
  description: string;
  isAvailable: boolean;
  equipment: string[];
}

/**
 * MembershipFee Model - Represents different membership pricing
 */
export interface MembershipFee {
  category: AgeGroup;
  level: KarateLevel;
  monthlyFee: number;
  registrationFee: number;
  currency: string;
  includes: string[];
}

/**
 * Certification Model - Represents professional certifications
 */
export interface Certification {
  name: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date;
  certificateId: string;
  isValid: boolean;
}

/**
 * Club Service Interface - Following Dependency Inversion Principle
 */
export interface IClubService {
  findAll(): Promise<Club[]>;
  findById(id: string): Promise<Club | null>;
  findByRegion(region: string): Promise<Club[]>;
  findByInstructor(instructorId: string): Promise<Club[]>;
  create(club: Omit<Club, 'id' | 'createdAt' | 'updatedAt'>): Promise<Club>;
  update(id: string, club: Partial<Club>): Promise<Club>;
  delete(id: string): Promise<boolean>;
  searchByName(name: string): Promise<Club[]>;
  getAvailableSlots(clubId: string, date: Date): Promise<Schedule[]>;
}
