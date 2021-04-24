(function(){
    'use strict';
    window.API = {
        onPageLoad: function() {
            this.music = AudioFX('sounds/m4a-sound', { formats: ['m4a'] }, function() { console.log('music is ready'); });
        },
        playPause: function(btn) {
            this.music.audio.paused ? (btn.textContent = 'Pause', this.music.play()) : (btn.textContent = 'Play', this.music.stop());
        }
    };
})();