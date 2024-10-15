import { useState, useEffect } from "react";
import { useApp } from "@inlet/react-pixi";
import grunge from "../assets/grunge.jpg";
import tree from "../assets/tree.jpeg";

const useAppLoader = () => {
  const app = useApp();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) {
      app.loader
        .add("grunge", grunge)
        .add("tree", tree)
        .load(() => {
          setIsLoaded(true);
        });
    }
  }, []);

  return isLoaded;
};

export default useAppLoader;
