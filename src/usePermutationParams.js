import useSearchParams from "./useSearchParams";
import { parseGroupName } from "./groups";

import { generatorsToString } from "./util";

export default function usePermutationParams() {
  const [params, setSearchParams] = useSearchParams();
  const generators = getGenerators(params);

  const setGenerators = (generators) => {
    setSearchParams({ generators });
  };

  const setGroup = (name) => {
    setSearchParams({ group: name });
  };
  return { generators, setGenerators, setGroup };
}

const DEFAULT_GENERATORS = "(1 2 3)\n(4 5 6)\n(1 6)(3 4)";

// Get the generators string from the search parameters
function getGenerators(params = {}) {
  if (params.group) {
    const group = parseGroupName(params.group);
    // parse the family name and return the generators of the corresponding group
    if (group) {
      return generatorsToString(group);
    }
  }
  if (params.generators) {
    return params.generators;
  }

  return DEFAULT_GENERATORS;
}
