import { useState, useSyncExternalStore } from "react";

export default function useSearchParams() {
  const [count, setCount] = useState(0);
  const setSearchParams = (params) => {
    setCount((count) => count + 1);
    const newParams = new URLSearchParams(params);
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      newParams.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  };
  return [new URL(window.location).searchParams, setSearchParams];
}
