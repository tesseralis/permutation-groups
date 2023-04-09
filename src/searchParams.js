import {
  parseGroupName
} from "./groups";

import { generatorsToString } from "./util";

const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)";

// Set URL params to the given raw object
export function setSearchParams(params) {
  const newParams = new URLSearchParams(params);
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    newParams.toString();
  window.history.pushState({ path: newurl }, "", newurl);
}

export function getGenerators(params = {}) {
  if (params.has("group")) {
    const group = parseGroupName(params.get("group"));
    // parse the family name and return the generators of the corresponding group
    if (group) {
      return generatorsToString(group);
    }
  }
  if (params.has("generators")) {
    return params.get("generators");
  }
  return DEFAULT_GENERATORS;
}
