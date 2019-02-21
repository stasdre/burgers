const videoBox = document.querySelector('.video');
const video = videoBox.querySelector('.video__container');

const playButton = videoBox.querySelectorAll('.video__play-action');
const volumeButton = videoBox.querySelector('.video__volum-icon');

const videoProgressContainer = videoBox.querySelector('.video__progress_video');
const videoProgress = videoProgressContainer.querySelector('.video__progress-point');

const audioProgressContainer = videoBox.querySelector('.video__progress_audio');
const audioProgress = audioProgressContainer.querySelector('.video__progress-point');


video.addEventListener('loadedmetadata', () => {
  audioProgress.style.left = (video.volume * 100) + '%';
});

video.addEventListener('click', playPause);

for (let i = 0; i < playButton.length; i++) {
  playButton[i].addEventListener('click', playPause);
}

volumeButton.addEventListener('click', () => {
  if (!video.muted) {
    video.muted = true;
  } else {
    video.muted = false;
  }
});

video.addEventListener('timeupdate', () => {
  var currentPos = video.currentTime;
  var maxduration = video.duration;
  var perc = 100 * currentPos / maxduration;
  videoProgress.style.left = perc + '%';
});

videoProgressContainer.addEventListener('click', e => {
  const progressStyles = e.currentTarget.getBoundingClientRect();
  const currentPos = e.layerX;
  const perc = 100 * currentPos / progressStyles.width;
  video.currentTime = video.duration * perc / 100;
});

audioProgressContainer.addEventListener('click', e => {
  const progressStyles = e.currentTarget.getBoundingClientRect();
  const currentPos = e.layerX;
  const perc = currentPos / progressStyles.width;
  video.volume = perc;
  audioProgress.style.left = (perc * 100) + '%'
});


function playPause() {
  if (video.paused || video.ended) {
    video.classList.add('played');
    video.play();
  } else {
    video.classList.remove('played');
    video.pause();
  }
}