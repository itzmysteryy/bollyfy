new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
                {
          name: "Cheques",
          artist: "Shubh",
          cover: "https://i.ytimg.com/vi/4tywp83zkmk/maxresdefault.jpg",
          source: "https://audio.jukehost.co.uk/DeZS8HX8JN3VLewJqvfXJEq3YDSyOZ9k",
          url: "https://open.spotify.com/track/4eBvRhTJ2AcxCsbfTUjoRp?si=b513a57be797422e",
          favorited: false
        },
        {
          name: "Basti ka Hasti",
          artist: "MC Stan",
          cover: "https://c.saavncdn.com/893/Insaan-Hindi-2022-20230608232528-500x500.jpg",
          source: "https://audio.jukehost.co.uk/gp3eHzlGk4BMm3sw6DyS64L1QcGMXMUT",
          url: "https://open.spotify.com/track/3k9PtGmPNnQtt32TKWm6f3?si=d4743dada43642e8",
          favorited: false
        },
        {
          name: "Company",
          artist: "Emiway Bantai",
          cover: "https://source.boomplaymusic.com/group10/M00/03/01/6f6fa486c08e4dd38e166549a058abea_464_464.jpg",
          source: "https://audio.jukehost.co.uk/FG0uPeJWIKqT5bTLOhNSIBr7KGYJRKNG",
          url: "https://open.spotify.com/track/1eHkjvvyncnmjgwCSGI0el?si=f65500882e8145d1",
          favorited: false
        },

        {
          name: "Jaadugar",
          artist: "Paradox",
          cover: "https://i.ytimg.com/vi/uSLk_mF_Blk/sddefault.jpg",
          source: "https://audio.jukehost.co.uk/PNRnd1kj4HePSbVu5Nf6ZiB80f7f1zZM",
          url: "https://open.spotify.com/track/4ujToRFWb3C8tdPkmVPwu2?si=3c486bd425bb4a0cK",
          favorited: false
        },

        {
          name: "Le le Ram Ram",
          artist: "MC Square",
          cover: "https://c.saavncdn.com/474/le-le-Ram-Ram-Hindi-2022-20220927210526-500x500.jpg",
          source: "https://audio.jukehost.co.uk/qnwW4A4qGa5p7ADNZPkXbV45XlEp2KD6l",
          url: "https://open.spotify.com/track/64jX14ntYSUd1lbzVgBMr6?si=51cf15d22c834222",
          favorited: false
        },
        
        {
          name: "Excuses",
          artist: "AP Dhillon, Gurinder Gill, Intense",
          cover: "https://pagalnew.com/coverimages/Excuses-Ap-Dhillon-500-500.jpg",
          source: "https://audio.jukehost.co.uk/uj1SCn8ZsYLYh5VTWsJyCYchgr1SomqE",
          url: "https://open.spotify.com/track/29m79w9xPMH4YCD6r8JSmV?si=7694f634918847a2",
          favorited: false
        },
        {
          name: "Chore NCR Aale",
          artist: "Paradox and MC Square",
          cover: "https://i.ytimg.com/vi/IKbDw-60PQE/maxresdefault.jpg",
          source: "https://audio.jukehost.co.uk/1ZZ4OihmBqYNRVFAVKmYdzaFgsroGGDP",
          url: "https://open.spotify.com/track/4YzmUshoyqoiOx2lVM0rD9?si=f3268b51faf84f3f",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});