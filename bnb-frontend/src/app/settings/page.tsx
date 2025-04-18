'use client';
import SessionCard from "@/components/SessionCard";
import useSessions from "@/hooks/useSessions";

interface Session {
  _id: string;
  createdAt: string;
  userAgent: string;
  isCurrent: boolean;
}

const Settings = () => {
  const { sessions, isPending, isSuccess, isError } = useSessions();
  console.log(sessions, "sessions page", typeof sessions);
  
  return (
    <div className="container mx-auto mt-[100px] px-4 text-black">
      <h1 className="text-2xl font-bold mb-6">My Sessions</h1>
      
      {isPending && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {isError && (
        <p className="text-red-400">Failed to get sessions.</p>
      )}
      
      {isSuccess && !!sessions && (
        <div className="flex flex-col space-y-3 items-start">
          {(sessions as any)?.map((session: Session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;