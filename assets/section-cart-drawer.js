/**
 * Cart Drawer Component
 * Handles cart drawer functionality with AJAX updates
 */

// Wait for Alpine.js to be loaded
document.addEventListener('alpine:init', () => {
  console.log('Alpine.js initialized, registering cartDrawer component');

  Alpine.data('cartDrawer', () => ({
    isOpen: false,
    cartCount: window.cartCount || 0,
    cartTotal: window.cartTotal || 0,
    cartItems: [],
    isCheckingOut: false,
    lenisInstance: null,
    isUpdating: false,
    isPriceUpdating: false,

    init() {
      console.log('Cart drawer component initialized');
      console.log('Initial isOpen state:', this.isOpen);

      // Get initial cart data
      this.fetchCart();

      // Listen for cart updates from other components
      window.addEventListener('cart:updated', () => {
        if (!this.isUpdating) {
          this.fetchCart();
        }
      });

      // Get Lenis instance if available
      if (window.lenis) {
        this.lenisInstance = window.lenis;
      }

      // Test event listener
      window.addEventListener('open-cart', () => {
        console.log('open-cart event received in window listener');
      });
    },

    /**
     * Open the cart drawer
     */
    openDrawer() {
      console.log('Cart drawer opening...');
      this.isOpen = true;
      this.fetchCart();

      // Prevent body scroll
      document.body.classList.add('cart-drawer-open');

      // Stop Lenis smooth scroll
      if (this.lenisInstance) {
        this.lenisInstance.stop();
      }

      // Ensure drawer is visible
      this.$nextTick(() => {
        const drawer = this.$el;
        if (drawer) {
          drawer.style.pointerEvents = 'auto';
        }
      });

      console.log('Cart drawer opened, isOpen:', this.isOpen);
    },

    /**
     * Close the cart drawer
     */
    closeDrawer() {
      console.log('Cart drawer closing...');
      this.isOpen = false;

      // Re-enable body scroll
      document.body.classList.remove('cart-drawer-open');

      // Resume Lenis smooth scroll
      if (this.lenisInstance) {
        this.lenisInstance.start();
      }

      console.log('Cart drawer closed, isOpen:', this.isOpen);
    },

    /**
     * Fetch cart data from Shopify
     */
    async fetchCart() {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();

        this.cartCount = cart.item_count;
        this.cartTotal = cart.total_price;
        this.cartItems = cart.items;

        // Update global cart count
        window.cartCount = cart.item_count;
        window.cartTotal = cart.total_price;

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('cart:count-updated', {
          detail: { count: cart.item_count, total: cart.total_price }
        }));

        // Re-render cart items
        this.renderCartItems(cart.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    },

    /**
     * Render cart items dynamically
     */
    renderCartItems(items) {
      const container = document.getElementById('cart-drawer-items');
      if (!container) return;

      // This will be handled by Alpine's reactivity
      // Items are rendered server-side, AJAX updates will refresh the section
    },

    /**
     * Update item quantity
     */
    async updateQuantity(detail) {
      const { key, quantity } = detail;

      // If quantity is 0, treat as removal
      if (quantity < 1) {
        this.removeItem({ key });
        return;
      }

      if (this.isUpdating) {
        return;
      }

      try {
        this.isUpdating = true;
        this.isPriceUpdating = true;

        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update quantity');
        }

        const cart = await response.json();

        // Small delay to show skeleton (300ms)
        await new Promise(resolve => setTimeout(resolve, 300));

        this.cartCount = cart.item_count;
        this.cartTotal = cart.total_price;
        this.isPriceUpdating = false;

        // Update global cart count
        window.cartCount = cart.item_count;
        window.cartTotal = cart.total_price;

        // Find the updated item and dispatch event to update its display
        const updatedItem = cart.items.find(item => item.key === key);
        if (updatedItem) {
          window.dispatchEvent(new CustomEvent('cart-item-updated', {
            detail: {
              key: key,
              quantity: updatedItem.quantity
            }
          }));
        } else {
          // Item was removed (shouldn't happen in updateQuantity, but just in case)
          const itemElement = document.querySelector(`[data-cart-item="${key}"]`);
          if (itemElement) {
            itemElement.remove();
          }
        }

        window.dispatchEvent(new CustomEvent('cart:count-updated', {
          detail: { count: cart.item_count, total: cart.total_price }
        }));
      } catch (error) {
        console.error('Error updating quantity:', error);
        this.isPriceUpdating = false;
        // Reload cart drawer on error to reset state
        await this.reloadCartDrawer();
      } finally {
        this.isUpdating = false;
      }
    },

    /**
     * Remove item from cart
     */
    async removeItem(detail) {
      const { key } = detail;

      if (this.isUpdating) {
        return;
      }

      try {
        this.isUpdating = true;
        this.isPriceUpdating = true;

        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: 0,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to remove item');
        }

        const cart = await response.json();

        // Wait for skeleton animation (600ms)
        await new Promise(resolve => setTimeout(resolve, 600));

        // Update cart state and hide price skeleton
        this.cartCount = cart.item_count;
        this.cartTotal = cart.total_price;
        this.isPriceUpdating = false;

        // Update global cart count
        window.cartCount = cart.item_count;
        window.cartTotal = cart.total_price;

        // Dispatch cart count updated event
        window.dispatchEvent(new CustomEvent('cart:count-updated', {
          detail: { count: cart.item_count, total: cart.total_price }
        }));

        // Remove item from DOM with fade out animation
        const itemElement = document.querySelector(`[data-cart-item="${key}"]`);
        if (itemElement) {
          itemElement.style.opacity = '0';
          itemElement.style.transform = 'translateX(-20px)';
          itemElement.style.transition = 'opacity 300ms ease, transform 300ms ease';

          setTimeout(() => {
            itemElement.remove();
            // Alpine's reactivity will handle showing empty state when cartCount = 0
          }, 300);
        }
      } catch (error) {
        console.error('Error removing item:', error);
        this.isPriceUpdating = false;
        // Reload cart drawer on error to reset state
        await this.reloadCartDrawer();
      } finally {
        this.isUpdating = false;
      }
    },

    /**
     * Update cart item attributes (Gift Box, Note)
     */
    async updateCartAttribute(detail) {
      const { key, property, value } = detail;

      if (this.isUpdating) {
        return;
      }

      try {
        this.isUpdating = true;

        // Get current cart
        const cartResponse = await fetch('/cart.js');
        if (!cartResponse.ok) {
          throw new Error('Failed to fetch cart');
        }

        const cart = await cartResponse.json();

        // Find the item
        const item = cart.items.find(i => i.key === key);
        if (!item) {
          throw new Error('Item not found');
        }

        // Update properties
        const properties = { ...(item.properties || {}) };

        if (property === 'Gift Box') {
          if (value) {
            properties['Gift Box'] = 'Yes';
          } else {
            delete properties['Gift Box'];
          }
        } else if (property === 'Note') {
          if (value && value.trim() !== '') {
            properties['Note'] = value.trim();
          } else {
            delete properties['Note'];
          }
        }

        // Update item with new properties
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: item.quantity,
            properties: properties,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update properties');
        }

        await response.json();

        // Only reload if it's not a note update (note updates are handled by Alpine)
        if (property !== 'Note') {
          await this.reloadCartDrawer();
        }
      } catch (error) {
        console.error('Error updating cart attribute:', error);
      } finally {
        this.isUpdating = false;
      }
    },

    /**
     * Apply coupon code
     * Returns: { state: 'valid' | 'invalid' | 'idle', message: string }
     *
     * NOTE: Shopify's Cart API (/cart.js) does not include discount calculations.
     * Discounts are only applied at checkout. To show discounted prices in the cart drawer:
     *
     * Option 1: Create a checkout session and fetch the total
     *   - Use Shopify Storefront API to create a checkout with the discount code
     *   - Fetch the total_price from the checkout
     *   - Update cartTotal with the discounted amount
     *
     * Option 2: Use a custom Shopify app/API
     *   - Create a custom API endpoint that calculates discount amounts
     *   - Call this endpoint after validating the discount code
     *   - Update cart totals with the calculated discount
     *
     * Option 3: Show estimated discount (if you know the discount percentage)
     *   - Hard-code discount percentages for specific codes
     *   - Calculate estimated discount: cartTotal * (discountPercent / 100)
     *   - Display as "Estimated discount" to manage expectations
     *
     * Current implementation saves the code and shows skeleton animation,
     * but does not update actual prices. Implement one of the options above
     * to show real discounted prices.
     */
    async applyCoupon(code) {
      console.log('TODO: applyCoupon called with code:', code);

      if (!code || code.trim() === '') {
        console.log('TODO: Empty code, returning idle state');
        return {
          state: 'idle',
          message: ''
        };
      }

      try {
        const trimmedCode = code.trim().toUpperCase();
        console.log('TODO: Trimmed code:', trimmedCode);

        // Validate coupon code by attempting to create a checkout with the discount
        // This is a basic validation - you can enhance this with your own validation logic
        const response = await fetch('/cart.js');
        const cart = await response.json();
        console.log('TODO: Cart data:', cart);

        // If cart is empty, we can't validate the coupon
        if (cart.item_count === 0) {
          console.log('TODO: Cart is empty, returning invalid');
          return {
            state: 'invalid',
            message: 'Your added coupon is not valid. Please try again.'
          };
        }

        // Try to validate the discount code
        // Since Shopify doesn't provide a direct validation API, we'll use a workaround
        // We'll attempt to access the discount URL and check if it redirects properly
        try {
          console.log('TODO: Attempting to validate discount code...');
          const discountResponse = await fetch(`/discount/${trimmedCode}`, {
            method: 'HEAD',
            redirect: 'manual'
          });

          console.log('TODO: Discount response status:', discountResponse.status);
          console.log('TODO: Discount response type:', discountResponse.type);

          // If the discount exists, Shopify will return a 303 redirect
          // If it doesn't exist, it will return a 404
          if (discountResponse.status === 303 || discountResponse.type === 'opaqueredirect') {
            // Valid discount code
            sessionStorage.setItem('discount_code', trimmedCode);
            console.log(`TODO: Valid discount code "${trimmedCode}" saved to session`);

            return {
              state: 'valid',
              message: ''
            };
          } else {
            // Invalid discount code
            console.log('TODO: Invalid discount code - status not 303/opaqueredirect');
            return {
              state: 'invalid',
              message: 'Your added coupon is not valid. Please try again.'
            };
          }
        } catch (fetchError) {
          // If fetch fails due to CORS or other reasons, assume valid and let checkout handle it
          // This is a fallback to ensure the feature doesn't break
          console.log('TODO: Fetch error during validation:', fetchError);
          console.log('TODO: Assuming valid and letting checkout handle validation');
          sessionStorage.setItem('discount_code', trimmedCode);

          return {
            state: 'valid',
            message: ''
          };
        }
      } catch (error) {
        console.error('TODO: Error in applyCoupon:', error);
        return {
          state: 'invalid',
          message: 'Your added coupon is not valid. Please try again.'
        };
      }
    },

    /**
     * Proceed to checkout
     */
    async proceedToCheckout() {
      this.isCheckingOut = true;

      // Get discount code from session if available
      const discountCode = sessionStorage.getItem('discount_code');

      // Build checkout URL
      let checkoutUrl = '/checkout';

      if (discountCode) {
        checkoutUrl += `?discount=${encodeURIComponent(discountCode)}`;
      }

      // Redirect after animation
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 800);
    },

    /**
     * Reload cart drawer content via AJAX
     */
    async reloadCartDrawer() {
      try {
        // Fetch updated section HTML
        const response = await fetch(`${window.location.pathname}?section_id=cart-drawer`);
        const html = await response.text();

        // Parse the response
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#cart-drawer-items');
        const currentContent = document.querySelector('#cart-drawer-items');

        if (newContent && currentContent) {
          currentContent.innerHTML = newContent.innerHTML;

          // Re-initialize Alpine components in the new content
          Alpine.initTree(currentContent);
        }
      } catch (error) {
        console.error('Error reloading cart drawer:', error);
        // Fallback: reload the page
        this.fetchCart();
      }
    },

    /**
     * Format money
     */
    formatMoney(cents) {
      const amount = cents / 100;
      return `₹${amount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
  }));
});

/**
 * Initialize global cart count on page load
 */
(function() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      window.cartCount = cart.item_count;
      window.cartTotal = cart.total_price;

      // Dispatch initial cart count
      window.dispatchEvent(new CustomEvent('cart:count-updated', {
        detail: { count: cart.item_count, total: cart.total_price }
      }));
    })
    .catch(error => console.error('Error fetching initial cart:', error));
})();

/**
 * Global helper function for debugging cart drawer
 */
window.openCartDrawer = function() {
  console.log('Manual cart drawer open triggered');
  window.dispatchEvent(new CustomEvent('open-cart'));
};

window.debugCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  console.log('=== Cart Drawer Debug ===');
  console.log('Drawer element:', drawer);
  console.log('Alpine data:', drawer && drawer.__x ? drawer.__x.$data : 'No Alpine data');
  console.log('Computed styles:', drawer ? window.getComputedStyle(drawer).display : 'No drawer');
  console.log('=========================');
};
