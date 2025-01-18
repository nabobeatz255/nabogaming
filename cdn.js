hii in the shared post is it possible to write authors name and the description of it 

 function refreshData(){currentUser&&(loadPosts(),loadLikedPosts(),loadUserAndTeams())}setInterval(refreshData,3e4);import{initializeApp}from"https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";import{getAuth,onAuthStateChanged}from"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";import{getDatabase,ref,push,update,set,onValue,remove,serverTimestamp,get}from"https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";import{getStorage,ref as storageRef,uploadBytes,getDownloadURL}from"https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";import{updateProfile}from"https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";const firebaseConfig={apiKey:"AIzaSyC_VKdV-KsIzUiOb7jFLsYXdTsuGkLiS-Q",authDomain:"register-71bde.firebaseapp.com",projectId:"register-71bde",storageBucket:"register-71bde.appspot.com",messagingSenderId:"412548441298",appId:"1:412548441298:web:e0fb2b6c5fbd4af7d0b90b"},app=initializeApp(firebaseConfig),auth=getAuth(),db=getDatabase(app),storage=getStorage(app);let currentUser=null;const premiumUsers=["Sw9hx2GrwMYPkmzimgOMsTEbKK53"],enablePremiumFeatures=(onAuthStateChanged(auth,async e=>{(currentUser=e)?(loadPosts(),loadLikedPosts(),displayUserDetails(),loadMessages(),loadUserAndTeams(),premiumUsers.includes(currentUser?.uid)?await enablePremiumFeatures():await enableFreeUserFeatures()):(showToast("You are not signed in. Redirecting to login...","error"),window.location.href="index.html")}),async()=>{showToast("Welcome Premium User! Enjoy exclusive features.","success");var e=document.getElementById("premium-post-btn"),e=(e&&e.classList.remove("hidden"),document.getElementById("premium-only-element"));e&&(e.style.display="block")}),enableFreeUserFeatures=async()=>{showToast("New Version 3.0 Coming 14th February...Get Ready","info");var e=document.getElementById("free-user-ads"),e=(e&&(e.style.display="block"),document.getElementById("premium-post-btn")),e=(e&&e.classList.add("hidden"),document.getElementById("current-user-premium"));e&&(e.style.display="block")},handleBoxClick=(document.addEventListener("DOMContentLoaded",()=>{var e;currentUser&&(e=ref(db,"teams/"+currentUser.uid),get(e).then(e=>{var t,s;e.exists()&&(e=e.val().team,e=document.querySelector(`[data-team="${e}"]`))&&(t=currentUser.photoURL||"default-profile-pic.jpg",s=currentUser.displayName||"Anonymous",e.querySelector(".plus-box").innerHTML=`<img src="${t}" alt="${s}" style="width: 60px; height: 60px; border-radius: 50%;">`,e.querySelector("h5").textContent=s)}).catch(e=>{console.error("Error loading user team:",e)}),e=ref(db,"teams"),get(e).then(e=>{if(e.exists()){const s=e.val();Object.keys(s).forEach(e=>{var t=s[e].members,e=document.querySelector(`[data-team="${e}"]`);e&&(t=Object.values(t)[0])&&(e.querySelector(".plus-box").innerHTML=`<img src="${t.photo}" alt="${t.name}" style="width: 60px; height: 60px; border-radius: 50%;">`,e.querySelector("h5").textContent=t.name)})}}).catch(e=>{console.error("Error loading team members:",e)}))}),document.querySelectorAll(".grid-modali-item").forEach(e=>{e.addEventListener("click",()=>handleBoxClick(e))}),t=>{const s=t.dataset.team;if(currentUser){const o=currentUser.displayName||"Anonymous",r=currentUser.photoURL||"default-profile-pic.jpg";var e=ref(db,"teams/"+currentUser.uid);get(e).then(e=>{e.exists()?(e=e.val().team,showToast(`You are already a player ${e}. You cannot join another number.`,"warning")):(e=ref(db,`teams/${s}/members`),get(e).then(e=>{e.exists()&&0<Object.keys(e.val()).length?showToast(`Player ${s} is already taken.`,"warning"):(e=ref(db,`teams/${s}/members/`+currentUser.uid),set(e,{name:o,photo:r}).then(()=>{showToast(`Welcome player ${s}!`,"success"),t.querySelector(".plus-box").innerHTML=`
  <img src="${r}" alt="${o}" style="width: 60px; height: 60px; border-radius: 50%;">
  <div class="player-number" style="position: absolute; bottom: 5px; right: 5px;z-index:99999; background: #3aafa9; color: white; padding: 2px 5px; border-radius: 3px; font-size: 12px;">
    #${s}
  </div>`,t.querySelector("h5").textContent=o,updateUserTeam(currentUser.uid,s)}).catch(e=>{console.error("Error joining team:",e),showToast("Failed to join as a player. Please try again.","error")}))}).catch(e=>{console.error("Error checking team box:",e)}))}).catch(e=>{console.error("Error checking user team:",e)})}else showToast("Please wait a moment...","info")});function loadUserAndTeams(){var e=ref(db,"teams/"+currentUser.uid),e=(get(e).then(e=>{var t,s,o;e.exists()&&(e=e.val().team,t=document.querySelector(`[data-team="${e}"]`))&&(s=currentUser.photoURL||"default-profile-pic.jpg",o=currentUser.displayName||"Anonymous",t.querySelector(".plus-box").innerHTML=`
          <img src="${s}" alt="${o}" style="width: 60px; height: 60px; border-radius: 50%;">
          <div class="player-number" style="position: absolute; bottom: 5px; right: 5px; z-index: 99999; background: #3aafa9; color: white; padding: 2px 5px; border-radius: 3px; font-size: 12px;">
            #${e}
          </div>`,t.querySelector("h5").textContent=o)}).catch(e=>{console.error("Error loading user team:",e)}),ref(db,"teams"));get(e).then(e=>{if(e.exists()){const o=e.val();Object.keys(o).forEach(e=>{var t=o[e]?.members,s=document.querySelector(`[data-team="${e}"]`);s&&t&&(t=Object.values(t)[0])&&(s.querySelector(".plus-box").innerHTML=`
              <img src="${t.photo}" alt="${t.name}" style="width: 60px; height: 60px; border-radius: 50%;">
              <div class="player-number" style="position: absolute; bottom: 5px; right: 5px; z-index: 99999; background: #3aafa9; color: white; padding: 2px 5px; border-radius: 3px; font-size: 12px;">
                #${e}
              </div>`,s.querySelector("h5").textContent=t.name)})}}).catch(e=>{console.error("Error loading team members:",e)})}const updateUserTeam=(e,t)=>{e=ref(db,"teams/"+e);set(e,{team:t})},showToast=(e,t="info")=>{const s=document.createElement("div");s.classList.add("toast",t),s.textContent=e,document.body.appendChild(s),setTimeout(()=>{s.remove()},3e3)},style=document.createElement("style"),formatTimestamp=(style.textContent=`
.toast {
    position: fixed;
    top: 0;
    left: 50%;
    padding: 13px; /* Padding for spacing */
    transform: translateX(-50%);
    width: 100vw; /* Full width of the viewport */
    height: 60px;
    color: white;
    display: flex; /* Use flexbox for centering */
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    text-align: center;
    font-size: 14px;
    opacity: 0;
    z-index: 999999;
    animation: slideFromTop 0.5s ease-out forwards;
    border-left: 3px solid;
}

.toast.success {
    border-left-color: green;
    border-left-width: 7px; /* Adjust the width as needed */
    border-left-style: solid; /* Ensure the border is visible */
    background-color: white;
    color: green;
}


.toast.error {
    border-left-color: #f44336;
    background-color: white;
     border-left-width: 7px; /* Adjust the width as needed */
    border-left-style: solid; /* Ensure the border is visible */
    color: #f44336;
}

.toast.info {
    border-left-color: blue;
     border-left-width: 7px; /* Adjust the width as needed */
    border-left-style: solid; /* Ensure the border is visible */
    background-color: white;
    color: blue;
}

.toast.warning {
    border-left-color: #FF9800;
     border-left-width: 7px; /* Adjust the width as needed */
    border-left-style: solid; /* Ensure the border is visible */
    background-color: white;
    color: #FF9800;
}

/* Slide from top animation */
@keyframes slideFromTop {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

  `,document.head.appendChild(style),e=>{var e=new Date-new Date(e),e=Math.floor(e/1e3),t=Math.floor(e/60),s=Math.floor(t/60),o=Math.floor(s/24),r=Math.floor(o/30),a=Math.floor(r/12);return e<60?"Just now":t<60?t+"m ago":s<24?s+"hr ago":o<30?o+"d ago":r<12?r+"mo ago":a+"yr "}),loadPosts=()=>{const o=document.getElementById("allposts"),r=document.getElementById("myposts");var e;o&&r&&(o.innerHTML="",r.innerHTML="",e=ref(db,"posts"),onValue(e,e=>{const s=[];e.forEach(e=>{var t=e.val(),e=e.key;s.push({postId:e,...t})}),s.sort((e,t)=>t.timestamp-e.timestamp);var e=s.filter(e=>e.authorName===currentUser.displayName),t=s;e.forEach(e=>displayPost(e,r,!0)),t.forEach(e=>displayPost(e,o,!1)),insertRandomContent()}))};function insertRandomContent(){var e,t,s=document.getElementById("allposts"),o=document.getElementById("myRandomContent");s&&o&&((o=o.cloneNode(!0)).style.display="block",e=Array.from(s.children),t=Math.floor(e.length/2),0<e.length?s.insertBefore(o,e[t]):s.appendChild(o))}const loadLikedPosts=()=>{const t=document.getElementById("likedposts");var e;t&&(t.innerHTML="",e=ref(db,"posts"),onValue(e,e=>{const s=[];e.forEach(e=>{var t=e.val(),e=e.key;s.push({postId:e,...t})}),s.sort((e,t)=>t.timestamp-e.timestamp),s.filter(e=>e.likes&&e.likes[currentUser.uid]&&e.authorName!==currentUser.displayName).forEach(e=>displayPost(e,t,!1))}))},displayPost=(e,t,s)=>{var o=t.querySelector(`[data-post-id="${e.postId}"]`);if(!o){var o=e.comments?Object.keys(e.comments).length:0,r=document.createElement("div");r.className="instagram-post-2",r.setAttribute("data-post-id",e.postId);const a=window.location.origin+"/dashboard.html?postId="+e.postId;r.innerHTML=`
    <div class="post-header">
      <div class="profile-picture">
        <img src="${e.authorPhoto}" alt="User profile picture">
      </div>
      <div class="profile-details">
        <div class="profile-name">${e.authorName}</div>
        <div class="post-time-2">${formatTimestamp(e.timestamp)} • <span class="like-count">${Object.keys(e.likes||{}).length} likes</span></div>
      </div>
        <div class="post-options">
                <i class="ri-more-fill"></i>
                <div class="options-menu">
                  <ul>
                  ${s?`<li class="edit-btn" data-id="${e.postId}">Edit The Post</li>`:""}
                  <li class="toggle-comments" data-id="${e.postId}">View Post</li>
  <li class="like-btn" data-id="${e.postId}">Like ${e.authorName}'s Post</li>
                <li class="share-btn" data-id="${e.postId}" data-url="${a}">Share ${e.authorName}'s Post</li>
                  <li><span class="comment-count">Current comments ${o}</span></li>
                    ${s?`<li class="delete-post-btn" data-id="${e.postId}">Delete My Post</li>`:""}
                  </ul>
                </div>
              </div>
    </div>
    <div class="post-image toggle-comments">
      <img src="${e.imageUrl}" alt="Post content">
    </div>
    <div class="caption">
      <span class="username">${e.authorName}</span> ${e.content}
    </div>
  `,t.appendChild(r),r.querySelector(".like-btn").addEventListener("click",()=>likePost(e.postId)),r.querySelector(".toggle-comments").addEventListener("click",()=>showCommentsPopup(e)),r.querySelector(".share-btn").addEventListener("click",()=>{navigator.clipboard.writeText(a).then(()=>{showToast("Link copied to clipboard!","success")}).catch(e=>{console.error("Failed to copy link: ",e),showToast("Failed to copy link","error")})}),r.querySelector(".post-image img").addEventListener("click",()=>{showToast("Please wait for the shared post...","info"),window.open(a,"_blank")}),s&&(r.querySelector(".delete-post-btn").addEventListener("click",()=>deletePost(e.postId)),r.querySelector(".edit-btn").addEventListener("click",()=>editPost(e)))}},urlParams=new URLSearchParams(window.location.search),postIdFromUrl=urlParams.get("postId");if(postIdFromUrl){const $a=ref(db,"posts/"+postIdFromUrl);get($a).then(e=>{e.exists()?((e=e.val()).postId=postIdFromUrl,showCommentsPopup(e)):showToast("Pole! Post Hiyo Inawezekana Imefutwa Au Haipo.","error")}).catch(e=>{console.error("Error loading post: ",e),showToast("Error loading post.","error")})}const showCommentsPopup=s=>{const o=document.createElement("div");o.className="comments-popup",o.innerHTML=`
    <div class="comments-popup-content">
 <div class="post-header">
      <div class="profile-details">
        <div class="profile-name">${s.authorName}'s post</div>
        <div class="post-time-2">Posted ${formatTimestamp(s.timestamp)} • <span class="like-count">${Object.keys(s.likes||{}).length} likes</span></div>
      </div>
<span class="close-popup"><i class="ri-close-line"></i></span>
</div>
     <div class="post-image2">
      <img src="${s.imageUrl}" alt="Post content">
    </div>
    <div class="caption">
      <span class="username">${s.authorName}</span> ${s.content}
    </div>
      <div class="comments-list">${renderComments(s.comments)}</div>
      <div class="comment-input-container" >
        <input class="comment-input" placeholder="Write a comment...">
        <button class="submit-comment" data-post-id="${s.postId}">Send</button>
      </div>
    </div>
  `,document.body.appendChild(o),o.querySelector(".close-popup").addEventListener("click",()=>o.remove()),o.querySelector(".submit-comment").addEventListener("click",()=>{var e=o.querySelector(".comment-input"),t=e.value.trim();""!==t&&(submitComment(s.postId,t),e.value="")})},renderComments=t=>t?Object.keys(t).map(e=>{e=t[e];return`
        <div class="comment">
          <span class="comment-username">${e.username}</span><br><span class="comment-sms">${e.message}</span>
        </div>
      `}).join(""):"",likePost=async e=>{e=ref(db,`posts/${e}/likes/`+currentUser.uid);(await get(e)).exists()?(await remove(e),showToast("unliked","info")):(await set(e,!0),showToast("you liked the post","success")),loadPosts()},submitComment=async(e,t)=>{var t={username:currentUser.displayName,message:t},s=push(ref(db,`posts/${e}/comments`)).key;await set(ref(db,`posts/${e}/comments/`+s),t),showToast("comment added","success"),loadPosts()},deletePost=async e=>{e=ref(db,"posts/"+e);await remove(e),loadPosts(),showToast("post imefutwa","success")},editPost=e=>{var t=prompt("Edit your post content:",e.content);null!==t&&(e=ref(db,"posts/"+e.postId),update(e,{content:t}),showToast("post imeupdatiwa","success"),loadPosts())},createNewPost=async()=>{var t=document.getElementById("new-post-caption")?.value,s=document.getElementById("new-post-image")?.files[0];if(t||s)try{let e="";showToast("Uploading post yako...Tafadhari subiri","info"),s&&(o=storageRef(storage,`post_images/${currentUser.uid}/`+s.name),await uploadBytes(o,s),e=await getDownloadURL(o),showToast("ukaguzi wa post umekamilika","info"));var o,r=push(ref(db,"posts")).key;await set(ref(db,"posts/"+r),{authorName:currentUser.displayName||"Anonymous",authorPhoto:currentUser.photoURL||"default.jpg",content:t,imageUrl:e,timestamp:serverTimestamp(),likes:{},comments:{}}),showToast("Post yako imetengenezwa tayari...reloading!","success"),window.location.reload()}catch(e){console.error("Error creating post:",e),showToast("Error creating post","error")}else showToast("tafadhari weka caption na image.","warning")},updateUserProfile=async()=>{var e=document.getElementById("username")?.value.trim(),t=document.getElementById("profile-picture-input")?.files[0];if(e||t)try{var s=auth.currentUser;if(console.log("Authenticated user:",s),s){if(e&&e!==s.displayName)try{console.log("Updating username to:",e),await updateProfile(s,{displayName:e}),showToast("Username updated successfully!","success")}catch(e){console.error("Error updating username:",e),showToast("Error updating username. Please try again.","error")}if(t){console.log("New profile picture:",t);var o=storageRef(storage,`profile_pictures/${s.uid}/`+t.name);console.log("Storage reference:",o);try{await uploadBytes(o,t),console.log("Profile picture uploaded successfully.");var r=await getDownloadURL(o);console.log("New profile picture URL:",r),await updateProfile(s,{photoURL:r}),showToast("Profile picture updated successfully!","success")}catch(e){console.error("Error uploading profile picture:",e),showToast("Error uploading profile picture. Please try again.","error")}}window.location.reload()}else showToast("User not authenticated. Please log in.","error")}catch(e){console.error("Error updating profile:",e),showToast("Error updating profile. Please try again.","error")}else showToast("Please provide a new username or profile picture.","warning")},displayUserDetails=(document.getElementById("update-profile-button")?.addEventListener("click",updateUserProfile),document.getElementById("profile-picture-input")?.addEventListener("change",e=>{e=e.target.files[0];if(e){const t=new FileReader;t.onload=()=>{document.getElementById("profile-picture").src=t.result},t.readAsDataURL(e)}}),()=>{var e=auth.currentUser;if(e){const t=e.displayName||"Anonymous",s=e.email||"No email available",o=e.photoURL||"default-profile-pic.jpg";document.querySelectorAll(".user-name").forEach(e=>{e.innerHTML=t}),document.querySelectorAll(".user-email").forEach(e=>{e.textContent=s}),document.querySelectorAll(".profile-picture").forEach(e=>{e.src=o})}}),loadMessages=(onAuthStateChanged(auth,e=>{e&&displayUserDetails()}),document.getElementById("create-post-button")?.addEventListener("click",createNewPost),()=>{var e=ref(db,"messages");const o=document.getElementById("chat-box");onValue(e,e=>{const t=[];e.forEach(e=>{e=e.val();t.push(e)}),o.innerHTML="",t.forEach(e=>{var t=document.createElement("div"),s=(t.classList.add("message",e.senderId===currentUser.uid?"right":"left"),e.senderPhotoURL||"default-profile-picture.jpg");t.innerHTML=`
      
       <div class="post-header getNow">
      <div class="profile-picture">
        <img src="${s}" alt="${e.senderName}'s profile picture" >
      </div>
      <div class="profile-details">
        <div class="profile-name">${e.senderName}</div>
        <div class="post-time-3">${e.text}</span></div> 
      </div>
    </div>
      `,o.appendChild(t)}),o.scrollTop=o.scrollHeight})}),sendMessage=async()=>{var e,t=document.getElementById("chat-message-input"),s=t.value.trim();s?(e=ref(db,"messages"),e=push(e),await set(e,{senderId:currentUser.uid,senderName:currentUser.displayName||"Anonymous",senderPhotoURL:currentUser.photoURL||"default-profile-picture.jpg",text:s,timestamp:serverTimestamp()}),t.value="",showToast("Message sent!","success")):showToast("Please enter a message.","warning")};document.getElementById("send-message-button")?.addEventListener("click",sendMessage);