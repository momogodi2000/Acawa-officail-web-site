import { Club, IClubService } from '@/models/Club';

/**
 * Club Service Implementation
 * Single Responsibility: Handle all club-related data operations
 * Dependency Inversion: Implements IClubService interface
 */
export class ClubService implements IClubService {
  private readonly clubs: Club[] = [
    {
      id: 'club-1',
      name: 'ACAWA Yaoundé Centre',
      description: 'Club principal d\'ACAWA situé au cœur de Yaoundé. Formation de qualité pour tous niveaux avec des maîtres expérimentés.',
      location: {
        latitude: 3.8480,
        longitude: 11.5021,
        address: 'Avenue Kennedy, Face Pharmacie de la Paix',
        city: 'Yaoundé',
        region: 'Centre',
        country: 'Cameroun'
      },
      contactInfo: {
        phone: '+237 675 39 52 38',
        email: 'yaounde.centre@ACAWA-cameroon.org',
        whatsapp: '+237 675 39 52 38'
      },
      socialMedia: {
        facebook: 'https://facebook.com/ACAWA.yaounde',
        instagram: 'https://instagram.com/ACAWA_yaounde'
      },
      instructor: {
        id: 'instructor-1',
        firstName: 'Rosic',
        lastName: 'Maître',
        title: 'Maître Rosic',
        belt: 'BLACK_7DAN' as any,
        yearsOfExperience: 25,
        specializations: ['Kumite', 'Kata', 'Formation des instructeurs'],
        biography: 'Maître fondateur d\'ACAWA avec plus de 25 ans d\'expérience en Wadokai. Formateur international reconnu.',
        photo: '/images/masters/maitre-rosic.jpg',
        contactInfo: {
          phone: '+237 675 39 52 38',
          email: 'maitre.rosic@ACAWA-cameroon.org'
        },
        achievements: [
          {
            title: 'Champion d\'Afrique Wadokai 1998',
            description: 'Premier titre continental en kumite',
            date: new Date('1998-08-15'),
            level: 'Continental',
            organization: 'Fédération Africaine de Karaté Wadokai'
          }
        ],
        certifications: [
          {
            name: 'Instructeur International Wadokai',
            issuingOrganization: 'World Wadokai Federation',
            issueDate: new Date('2005-06-01'),
            certificateId: 'WWF-2005-CM-001',
            isValid: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      },
      assistantInstructors: [],
      schedule: [
        {
          dayOfWeek: 1, // Lundi
          startTime: '18:00',
          endTime: '20:00',
          level: 'BEGINNER' as any,
          ageGroup: 'ADULTS' as any
        },
        {
          dayOfWeek: 3, // Mercredi
          startTime: '18:00',
          endTime: '20:00',
          level: 'INTERMEDIATE' as any,
          ageGroup: 'ADULTS' as any
        },
        {
          dayOfWeek: 6, // Samedi
          startTime: '09:00',
          endTime: '11:00',
          level: 'ALL' as any,
          ageGroup: 'KIDS' as any
        }
      ],
      facilities: [
        {
          name: 'Dojo Principal',
          description: 'Salle d\'entraînement de 200m² avec tatamis professionnels',
          isAvailable: true,
          equipment: ['Tatamis', 'Sacs de frappe', 'Makiwara', 'Miroirs']
        },
        {
          name: 'Vestiaires',
          description: 'Vestiaires séparés hommes/femmes avec douches',
          isAvailable: true,
          equipment: ['Casiers', 'Bancs', 'Douches']
        }
      ],
      membershipFees: [
        {
          category: 'ADULTS' as any,
          level: 'BEGINNER' as any,
          monthlyFee: 15000,
          registrationFee: 5000,
          currency: 'FCFA',
          includes: ['Cours', 'Kimono', 'Ceinture', 'Assurance']
        }
      ],
      gallery: {
        images: [
          '/images/clubs/yaounde-centre/dojo-1.jpg',
          '/images/clubs/yaounde-centre/training-1.jpg',
          '/images/clubs/yaounde-centre/ceremony-1.jpg'
        ],
        videos: [
          '/videos/clubs/yaounde-centre/presentation.mp4'
        ],
        featuredImage: '/images/clubs/yaounde-centre/featured.jpg'
      },
      maxCapacity: 80,
      currentMembers: 45,
      foundedDate: new Date('2010-03-15'),
      isHeadquarters: true,
      affiliationNumber: 'ACAWA-001',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    },
    {
      id: 'club-2',
      name: 'ACAWA Douala Akwa',
      description: 'Club ACAWA de Douala situé dans le quartier Akwa. Formation traditionnelle Wadokai dans un cadre moderne.',
      location: {
        latitude: 4.0511,
        longitude: 9.7679,
        address: 'Rue Joss, Quartier Akwa',
        city: 'Douala',
        region: 'Littoral',
        country: 'Cameroun'
      },
      contactInfo: {
        phone: '+237 675 39 52 38',
        email: 'douala.akwa@ACAWA-cameroon.org',
        whatsapp: '+237 675 39 52 38'
      },
      instructor: {
        id: 'instructor-2',
        firstName: 'Anissé',
        lastName: 'Kenfack',
        title: 'Maître Kenfack',
        belt: 'BLACK_6DAN' as any,
        yearsOfExperience: 20,
        specializations: ['Kata', 'Philosophie Wadokai', 'Méditation'],
        biography: 'Maître Kenfack Anissé, expert en Kata et philosophie Wadokai. Responsable de la formation spirituelle.',
        photo: '/images/masters/maitre-kenfack.jpg',
        contactInfo: {
          phone: '+237 675 39 52 38',
          email: 'maitre.kenfack@ACAWA-cameroon.org'
        },
        achievements: [
          {
            title: 'Champion National Kata 2005',
            description: 'Premier titre national en kata Wadokai',
            date: new Date('2005-11-20'),
            level: 'National',
            organization: 'Fédération Camerounaise de Karaté'
          }
        ],
        certifications: [
          {
            name: 'Expert Kata Wadokai',
            issuingOrganization: 'Japan Wadokai Association',
            issueDate: new Date('2008-04-15'),
            certificateId: 'JWA-2008-CM-002',
            isValid: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      },
      assistantInstructors: [],
      schedule: [
        {
          dayOfWeek: 2, // Mardi
          startTime: '17:30',
          endTime: '19:30',
          level: 'INTERMEDIATE' as any,
          ageGroup: 'ADULTS' as any
        },
        {
          dayOfWeek: 5, // Vendredi
          startTime: '17:30',
          endTime: '19:30',
          level: 'ADVANCED' as any,
          ageGroup: 'ADULTS' as any
        },
        {
          dayOfWeek: 6, // Samedi
          startTime: '10:00',
          endTime: '12:00',
          level: 'ALL' as any,
          ageGroup: 'TEENS' as any
        }
      ],
      facilities: [
        {
          name: 'Dojo Principal',
          description: 'Salle de 150m² avec tatamis traditionnels',
          isAvailable: true,
          equipment: ['Tatamis', 'Makiwara', 'Armes traditionnelles']
        }
      ],
      membershipFees: [
        {
          category: 'ADULTS' as any,
          level: 'INTERMEDIATE' as any,
          monthlyFee: 18000,
          registrationFee: 5000,
          currency: 'FCFA',
          includes: ['Cours', 'Équipements', 'Stages mensuels']
        }
      ],
      gallery: {
        images: [
          '/images/clubs/douala-akwa/dojo-1.jpg',
          '/images/clubs/douala-akwa/kata-training.jpg'
        ],
        videos: [],
        featuredImage: '/images/clubs/douala-akwa/featured.jpg'
      },
      maxCapacity: 60,
      currentMembers: 32,
      foundedDate: new Date('2012-09-01'),
      isHeadquarters: false,
      affiliationNumber: 'ACAWA-002',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    },
    {
      id: 'club-3',
      name: 'ACAWA Bafoussam',
      description: 'Club ACAWA de Bafoussam dans la région de l\'Ouest. Centre de formation pour les hauts plateaux.',
      location: {
        latitude: 5.4781,
        longitude: 10.4172,
        address: 'Quartier Famla, Avenue de l\'Indépendance',
        city: 'Bafoussam',
        region: 'Ouest',
        country: 'Cameroun'
      },
      contactInfo: {
        phone: '+237 675 39 52 38',
        email: 'bafoussam@ACAWA-cameroon.org',
        whatsapp: '+237 675 39 52 38'
      },
      instructor: {
        id: 'instructor-3',
        firstName: 'Aouna',
        lastName: 'Maître',
        title: 'Maître Aouna',
        belt: 'BLACK_5DAN' as any,
        yearsOfExperience: 18,
        specializations: ['Kumite', 'Défense personnelle', 'Formation jeunes'],
        biography: 'Maître Aouna, spécialiste du kumite et de la défense personnelle. Expert dans la formation des jeunes karatékas.',
        photo: '/images/masters/maitre-aouna.jpg',
        contactInfo: {
          phone: '+237 675 39 52 38',
          email: 'maitre.aouna@ACAWA-cameroon.org'
        },
        achievements: [
          {
            title: 'Champion Régional Kumite 2010',
            description: 'Titre régional en kumite toutes catégories',
            date: new Date('2010-07-10'),
            level: 'Régional',
            organization: 'Ligue de l\'Ouest de Karaté'
          }
        ],
        certifications: [
          {
            name: 'Instructeur Jeunes Wadokai',
            issuingOrganization: 'ACAWA Formation',
            issueDate: new Date('2012-03-20'),
            certificateId: 'ACAWA-2012-003',
            isValid: true
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      },
      assistantInstructors: [],
      schedule: [
        {
          dayOfWeek: 1, // Lundi
          startTime: '16:00',
          endTime: '18:00',
          level: 'BEGINNER' as any,
          ageGroup: 'KIDS' as any
        },
        {
          dayOfWeek: 4, // Jeudi
          startTime: '18:00',
          endTime: '20:00',
          level: 'INTERMEDIATE' as any,
          ageGroup: 'ADULTS' as any
        },
        {
          dayOfWeek: 6, // Samedi
          startTime: '08:00',
          endTime: '11:00',
          level: 'ALL' as any,
          ageGroup: 'ALL' as any
        }
      ],
      facilities: [
        {
          name: 'Dojo Familial',
          description: 'Salle de 120m² conviviale pour tous âges',
          isAvailable: true,
          equipment: ['Tatamis', 'Équipements enfants', 'Espace parents']
        }
      ],
      membershipFees: [
        {
          category: 'KIDS' as any,
          level: 'BEGINNER' as any,
          monthlyFee: 10000,
          registrationFee: 3000,
          currency: 'FCFA',
          includes: ['Cours', 'Kimono enfant', 'Ceintures', 'Activités']
        }
      ],
      gallery: {
        images: [
          '/images/clubs/bafoussam/kids-training.jpg',
          '/images/clubs/bafoussam/family-class.jpg'
        ],
        videos: [],
        featuredImage: '/images/clubs/bafoussam/featured.jpg'
      },
      maxCapacity: 50,
      currentMembers: 28,
      foundedDate: new Date('2015-01-20'),
      isHeadquarters: false,
      affiliationNumber: 'ACAWA-003',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    }
  ];

  async findAll(): Promise<Club[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.clubs]), 500);
    });
  }

  async findById(id: string): Promise<Club | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const club = this.clubs.find(c => c.id === id);
        resolve(club || null);
      }, 300);
    });
  }

  async findByRegion(region: string): Promise<Club[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredClubs = this.clubs.filter(
          club => club.location.region.toLowerCase().includes(region.toLowerCase())
        );
        resolve(filteredClubs);
      }, 400);
    });
  }

  async findByInstructor(instructorId: string): Promise<Club[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredClubs = this.clubs.filter(
          club => club.instructor.id === instructorId
        );
        resolve(filteredClubs);
      }, 300);
    });
  }

  async create(club: Omit<Club, 'id' | 'createdAt' | 'updatedAt'>): Promise<Club> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newClub: Club = {
          ...club,
          id: `club-${Date.now()}`,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.clubs.push(newClub);
        resolve(newClub);
      }, 600);
    });
  }

  async update(id: string, clubData: Partial<Club>): Promise<Club> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const clubIndex = this.clubs.findIndex(c => c.id === id);
        if (clubIndex === -1) {
          reject(new Error('Club not found'));
          return;
        }

        this.clubs[clubIndex] = {
          ...this.clubs[clubIndex],
          ...clubData,
          updatedAt: new Date()
        };
        resolve(this.clubs[clubIndex]);
      }, 500);
    });
  }

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initialLength = this.clubs.length;
        const filteredClubs = this.clubs.filter(c => c.id !== id);
        
        if (filteredClubs.length < initialLength) {
          this.clubs.splice(0, this.clubs.length, ...filteredClubs);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 400);
    });
  }

  async searchByName(name: string): Promise<Club[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredClubs = this.clubs.filter(
          club => club.name.toLowerCase().includes(name.toLowerCase())
        );
        resolve(filteredClubs);
      }, 300);
    });
  }

  async getAvailableSlots(clubId: string, date: Date): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const club = this.clubs.find(c => c.id === clubId);
        if (!club) {
          resolve([]);
          return;
        }

        const dayOfWeek = date.getDay();
        const availableSchedules = club.schedule.filter(s => s.dayOfWeek === dayOfWeek);
        resolve(availableSchedules);
      }, 300);
    });
  }
}

// Singleton instance for dependency injection
export const clubService = new ClubService();
