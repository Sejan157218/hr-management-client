import { useEffect, useState } from 'react';
import initializationFirebase from '../Firebase/firebase.init';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile, signOut } from "firebase/auth";


initializationFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');




    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    // handler to register
    const handlerRegisterToEmailPass = (email, password, name, navigate) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email: email, displayName: name }
                setUser(newUser);
 
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                }).catch((error) => {
                });
                setAuthError('')
                navigate('/')
            })
            .catch((error) => {
                setAuthError(error.message)
            })
            .finally(() => setIsLoading(false));
    }

    // handler to login with email and pass
    const handlerLoginWithEmailPass = (email, password, navigate, location) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || "/";
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }
    // google sign in
    const handlerToGoogleLogin = (navigate, location) => {
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const destination = location?.state?.from || "/";
                navigate(destination);
                setAuthError('');
            }).catch((error) => {
                setAuthError(error.message);
            }).finally(() => setIsLoading(false));
    }

    // Logout 
    const SignOut = () => {
        setIsLoading(true)
        signOut(auth).then(() => {
            setAuthError('')

        }).catch((error) => {
            setAuthError(error.message)
        }).finally(() => setIsLoading(false));
    }




    // onAuthStateChanged
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            setIsLoading(true)
            if (user) {
                setUser(user)  
            }
            else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unsubscribed;
    }, [auth]);
    return {
        user,
        handlerRegisterToEmailPass,
        handlerLoginWithEmailPass,
        handlerToGoogleLogin,
        SignOut,
        authError,
        isLoading,
    }
};

export default useFirebase;