// Import Firebase
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

    // Your Firebase config object
    const firebaseConfig = {
      apiKey: "AIzaSyC_VKdV-KsIzUiOb7jFLsYXdTsuGkLiS-Q",
      authDomain: "register-71bde.firebaseapp.com",
      databaseURL: "https://register-71bde-default-rtdb.firebaseio.com",
      projectId: "register-71bde",
      storageBucket: "register-71bde.appspot.com",
      messagingSenderId: "412548441298",
      appId: "1:412548441298:web:e0fb2b6c5fbd4af7d0b90b",
      measurementId: "G-0FVNTD9W48"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Check if the user is already signed in and display the user's info
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, show their info
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;

        // Display user info using getElementById
        document.getElementById("user-name").textContent = displayName;
        document.getElementById("user-email").textContent = email;
        document.getElementById("user-photo").src = photoURL;
      } else {
        // No user is signed in, redirect to sign-in page
        window.location.href = "index.html";  // Redirect to sign-in page if not signed in
      }
    });

    // Function to sign out
    const googleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
          window.location.href = "index.html";  // Redirect to sign-in page after sign out
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    // Add event listener for the sign-out button after the DOM is loaded
    window.addEventListener('DOMContentLoaded', () => {
      document.getElementById('signout-button').addEventListener('click', googleSignOut);
    });