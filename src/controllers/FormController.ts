import { FormType, ContactFormData, ClubRegistrationFormData, PartnershipFormData, EventRegistrationFormData } from '@/models';
import { WhatsAppService, whatsAppService } from '@/services/WhatsAppService';

/**
 * Form Controller - Handles all form submissions and WhatsApp integration
 * Single Responsibility: Process form data and coordinate with WhatsApp service
 * Open/Closed: Easily extensible for new form types
 */
export class FormController {
  constructor(private whatsAppService: WhatsAppService) {}

  /**
   * Handle contact form submission
   */
  async submitContactForm(data: ContactFormData): Promise<{
    success: boolean;
    message: string;
    whatsappSent: boolean;
  }> {
    try {
      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        throw new Error('Veuillez remplir tous les champs obligatoires');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Format d\'email invalide');
      }

      // Send via WhatsApp
      this.whatsAppService.sendMessage(FormType.CONTACT, data);

      return {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt !',
        whatsappSent: true
      };

    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'envoi du message',
        whatsappSent: false
      };
    }
  }

  /**
   * Handle club registration form submission
   */
  async submitClubRegistration(data: ClubRegistrationFormData): Promise<{
    success: boolean;
    message: string;
    registrationId?: string;
    whatsappSent: boolean;
  }> {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'phone', 'email', 'clubPreference'];
      const missingFields = requiredFields.filter(field => !data[field as keyof ClubRegistrationFormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
      }

      // Validate age (must be at least 6 years old)
      const birthDate = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 6) {
        throw new Error('L\'âge minimum requis est de 6 ans');
      }

      // Validate terms acceptance
      if (!data.agreeToTerms) {
        throw new Error('Vous devez accepter les conditions générales');
      }

      // Generate registration ID
      const registrationId = `REG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Send via WhatsApp
      this.whatsAppService.sendMessage(FormType.CLUB_REGISTRATION, {
        ...data,
        registrationId
      });

      return {
        success: true,
        message: `Inscription soumise avec succès ! Votre numéro de référence est: ${registrationId}`,
        registrationId,
        whatsappSent: true
      };

    } catch (error) {
      console.error('Error submitting club registration:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'inscription',
        whatsappSent: false
      };
    }
  }

  /**
   * Handle partnership form submission
   */
  async submitPartnershipForm(data: PartnershipFormData): Promise<{
    success: boolean;
    message: string;
    applicationId?: string;
    whatsappSent: boolean;
  }> {
    try {
      // Validate required fields
      const requiredFields = ['companyName', 'contactPersonName', 'email', 'phone', 'proposedContribution'];
      const missingFields = requiredFields.filter(field => !data[field as keyof PartnershipFormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Informations manquantes: ${missingFields.join(', ')}`);
      }

      // Validate contribution value
      if (data.contributionValue <= 0) {
        throw new Error('La valeur de contribution doit être supérieure à 0');
      }

      // Generate application ID
      const applicationId = `PART-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Send via WhatsApp
      this.whatsAppService.sendMessage(FormType.PARTNERSHIP, {
        ...data,
        applicationId
      });

      return {
        success: true,
        message: `Demande de partenariat soumise ! Votre numéro de référence est: ${applicationId}`,
        applicationId,
        whatsappSent: true
      };

    } catch (error) {
      console.error('Error submitting partnership form:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de la soumission',
        whatsappSent: false
      };
    }
  }

  /**
   * Handle event registration form submission
   */
  async submitEventRegistration(eventId: string, data: EventRegistrationFormData): Promise<{
    success: boolean;
    message: string;
    registrationId?: string;
    whatsappSent: boolean;
  }> {
    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'currentBelt'];
      const missingFields = requiredFields.filter(field => !data[field as keyof EventRegistrationFormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Champs requis: ${missingFields.join(', ')}`);
      }

      // Validate terms acceptance
      if (!data.agreeToTerms) {
        throw new Error('Vous devez accepter les conditions de participation');
      }

      // Generate registration ID
      const registrationId = `EVT-${eventId}-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Send via WhatsApp
      this.whatsAppService.sendMessage(FormType.EVENT_REGISTRATION, {
        ...data,
        eventId,
        registrationId
      });

      return {
        success: true,
        message: `Inscription à l\'événement confirmée ! Référence: ${registrationId}`,
        registrationId,
        whatsappSent: true
      };

    } catch (error) {
      console.error('Error submitting event registration:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'inscription à l\'événement',
        whatsappSent: false
      };
    }
  }

  /**
   * Handle seminar registration
   */
  async submitSeminarRegistration(seminarId: string, data: EventRegistrationFormData): Promise<{
    success: boolean;
    message: string;
    registrationId?: string;
    whatsappSent: boolean;
  }> {
    try {
      // Similar validation to event registration
      const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !data[field as keyof EventRegistrationFormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Informations manquantes: ${missingFields.join(', ')}`);
      }

      const registrationId = `SEM-${seminarId}-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      // Send via WhatsApp
      this.whatsAppService.sendMessage(FormType.SEMINAR_REGISTRATION, {
        ...data,
        seminarId,
        registrationId
      });

      return {
        success: true,
        message: `Inscription au séminaire confirmée ! Référence: ${registrationId}`,
        registrationId,
        whatsappSent: true
      };

    } catch (error) {
      console.error('Error submitting seminar registration:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors de l\'inscription au séminaire',
        whatsappSent: false
      };
    }
  }

  /**
   * Handle quick contact actions
   */
  async handleQuickContact(action: 'general' | 'trial' | 'competition' | 'partnership'): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      switch (action) {
        case 'general':
          this.whatsAppService.quickContact.generalInfo();
          break;
        case 'trial':
          this.whatsAppService.quickContact.trialClass();
          break;
        case 'competition':
          this.whatsAppService.quickContact.competitionInfo();
          break;
        case 'partnership':
          this.whatsAppService.quickContact.partnershipInquiry();
          break;
        default:
          throw new Error('Action de contact inconnue');
      }

      return {
        success: true,
        message: 'WhatsApp ouvert avec le message pré-rempli'
      };

    } catch (error) {
      console.error('Error handling quick contact:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur lors du contact rapide'
      };
    }
  }

  /**
   * Get WhatsApp contact information
   */
  getContactInfo(): {
    phoneNumber: string;
    displayNumber: string;
    businessHours: string;
    responseTime: string;
  } {
    return this.whatsAppService.getContactInfo();
  }

  /**
   * Validate form data (generic validation)
   */
  validateFormData(data: Record<string, any>, requiredFields: string[]): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required fields
    const missingFields = requiredFields.filter(field => !data[field] || data[field].toString().trim() === '');
    if (missingFields.length > 0) {
      errors.push(`Champs obligatoires manquants: ${missingFields.join(', ')}`);
    }

    // Validate email if present
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Format d\'email invalide');
    }

    // Validate phone if present
    if (data.phone && !/^(\+237|237)?[2-9]\d{8}$/.test(data.phone.replace(/\s/g, ''))) {
      errors.push('Format de téléphone invalide (ex: +237 6XX XX XX XX)');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Format phone number for Cameroon
   */
  formatCameroonPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.startsWith('237')) {
      return `+${cleaned}`;
    }
    
    if (cleaned.length === 9 && /^[2-9]/.test(cleaned)) {
      return `+237${cleaned}`;
    }
    
    return phone; // Return original if can't format
  }
}

// Export singleton instance
export const formController = new FormController(whatsAppService);
