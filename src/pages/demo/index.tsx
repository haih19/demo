import { Button } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function DemoPage() {
  console.log("load js first");
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4, 5]);
  const [tasks, setTasks] = useState<
    { id: number; title: string; completed: boolean }[]
  >([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a project", completed: false },
    { id: 3, title: "Prepare presentation", completed: false },
  ]);

  const evenNumbers: number[] = useMemo(() => {
    return numbers.filter((num) => num % 2 === 0);
  }, [numbers]);

  const handleSetNumber = () => {
    setNumbers([...numbers, numbers?.length + 1]);
  };

  const handleClickTask = useCallback((id: number) => {
    console.log("rendered");
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  console.log("load js completed");
  return (
    <>
      {console.log("render dom")}{" "}
      <div className="flex justify-center items-center flex-col">
        <div>
          <div>
            <Button onClick={handleSetNumber}>Plus</Button>
          </div>
          {evenNumbers?.length ? (
            <ul>
              {evenNumbers.map((item) => (
                <li
                  key={item}
                  className="text-center">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="mt-10">
          <h1 className="text-center">Tasks</h1>
          {tasks?.length ? (
            <ul>
              {tasks.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleClickTask(item.id)}
                  className={`cursor-pointer ${
                    item.completed && "line-through"
                  }`}>
                  {item.title}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}
