import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./components/navigation-menu";
import Pokeball from "./pokeball";

const navigationMenu = [
  { label: "Species", href: "/species" },
  { label: "Moves", href: "/moves" },
  { label: "Berries", href: "/berries" },
];

export default function Navbar({ className }: { className?: string }) {
  const logo = (
    <Link href="/">
      <Pokeball className="text-navbar-foreground rounded-md hover:bg-navbar-foreground hover:text-navbar-background transition-colors duration-200" />
    </Link>
  );

  const menuItems = navigationMenu.map((item) => (
    <NavigationMenuItem
      key={item.label}
      className="text-navbar-foreground font-semibold"
    >
      <NavigationMenuLink asChild>
        <Link href={item.href}>{item.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  ));

  return (
    <nav className={className ?? ""}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="flex flex-row gap-4">
          {logo}
          {menuItems}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
