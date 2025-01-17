"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Icon} from "@/components/component/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { LayoutDashboard, icons } from "lucide-react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
           
      {items.map((item, index) => {
        const IconName = item.icon || "arrowRight";
        const LucideIcon = icons[IconName as keyof typeof icons] || LayoutDashboard;
    
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? "/" : item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-100 hover:text-blue-600 ",
                  path === item.href ? "bg-blue-500 text-white" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80",
                )}
              >
                
                <LucideIcon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
