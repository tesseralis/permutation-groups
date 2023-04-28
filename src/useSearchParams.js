import { useState, useMemo } from "react";

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
  const params = useMemo(() => {
    return paramsToObject(new URL(window.location).searchParams);
  }, [count]);
  return [params, setSearchParams];
}

function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tuple
    result[key] = value;
  }
  return result;
}
