/**
 * Background color from name
 * @param name
 * @param active
 */
export const background = (name?: string, active?: boolean) => {
  switch (name) {
    case "college & career":
      return active ? "bg-red-300" : "bg-red-200 hover:bg-red-300";
    case "policy & government":
      return active ? "bg-violet-300" : "bg-violet-200 hover:bg-violet-300";
    case "recreation":
      return active ? "bg-orange-300" : "bg-orange-200 hover:bg-orange-300";
    case "arts & culture":
      return active ? "bg-amber-300" : "bg-amber-200 hover:bg-amber-300";
    case "volunteer":
      return active ? "bg-emerald-300" : "bg-emerald-200 hover:bg-emerald-300";
    case "sponsored":
      return active ? "bg-sky-300" : "bg-sky-200 hover:bg-sky-300";
    default:
      return active ? "bg-gray-200" : "bg-gray-100 hover:bg-gray-200";
  }
};

/**
 * Foreground color from name
 * @param name
 */
export const foreground = (name?: string) => {
  switch (name) {
    case "college & career":
      return "text-red-300 hover:text-red-400 border-red-300 hover:border-red-400 stroke-red-300 fill-red-300 hover:stroke-red-400 hover:stroke-red-400";
    case "policy & government":
      return "text-violet-300 hover:text-violet-400 border-violet-300 hover:border-violet-400 stroke-violet-300 fill-violet-300 hover:stroke-violet-400 hover:stroke-violet-400";
    case "recreation":
      return "text-orange-300 hover:text-orange-400 border-orange-300 hover:border-orange-400 stroke-orange-300 fill-orange-300 hover:stroke-orange-400 hover:stroke-orange-400";
    case "arts & culture":
      return "text-amber-300 hover:text-amber-400 border-amber-300 hover:border-amber-400 stroke-amber-300 fill-amber-300 hover:stroke-amber-400 hover:stroke-amber-400";
    case "volunteer":
      return "text-emerald-300 hover:text-emerald-400 border-emerald-300 hover:border-emerald-400 stroke-emerald-300 fill-emerald-300 hover:stroke-emerald-400 hover:stroke-emerald-400";
    case "sponsored":
      return "text-sky-300 hover:text-sky-400 border-sky-300 hover:border-sky-400 stroke-sky-300 fill-sky-300 hover:stroke-sky-400 hover:stroke-sky-400";
    default:
      return "text-gray-100 hover:text-gray-200 border-gray-100 hover:border-gray-200 stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:stroke-gray-400";
  }
};
