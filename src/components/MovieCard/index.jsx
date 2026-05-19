// src/components/MovieCard/index.jsx
import MovieCard from './MovieCard';
import { MovieCardHeader } from './MovieCardHeader';
import { MovieCardBody } from './MovieCardBody';
import { MovieCardFooter } from './MovieCardFooter';

MovieCard.Header = MovieCardHeader;
MovieCard.Body = MovieCardBody;
MovieCard.Footer = MovieCardFooter;

export default MovieCard;
export { MovieCardHeader, MovieCardBody, MovieCardFooter };