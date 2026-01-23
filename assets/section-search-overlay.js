/**
 * Search Overlay Component
 * Handles search overlay state management and GSAP animations
 */

// Alpine.js Global Store for Search Overlay State
document.addEventListener('alpine:init', () => {
  Alpine.store('searchOverlay', {
    isOpen: false,

    open() {
      this.isOpen = true;
      // Prevent body scroll when overlay is open
      document.body.classList.add('search-overlay-open');
    },

    close() {
      this.isOpen = false;
      // Restore body scroll
      document.body.classList.remove('search-overlay-open');
    },

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }
  });
});

/**
 * Search Overlay Alpine.js Component
 * Manages animations and interactions
 */
function searchOverlay() {
  return {
    isAnimating: false,
    searchQuery: '',
    hasSearchResults: false,
    isSearching: false,
    isNavigating: false,
    searchResults: {
      products: [],
      articles: []
    },

    init() {
      // Watch for changes in the store to trigger animations
      this.$watch('$store.searchOverlay.isOpen', (isOpen) => {
        if (isOpen) {
          this.show();
        } else {
          this.hide();
        }
      });

      // Handle ESC key to close overlay
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.$store.searchOverlay.isOpen) {
          this.closeOverlay();
        }
      });

      // Prevent scroll propagation from content area to page
      const contentArea = this.$refs.overlayContainer.querySelector('.search-overlay__content');

      if (contentArea) {
        // Prevent mouse wheel scroll from propagating to page
        contentArea.addEventListener('wheel', (e) => {
          const { scrollTop, scrollHeight, clientHeight } = contentArea;
          const isScrollingDown = e.deltaY > 0;
          const isScrollingUp = e.deltaY < 0;

          // If at top and scrolling up, prevent default
          if (isScrollingUp && scrollTop === 0) {
            e.preventDefault();
            return;
          }

          // If at bottom and scrolling down, prevent default
          if (isScrollingDown && scrollTop + clientHeight >= scrollHeight) {
            e.preventDefault();
            return;
          }

          // Otherwise, stop propagation to prevent page scroll
          e.stopPropagation();
        }, { passive: false });

        // Prevent touch scroll from propagating to page
        let startY = 0;

        contentArea.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY;
        }, { passive: true });

        contentArea.addEventListener('touchmove', (e) => {
          const { scrollTop, scrollHeight, clientHeight } = contentArea;
          const currentY = e.touches[0].clientY;
          const isScrollingDown = currentY < startY;
          const isScrollingUp = currentY > startY;

          // If at top and scrolling up, prevent default
          if (isScrollingUp && scrollTop === 0) {
            e.preventDefault();
            return;
          }

          // If at bottom and scrolling down, prevent default
          if (isScrollingDown && scrollTop + clientHeight >= scrollHeight) {
            e.preventDefault();
            return;
          }

          // Otherwise, stop propagation to prevent page scroll
          e.stopPropagation();
        }, { passive: false });
      }
    },

    /**
     * Show backdrop and animate in
     */
    show() {
      const backdrop = this.$refs.backdrop;
      backdrop.style.display = 'flex';

      // Use requestAnimationFrame to ensure display change is applied before animation
      requestAnimationFrame(() => {
        this.animateIn();

        // Focus the search input after animation starts
        setTimeout(() => {
          const searchInput = this.$el.querySelector('.search-overlay__search-input');
          if (searchInput) {
            searchInput.focus();
          }
        }, 300);
      });
    },

    /**
     * Animate out then hide backdrop
     */
    hide() {
      this.animateOut();
    },

    /**
     * Animate overlay entrance - slide down from top with backdrop fade
     */
    animateIn() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      const container = this.$refs.overlayContainer;
      const backdrop = this.$refs.backdrop;

      // Set initial states
      gsap.set(backdrop, {
        opacity: 0
      });

      gsap.set(container, {
        y: '-100%',
        scaleY: 1
      });

      // Create timeline for entry animation
      const timeline = gsap.timeline({
        onComplete: () => {
          this.isAnimating = false;
        }
      });

      // Fade in backdrop
      timeline.to(backdrop, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0);

      // Slide container down from top to bottom
      timeline.to(container, {
        y: '0%',
        duration: 0.6,
        ease: 'power3.out'
      }, 0);
    },

    /**
     * Animate overlay exit - reverse of entry (slide up to top)
     */
    animateOut() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      const container = this.$refs.overlayContainer;
      const backdrop = this.$refs.backdrop;

      // Create timeline for exit animation
      const timeline = gsap.timeline({
        onComplete: () => {
          // Hide backdrop
          backdrop.style.display = 'none';

          // Reset the transform after animation completes
          gsap.set(container, {
            y: '-100%'
          });
          gsap.set(backdrop, { opacity: 0 });

          // Reset search state AFTER animation completes
          this.searchQuery = '';
          this.hasSearchResults = false;
          this.isSearching = false;
          this.searchResults = { products: [], articles: [] };
          this.isNavigating = false;

          this.isAnimating = false;
        }
      });

      // Fade out backdrop
      timeline.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 0);

      // Slide container up from bottom to top (reverse of entry)
      timeline.to(container, {
        y: '-100%',
        duration: 0.5,
        ease: 'power3.in'
      }, 0);
    },

    /**
     * Handle search input
     */
    async handleSearch() {
      const query = this.searchQuery.trim();

      // If query is empty, show default view
      if (!query) {
        this.hasSearchResults = false;
        this.isSearching = false;
        this.searchResults = { products: [], articles: [] };
        return;
      }

      // Show skeleton loaders
      this.isSearching = true;
      this.hasSearchResults = false;

      try {
        // Call Shopify Predictive Search API
        const response = await fetch(
          `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,article&resources[limit]=10`
        );

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();

        // Extract products and articles from response
        // Format products to match our template needs
        const products = (data.resources.results.products || []).map(product => ({
          id: product.id,
          title: product.title,
          url: product.url,
          product_type: product.product_type || '',
          featured_image: product.image || product.featured_image || ''
        }));

        const articles = (data.resources.results.articles || []).map(article => ({
          id: article.id,
          title: article.title,
          url: article.url
        }));

        this.searchResults = {
          products: products,
          articles: articles
        };

        this.hasSearchResults = products.length > 0 || articles.length > 0;
        this.isSearching = false;
      } catch (error) {
        console.error('Search error:', error);
        this.hasSearchResults = false;
        this.isSearching = false;
        this.searchResults = { products: [], articles: [] };
      }
    },

    /**
     * Handle Enter key press
     */
    handleEnterKey() {
      const query = this.searchQuery.trim();
      if (query) {
        // Navigate to product search results page
        window.location.href = `/search?q=${encodeURIComponent(query)}&type=product`;
      }
    },

    /**
     * Navigate to search results page
     * @param {string} type - 'products' or 'all'
     */
    navigateToSearch(type) {
      if (this.isNavigating) return;

      this.isNavigating = true;
      const query = this.searchQuery.trim();

      if (type === 'products') {
        window.location.href = `/search?q=${encodeURIComponent(query)}&type=product`;
      } else {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    },

    /**
     * Handle button hover - create ripple fill effect
     */
    handleButtonHover(event, button) {
      // Only on non-touch devices
      if ('ontouchstart' in window) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Get the fill element
      const fill = button.querySelector('.search-overlay__button-fill');

      // Calculate the distance to the furthest corner
      const maxDistance = Math.sqrt(
        Math.pow(Math.max(x, rect.width - x), 2) +
        Math.pow(Math.max(y, rect.height - y), 2)
      );

      // Set the origin point
      gsap.set(fill, {
        left: x,
        top: y,
        width: 0,
        height: 0,
        opacity: 1
      });

      // Animate the ripple expansion
      gsap.to(fill, {
        width: maxDistance * 2,
        height: maxDistance * 2,
        left: x - maxDistance,
        top: y - maxDistance,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Add hover class to change text color
      button.classList.add('search-overlay__button--hover');
    },

    /**
     * Handle button leave - reverse the fill
     */
    handleButtonLeave(button) {
      // Only on non-touch devices
      if ('ontouchstart' in window) return;

      const fill = button.querySelector('.search-overlay__button-fill');

      // Fade out the fill
      gsap.to(fill, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(fill, { width: 0, height: 0 });
        }
      });

      // Remove hover class
      button.classList.remove('search-overlay__button--hover');
    },

    /**
     * Close overlay handler
     */
    closeOverlay() {
      if (!this.isAnimating) {
        // Don't reset state here - let animation complete with current content
        // State will be reset in animateOut() onComplete callback
        this.$store.searchOverlay.close();
      }
    }
  };
}

// Make function globally available for Alpine.js
window.searchOverlay = searchOverlay;
