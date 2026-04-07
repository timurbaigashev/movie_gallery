// src/components/MovieCard/MovieCard.jsx
import { useState } from 'react';
import styles from './MovieCard.module.css';
import MovieCardContext from '../../context/MovieCardContext';

export default function MovieCard({ children, movie, onCommentClick }) {
    // Если передали onCommentClick из родителя — используем его, иначе локальное состояние
    const handleOpenComment = onCommentClick || (() => { });

    const value = {
        movie,
        openCommentModal: handleOpenComment,
    };

    return (
        <MovieCardContext.Provider value={value}>
            <div className={styles.card}>
                {children}
            </div>
        </MovieCardContext.Provider>
    );
}