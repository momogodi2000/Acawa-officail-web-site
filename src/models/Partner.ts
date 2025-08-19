import {
  BaseEntity,
  PartnershipType,
  ContactInfo,
  GeoLocation,
  MediaGallery
} from './types';

/**
 * Partner Model - Represents business and organizational partners
 * Single Responsibility: Manage partnership relationships and benefits
 */
export interface Partner extends BaseEntity {
  name: string;
  description: string;
  type: PartnershipType;
  logo: string;
  website?: string;
  contactInfo: ContactInfo;
  location?: GeoLocation;
  partnershipLevel: PartnershipLevel;
  partnershipStartDate: Date;
  partnershipEndDate?: Date;
  benefits: PartnerBenefit[];
  contributions: PartnerContribution[];
  contractDetails: ContractDetails;
  gallery: MediaGallery;
  testimonial?: Testimonial;
  isActive: boolean;
  publiclyVisible: boolean;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

/**
 * Partnership Level Enum
 */
export enum PartnershipLevel {
  BRONZE = 'Bronze',
  SILVER = 'Argent',
  GOLD = 'Or',
  PLATINUM = 'Platine',
  DIAMOND = 'Diamant',
  TITLE_SPONSOR = 'Sponsor Titre'
}

/**
 * Partner Benefit Interface - What partners receive
 */
export interface PartnerBenefit {
  id: string;
  name: string;
  description: string;
  value?: number; // Estimated value in FCFA
  type: BenefitType;
  duration?: number; // in months
  isActive: boolean;
}

export enum BenefitType {
  LOGO_PLACEMENT = 'Placement Logo',
  WEBSITE_MENTION = 'Mention Site Web',
  SOCIAL_MEDIA = 'Réseaux Sociaux',
  EVENT_PARTICIPATION = 'Participation Événement',
  NAMING_RIGHTS = 'Droits de Dénomination',
  PRODUCT_PLACEMENT = 'Placement Produit',
  HOSPITALITY = 'Hospitalité',
  MERCHANDISE = 'Marchandises',
  TRAINING_ACCESS = 'Accès Formation'
}

/**
 * Partner Contribution Interface - What partners provide
 */
export interface PartnerContribution {
  id: string;
  type: ContributionType;
  description: string;
  value: number; // in FCFA
  frequency: 'One-time' | 'Monthly' | 'Quarterly' | 'Yearly';
  deliveryDate?: Date;
  isReceived: boolean;
  notes?: string;
}

export enum ContributionType {
  FINANCIAL = 'Financier',
  EQUIPMENT = 'Équipement',
  VENUE = 'Lieu',
  SERVICES = 'Services',
  PRODUCTS = 'Produits',
  MARKETING = 'Marketing',
  EXPERTISE = 'Expertise',
  TRANSPORTATION = 'Transport'
}

/**
 * Contract Details Interface
 */
export interface ContractDetails {
  contractNumber: string;
  signedDate: Date;
  startDate: Date;
  endDate?: Date;
  renewalTerms?: string;
  paymentTerms: string;
  deliverables: string[];
  cancellationPolicy: string;
  contactPerson: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  legalEntity: string;
  registrationNumber?: string;
  taxId?: string;
}

/**
 * Testimonial Interface
 */
export interface Testimonial {
  quote: string;
  author: string;
  authorTitle: string;
  authorPhoto?: string;
  date: Date;
  rating?: number; // 1-5 stars
  isPublic: boolean;
}

/**
 * Partnership Opportunity Interface - For potential partners
 */
export interface PartnershipOpportunity extends BaseEntity {
  title: string;
  description: string;
  type: PartnershipType;
  level: PartnershipLevel;
  requiredContribution: {
    minValue: number;
    maxValue?: number;
    currency: string;
    types: ContributionType[];
  };
  offeredBenefits: PartnerBenefit[];
  duration: number; // in months
  isActive: boolean;
  deadline?: Date;
  contactPerson: string;
  requirements: string[];
  applicationProcess: string[];
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

/**
 * Partner Application Interface
 */
export interface PartnerApplication extends BaseEntity {
  opportunityId: string;
  applicantName: string;
  applicantOrganization: string;
  contactInfo: ContactInfo;
  proposedContribution: PartnerContribution[];
  businessProposal: string;
  companyProfile: {
    industry: string;
    yearsInBusiness: number;
    numberOfEmployees: number;
    annualRevenue?: number;
    website?: string;
    references: string[];
  };
  motivationLetter: string;
  attachments: string[]; // File URLs
  status: ApplicationStatus;
  submissionDate: Date;
  reviewNotes?: string;
  decisionDate?: Date;
}

export enum ApplicationStatus {
  SUBMITTED = 'Soumise',
  UNDER_REVIEW = 'En Révision',
  APPROVED = 'Approuvée',
  REJECTED = 'Rejetée',
  PENDING_DOCUMENTS = 'Documents Manquants',
  NEGOTIATION = 'Négociation',
  CONTRACTED = 'Contractée'
}

/**
 * Partner Service Interface - Following Interface Segregation Principle
 */
export interface IPartnerService {
  findAll(): Promise<Partner[]>;
  findById(id: string): Promise<Partner | null>;
  findByType(type: PartnershipType): Promise<Partner[]>;
  findByLevel(level: PartnershipLevel): Promise<Partner[]>;
  findActive(): Promise<Partner[]>;
  create(partner: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>): Promise<Partner>;
  update(id: string, partner: Partial<Partner>): Promise<Partner>;
  delete(id: string): Promise<boolean>;
  renewPartnership(partnerId: string, newEndDate: Date): Promise<boolean>;
  suspendPartnership(partnerId: string, reason: string): Promise<boolean>;
  activatePartnership(partnerId: string): Promise<boolean>;
}

/**
 * Partnership Opportunity Service Interface
 */
export interface IPartnershipOpportunityService {
  findAll(): Promise<PartnershipOpportunity[]>;
  findById(id: string): Promise<PartnershipOpportunity | null>;
  findActive(): Promise<PartnershipOpportunity[]>;
  findByType(type: PartnershipType): Promise<PartnershipOpportunity[]>;
  create(opportunity: Omit<PartnershipOpportunity, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartnershipOpportunity>;
  update(id: string, opportunity: Partial<PartnershipOpportunity>): Promise<PartnershipOpportunity>;
  delete(id: string): Promise<boolean>;
  submitApplication(application: Omit<PartnerApplication, 'id' | 'createdAt' | 'updatedAt'>): Promise<PartnerApplication>;
  reviewApplication(applicationId: string, decision: ApplicationStatus, notes?: string): Promise<boolean>;
}
