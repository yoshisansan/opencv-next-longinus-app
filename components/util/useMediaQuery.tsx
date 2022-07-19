import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

const breakpointOption = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
}

export const querySize = {
  max: {
    sm: `(max-width: ${breakpointOption.sm})`,
    md: `(max-width: ${breakpointOption.md})`,
    lg: `(max-width: ${breakpointOption.lg})`,
    xl: `(max-width: ${breakpointOption.xl})`
  },
  min: {
    sm: `(min-width: ${breakpointOption.sm})`,
    md: `(min-width: ${breakpointOption.md})`,
    lg: `(min-width: ${breakpointOption.lg})`,
    xl: `(min-width: ${breakpointOption.xl})`
  },
}

// export const isMediaQueryMinSmall = useMediaQuery(querySize.min.sm);
// export const isMediaQueryMinMedium = useMediaQuery(querySize.min.md);
// export const isMediaQueryMinLarge = useMediaQuery(querySize.min.lg);
// export const isMediaQueryMinXLarge = useMediaQuery(querySize.min.xl);

// export const isMediaQueryMaxSmall = useMediaQuery(querySize.max.sm);
// export const isMediaQueryMaxMedium = useMediaQuery(querySize.max.md);
// export const isMediaQueryMaxLarge = useMediaQuery(querySize.max.lg);
// export const isMediaQueryMaxXLarge = useMediaQuery(querySize.max.xl);


export default useMediaQuery;