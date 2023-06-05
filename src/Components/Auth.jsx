import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';


export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email);

    const onSignIn = async() => {
        try {

            await createUserWithEmailAndPassword(auth, email, password);

        } catch(err) {

            console.error(err)

        }

    
    }

    const onSingInWithGoogle = async() => {

        try {

            await signInWithPopup(auth, googleProvider);

        } catch(err) {

            console.error(err);

        }

    }

    const onLogout = async() => {

        try {

            await signOut(auth);

        } catch(err) {

            console.error(err)

        }

    }



    return (

        <div className="container">

            <form >

                <label>Email</label>
                <input type="text" placeholder='Email' className="form-control" onChange={(e) => setEmail(e.target.value)}/>

                <label>Password</label>
                <input type="password" placeholder='Password' className="form-control" onChange={(e) => setPassword(e.target.value)}/>

                <button type="button" className="btn btn-primary mt-3" onClick={onSignIn}>Enviar</button>
                <button type='button' className='btn btn-secondary mt-3 mx-3' onClick={onSingInWithGoogle}>Entrar con google</button>
                <button type='button' className='btn btn-danger mt-3' onClick={onLogout}>Salir</button>

            </form>




        </div>

    );
    
}