import { FC, useState, useEffect, FormEvent } from "react";
import { db } from "../firebase";
import { collection, addDoc, Firestore } from "firebase/firestore";

const Home: FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    time: "",
    contactPenalty: "",
    resetPenalty: "",
    runTime: "",
    visitedCells: "",
    distanceToGoal: "",
    distancePoints: "",
  });

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${ms.toString().padStart(3, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultsCollection = collection(db as Firestore, "results");
      await addDoc(resultsCollection, {
        ...formData,
        timestamp: new Date(),
        timerValue: time,
      });
      console.log("Document successfully written!");
      // Reset form after submission
      setFormData({
        teamName: "",
        time: "",
        contactPenalty: "",
        resetPenalty: "",
        runTime: "",
        visitedCells: "",
        distanceToGoal: "",
        distancePoints: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <input
        autoComplete="off"
        type="text"
        name="teamName"
        id="teamName"
        className="mb-8 text-4xl font-bold focus:outline-none text-center"
      />
      <h1 className="text-4xl font-bold mb-8">Timer</h1>
      <p className="text-6xl font-mono mb-8">{formatTime(time)}</p>
      <div className="space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Reset
        </button>
      </div>
      <div className="mt-8">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-row gap-16">
            <input
              autoComplete="off"
              type="text"
              name="teamName"
              id="teamName"
              placeholder="Team Name"
              value={formData.teamName}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
            <input
              autoComplete="off"
              type="text"
              name="time"
              id="time"
              placeholder="Time"
              value={formData.time}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
            <input
              autoComplete="off"
              type="text"
              name="contactPenalty"
              id="contactPenalty"
              placeholder="Contact Penalty"
              value={formData.contactPenalty}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
          {/* </div>
          <div className="flex flex-row gap-16"> */}
            <input
              autoComplete="off"
              type="text"
              name="resetPenalty"
              id="resetPenalty"
              placeholder="Reset Penalty"
              value={formData.resetPenalty}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
            <input
              autoComplete="off"
              type="text"
              name="runTime"
              id="runTime"
              placeholder="Run Time"
              value={formData.runTime}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
          </div>
          <hr className="w-full border-2 border-gray-300 my-4" />
          <div className="flex flex-row gap-16">
            <input
              autoComplete="off"
              type="text"
              name="visitedCells"
              id="visitedCells"
              placeholder="Visited Cells"
              value={formData.visitedCells}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
            <input
              autoComplete="off"
              type="text"
              name="distanceToGoal"
              id="distanceToGoal"
              placeholder="Distance to Goal"
              value={formData.distanceToGoal}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
            <input
              autoComplete="off"
              type="text"
              name="distancePoints"
              id="distancePoints"
              placeholder="Distance Points"
              value={formData.distancePoints}
              onChange={handleInputChange}
              className="mb-4 text-1xl font-bold focus:outline-none text-center rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
