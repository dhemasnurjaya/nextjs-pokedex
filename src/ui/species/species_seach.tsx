"use client";

import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SpeciesSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.delete("page");
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-xs flex shrink">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        placeholder="Type Pokemon name or ID..."
        className="peer block w-full rounded-md border border-gray-300 py-2 pl-12"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400 peer-focus:text-gray-900" />
    </div>
  );
}
