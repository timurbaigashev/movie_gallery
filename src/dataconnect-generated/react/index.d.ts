import { AllMoviesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAllMovies(options?: useDataConnectQueryOptions<AllMoviesData>): UseDataConnectQueryResult<AllMoviesData, undefined>;
export function useAllMovies(dc: DataConnect, options?: useDataConnectQueryOptions<AllMoviesData>): UseDataConnectQueryResult<AllMoviesData, undefined>;
