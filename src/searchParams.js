import {
  parseGroupName
} from "./groups";

import { generatorsToString } from "./util";

const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)";

// Get the generators string from the search parameters
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
