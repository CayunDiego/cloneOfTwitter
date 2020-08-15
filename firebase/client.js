import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtDkVl-nEXoqyunZ73OBZitFui5KynxVM",
    authDomain: "devter-492a3.firebaseapp.com",
    databaseURL: "https://devter-492a3.firebaseio.com",
    projectId: "devter-492a3",
    storageBucket: "devter-492a3.appspot.com",
    messagingSenderId: "840746188849",
    appId: "1:840746188849:web:793552d3f4be341cd39510",
    measurementId: "G-KVFQVXL252"
  };

!firebase.apps.length && firebase.initializeApp(firebaseConfig);


const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, email, photoURL } = user;
    return {
        avatar: photoURL,
        email,
        username: displayName
    }
}

export const onAuthStateChanged = (onChange) => {
    return firebase
            .auth()
            .onAuthStateChanged(user => {
                const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
                onChange(normalizedUser);
    })
}

export const loginWithGitHub = () => {
    const githubProvider = new firebase.auth.GithubAuthProvider();
    return firebase
            .auth()
            .signInWithPopup(githubProvider);
}