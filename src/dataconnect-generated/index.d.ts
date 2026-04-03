import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AllMoviesData {
  movies: ({
    id: UUIDString;
    title: string;
    director: string;
    releaseYear: number;
    genre?: string | null;
    runtimeMinutes?: number | null;
    posterUrl?: string | null;
    description?: string | null;
    createdAt: TimestampString;
  } & Movie_Key)[];
}

export interface CollectionItem_Key {
  id: UUIDString;
  __typename?: 'CollectionItem_Key';
}

export interface Movie_Key {
  id: UUIDString;
  __typename?: 'Movie_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WatchedMovie_Key {
  id: UUIDString;
  __typename?: 'WatchedMovie_Key';
}

export interface WishlistItem_Key {
  id: UUIDString;
  __typename?: 'WishlistItem_Key';
}

interface AllMoviesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<AllMoviesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<AllMoviesData, undefined>;
  operationName: string;
}
export const allMoviesRef: AllMoviesRef;

export function allMovies(options?: ExecuteQueryOptions): QueryPromise<AllMoviesData, undefined>;
export function allMovies(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<AllMoviesData, undefined>;

