/**
 * Video Hero Section
 * AlpineJS component with Spotify iframe player and GSAP animations
 */

document.addEventListener("alpine:init", () => {
  Alpine.data("videoHero", () => ({
    isPlayerOpen: false,
    showAudioHint: false,
    hintTimeout: null, // Store timeout reference

    init() {
      this.$nextTick(() => {
        this.ensureVideoPlays();

        // Show audio hint after a brief delay
        setTimeout(() => {
          this.showAudioHint = true;

          // Hide after 5 seconds - store timeout reference so we can clear it
          this.hintTimeout = setTimeout(() => {
            this.showAudioHint = false;
            this.hintTimeout = null;
          }, 5000);
        }, 500);

        // Start waveform animation immediately - always playing
        if (this.$refs.audioButton) {
          this.$refs.audioButton.classList.add("is-playing");
        }
      });

      // Shopify theme editor support
      if (typeof Shopify !== "undefined" && Shopify.designMode) {
        this.handleThemeEditor();
      }
    },

    // REMOVED: No longer using GSAP animations - Alpine.js x-show handles visibility

    ensureVideoPlays() {
      const video = this.$refs.video;
      if (!video) {
        console.error("Video element not found");
        return;
      }

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

    togglePlayer() {
      // Hide audio hint immediately if user clicks within 5 seconds
      if (this.showAudioHint) {
        console.log("💬 User clicked during hint - hiding hint immediately");
        this.showAudioHint = false;

        // Clear the timeout so it doesn't try to hide again
        if (this.hintTimeout) {
          clearTimeout(this.hintTimeout);
          this.hintTimeout = null;
        }
      }

      // Simply toggle the state - Alpine.js x-show handles the rest
      this.isPlayerOpen = !this.isPlayerOpen;

      console.log(
        "🎯 Toggle clicked - New state:",
        this.isPlayerOpen ? "OPEN" : "CLOSED",
      );

      if (this.isPlayerOpen) {
        // Opening player - show chevron instead of waveform
        console.log("▶️ OPENING - Showing chevron, hiding waveform");
        this.$refs.audioButton.classList.remove("is-playing");
        this.$refs.audioButton.classList.add("is-open");
      } else {
        // Closing player - show waveform instead of chevron
        console.log("◀️ CLOSING - Showing waveform, hiding chevron");
        this.$refs.audioButton.classList.remove("is-open");
        this.$refs.audioButton.classList.add("is-playing");
      }
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
