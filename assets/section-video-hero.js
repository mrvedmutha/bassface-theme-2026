/**
 * Video Hero Section
 * AlpineJS component for audio control and video playback
 */

document.addEventListener("alpine:init", () => {
  Alpine.data("videoHero", () => ({
    isAudioPlaying: false,
    showAudioHint: false,

    init() {
      console.log("Video Hero initialized");

      const container = this.$el;
      const videoCount = container.dataset.videoCount;
      const selectedVideo = container.dataset.selectedVideo;

      console.log("Video count:", videoCount);
      console.log("Selected video URL:", selectedVideo);

      // Ensure video plays
      this.$nextTick(() => {
        this.ensureVideoPlays();
        // Show audio hint after a brief delay
        setTimeout(() => {
          console.log("Showing audio hint");
          this.showAudioHint = true;
          console.log("showAudioHint is now:", this.showAudioHint);
          // Hide after 5 seconds
          setTimeout(() => {
            console.log("Hiding audio hint");
            this.showAudioHint = false;
          }, 5000);
        }, 500);
      });

      // Shopify theme editor support
      if (typeof Shopify !== "undefined" && Shopify.designMode) {
        this.handleThemeEditor();
      }
    },

    ensureVideoPlays() {
      const video = this.$refs.video;
      if (!video) {
        console.error("Video element not found");
        return;
      }

      console.log("Video element found, attempting to play...");

      // Try to play the video
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video is playing successfully");
          })
          .catch((error) => {
            console.error("Video autoplay failed:", error);
            // Retry after a short delay
            setTimeout(() => {
              video.play().catch((e) => console.error("Retry failed:", e));
            }, 1000);
          });
      }
    },

    toggleAudio() {
      const video = this.$refs.video;
      if (!video) return;

      this.isAudioPlaying = !this.isAudioPlaying;
      video.muted = !this.isAudioPlaying;

      console.log("Audio toggled:", this.isAudioPlaying ? "ON" : "OFF");
    },

    handleThemeEditor() {
      document.addEventListener("shopify:section:load", (event) => {
        if (event.target.querySelector(".video-hero")) {
          console.log("Video hero section reloaded");
          // Ensure video plays after reload
          setTimeout(() => this.ensureVideoPlays(), 100);
        }
      });
    },
  }));
});
