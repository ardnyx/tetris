class AudioManager {
    constructor() {
        this.audioElement = null;
        this.fadeDuration = 2; // Fade duration in seconds
        this.initAudio();
    }

    initAudio() {
        if (document.getElementById('bgMusic')) {
            this.audioElement = document.getElementById('bgMusic');
        } else {
            this.audioElement = document.createElement('audio');
            this.audioElement.id = 'bgMusic';
            this.audioElement.autoplay = true;
            this.audioElement.loop = true;
            this.audioElement.src = '../assets/audiobg.mp3';
            document.body.appendChild(this.audioElement);
        }
        this.loadAudioState();
    }

    loadAudioState() {
        const savedTime = localStorage.getItem('audioCurrentTime');
        if (savedTime) {
            this.audioElement.currentTime = savedTime;
        }
        this.fadeIn();
    }

    saveAudioState() {
        localStorage.setItem('audioCurrentTime', this.audioElement.currentTime);
    }

    fadeIn() {
        const fadeSteps = this.fadeDuration * 60; // Number of fade steps (assuming 60 fps)
        const initialVolume = 0.1; // Initial volume (adjust as needed)
        const targetVolume = 1; // Target volume
        const volumeStep = (targetVolume - initialVolume) / fadeSteps;
        let currentVolume = initialVolume;
        
        const fadeInterval = setInterval(() => {
            currentVolume += volumeStep;
            this.audioElement.volume = currentVolume;
            
            if (currentVolume >= targetVolume) {
                clearInterval(fadeInterval);
            }
        }, 1000 / 60); // Adjust interval for smoother animation
    }

    fadeOut() {
        const fadeSteps = this.fadeDuration * 60; // Number of fade steps (assuming 60 fps)
        const targetVolume = 0.1; // Target volume (adjust as needed)
        const initialVolume = this.audioElement.volume;
        const volumeStep = (targetVolume - initialVolume) / fadeSteps;
        let currentVolume = initialVolume;
        
        const fadeInterval = setInterval(() => {
            currentVolume += volumeStep;
            this.audioElement.volume = currentVolume;
            
            if (currentVolume <= targetVolume) {
                clearInterval(fadeInterval);
                this.audioElement.pause();
            }
        }, 1000 / 60); // Adjust interval for smoother animation
    }

    stop() {
        this.fadeOut();
        this.saveAudioState();
    }
}

const audioManager = new AudioManager();
window.addEventListener('beforeunload', () => {
    audioManager.saveAudioState();
});
