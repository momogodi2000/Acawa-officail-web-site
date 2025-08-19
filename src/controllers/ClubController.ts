import { Club, IClubService } from '@/models/Club';
import { clubService } from '@/services/ClubService';

/**
 * Club Controller - Handles club-related business logic
 * Single Responsibility: Orchestrate club operations between views and services
 * Dependency Inversion: Depends on IClubService abstraction, not concrete implementation
 */
export class ClubController {
  constructor(private clubService: IClubService) {}

  // Expose service methods for hooks
  public async createClub(club: Omit<Club, 'id' | 'createdAt' | 'updatedAt'>): Promise<Club> {
    return this.clubService.create(club);
  }

  public async updateClub(id: string, club: Partial<Club>): Promise<Club> {
    return this.clubService.update(id, club);
  }

  public async deleteClub(id: string): Promise<boolean> {
    return this.clubService.delete(id);
  }

  /**
   * Get all clubs with optional filtering
   */
  async getAllClubs(filters?: {
    region?: string;
    isActive?: boolean;
    hasAvailableSlots?: boolean;
  }): Promise<Club[]> {
    try {
      let clubs = await this.clubService.findAll();

      // Apply filters
      if (filters?.region) {
        clubs = await this.clubService.findByRegion(filters.region);
      }

      if (filters?.isActive !== undefined) {
        clubs = clubs.filter(club => club.isActive === filters.isActive);
      }

      if (filters?.hasAvailableSlots) {
        clubs = clubs.filter(club => club.currentMembers < club.maxCapacity);
      }

      return clubs;
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw new Error('Failed to fetch clubs');
    }
  }

  /**
   * Get club by ID with full details
   */
  async getClubDetails(id: string): Promise<Club | null> {
    try {
      const club = await this.clubService.findById(id);
      return club;
    } catch (error) {
      console.error(`Error fetching club ${id}:`, error);
      throw new Error('Failed to fetch club details');
    }
  }

  /**
   * Get clubs by region with statistics
   */
  async getClubsByRegion(region: string): Promise<{
    clubs: Club[];
    statistics: {
      totalClubs: number;
      totalMembers: number;
      averageCapacityUsage: number;
      mostPopularClub: Club | null;
    };
  }> {
    try {
      const clubs = await this.clubService.findByRegion(region);
      
      const statistics = {
        totalClubs: clubs.length,
        totalMembers: clubs.reduce((sum, club) => sum + club.currentMembers, 0),
        averageCapacityUsage: clubs.length > 0 
          ? clubs.reduce((sum, club) => sum + (club.currentMembers / club.maxCapacity * 100), 0) / clubs.length 
          : 0,
        mostPopularClub: clubs.length > 0 
          ? clubs.reduce((prev, current) => 
              (current.currentMembers > prev.currentMembers) ? current : prev
            ) 
          : null
      };

      return { clubs, statistics };
    } catch (error) {
      console.error(`Error fetching clubs for region ${region}:`, error);
      throw new Error('Failed to fetch clubs by region');
    }
  }

  /**
   * Search clubs by name or location
   */
  async searchClubs(query: string): Promise<Club[]> {
    try {
      const clubsByName = await this.clubService.searchByName(query);
      const clubsByRegion = await this.clubService.findByRegion(query);

      // Combine results and remove duplicates
      const allClubs = [...clubsByName, ...clubsByRegion];
      const uniqueClubs = allClubs.filter((club, index, self) => 
        index === self.findIndex(c => c.id === club.id)
      );

      return uniqueClubs;
    } catch (error) {
      console.error(`Error searching clubs with query "${query}":`, error);
      throw new Error('Failed to search clubs');
    }
  }

