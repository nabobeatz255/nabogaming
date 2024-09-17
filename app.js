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
