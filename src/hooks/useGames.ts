import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import { Platform } from "./usePlateforms";
import useGameQueryStore from "../store";

const apiClient = new APIClient<Game>("/games");

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = () => {
  const { gameQuery } = useGameQueryStore();

  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: ["game", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_plateforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: ms("24h"),
  });
};

export default useGames;
