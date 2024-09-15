var modals = document.querySelectorAll('.modal');

var openModalButtons = document.querySelectorAll('[id^="openModalButton"]'); 

// Get all close buttons
var closeButtons = document.querySelectorAll('.close');

// Function to show a modal
function showModal(modal) {
    modal.classList.add("show");
}

// Function to close a modal
function closeModal(modal) {
    modal.classList.remove("show");
}

// Attach event listeners for opening modals
openModalButtons.forEach(button => {
    button.onclick = function() {
        var modalId = this.id.replace('openModalButton', 'modal');
        var modal = document.getElementById(modalId);
        showModal(modal);
    };
});

// Attach event listeners for closing modals
closeButtons.forEach(button => {
    button.onclick = function() {
        var modal = this.closest('.modal');
        closeModal(modal);
    };
});

// Click outside modal to close
window.onclick = function(event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}


function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval > 1) {
            return `${interval} ${unit}s ago`;
        } else if (interval === 1) {
            return `1 ${unit} ago`;
        }
    }

    return 'Just now';
}

function updateAndDisplayTimeAgo() {
    const timeagoElements = document.querySelectorAll('.timeago');

    timeagoElements.forEach(timeagoElement => {
        const timestamp = new Date(timeagoElement.dataset.timestamp);
        const displaySeconds = Math.random() < 0.5; // Randomly decide whether to display seconds

        const timeString = displaySeconds ? timeAgo(timestamp) : timeAgo(timestamp).replace(/\d+ seconds? ago/g, '');
        timeagoElement.textContent = timeString;
    });
}

// Initial display
updateAndDisplayTimeAgo();

// Update display every second
setInterval(updateAndDisplayTimeAgo, 1000);

document.getElementById('sendButton').addEventListener('click', function() {
    const message = document.getElementById('messageInput').value;

    if (!message) {
        alert('Tafadhali Weka Comment Kabla Ya Kutuma.');
        return;
    }
  
    // Normally, you'd send the SMS using an API. 
    console.log(`Sending SMS: ${message}`);
    
    // Clear the message input after sending
    document.getElementById('messageInput').value = '';
});
// Select all elements with the class 'follow-btn'
function showToast(message) {
    var toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(function() { 
        toast.className = toast.className.replace('show', ''); 
    }, 3000); // Toast disappears after 3 seconds
}

document.querySelectorAll('.active').forEach(function(element) {
    element.addEventListener('click', function() {
        if (this.classList.contains('follow')) {
            this.classList.remove('follow');
            this.classList.add('following');
            this.textContent = 'Following';
            showToast('Account Followed');
        } else {
            this.classList.remove('following');
            this.classList.add('follow');
            this.textContent = 'Follow';
            showToast('Account Unfollowed');
        }
    });
});

    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

    // Function to sign in with Google
    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;
          console.log(user);

          // Redirect to another page after successful sign-in
          window.location.href = "dashboard.html";  // Replace with your target HTML page
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    // Function to sign out
    const googleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    // Add event listeners after the DOM is fully loaded
    window.addEventListener('DOMContentLoaded', () => {
      document.getElementById('google-signin').addEventListener('click', googleSignIn);
      document.getElementById('google-signout').addEventListener('click', googleSignOut);
    });
