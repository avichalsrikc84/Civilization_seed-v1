import { useEffect, useState } from "react";
import ExecutionStore from "./ExecutionStore";

export default function useExecution() {

  const [execution, setExecution] = useState(
    ExecutionStore.getState()
  );

  useEffect(() => {

    const unsubscribe =
      ExecutionStore.subscribe(setExecution);

    return () => {

      unsubscribe();

    };

  }, []);

  return execution;

}