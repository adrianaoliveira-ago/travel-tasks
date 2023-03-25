// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIsqJgq4J0IGq8mZKoRBrLCrFGvbkNkBM",
  authDomain: "social-signin-t015.firebaseapp.com",
  projectId: "social-signin-t015",
  storageBucket: "social-signin-t015.appspot.com",
  messagingSenderId: "1036941310627",
  appId: "1:1036941310627:web:97b5cb8d1d387c69775d16",
  measurementId: "G-SY8LP0WGTC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log("signInWithPopup", { user });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

// interface Task {
//   id?: string;
//   uid?: string;
//   label: string;
//   priority: number;
//   total: number;
//   createdAt: number;
//   updatedAt: number;
// }

// const putTask = async (task: Task) => {
//   console.log(auth.currentUser);
//   const { uid } = auth.currentUser;

//   const taskToAdd: Task = {
//     ...task,
//     uid: uid, // inject uid if a new task
//   };

//   console.log(taskToAdd);

//   // if id => edit, else create new with random id
//   if (task.id) {
//     taskToAdd.updatedAt = Date.now();

//     const taskRef = doc(db, "tasks", task.id);
//     await setDoc(taskRef, taskToAdd, { merge: true });
//   } else {
//     taskToAdd.createdAt = Date.now();
//     taskToAdd.updatedAt = Date.now();
//     // Add a new document with a generated id.
//     await addDoc(collection(db, "tasks"), taskToAdd);
//   }

//   return true;
// };

// const fetchTasks = async () => {
//   const { uid } = auth.currentUser;

//   const q = query(collection(db, "tasks"), where("uid", "==", uid), orderBy("updatedAt"));

//   const snapshot = await getDocs(q);

//   if (snapshot.empty) {
//     console.log("No matching documents.");
//     return;
//   }

//   // map to parse snapshot data
//   const map = snapshot.docs.map((doc) => {
//     // console.log(doc, doc.id, "=>", doc.data());
//     return {
//       ...doc.data(),
//       id: doc.id,
//     };
//   });

//   console.log({ fetchTasksResp: map });

//   return map;
// };

// export { auth, db, signInWithGoogle, logout, putTask, fetchTasks };
export { auth, signInWithGoogle, logout };
