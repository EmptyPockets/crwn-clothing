import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCyBneRQ5TnSIq7f21n77QC_7YOeQ5sNOM",
    authDomain: "crwn-db-bbb58.firebaseapp.com",
    databaseURL: "https://crwn-db-bbb58.firebaseio.com",
    projectId: "crwn-db-bbb58",
    storageBucket: "crwn-db-bbb58.appspot.com",
    messagingSenderId: "422229649386",
    appId: "1:422229649386:web:823e0e3b83c96ef52c3493"
};

export const createUserProfileDocument = async ( userAuth, additionalData ) => {
    if ( !userAuth ) return;

    const userRef = firestore.doc( `users/${userAuth.uid}` );
    const snapShot = await userRef.get();
    if ( !snapShot.exists ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                ...additionalData
            } )
        } catch ( error ) {
            console.log( 'error creating user', error.message );
        }
    }
    return userRef;
}


firebase.initializeApp( config );

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' } );
export const signInWithGoogle = () => auth.signInWithPopup( provider );

export default firebase;
