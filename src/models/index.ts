// Central export point for all models
// Following Dependency Inversion Principle - Export interfaces, not implementations

export * from './types';
export * from './Club';
export * from './Member';
export * from './Event';
export * from './Partner';

// Model aggregates for complex operations
export interface ACAWAData {
  clubs: import('./Club').Club[];
  members: import('./Member').Member[];
  champions: import('./Member').Champion[];
  events: import('./Event').Event[];
  partners: import('./Partner').Partner[];
}

// Form data interfaces for WhatsApp integration
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferredContactMethod: 'phone' | 'email' | 'whatsapp';
}

export interface ClubRegistrationFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  phone: string;
  email: string;
  address: string;
  city: string;
  clubPreference: string;
  experienceLevel: import('./types').KarateLevel;
  previousExperience: string;
  goals: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalConditions: string;
  agreeToTerms: boolean;
}

export interface PartnershipFormData {
  companyName: string;
  industry: string;
  contactPersonName: string;
  contactPersonTitle: string;
  email: string;
  phone: string;
  website: string;
  proposedContribution: import('./Partner').ContributionType;
  contributionValue: number;
  partnershipLevel: import('./Partner').PartnershipLevel;
  motivationLetter: string;
  previousSponsorships: string;
}

export interface EventRegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  clubAffiliation: string;
  currentBelt: import('./types').Belt;
  experienceYears: number;
  tshirtSize: string;
  dietaryRestrictions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  medicalInfo: string;
  agreeToTerms: boolean;
}

// API Response interfaces
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message: string;
  success: boolean;
}
