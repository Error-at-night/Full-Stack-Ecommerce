import { FileText, Star, Truck, Mail, Film, CircleUserRound, Bell } from "lucide-react"

type SubLinks = {
  to: string;
  label: string;
}

type Links = {
  to: string;
  label: string;
  icon: React.ElementType;
  subLinks?: SubLinks[];
}

export const adminLinks: Links[] = [
  { 
    to: "/chef/account", 
    label: "Account", 
    icon: CircleUserRound, 
    subLinks: [
      { to: "/chef/account/professional-account", label: "Professional Account" },
      { to: "/chef/account/personal-account", label: "Personal Account" },
    ]
  },
  { to: "/chef/job-request", label: "Job Request", icon: Mail },
  { to: "/chef/kitchen-request", label: "Kitchen Request", icon: Truck },
  { to: "/chef/netflix-for-chef", label: "Netflix for Chef", icon: Film },
  { to: "/chef/documents", label: "Documents", icon: FileText },
  { to: "/chef/rating", label: "Ratings", icon: Star },
  { to: "/chef/notifications", label: "Notifications", icon: Bell },
]