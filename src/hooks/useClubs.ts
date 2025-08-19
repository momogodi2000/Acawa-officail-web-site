import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Club } from '@/models/Club';
import { clubController } from '@/controllers/ClubController';

/**
 * Custom hooks for club data management with React Query
 * Single Responsibility: Handle club-related data fetching and caching
 */

// Query keys for consistent cache management
export const clubQueryKeys = {
  all: ['clubs'] as const,
  lists: () => [...clubQueryKeys.all, 'list'] as const,
  list: (filters?: any) => [...clubQueryKeys.lists(), filters] as const,
  details: () => [...clubQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...clubQueryKeys.details(), id] as const,
  statistics: () => [...clubQueryKeys.all, 'statistics'] as const,
  search: (query: string) => [...clubQueryKeys.all, 'search', query] as const,
  byRegion: (region: string) => [...clubQueryKeys.all, 'region', region] as const,
  availableSlots: (clubId: string, date: Date) => 
    [...clubQueryKeys.all, 'slots', clubId, date.toISOString()] as const,
  instructors: (clubId: string) => 
    [...clubQueryKeys.all, 'instructors', clubId] as const,
  contact: (clubId: string) => 
    [...clubQueryKeys.all, 'contact', clubId] as const
};

/**
 * Hook to fetch all clubs with optional filters
 */
export function useClubs(filters?: {
  region?: string;
  isActive?: boolean;
  hasAvailableSlots?: boolean;
}) {
  return useQuery({
    queryKey: clubQueryKeys.list(filters),
    queryFn: () => clubController.getAllClubs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: 1000,
  });
}

/**
 * Hook to fetch club details by ID
 */
export function useClub(id: string) {
  return useQuery({
    queryKey: clubQueryKeys.detail(id),
    queryFn: () => clubController.getClubDetails(id),
    enabled: !!id, // Only run if id is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}

/**
 * Hook to fetch clubs by region with statistics
 */
export function useClubsByRegion(region: string) {
  return useQuery({
    queryKey: clubQueryKeys.byRegion(region),
    queryFn: () => clubController.getClubsByRegion(region),
    enabled: !!region,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook to search clubs
 */
export function useClubSearch(query: string) {
  return useQuery({
    queryKey: clubQueryKeys.search(query),
    queryFn: () => clubController.searchClubs(query),
    enabled: !!query && query.length >= 2, // Only search with 2+ characters
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
}

/**
 * Hook to fetch club statistics for dashboard
 */
export function useClubStatistics() {
  return useQuery({
    queryKey: clubQueryKeys.statistics(),
    queryFn: () => clubController.getClubStatistics(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false, // Statistics don't change frequently
  });
}

/**
 * Hook to fetch available slots for a club on a specific date
 */
export function useAvailableSlots(clubId: string, date: Date) {
  return useQuery({
    queryKey: clubQueryKeys.availableSlots(clubId, date),
    queryFn: () => clubController.getAvailableSlots(clubId, date),
    enabled: !!clubId && !!date,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook to fetch club instructors
 */
export function useClubInstructors(clubId: string) {
  return useQuery({
    queryKey: clubQueryKeys.instructors(clubId),
    queryFn: () => clubController.getClubInstructors(clubId),
    enabled: !!clubId,
    staleTime: 30 * 60 * 1000, // 30 minutes (instructor info changes rarely)
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
  });
}

/**
 * Hook to fetch club contact information
 */
export function useClubContact(clubId: string) {
  return useQuery({
    queryKey: clubQueryKeys.contact(clubId),
    queryFn: () => clubController.getClubContactInfo(clubId),
    enabled: !!clubId,
    staleTime: 60 * 60 * 1000, // 1 hour (contact info rarely changes)
    gcTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 2,
  });
}

/**
 * Mutation hook for creating a new club (admin functionality)
 */
export function useCreateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clubData: Omit<Club, 'id' | 'createdAt' | 'updatedAt'>) => 
      clubController.createClub(clubData),
    onSuccess: (newClub: Club) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: clubQueryKeys.all });
      
      // Optimistically update the cache
      queryClient.setQueryData(clubQueryKeys.detail(newClub.id), newClub);
      
      // Update lists cache if it exists
      const existingClubs = queryClient.getQueryData<Club[]>(clubQueryKeys.lists());
      if (existingClubs) {
        queryClient.setQueryData(clubQueryKeys.lists(), [...existingClubs, newClub]);
      }
    },
    onError: (error: Error) => {
      console.error('Failed to create club:', error);
    },
  });
}

/**
 * Mutation hook for updating club information
 */
export function useUpdateClub() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Club> }) =>
      clubController.updateClub(id, data),
    onSuccess: (updatedClub: Club) => {
      // Update specific club cache
      queryClient.setQueryData(clubQueryKeys.detail(updatedClub.id), updatedClub);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: clubQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: clubQueryKeys.statistics() });
      
      // Update lists cache if it exists
      const existingClubs = queryClient.getQueryData<Club[]>(clubQueryKeys.lists());
      if (existingClubs) {
        const updatedClubs = existingClubs.map((club: Club) => 
          club.id === updatedClub.id ? updatedClub : club
        );
        queryClient.setQueryData(clubQueryKeys.lists(), updatedClubs);
      }
    },
    onError: (error: Error) => {
      console.error('Failed to update club:', error);
    },
  });
}

/**
 * Hook to prefetch club data for better UX
 */
export function usePrefetchClub() {
  const queryClient = useQueryClient();

  return {
    prefetchClubDetails: (id: string) => {
      queryClient.prefetchQuery({
        queryKey: clubQueryKeys.detail(id),
        queryFn: () => clubController.getClubDetails(id),
        staleTime: 10 * 60 * 1000,
      });
    },
    prefetchClubInstructors: (id: string) => {
      queryClient.prefetchQuery({
        queryKey: clubQueryKeys.instructors(id),
        queryFn: () => clubController.getClubInstructors(id),
        staleTime: 30 * 60 * 1000,
      });
    },
  };
}

/**
 * Hook to manage cache invalidation
 */
export function useClubCache() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: clubQueryKeys.all });
    },
    invalidateClub: (id: string) => {
      queryClient.invalidateQueries({ queryKey: clubQueryKeys.detail(id) });
    },
    clearAll: () => {
      queryClient.removeQueries({ queryKey: clubQueryKeys.all });
    },
    refreshStatistics: () => {
      queryClient.invalidateQueries({ queryKey: clubQueryKeys.statistics() });
    },
  };
}
