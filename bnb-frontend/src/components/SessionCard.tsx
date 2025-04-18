import useDeleteSession from "@/hooks/useDeleteSession";

interface SessionProps {
  session: {
    _id: string;
    createdAt: string;
    userAgent: string;
    isCurrent: boolean;
  }
}

const SessionCard: React.FC<SessionProps> = ({ session }) => {
  const { _id, createdAt, userAgent, isCurrent } = session;
  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div className="flex p-3 border rounded-md">
      <div className="flex-1">
        <p className="font-bold text-sm mb-1">
          {new Date(createdAt).toLocaleString("en-US")}
          {isCurrent && " (current session)"}
        </p>
        <p className="text-gray-500 text-xs">
          {userAgent}
        </p>
      </div>
      {!isCurrent && (
        <button
          className="text-xl ml-4 self-center text-red-400 hover:bg-gray-100 rounded-md p-1"
         
          onClick={()=>deleteSession}
          disabled={isPending}
        >
          {isPending ? (
            <svg className="animate-spin h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <span>&times;</span>
          )}
        </button>
      )}
    </div>
  );
};

export default SessionCard;