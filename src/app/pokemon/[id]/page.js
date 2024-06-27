"use client";
import { getSinglePokemon } from "@/api/pokemon";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PokemonDetailPage = () => {
  const { id } = useParams();

  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSinglePokemon(id)
      .then((res) => {
        setPokemonData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-gray-200">
        <Link
          href={`/`}
          className={`m-0 mb-10 max-w-[30ch] text-md text-blue-600 opacity-50 font-bold`}
        >
          &lt;Back
        </Link>
        <div className=" mt-5 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-md w-96 overflow-hidden">
            <div className="bg-teal-300 flex items-center justify-center">
              <Image
                width={250}
                height={250}
                src={pokemonData.sprites.front_default}
              ></Image>
            </div>
            <div className="p-4 bg-amber-300">
              <div className="">
                <span className="font-bold mr-2 whitespace-nowrap">
                  Name :{" "}
                </span>
                <span>{pokemonData.name}</span>
              </div>
              <div className="">
                <span className="font-bold mr-2 whitespace-nowrap">
                  Type :{" "}
                </span>
                <span>
                  {pokemonData.types.map((item) => item.type.name).join(", ")}
                </span>
              </div>
              <div className="">
                <span className="font-bold mr-2 whitespace-nowrap">
                  Stats:{" "}
                </span>
                <span>
                  {pokemonData.stats.map((item) => item.stat.name).join(", ")}
                </span>
              </div>
              <div className="">
                <span className="font-bold mr-2 whitespace-nowrap">
                  Some Moves:
                </span>
                <span>
                  {pokemonData.moves
                    .slice(0, 5)
                    .map((item) => item.move.name)
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PokemonDetailPage;
