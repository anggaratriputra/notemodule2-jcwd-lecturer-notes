import { logout } from './firebase';
import React, { useCallback, useEffect, useState } from 'react';
import { db } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import './App.css';

function Dashboard({ setOpenTab }) {
  const [newMovie, setNewMovies] = useState('');
  const [movies, setMovies] = useState([]);

  const moviesCollectionRef = collection(db, 'movies');

  const getMovies = useCallback(async () => {
    const data = await getDocs(moviesCollectionRef);

    const parseData = data.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setMovies(parseData);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  const addNewMovies = async () => {
    await addDoc(moviesCollectionRef, { name: newMovie, isWatching: false });
    setNewMovies('');
  };

  const setWatching = async (id) => {
    const movieDoc = await doc(db, 'movies', id);
    const newFields = { isWatching: true };
    await updateDoc(movieDoc, newFields);
  };

  const deleteData = async (id) => {
    const movieDoc = await doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  };

  const onLogout = () => {
    const result = logout();
    if (result === 'logout success') {
      setOpenTab(2);
    }
  };

  return (
    <>
      <h3>Dashboard</h3>
      <h4>You are login</h4>
      <div>
        <h1>List Movies</h1>
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              {movie.name}
              {!movie.isWatching && (
                <button
                  onClick={() => {
                    setWatching(movie.id);
                  }}
                >
                  set watch
                </button>
              )}{' '}
              <button
                onClick={() => {
                  deleteData(movie.id);
                }}
              >
                delete data
              </button>
            </li>
          ))}
        </ul>
        <h3>add new movies</h3>
        <input
          value={newMovie}
          onChange={(e) => setNewMovies(e.target.value)}
        />
        <button onClick={addNewMovies}>submit new movies</button>
      </div>
      <div>
        <button onClick={onLogout}>Log out</button>
      </div>
    </>
  );
}

export default Dashboard;
