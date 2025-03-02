import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const WelcomeMessage = () => {
  const pathname = usePathname();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!pathname) return; // Ensure pathname is defined

    const routeSegments = pathname
      .split("/")
      .filter((part) => Boolean(part) && part !== "dashboard"); // Remove empty strings and "dashboard"

    const routeName = routeSegments
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
      .join(" ");

    const isDashboardRoute = pathname === "/dashboard";

    setMessage(
      isDashboardRoute
        ? 'Welcome back, <span class="font-bold text-black">Robert</span> 👋🏻'
        : routeName,
    );
  }, [pathname]);

  if (!message) return null; // Prevent rendering until the message is set

  return (
    <div
      className="text-xl leading-6 font-medium text-gray-800"
      dangerouslySetInnerHTML={{ __html: message }}
    />
  );
};

export default WelcomeMessage;
