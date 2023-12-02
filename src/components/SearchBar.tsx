"use client";

import { Prisma, Subreddit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Users } from "lucide-react";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { cn, isMacOs } from "@/lib/utils";
import { Skeleton } from "./ui/Skeleton";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    // setInput("");
    if (!isFetching) console.log(queryResults);
  }, [pathname, queryResults, isFetching]);

  return (
    <>
      <Button
        variant="outline"
        className="relative p-0 h-9 w-9 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="w-4 h-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search communities...</span>
        <span className="sr-only">Search communities...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <abbr title={isMacOs() ? "Command" : "Control"}>
            {isMacOs() ? "⌘" : "Ctrl+"}
          </abbr>
          K
        </kbd>
      </Button>
      <CommandDialog position="top" open={isOpen} onOpenChange={setIsOpen}>
        {/* <Command
          ref={commandRef}
          className="relative z-50 max-w-lg overflow-visible border rounded-lg"
        > */}
        <CommandInput
          isLoading={isFetching}
          onValueChange={(text) => {
            setInput(text);
            debounceRequest();
          }}
          value={input}
          className="border-none outline-none focus:border-none focus:outline-none ring-0"
          placeholder="Search communities..."
        />

        {input.length > 0 && (
          <CommandList className="">
            {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
            {isFetching && (
              <div className="px-1 py-2 space-y-1 overflow-hidden">
                <Skeleton className="w-10 h-4 rounded" />
                <Skeleton className="h-8 rounded-sm" />
                <Skeleton className="h-8 rounded-sm" />
              </div>
            )}
            {(queryResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Communities">
                {queryResults?.map((subreddit) => (
                  <CommandItem
                    onSelect={(e) => {
                      router.push(`/r/${e}`);
                      router.refresh();
                    }}
                    key={subreddit.id}
                    value={subreddit.name}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        )}
        {/* </Command> */}
      </CommandDialog>
    </>
  );
};

export default SearchBar;
