import { FormType } from '@/models/types';

/**
 * WhatsApp Service - Centralized WhatsApp Business API integration
 * Single Responsibility: Handle all WhatsApp communications
 * Open/Closed: Easily extensible for new message types
 */
export class WhatsAppService {
  private readonly phoneNumber = '237675395238'; // ACAWA WhatsApp Business number
  private readonly baseUrl = 'https://wa.me';

  /**
   * Send a formatted message via WhatsApp
   * @param type - The type of form/message
   * @param data - The form data to format
   * @param customMessage - Optional custom message override
   */
  public sendMessage(type: FormType, data: Record<string, any>, customMessage?: string): void {
    const message = customMessage || this.formatMessage(type, data);
    const encodedMessage = encodeURIComponent(message);
    const whatsAppUrl = `${this.baseUrl}/${this.phoneNumber}?text=${encodedMessage}`;
    
    // Open in new tab/window
    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Format message based on form type and data
   * Following Open/Closed Principle - easy to extend with new types
   */
  private formatMessage(type: FormType, data: Record<string, any>): string {
    const timestamp = new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Douala',
      dateStyle: 'short',
      timeStyle: 'short'
    });

    switch (type) {
      case FormType.CONTACT:
        return this.formatContactMessage(data, timestamp);
      
      case FormType.CLUB_REGISTRATION:
        return this.formatClubRegistrationMessage(data, timestamp);
      
      case FormType.MEMBERSHIP:
        return this.formatMembershipMessage(data, timestamp);
      
      case FormType.PARTNERSHIP:
        return this.formatPartnershipMessage(data, timestamp);
      
      case FormType.EVENT_REGISTRATION:
        return this.formatEventRegistrationMessage(data, timestamp);
      
      case FormType.SEMINAR_REGISTRATION:
        return this.formatSeminarRegistrationMessage(data, timestamp);
      
      default:
        return this.formatGenericMessage(data, timestamp);
    }
  }

  private formatContactMessage(data: any, timestamp: string): string {
    return `🥋 *NOUVEAU CONTACT - ACAWA*
📅 ${timestamp}

*Informations de Contact:*
👤 Nom: ${data.name || 'Non spécifié'}
📧 Email: ${data.email || 'Non spécifié'}
📞 Téléphone: ${data.phone || 'Non spécifié'}
📋 Sujet: ${data.subject || 'Demande générale'}

*Message:*
${data.message || 'Aucun message spécifié'}

*Contact préféré:* ${data.preferredContactMethod || 'Non spécifié'}

---
💪 WADOKAI CAMEROUN - L'Art Martial de l'Excellence`;
  }

  private formatClubRegistrationMessage(data: any, timestamp: string): string {
    return `🥋 *NOUVELLE INSCRIPTION CLUB - ACAWA*
📅 ${timestamp}

*Informations Personnelles:*
👤 Nom: ${data.firstName} ${data.lastName}
🎂 Date de naissance: ${data.dateOfBirth}
⚧ Genre: ${data.gender}
📞 Téléphone: ${data.phone}
📧 Email: ${data.email}
🏠 Adresse: ${data.address}, ${data.city}

*Préférences Karaté:*
🏛️ Club souhaité: ${data.clubPreference}
📊 Niveau: ${data.experienceLevel}
🥋 Expérience précédente: ${data.previousExperience || 'Aucune'}
🎯 Objectifs: ${data.goals}

*Contact d'Urgence:*
👤 Nom: ${data.emergencyContactName}
📞 Téléphone: ${data.emergencyContactPhone}

*Informations Médicales:*
🏥 Conditions: ${data.medicalConditions || 'Aucune'}

---
🚀 Prêt à rejoindre la famille Wadokai !`;
  }

  private formatMembershipMessage(data: any, timestamp: string): string {
    return `💳 *DEMANDE D'ADHÉSION - ACAWA*
📅 ${timestamp}

*Informations:*
👤 Nom: ${data.name || 'Non spécifié'}
📞 Contact: ${data.phone || 'Non spécifié'}
🏛️ Club: ${data.club || 'Non spécifié'}
📊 Niveau: ${data.level || 'Non spécifié'}

*Type d'adhésion:* ${data.membershipType || 'Régulière'}

---
🤝 Bienvenue dans la communauté ACAWA !`;
  }

  private formatPartnershipMessage(data: any, timestamp: string): string {
    return `🤝 *DEMANDE DE PARTENARIAT - ACAWA*
📅 ${timestamp}

*Entreprise:*
🏢 Nom: ${data.companyName}
🏭 Secteur: ${data.industry}
🌐 Site web: ${data.website || 'Non spécifié'}

*Contact:*
👤 Nom: ${data.contactPersonName}
💼 Poste: ${data.contactPersonTitle}
📧 Email: ${data.email}
📞 Téléphone: ${data.phone}

*Partenariat Proposé:*
💰 Type de contribution: ${data.proposedContribution}
💵 Valeur: ${data.contributionValue} FCFA
🏆 Niveau souhaité: ${data.partnershipLevel}

*Motivation:*
${data.motivationLetter}

*Expérience précédente:*
${data.previousSponsorships || 'Première collaboration'}

---
🌟 Ensemble pour promouvoir le Wadokai !`;
  }

  private formatEventRegistrationMessage(data: any, timestamp: string): string {
    return `🗓️ *INSCRIPTION ÉVÉNEMENT - ACAWA*
📅 ${timestamp}

*Participant:*
👤 Nom: ${data.firstName} ${data.lastName}
📧 Email: ${data.email}
📞 Téléphone: ${data.phone}
🏛️ Club: ${data.clubAffiliation}

*Niveau Karaté:*
🥋 Ceinture: ${data.currentBelt}
📈 Expérience: ${data.experienceYears} ans

*Informations Pratiques:*
👕 Taille T-shirt: ${data.tshirtSize}
🍽️ Restrictions alimentaires: ${data.dietaryRestrictions || 'Aucune'}

*Contact d'Urgence:*
👤 Nom: ${data.emergencyContactName}
📞 Téléphone: ${data.emergencyContactPhone}

*Informations Médicales:*
🏥 ${data.medicalInfo || 'Aucune information particulière'}

---
🎯 Prêt pour l'événement !`;
  }

  private formatSeminarRegistrationMessage(data: any, timestamp: string): string {
    return `📚 *INSCRIPTION SÉMINAIRE - ACAWA*
📅 ${timestamp}

*Participant:*
👤 ${data.firstName} ${data.lastName}
📞 ${data.phone}
📧 ${data.email}
🥋 Ceinture: ${data.currentBelt}
🏛️ Club: ${data.clubAffiliation}

*Séminaire:* ${data.seminarTitle || 'Non spécifié'}
*Maître:* ${data.masterInstructor || 'Non spécifié'}

*Spécialisations d'intérêt:*
${data.specializations || 'Non spécifié'}

---
🧠 Prêt à apprendre et progresser !`;
  }

  private formatGenericMessage(data: any, timestamp: string): string {
    const dataString = Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    return `📋 *NOUVEAU MESSAGE - ACAWA*
📅 ${timestamp}

*Données reçues:*
${dataString}

---
🥋 WADOKAI CAMEROUN - L'Art Martial de l'Excellence`;
  }

  /**
   * Quick contact methods for common actions
   */
  public quickContact = {
    generalInfo: () => {
      const message = `Bonjour ! 👋

Je souhaite obtenir des informations sur l'Association Camerounaise de Karaté Wadokai (ACAWA).

Pourriez-vous me renseigner sur :
- Les clubs disponibles dans ma région
- Les horaires d'entraînement
- Les tarifs d'inscription
- Les niveaux acceptés

Merci ! 🥋`;
      
      window.open(`${this.baseUrl}/${this.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    },

    trialClass: () => {
      const message = `Bonjour ! 👋

Je suis intéressé(e) par un cours d'essai gratuit de karaté Wadokai.

Pourriez-vous m'informer sur :
- La possibilité de faire un cours d'essai
- Les créneaux disponibles
- Le matériel nécessaire
- Le club le plus proche de chez moi

Merci beaucoup ! 🥋`;
      
      window.open(`${this.baseUrl}/${this.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    },

    competitionInfo: () => {
      const message = `Bonjour ! 👋

Je souhaite avoir des informations sur les compétitions de karaté Wadokai organisées par ACAWA.

Pouvez-vous me renseigner sur :
- Le calendrier des compétitions
- Les catégories d'âge et de niveau
- Les conditions d'inscription
- Les tarifs de participation

Merci ! 🏆🥋`;
      
      window.open(`${this.baseUrl}/${this.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    },

    partnershipInquiry: () => {
      const message = `Bonjour ! 👋

Je représente une entreprise/organisation intéressée par un partenariat avec ACAWA.

Nous aimerions discuter des possibilités de :
- Sponsoring d'événements
- Partenariat commercial
- Support à la communauté Wadokai

Pouvons-nous programmer un entretien ?

Cordialement 🤝`;
      
      window.open(`${this.baseUrl}/${this.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  /**
   * Get WhatsApp contact info
   */
  public getContactInfo() {
    return {
      phoneNumber: this.phoneNumber,
      displayNumber: '+237 675 39 52 38',
      businessHours: 'Lun-Ven: 8h-18h, Sam: 8h-12h',
      responseTime: 'Réponse sous 2-4 heures en moyenne'
    };
  }
}

// Singleton instance
export const whatsAppService = new WhatsAppService();
