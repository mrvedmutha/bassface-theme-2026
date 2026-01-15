// =====================================================
// HEADER SIDEBAR (MENU DRAWER) - Alpine.js + GSAP
// =====================================================
// Handles:
// - Alpine.js store for sidebar open/close state
// - GSAP open animation (left to right slide + stagger)
// - GSAP close animation (bottom to top slide)
// - Close icon morph animation (X to minus)
// - Two-level drawer system with 3 different Level 2 views (mobile only)
// - Body scroll lock (prevent double scrollbars)

document.addEventListener("alpine:init", () => {
  // =====================================================
  // ALPINE STORE: Sidebar State
  // =====================================================
  Alpine.store("sidebar", {
    open: false,
    isClosing: false, // Track if close animation is running

    toggle() {
      if (this.isClosing) return; // Prevent double-clicks during close

      if (!this.open) {
        // Opening the sidebar
        this.open = true;

        // Lock body scroll to prevent background scrolling
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";

        // Trigger open animation
        setTimeout(() => {
          animateSidebarOpen();

          // Debug scroll after opening
          setTimeout(() => {
            const drawer = document.querySelector('.sidebar-drawer');
            const content = drawer?.querySelector('.sidebar-drawer__content');
            if (content) {
              console.log('📊 Scroll Debug After Open (CONTENT):', {
                scrollHeight: content.scrollHeight,
                clientHeight: content.clientHeight,
                canScroll: content.scrollHeight > content.clientHeight,
                overflowY: window.getComputedStyle(content).overflowY,
                pointerEvents: window.getComputedStyle(content).pointerEvents
              });

              // Force scroll to be enabled on content
              content.style.overflowY = 'auto';
              console.log('🔧 Forced scroll enabled on CONTENT element');
            }
          }, 1000);
        }, 10);
        console.log("🔒 Body scroll locked, sidebar scroll enabled");
      } else {
        // Closing the sidebar - delay state change until animation completes
        this.isClosing = true;

        console.log("🔓 Starting close animation");

        // Trigger close animation with callback to hide
        animateSidebarClose(() => {
          // After animation completes, actually hide the sidebar
          this.open = false;
          this.isClosing = false;

          // Unlock body scroll
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";

          console.log("🔓 Body scroll unlocked - Sidebar hidden");
        });
      }
    },
  });

  // =====================================================
  // ALPINE COMPONENT: Sidebar Controller
  // =====================================================
  Alpine.data("headerSidebar", () => ({
    currentLevel: 1, // 1 = Main menu, 2 = Detail view
    level2View: "", // 'categories', 'collections', or 'blog'
    level2BackTitle: "Back",

    init() {
      console.log("✅ Header Sidebar initialized");

      // Initialize hover events for underline animation
      this.initLinkHoverAnimations();

      // Prevent scroll events from bubbling to body
      this.$nextTick(() => {
        const content = this.$root.querySelector('.sidebar-drawer__content');
        if (content) {
          // Stop wheel events from propagating to body
          content.addEventListener('wheel', (e) => {
            e.stopPropagation();
            console.log('🛑 Scroll event captured by sidebar content');
          }, { passive: false });

          // Stop touch scroll events from propagating
          content.addEventListener('touchmove', (e) => {
            e.stopPropagation();
          }, { passive: false });

          console.log('✅ Scroll event listeners attached to content');
        }
      });
    },

    // Initialize GSAP underline animations for all sidebar links
    initLinkHoverAnimations() {
      // Select all links that should have underline animation
      const hoverableLinks = this.$root.querySelectorAll(
        ".sidebar-drawer__utility-link, " +
          ".sidebar-drawer__category-link, " +
          ".sidebar-drawer__collection-link, " +
          ".sidebar-drawer__blog-link, " +
          ".sidebar-drawer__featured-link, " +
          ".sidebar-drawer__feature-link" // For featured collection cards
      );

      hoverableLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => this.animateLinkEnter(link));
        link.addEventListener("mouseleave", () => this.animateLinkExit(link));
      });

      console.log(
        `✅ Initialized ${hoverableLinks.length} links with underline animation`
      );
    },

    // GSAP Underline Animation - Enter (left to right)
    animateLinkEnter(element) {
      if (typeof gsap === "undefined") return;

      const underline = element.querySelector(
        ".sidebar-drawer__link-underline"
      );
      if (!underline) return;

      // Underline enters from left
      gsap.fromTo(
        underline,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.35, ease: "power2.out" }
      );
    },

    // GSAP Underline Animation - Exit (to right)
    animateLinkExit(element) {
      if (typeof gsap === "undefined") return;

      const underline = element.querySelector(
        ".sidebar-drawer__link-underline"
      );
      if (!underline) return;

      // Underline exits to right
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.35,
        ease: "power2.in",
      });
    },

    showLevel2(view) {
      if (window.innerWidth >= 700) return; // Only for mobile (<700px)

      this.currentLevel = 2;
      this.level2View = view;

      // Set dynamic back button text
      if (view === "categories") {
        this.level2BackTitle = "Product Categories";
      } else if (view === "collections") {
        this.level2BackTitle = "Collections";
      } else if (view === "blog") {
        this.level2BackTitle = "House of Bassface";
      }

      console.log(`📱 Mobile: Show Level 2 (${view})`);

      // Animate level 2 items with stagger
      setTimeout(() => animateLevel2Items(), 100);
    },

    showLevel1() {
      if (window.innerWidth >= 700) return; // Only for mobile

      this.currentLevel = 1;
      this.level2View = "";
      console.log("📱 Mobile: Back to Level 1 (Main Menu)");
    },
  }));
});

