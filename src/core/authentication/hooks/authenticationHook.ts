import { useQuery } from '@tanstack/react-query';
import { findOrCreateUser } from '../services/autenticationService';
import { findOrCreateDto } from '../dtos/Users';

const useUsers = (data: findOrCreateDto) => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => findOrCreateUser(data),
  });
};


export { useUsers };
