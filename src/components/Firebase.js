import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getCollections, collection, addDoc, query, where, getDocs, updateDoc } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID, 
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();



const signInWithGoogle = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const db = getFirestore(app);
      const user = result.user;
      const q = query(collection(db, "users"), where("userID", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await createUserInfo(user);
      }
      
      resolve(user);
    } catch (error) {
      const errorMessage = error.message;
      reject(errorMessage);
    }
  });
}

const createNewUser = (email, password) => {
  return new Promise ((resolve, reject) => {
    console.log("email: ", email);
    console.log("password: ", password);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      createUserInfo(user);
      console.log("user: ", user);
      resolve(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      reject(errorMessage);
    });
  })
}

const signInUser = (email, password) => {
  return new Promise ((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      resolve(user);
    })
    .catch((error) => {
      console.log("error", error.message);
      reject(error);
    });
  })
}

const addTrade = async (user, docData) => {
  const db = getFirestore(app);
  // Add trade to trades collection
  const docRef = await addDoc(collection(db, "trades"), docData);

  // Get document with our user info
  const q = query(collection(db, "users"), where("userID", "==", user.uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDocument = querySnapshot.docs[0];
    const querySnapshot = await getDocs(collection(db, "users", "holdings"));

    const newHolding = {
      stockSymbol: docData.stock,
      quantity: docData.amount,
    };

    const existingHoldingQuery = query(holdingsRef, where("stockSymbol", "==", newHolding.stockSymbol));
    const existingHoldingSnapshot = await getDocs(existingHoldingQuery);

    if (!existingHoldingSnapshot.empty) {
      const existingHoldingDoc = existingHoldingSnapshot.docs[0];
      const existingHoldingData = existingHoldingDoc.data();

      const updatedQuantity = existingHoldingData.quantity + newHolding.quantity;

      await updateDoc(existingHoldingDoc.ref, { quantity: updatedQuantity });
    } else {
      await addDoc(holdingsRef, newHolding);
    }
  } else {
    console.error("User document not found.");
  }

  console.log("doc", docRef);
};



const updateUser = async (user) => {
  const uid = user.uid;
  const userData = {
    uid: uid,
    balance: 0,
  }
}

const createUserInfo = async (user) => {
  const db = getFirestore(app);
  const uid = user.uid;
  const userData = {
    uid: uid,
    balance: 0,
  }
  const userRef = await addDoc(collection(db, "users"), userData);
}

const getOrders = async (user) => {
  console.log("userID: ", user.uid);
  const db = getFirestore(app);
  const q = query(collection(db, "trades"), where("userID", "==", user.uid));
  const querySnapshot = await getDocs(q);
  const ordersArray = [];
  
  querySnapshot.forEach((doc) => {
    ordersArray.push({ id: doc.id, data: doc.data() });
  });

  return ordersArray;
}


export {auth, signInWithGoogle, createNewUser, signInUser, addTrade, getOrders}