import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MyAvatarProps {
  image?: string;
  className?: string;
  fallback?: string;
}

export function MyAvatar({
  image,
  className,
  fallback = "setiawan dedy",
}: MyAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={image || "https://github.com/shadcn.png"}
        alt="@shadcn"
      />
      <AvatarFallback>{getInitials(fallback)}</AvatarFallback>
    </Avatar>
  );
}

function getInitials(name: string): string {
  const words = name.trim().split(" "); // Split the string by spaces
  if (words.length < 2) {
    throw new Error("Input must contain at least two words.");
  }

  return words.map((names) => names.charAt(0).toUpperCase()).join(".");
}
