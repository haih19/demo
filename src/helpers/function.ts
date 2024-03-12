export const weatherCondition = (icon?: string): string | undefined =>
  icon
    ? import.meta.env.VITE_SERVICE_API_CONDITIONS + "/" + icon + ".png"
    : undefined;

export const renderDegree = (temp?: number) => (temp ? Math.round(temp) : "-");
