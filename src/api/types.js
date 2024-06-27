import apiHelper from "@/helper/apiHelper";
import useSWR from "swr";

export function getSingleType(id, successCallback) {
  return apiHelper(`type/${id}`, "get", null, {}).then((res) => {
    return res.data.pokemon;
  });
}

/////////////////////////////////////////////////////////////////////////////////
export function getTypesApi({ params }) {
  return apiHelper(`type`, "get", null, {});
}

const getTypesFetcher = async ({ url, ...params }) => {
  const searchData = await getTypesApi({
    params,
  });
  return searchData.data.results;
};

const useTypes = (params) => {
  return useSWR(
    params
      ? {
          url: `/api/types`,
          ...params,
        }
      : null,
    getTypesFetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3000,
      errorRetryCount: 3,
    }
  );
};

export default useTypes;
