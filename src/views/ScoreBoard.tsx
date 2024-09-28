import { FC, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";

interface Team {
  teamName: string;
  time: string;
  contactPenalty: string;
  resetPenalty: string;
  runTime: string;
  visitedCells: string;
  distanceToGoal: string;
  distancePoints: string;
}

const ScoreBoard: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const resultsCollection = collection(db, "results");
    const unsubscribe = onSnapshot(resultsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
      const teamsData = snapshot.docs.map((doc) => doc.data() as Team);
      setTeams(teamsData);
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Score Board</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Team Name</th>
            <th className="border border-gray-300 p-2">Time</th>
            <th className="border border-gray-300 p-2">Contact Penalty</th>
            <th className="border border-gray-300 p-2">Reset Penalty</th>
            <th className="border border-gray-300 p-2">Run Time</th>
            <th className="border border-gray-300 p-2">Visited Cells</th>
            <th className="border border-gray-300 p-2">Distance To Goal</th>
            <th className="border border-gray-300 p-2">Distance Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="border border-gray-300 p-2">{team.teamName}</td>
              <td className="border border-gray-300 p-2">{team.time}</td>
              <td className="border border-gray-300 p-2">{team.contactPenalty}</td>
              <td className="border border-gray-300 p-2">{team.resetPenalty}</td>
              <td className="border border-gray-300 p-2">{team.runTime}</td>
              <td className="border border-gray-300 p-2">{team.visitedCells}</td>
              <td className="border border-gray-300 p-2">{team.distanceToGoal}</td>
              <td className="border border-gray-300 p-2">{team.distancePoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
