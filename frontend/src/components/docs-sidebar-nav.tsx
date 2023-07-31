"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "../types";
import { cn } from "@/lib/utils";

export interface DocsSidebarNavProps {
	items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
	const pathname = usePathname();

	return items.length ? (
		<div className="w-full">
			{items.map((item, index) => (
				<div key={index} className={cn("pb-4")}>
					<h4 className="px-2 py-1 mb-1 text-sm font-semibold rounded-md">
						{item.title}
					</h4>
					{item?.items?.length && (
						<DocsSidebarNavItems items={item.items} pathname={pathname} />
					)}
				</div>
			))}
		</div>
	) : null;
}

interface DocsSidebarNavItemsProps {
	items: SidebarNavItem[];
	pathname: string | null;
}

export function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
	return items?.length ? (
		<div className="grid grid-flow-row text-sm auto-rows-max">
			{items.map((item, index) =>
				item.href ? (
					<Link
						key={index}
						href={item.href}
						className={cn(
							"group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
							item.disabled && "cursor-not-allowed opacity-60",
							pathname === item.href
								? "font-medium text-foreground"
								: "text-muted-foreground"
						)}
						target={item.external ? "_blank" : ""}
						rel={item.external ? "noreferrer" : ""}
					>
						{item.title}
						{item.label && (
							<span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
								{item.label}
							</span>
						)}
					</Link>
				) : (
					<span
						key={index}
						className="flex items-center w-full p-2 rounded-md cursor-not-allowed text-muted-foreground hover:underline"
					>
						{item.title}
					</span>
				)
			)}
		</div>
	) : null;
}
