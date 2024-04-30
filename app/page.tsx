"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [searchResutls, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      const res = await fetch(`/api/search?q=${input}`);
      const data = (await res.json()) as { result: string[]; duration: number };
      //@ts-ignore
      setSearchResults(data);
    };
    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-form-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">
          FastHonoSearch ⚡️
        </h1>
        <p className="text-zinc-800 text-lg max-w-prose text-center">
          A high performance search made with Next js with hono backend
        </p>
        <div className="max-w-md w-full">
          <Command>
            <CommandInput
              value={input}
              onValueChange={(e) => setInput(e)}
              placeholder="Search Countries..."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResutls?.results?.length === 0 ? (
                <CommandEmpty>No Result found .</CommandEmpty>
              ) : null}
              {searchResutls?.results ? (
                <CommandGroup heading="Results">
                  {searchResutls?.results.map((result) => (
                    <CommandItem
                      key={result}
                      value={result}
                      onSelect={(e) => setInput(e)}
                    >
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {searchResutls?.results ? (
                <>
                  <div className="h-px w-full bg-slate-800" />
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResutls.results.length} results in
                    {searchResutls.duration?.toFixed(2)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="text-zinc-900"
          type="text"
        />
      </div>
    </main>
  );
}