  /**
   * Get available training slots for a specific date
   */
  async getAvailableSlots(clubId: string, date: Date): Promise<{
    clubName: string;
    date: Date;
    availableSlots: any[];
    totalCapacity: number;
    availableSpots: number;
  }> {
    try {
      const club = await this.clubService.findById(clubId);
      if (!club) {
        throw new Error('Club not found');
      }

      const availableSlots = await this.clubService.getAvailableSlots(clubId, date);
      const availableSpots = club.maxCapacity - club.currentMembers;

      return {
        clubName: club.name,
        date,
        availableSlots,
        totalCapacity: club.maxCapacity,
        availableSpots: Math.max(0, availableSpots)
      };
    } catch (error) {
      console.error(`Error getting available slots for club ${clubId}:`, error);
      throw new Error('Failed to get available slots');
    }
  }

  /**
   * Get club statistics for dashboard
   */
  async getClubStatistics(): Promise<{
    totalClubs: number;
    totalMembers: number;
    regions: string[];
    clubsByRegion: Record<string, number>;
    capacityUtilization: number;
    activeClubs: number;
    headquarters: Club | null;
  }> {
    try {
      const clubs = await this.clubService.findAll();
      
      const totalMembers = clubs.reduce((sum, club) => sum + club.currentMembers, 0);
      const totalCapacity = clubs.reduce((sum, club) => sum + club.maxCapacity, 0);
      const regions = [...new Set(clubs.map(club => club.location.region))];
      
      const clubsByRegion = clubs.reduce((acc, club) => {
        const region = club.location.region;
        acc[region] = (acc[region] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const headquarters = clubs.find(club => club.isHeadquarters) || null;

      return {
        totalClubs: clubs.length,
        totalMembers,
        regions,
        clubsByRegion,
        capacityUtilization: totalCapacity > 0 ? (totalMembers / totalCapacity) * 100 : 0,
        activeClubs: clubs.filter(club => club.isActive).length,
        headquarters
      };
    } catch (error) {
      console.error('Error getting club statistics:', error);
      throw new Error('Failed to get club statistics');
    }
  }

  /**
   * Get instructor information for a club
   */
  async getClubInstructors(clubId: string): Promise<{
    mainInstructor: any;
    assistantInstructors: any[];
    totalExperience: number;
    specializations: string[];
  }> {
    try {
      const club = await this.clubService.findById(clubId);
      if (!club) {
        throw new Error('Club not found');
      }

      const allInstructors = [club.instructor, ...club.assistantInstructors];
      const totalExperience = allInstructors.reduce(
        (sum, instructor) => sum + instructor.yearsOfExperience, 0
      );
      
      const specializations = [
        ...new Set(
          allInstructors.flatMap(instructor => instructor.specializations)
        )
      ];

      return {
        mainInstructor: club.instructor,
        assistantInstructors: club.assistantInstructors,
        totalExperience,
        specializations
      };
    } catch (error) {
      console.error(`Error getting instructors for club ${clubId}:`, error);
      throw new Error('Failed to get club instructors');
    }
  }

  /**
   * Get club contact and location information
   */
  async getClubContactInfo(clubId: string): Promise<{
    club: Club;
    contactMethods: {
      phone: string;
      email: string;
      whatsapp?: string;
      socialMedia?: any;
    };
    directions: {
      address: string;
      mapUrl: string;
      nearbyLandmarks: string[];
    };
  }> {
    try {
      const club = await this.clubService.findById(clubId);
      if (!club) {
        throw new Error('Club not found');
      }

      const mapUrl = `https://maps.google.com/?q=${club.location.latitude},${club.location.longitude}`;
      
      // Mock nearby landmarks - in real app, would come from maps API
      const nearbyLandmarks = [
        'Proche du centre-ville',
        'Transport public disponible',
        'Parking gratuit'
      ];

      return {
        club,
        contactMethods: {
          phone: club.contactInfo.phone,
          email: club.contactInfo.email,
          whatsapp: club.contactInfo.whatsapp,
          socialMedia: club.socialMedia
        },
        directions: {
          address: `${club.location.address}, ${club.location.city}`,
          mapUrl,
          nearbyLandmarks
        }
      };
    } catch (error) {
      console.error(`Error getting contact info for club ${clubId}:`, error);
      throw new Error('Failed to get club contact information');
    }
  }
}

// Export singleton instance with dependency injection
export const clubController = new ClubController(clubService);
