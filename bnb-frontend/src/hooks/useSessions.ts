'use client'
import { getSessions } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const SESSIONS = "sessions";

const useSessions = (opts = {}) => {
  const { data: sessions = [], ...rest } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opts,
  });
  console.log(sessions, "usesessions")

  if((sessions as any)?.length > 0) {
    return { sessions, ...rest };
  } else{
    return { sessions: [], ...rest, isSuccess:false, isError:true, error: "Load error occured"};

  }
  
};
export default useSessions;
