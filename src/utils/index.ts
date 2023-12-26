export const getNameInitials = (name: string) => {
  if (!name) return "";

  const parts = name.split(" ");

  return `${parts[0][0].toUpperCase()}${(parts[1]?.[0] ?? "").toUpperCase()}`;
};
