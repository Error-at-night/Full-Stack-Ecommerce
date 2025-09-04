import { ShoppingBasket, Users, Package, LayoutDashboard } from "lucide-react"

type Links = {
  to: string;
  label: string;
  icon: React.ElementType;
}

export const adminLinks: Links[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: ShoppingBasket },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/orders", label: "Orders", icon: Package },
]