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

const db = firebase.firestore();


const mapUserFromFirebaseAuthToUser = (user) => {
    const { displayName, email, photoURL, uid } = user;
    return {
        avatar: photoURL,
        email,
        username: displayName,
        uid
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

export const addDevit = ({avatar, content, userId, userName}) => {
    return db.collection('devits').add({
        avatar, 
        content, 
        userId, 
        userName,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        likesCount: 0,
        sharedCount: 0
    });
}

export const fetchLatestDevit = () => {
    return db.collection('devits')
        .get()
        .then(snapshot => {
            return snapshot.docs.map( doc => {
                const data = doc.data();
                const id = doc.id;
                const {createdAt} = data;
                const date = new Date(createdAt.seconds * 1000);
                const normalizedCreatedAt = new Intl.DateTimeFormat('es-ES').format(date);

                return {
                    ...data,
                    id,
                    createdAt: normalizedCreatedAt,
                };
            });
        });
}