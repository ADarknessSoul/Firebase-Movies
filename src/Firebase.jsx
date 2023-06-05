import { useEffect, useState } from "react";
import { Auth } from "./Components/Auth";
import { db } from './config/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const Firebase = () => {

    const [movieList, setMovieList] = useState([]);
    
    //New movie states

    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleaseDate, setNewReleaseDate] = useState(0);
    const [wonAnOscar, setWonAnOscar] = useState(false);

    //Updates states
    const [updatedTitle, setUpdatedTitle] = useState("");

    const movieCollectionRef = collection(db, "movies");

    useEffect(() => {
      
        const getMovieList = onSnapshot(movieCollectionRef, (snapshot) => {

                const unsubscribe = onSnapshot(movieCollectionRef, (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                    setMovieList(data);
                });
        
                return () => unsubscribe();
        });

        //Other option with getDocs, but doesn't trigger re render

        // const data = await getDocs(movieCollectionRef);
        // const filteredData = data.docs.map( (doc) => ({
        //     ...doc.data(), id: doc.id
        // }));

        // setMovieList(filteredData);

        return () => getMovieList();

        }, []);

    const onSubmitMovie = async( ) => {

        console.log(newMovieTitle, newReleaseDate, wonAnOscar);

        try {

            await addDoc(movieCollectionRef, {
                title: newMovieTitle, 
                releaseDate: newReleaseDate, 
                receivedAnOscar: wonAnOscar,
            });

        } catch(err) {

            console.error(err);

        }

    }

    const deleteMovie = async(id) => {

        const movieDoc = doc(db, "movies", id);
        await deleteDoc(movieDoc);

    }

    const UpdateMovieTitle = async(id) => {

        const movieDoc = doc(db, "movies", id);
        await updateDoc(movieDoc, {title: updatedTitle});

    }

    return (

        <>
        
            <h1 className="text-center mb-3">Firebase</h1>

            <Auth/>

            <h2 className="text-center mt-3">Create new registry</h2>

            <form className="container">

                <label htmlFor="movieTitle">Title of the movie</label>
                <input id="movieTitle" type="text" placeholder="Movie title" className="form-control" onChange={(e) => setNewMovieTitle(e.target.value)}/>

                <label htmlFor="movieDate">Date of release</label>
                <input id="movieDate" type="number" placeholder="Release date" className="form-control" onChange={(e) => setNewReleaseDate(Number(e.target.value))}/>

                <div className="form-check mt-2">
                    <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="movieOscar" checked={wonAnOscar} onChange={(e) => setWonAnOscar(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="movieOscar">
                        Won an Oscar?
                    </label>
                </div>

                <input type="button" value="Submit movie" className="btn btn-primary mt-3 col-12" onClick={onSubmitMovie}/>

            </form>


            <div className="text-center mt-3">

                {

                    movieList.map((movie) => (

                        <div key={movie.id}>

                            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red", textTransform: "capitalize" }}>{movie.title}</h1>
                            <p>Date: {movie.releaseDate}</p>

                            <button className="btn btn-danger" onClick={() => deleteMovie(movie.id)}>Delete movie</button>

                            <div className="container border mt-3">

                                <label htmlFor="updateTitle">Update the title</label>
                                <input placeholder="New title" id="updateTitle" className="form-control" onChange={(e) => setUpdatedTitle(e.target.value)}/>
                                <button className="btn btn-info col-12 mt-2 mb-2" onClick={() => UpdateMovieTitle(movie.id)}>Update title</button>

                            </div>

                        </div>

                    ))

                }

            </div>

        
        </>

    );

}