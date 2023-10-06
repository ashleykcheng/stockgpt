import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {  setDoc, doc, getDoc, collection, addDoc, query, where, getDocs, updateDoc } from "firebase/firestore"; 


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
      console.log(user);
      const q = query(collection(db, "users"), where("userID", "==", user.uid));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        await createUserInfo(user, user.displayName);
      }
      
      resolve(user);
    } catch (error) {
      const errorMessage = error.message;
      reject(errorMessage);
    }
  });
}

const createNewUser = (email, password, firstName, lastName) => {
  return new Promise ((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      createUserInfo(user, firstName + " " + lastName);
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
  const db = getFirestore();

  // Add trade to the "trades" collection
  const tradesCollectionRef = collection(db, "trades");
  await addDoc(tradesCollectionRef, docData);
  const uid = user.uid;
  // gets user document from users collection
  const docRef = doc (db, "holdings", uid);
  
  const stockSymbol = docData.stock;
  const quantity = docData.amount;
  
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const stockAmount = data[stockSymbol];
  console.log("stock", stockAmount);

  if (docData.action == 'buy'){
    if (stockAmount != null){
      console.log("update");
      const newStockAmount = Number(stockAmount) + Number(quantity);
      await updateDoc (docRef, {[stockSymbol]: Number(newStockAmount)});
    }
    else{
      console.log("new");
      const newHolding = {
        [stockSymbol]: Number(quantity),
      }
      await updateDoc(docRef, newHolding);
    }
  }
  else{
    if (stockAmount != null){
      console.log("update");
      if (stockAmount >= quantity){
        const newStockAmount = Number(stockAmount) - Number(quantity);
        await updateDoc (docRef, {[stockSymbol]: Number(newStockAmount)});
      }
      else{
        console.log("error");
      }
    }
    else{
      console.log("error");
    }
  }
};

const createUserInfo = async (user, displayName) => {
  const db = getFirestore(app);
  const uid = user.uid;

  const userData = {
    userID: uid,
    name: displayName,
    balance: Number(10000),
  }

  await addDoc(collection(db, "users"), userData);
  await setDoc(doc(db, "holdings", uid), {userID: uid});

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

const getBalance = async (user) => {
  const db = getFirestore(app);
  const q = query(collection(db, "trades"), where("userID", "==", user.uid));
  const querySnapshot = await getDocs(q);
  
}


export {auth, signInWithGoogle, createNewUser, signInUser, addTrade, getOrders}