import { getUser } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const { data: user, isLoading, ...rest } = useQuery<any, any>({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });
  const isAuthenticated = !!user;
  const isAdmin = user?.data?.role === "admin";
  const isSuperAdmin = user?.data?.role === "super_admin";
  return {
    user,
    loading: isLoading,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    ...rest,
  };
};

export default useAuth;