// =====================================================
// GSAP ANIMATION: Open Sidebar (Left to Right + Stagger)
// =====================================================
function animateSidebarOpen() {
  if (typeof gsap === "undefined") {
    console.warn("⚠️ GSAP not loaded");
    return;
  }

  const drawer = document.querySelector(".sidebar-drawer");
  const items = document.querySelectorAll(
    ".sidebar-drawer__level--1 .sidebar-drawer__item"
  );

  if (!drawer) return;

  console.log("▶️ START: Sidebar OPEN animation");

  // Kill any existing animations
  gsap.killTweensOf(drawer);
  gsap.killTweensOf(items);

  // Step 1: Slide drawer in from left to right (Door effect)
  gsap.fromTo(
    drawer,
    {
      x: "-100%",
    },
    {
      x: "0%",
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        console.log("✅ COMPLETE: Drawer slide in");
        // Ensure scrolling is enabled after animation on CONTENT
        const content = drawer.querySelector('.sidebar-drawer__content');
        if (content) {
          content.style.overflowY = 'auto';
          console.log("🔄 Content scroll re-enabled");
        }
      },
    }
  );

  // Step 2: Stagger reveal content items (top to bottom)
  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: {
        amount: 0.3, // Total stagger time
        from: "start", // Top to bottom
      },
      ease: "power2.out",
      delay: 0.3, // Start after drawer begins sliding
      onComplete: () => {
        console.log("✅ COMPLETE: Content stagger reveal");
      },
    }
  );
}

// =====================================================
// GSAP ANIMATION: Close Sidebar (Bottom to Top)
// =====================================================
function animateSidebarClose(onComplete) {
  if (typeof gsap === "undefined") {
    console.warn("⚠️ GSAP not loaded");
    if (onComplete) onComplete();
    return;
  }

  const drawer = document.querySelector(".sidebar-drawer");
  const items = document.querySelectorAll(".sidebar-drawer__item");

  if (!drawer) {
    if (onComplete) onComplete();
    return;
  }

  console.log("▶️ START: Sidebar CLOSE animation");

  // Kill any existing animations
  gsap.killTweensOf(drawer);
  gsap.killTweensOf(items);

  // Slide drawer out from bottom to top (Vanishing up)
  gsap.to(drawer, {
    y: "-100%",
    duration: 0.6,
    ease: "power2.in",
    onComplete: () => {
      console.log("✅ COMPLETE: Drawer slide out");

      // Reset position for next open (off-screen left, normal vertical)
      gsap.set(drawer, {
        x: "-100%",
        y: "0%",
      });

      // Reset all items to initial state
      gsap.set(items, {
        opacity: 0,
        y: 20,
      });

      // Call the callback to hide sidebar in Alpine
      if (onComplete) onComplete();
    },
  });
}

// =====================================================
// GSAP ANIMATION: Level 2 Items Stagger (Mobile Only)
// =====================================================
function animateLevel2Items() {
  if (typeof gsap === "undefined") return;

  const level2Items = document.querySelectorAll(
    ".sidebar-drawer__level--2 .sidebar-drawer__item"
  );

  if (!level2Items.length) return;

  console.log("▶️ START: Level 2 items stagger (Mobile)");

  // Kill any existing animations
  gsap.killTweensOf(level2Items);

  // Stagger reveal items (top to bottom)
  gsap.fromTo(
    level2Items,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: {
        amount: 0.2,
        from: "start",
      },
      ease: "power2.out",
      onComplete: () => {
        console.log("✅ COMPLETE: Level 2 items revealed");
      },
    }
  );
}

// =====================================================
// UTILITY: Log initialization
// =====================================================
console.log("✅ Header Sidebar JS loaded");
