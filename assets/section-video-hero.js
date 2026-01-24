/**
 * Video Hero Section
 * AlpineJS component for audio control
 */

document.addEventListener("alpine:init", () => {
  Alpine.data("videoHero", () => ({
    isAudioPlaying: false,

    init() {
      console.log("Video Hero initialized");
      
      // Shopify theme editor support
      if (typeof Shopify !== "undefined" && Shopify.designMode) {
        this.handleThemeEditor();
      }
    },

    toggleAudio() {
      const video = this.$refs.video;
      if (!video) return;

      this.isAudioPlaying = !this.isAudioPlaying;
      video.muted = !this.isAudioPlaying;
    },

    handleThemeEditor() {
      document.addEventListener("shopify:section:load", (event) => {
        if (event.target.querySelector(".video-hero")) {
          console.log("Video hero section reloaded");
        }
      });
    },
  }));
});
