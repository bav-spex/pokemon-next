import useSWR from "swr";

import apiHelper from "@/helper/apiHelper";

export function getSinglePokemon(id, successCallback) {
  return apiHelper(`pokemon/${id}`, "get", null, {}).then((res) => {
    return res.data;
  });
}

export function getCategoriesArray() {
  return apiHelper(`api/v1/category`, "get", null, {});
}
export function getPokemonApi({ params }) {
  return apiHelper(`pokemon`, "get", null, {});
}

const getPokemonFetcher = async ({ url, ...params }) => {
  const searchData = await getPokemonApi({
    params,
  });
  return searchData.data.results;
};

const usePaginatedPokemon = (params) => {
  return useSWR(
    params
      ? {
          url: `/api/pokemon`,
          ...params,
        }
      : null,
    getPokemonFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3000,
      errorRetryCount: 3,
    }
  );
};

export default usePaginatedPokemon;
