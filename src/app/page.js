"use client";
import usePaginatedPokemon, { getSinglePokemon } from "@/api/pokemon";
import useTypes, { getSingleType } from "@/api/types";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: typesData, isLoading: typesDataLoading } = useTypes({});
  // const { data: pokemonData, isLoading: pokemonDataLoading } =
  //   usePaginatedPokemon({});
  const [pokemonList, setPokemonList] = useState([]);
  const [tempPokemonList, setTempPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [finalSearch, setFinalSearch] = useState("");
  const deBouncedSearch = useDebounce(finalSearch, 500);

  useEffect(() => {
    if (typesData) {
      setSelectedOption(typesData[0].url);
    }
  }, [typesData]);

  // useEffect(() => {
  //   if (pokemonData) {
  //     setPokemonList([...pokemonData]);
  //     setTempPokemonList([...pokemonData]);
  //   }
  // }, [pokemonData]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (selectedOption.length > 0) {
        const array = selectedOption.split("/");
        let newArray;
        await getSingleType(array[array.length - 2]).then((res) => {
          newArray = res.map((item) => item.pokemon);
        });
        try {
          const responses = await Promise.all(
            newArray.map((item) => fetch(item.url))
          );
          const data = await Promise.all(
            responses.map((response) => response.json())
          );

          let updatedData = data.map((item) => {
            return {
              name: item.name,
              image: item.sprites.front_default,
              id: item.id,
            };
          });

          setPokemonList(updatedData);
          setTempPokemonList(updatedData);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching data:", error);
        }
      }
    })();
  }, [selectedOption]);

  useEffect(() => {
    if (deBouncedSearch !== "") {
      let filterdData = [];
      filterdData = pokemonList.filter((item) => {
        if (item.name.toLowerCase().startsWith(deBouncedSearch.toLowerCase())) {
          return item;
        }
      });
      setPokemonList(filterdData);
    } else {
      setPokemonList([...tempPokemonList]);
    }
  }, [deBouncedSearch]);

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-gray-300">
      {!typesDataLoading && (
        <div className="mb-4">
          <select
            id="pokemon"
            className="w-96 rounded-xl border-gray-300 py-3 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {typesData.map((option) => (
              <option key={option.name} value={option.url}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="flex items-center">
        <input
          className="me-4 block w-96 pl-3 py-3 px-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-xl"
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button
          className=" rounded-xl px-4 py-2 h-11 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => setFinalSearch(search)}
        >
          Search
        </button>
      </div>
      {!loading ? (
        <div className="my-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {pokemonList.map((item) => {
            return (
              <div
                className="bg-white rounded-xl shadow-md p-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="mx-auto"
                  width={200}
                  height={200}
                  src={item.image}
                ></img>
                <h5 className={`mb-6 text-xl font-semibold`}>
                  {item.name[0].toUpperCase() + item.name.slice(1)}
                </h5>
                <a
                  href={`/pokemon/${item.id}`}
                  className={`m-0 max-w-[30ch] text-sm text-blue-600 opacity-50`}
                >
                  Details{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="my-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            return (
              <div className="border shadow rounded-xl p-4 max-w-sm w-full mx-auto">
                <div className="animate-pulse ">
                  <div className="flex flex-col items-center ">
                    <div className="rounded-full bg-slate-200 h-48 w-36"></div>
                  </div>
                  <div className="mt-8">
                    <div className="mt-2 bg-slate-200 h-8 w-full"></div>
                    <div className="mt-2 bg-slate-200 h-4 w-full"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
