 // Load the IFrame Player API code asynchronously
 var tag = document.createElement('script');
 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

 var player;
 
document.getElementById('closeModal').style.display = 'none';
 // Close the modal
 document.getElementById('closeModal').addEventListener('click', function() {
     document.getElementById('videoModal').style.display = 'none';
     if (player) {
         player.stopVideo(); // Stop the video when the modal is closed
     }
 });

 // Create an iframe and YouTube player after the API code downloads
 function onYouTubeIframeAPIReady() {
     console.log("ready")
     player = new YT.Player('tutorialVideo', {
         height: '400',
         width: '840',
         videoId: 'SyWfpfcpgHg',
         events: {
             'onStateChange': onPlayerStateChange
         }
     });
 }


function onPlayerStateChange(event) {
    console.log("Player state changed:", event.data);
    if(event.data === 0){
        document.getElementById('closeModal').style.display = 'block';
        console.log("state")
    }
 }

