import type { User } from "@/types/user";

const getInitials = (user: User) => {
  if (!user || !user?.firstName || !user.lastName) return "";

  const firstName = user.firstName;
  const lastName = user.lastName;
  return (
    firstName?.charAt(0).toLocaleUpperCase() +
    lastName?.charAt(0).toLocaleUpperCase()
  );
};

export default getInitials;
