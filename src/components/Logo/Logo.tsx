import React from "react";

/**
 * A component for Local Civics logo branding.
 */
export const Logo = () => {
  return (
    <img
      className="w-full h-full overflow-hidden object-contain"
      src={`https://cdn.localcivics.io/brand/localcivics.png`}
      alt="Logo"
    />
  );
};
