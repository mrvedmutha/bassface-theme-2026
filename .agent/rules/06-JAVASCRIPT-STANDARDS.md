---
trigger: model_decision
description: how to write javascript code
---

# JavaScript Standards

**Alpine.js for interactivity, declarative reactive patterns, debug to understand root causes before solving.**

---

## Framework: Alpine.js

**Alpine.js is the core JavaScript framework for this theme.**

### External Libraries Loaded (CDN)

All JavaScript dependencies are loaded from CDN in `layout/theme.liquid`:

```liquid
<!-- Animation library -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js" defer></script>

<!-- Smooth scrolling -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.17/dist/lenis.min.js" defer></script>

<!-- Alpine.js framework -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.3/dist/cdn.min.js" defer></script>
```

**Note:** All scripts use `defer` for non-blocking page load.

### When to Use Local JavaScript Files

**Generally, avoid creating local JavaScript files.** Use Alpine.js for most interactivity.

**Only create local JS files if:**
1. Complex utility functions needed across multiple components
2. Third-party integrations requiring custom initialization
3. User explicitly requests it

**If needed, create:**
```
assets/utils.js           # Shared utilities
assets/integrations.js    # Third-party integrations
```

**Link in Liquid:**
```liquid
<script src="{{ 'utils.js' | asset_url }}" defer></script>
```

---

## Alpine.js Basics

### Declarative Reactive Components

Alpine.js allows building interactive components directly in HTML using directives.

**✓ GOOD - Alpine.js approach**
```liquid
<div x-data="{ open: false }">
  <button @click="open = !open" class="btn-primary">
    Toggle Menu
  </button>

  <nav x-show="open" x-transition class="mobile-menu">
    <!-- Menu items -->
  </nav>
</div>
```

**✗ BAD - Vanilla JavaScript (avoid unless necessary)**
```javascript
const toggleMenu = () => {
  const menu = document.querySelector('.mobile-menu');
  menu.classList.toggle('is-active');
};
```

### Core Alpine.js Directives

- `x-data` - Define component state
- `x-show` - Toggle visibility (with transitions)
- `x-if` - Conditional rendering (removes from DOM)
- `x-for` - Loop through arrays
- `x-on` / `@` - Event listeners
- `x-bind` / `:` - Bind attributes
- `x-model` - Two-way data binding
- `x-text` - Set text content
- `x-html` - Set HTML content
- `x-init` - Run code when component initializes
- `x-effect` - Run code when reactive data changes

### Component State Management

```liquid
<div x-data="{
  count: 0,
  items: [],
  loading: false,
  error: null
}">
  <p x-text="count"></p>
  <button @click="count++">Increment</button>

  <template x-if="loading">
    <p>Loading...</p>
  </template>

  <template x-if="error">
    <p class="text-error" x-text="error"></p>
  </template>
</div>
```

### Extracting Reusable Components

For complex components, extract to Alpine components:

```liquid
<div x-data="productCard">
  <!-- Component markup -->
</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('productCard', () => ({
      quantity: 1,
      adding: false,

      async addToCart() {
        this.adding = true;
        try {
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.variantId,
              quantity: this.quantity
            })
          });

          if (!response.ok) throw new Error('Failed to add to cart');

          const data = await response.json();
          // Update cart UI
        } catch (error) {
          console.error('Error adding to cart:', error);
          this.error = error.message;
        } finally {
          this.adding = false;
        }
      }
    }));
  });
</script>
```

---

## Debugging & Console Logging

### Debug First, Understand Root Causes, Then Solve

**Console.log is ENCOURAGED during debugging to understand what's happening.**

```javascript
// ✗ BAD - No explanation
console.log('Cart data:', cartData);

// ✓ GOOD - With TODO comment explaining why
// TODO: debugging cart calculation - checking line item totals
console.log('Cart data:', cartData);

// TODO: checking if Alpine reactive data updates
console.log('Component state:', this.$data);

// TODO: verifying API response structure
console.log('Product data:', productData);
```

**Rules:**
1. **Always prefix with `// TODO:`** and brief reason when adding console.log
2. **Use console.log freely** to understand issues during development
3. **Remove before pushing to production** - the TODO prefix makes them easy to find
4. **console.error()** for caught errors is fine to keep (see error handling examples)

**Format:** `// TODO: [brief but clear reason]`

**Strategy:** Debug → Understand → Solve → Clean up console logs before production.

### Debugging Alpine Components

```liquid
<!-- Debug Alpine state -->
<div x-data="{ count: 0 }" x-init="console.log('Component initialized:', $data)">
  <button @click="count++; console.log('Count:', count)">
    Click me
  </button>
</div>

<!-- Use Alpine DevTools (browser extension) for better debugging -->
```

---

## Common Alpine.js Patterns

### Toggle States
```liquid
<!-- Simple toggle -->
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open" x-transition>
    Content
  </div>
</div>

<!-- Multiple toggles -->
<div x-data="{ activeTab: 'description' }">
  <button @click="activeTab = 'description'" :class="{ 'active': activeTab === 'description' }">
    Description
  </button>
  <button @click="activeTab = 'reviews'" :class="{ 'active': activeTab === 'reviews' }">
    Reviews
  </button>

  <div x-show="activeTab === 'description'">Description content</div>
  <div x-show="activeTab === 'reviews'">Reviews content</div>
</div>
```

### Mobile Menu Toggle
```liquid
<div x-data="{ menuOpen: false }">
  <!-- Toggle button -->
  <button @click="menuOpen = !menuOpen" class="mobile-menu-toggle">
    Menu
  </button>

  <!-- Mobile menu -->
  <nav
    x-show="menuOpen"
    x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 transform -translate-x-full"
    x-transition:enter-end="opacity-100 transform translate-x-0"
    x-transition:leave="transition ease-in duration-200"
    x-transition:leave-start="opacity-100 transform translate-x-0"
    x-transition:leave-end="opacity-0 transform -translate-x-full"
    class="mobile-menu"
  >
    <!-- Menu items -->
    <button @click="menuOpen = false" class="close-menu">Close</button>
  </nav>

  <!-- Overlay -->
  <div
    x-show="menuOpen"
    @click="menuOpen = false"
    x-transition.opacity
    class="fixed inset-0 bg-black bg-opacity-50"
  ></div>
</div>
```

### Forms & Input Handling
```liquid
<!-- Simple form with two-way binding -->
<div x-data="{ email: '', subscribed: false }">
  <input
    type="email"
    x-model="email"
    placeholder="Enter your email"
    class="input"
  >

  <button
    @click="subscribed = true"
    :disabled="!email"
    class="btn-primary"
  >
    Subscribe
  </button>

  <p x-show="subscribed" x-text="`Thanks for subscribing with ${email}!`"></p>
</div>

<!-- Quantity selector -->
<div x-data="{ quantity: 1 }">
  <button @click="quantity = Math.max(1, quantity - 1)">-</button>
  <input type="number" x-model.number="quantity" min="1" class="w-16 text-center">
  <button @click="quantity++">+</button>
</div>
```

### Fetch API with Alpine
```liquid
<div x-data="{
  loading: false,
  error: null,
  cartCount: 0,

  async addToCart(variantId, quantity = 1) {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: variantId, quantity })
      });

      if (!response.ok) throw new Error('Failed to add to cart');

      const data = await response.json();
      this.cartCount = data.item_count;

      // TODO: Show success message
      console.log('Added to cart:', data);

    } catch (error) {
      console.error('Error adding to cart:', error);
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }
}">
  <button
    @click="addToCart({{ product.selected_or_first_available_variant.id }})"
    :disabled="loading"
    class="btn-primary"
  >
    <span x-show="!loading">Add to Cart</span>
    <span x-show="loading">Adding...</span>
  </button>

  <p x-show="error" class="text-error" x-text="error"></p>
  <p x-text="`Cart: ${cartCount} items`"></p>
</div>
```

### Debounced Search
```liquid
<div x-data="{
  query: '',
  results: [],
  searching: false,
  debounceTimer: null,

  search() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(async () => {
      if (!this.query) {
        this.results = [];
        return;
      }

      this.searching = true;

      try {
        const response = await fetch(`/search/suggest.json?q=${this.query}&resources[type]=product`);
        const data = await response.json();
        this.results = data.resources.results.products;
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        this.searching = false;
      }
    }, 300);
  }
}">
  <input
    type="search"
    x-model="query"
    @input="search"
    placeholder="Search products..."
    class="search-input"
  >

  <div x-show="searching">Searching...</div>

  <div x-show="results.length > 0" class="search-results">
    <template x-for="product in results" :key="product.id">
      <div class="search-result">
        <a :href="product.url" x-text="product.title"></a>
      </div>
    </template>
  </div>
</div>
```

### Intersection Observer (Lazy Loading)
```liquid
<div x-data="{
  visible: false
}" x-intersect="visible = true">
  <template x-if="visible">
    <img
      :src="`{{ product.featured_image | image_url: width: 800 }}`"
      alt="{{ product.title }}"
      class="w-full h-auto"
    >
  </template>
</div>
```

---

## Shopify-Specific JavaScript with Alpine

### Cart API with Alpine

```liquid
<div x-data="{
  cart: {},
  loading: false,
  error: null,

  async getCart() {
    try {
      const response = await fetch('/cart.js');
      this.cart = await response.json();
      return this.cart;
    } catch (error) {
      console.error('Error fetching cart:', error);
      this.error = error.message;
    }
  },

  async updateCartItem(lineItemKey, quantity) {
    this.loading = true;
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line: lineItemKey, quantity })
      });

      if (!response.ok) throw new Error('Failed to update cart');

      this.cart = await response.json();
    } catch (error) {
      console.error('Error updating cart:', error);
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },

  async clearCart() {
    this.loading = true;
    try {
      const response = await fetch('/cart/clear.js', { method: 'POST' });
      this.cart = await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      this.loading = false;
    }
  }
}" x-init="getCart()">
  <!-- Cart UI -->
  <div class="cart-items">
    <template x-for="item in cart.items" :key="item.key">
      <div class="cart-item">
        <p x-text="item.title"></p>
        <input
          type="number"
          :value="item.quantity"
          @change="updateCartItem(item.key, $event.target.value)"
          min="0"
        >
        <p x-text="`$${(item.final_line_price / 100).toFixed(2)}`"></p>
      </div>
    </template>
  </div>

  <button @click="clearCart()" :disabled="loading">Clear Cart</button>
</div>
```

### Product Recommendations with Alpine

```liquid
<div x-data="{
  recommendations: [],
  loading: true,

  async fetchRecommendations(productId) {
    try {
      const response = await fetch(
        `/recommendations/products.json?product_id=${productId}&limit=4`
      );
      const data = await response.json();
      this.recommendations = data.products;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      this.loading = false;
    }
  }
}" x-init="fetchRecommendations({{ product.id }})">
  <template x-if="loading">
    <p>Loading recommendations...</p>
  </template>

  <div class="product-recommendations">
    <template x-for="product in recommendations" :key="product.id">
      <div class="product-card">
        <a :href="product.url">
          <img :src="product.featured_image" :alt="product.title">
          <h3 x-text="product.title"></h3>
          <p x-text="`$${(product.price / 100).toFixed(2)}`"></p>
        </a>
      </div>
    </template>
  </div>
</div>
```

### Section Rendering with Alpine

```liquid
<div x-data="{
  sectionHtml: '',

  async fetchSection(sectionId) {
    try {
      const response = await fetch(`/?section_id=${sectionId}`);
      this.sectionHtml = await response.text();
    } catch (error) {
      console.error('Error fetching section:', error);
    }
  }
}">
  <button @click="fetchSection('featured-collection')">
    Load Section
  </button>

  <div x-html="sectionHtml"></div>
</div>
```

### Variant Selection with Alpine

```liquid
<div x-data="{
  selectedVariant: {{ product.selected_or_first_available_variant | json }},
  quantity: 1,

  selectVariant(variantId) {
    this.selectedVariant = {{ product.variants | json }}.find(v => v.id === variantId);
  }
}">
  <!-- Variant selector -->
  <select @change="selectVariant(parseInt($event.target.value))">
    {% for variant in product.variants %}
      <option value="{{ variant.id }}" {% if variant == product.selected_or_first_available_variant %}selected{% endif %}>
        {{ variant.title }} - {{ variant.price | money }}
      </option>
    {% endfor %}
  </select>

  <!-- Price display -->
  <p x-text="`$${(selectedVariant.price / 100).toFixed(2)}`"></p>

  <!-- Availability -->
  <p x-show="!selectedVariant.available" class="text-error">
    Out of stock
  </p>

  <!-- Add to cart button -->
  <button
    @click="addToCart(selectedVariant.id, quantity)"
    :disabled="!selectedVariant.available"
    class="btn-primary"
  >
    Add to Cart
  </button>
</div>
```

---

## Best Practices with Alpine.js

### 1. Keep Component State Simple

**✓ GOOD - Simple, clear state**
```liquid
<div x-data="{
  open: false,
  loading: false,
  error: null
}">
  <!-- Component -->
</div>
```

**✗ BAD - Overly complex state**
```liquid
<div x-data="{
  state: {
    ui: { modal: { open: false, content: null } },
    data: { items: [], loading: false }
  }
}">
  <!-- Too nested -->
</div>
```

### 2. Extract Complex Components

**✓ GOOD - Reusable Alpine component**
```liquid
<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('cartManager', () => ({
      cart: {},
      loading: false,
      error: null,

      async init() {
        await this.fetchCart();
      },

      async fetchCart() {
        this.loading = true;
        try {
          const response = await fetch('/cart.js');
          this.cart = await response.json();
        } catch (error) {
          this.error = error.message;
        } finally {
          this.loading = false;
        }
      }
    }));
  });
</script>

<div x-data="cartManager">
  <!-- Cart UI -->
</div>
```

**✗ BAD - Inline complex logic**
```liquid
<div x-data="{ /* 50 lines of complex logic */ }">
  <!-- Hard to read and maintain -->
</div>
```

### 3. Use Meaningful Property Names

**✓ GOOD**
```liquid
<div x-data="{
  isMenuOpen: false,
  productQuantity: 1,
  cartItemCount: 0
}">
```

**✗ BAD**
```liquid
<div x-data="{
  m: false,
  q: 1,
  c: 0
}">
```

### 4. Handle Errors Gracefully

**✓ GOOD - Error handling**
```liquid
<div x-data="{
  loading: false,
  error: null,

  async fetchData() {
    this.loading = true;
    this.error = null;

    try {
      const response = await fetch('/api/data.json');
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }
}">
  <template x-if="error">
    <p class="text-error" x-text="error"></p>
  </template>
</div>
```

### 5. Comment Complex Alpine Logic

```liquid
<div x-data="{
  // Track which product variant is currently selected
  selectedVariant: null,

  // Calculate final price including quantity discounts
  get finalPrice() {
    // Base price from selected variant
    let price = this.selectedVariant?.price || 0;

    // Apply quantity discount (10% off for 5+, 20% off for 10+)
    if (this.quantity >= 10) price *= 0.8;
    else if (this.quantity >= 5) price *= 0.9;

    return price * this.quantity;
  }
}">
```

### 6. Use Alpine Magics Wisely

**Available Alpine magics:**
- `$el` - Current element
- `$data` - Current component data
- `$watch()` - Watch for changes
- `$dispatch()` - Dispatch custom events
- `$nextTick()` - Wait for DOM updates
- `$refs` - Reference elements

**Example:**
```liquid
<div x-data="{ count: 0 }" x-init="$watch('count', value => console.log('Count changed:', value))">
  <button @click="count++">Increment</button>
  <p x-text="count"></p>
</div>
```

### 7. Avoid Direct DOM Manipulation

**✓ GOOD - Let Alpine handle DOM**
```liquid
<div x-data="{ visible: false }">
  <div x-show="visible">Content</div>
</div>
```

**✗ BAD - Manual DOM manipulation**
```liquid
<div x-data="{}">
  <button @click="document.querySelector('.content').style.display = 'block'">
    Show
  </button>
</div>
```

---

## Performance Tips with Alpine.js

### 1. Use `x-show` vs `x-if` Wisely

**Use `x-show`** - For frequently toggled elements (keeps in DOM, toggles display)
```liquid
<div x-show="menuOpen">
  <!-- Frequently toggled menu -->
</div>
```

**Use `x-if`** - For conditionally rendered elements (removes from DOM)
```liquid
<template x-if="user.isLoggedIn">
  <div><!-- Heavy component only shown when logged in --></div>
</template>
```

### 2. Debounce Expensive Operations

```liquid
<div x-data="{
  query: '',
  debounceTimer: null,

  search() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      // Expensive search operation
    }, 300);
  }
}">
  <input @input="search()" x-model="query">
</div>
```

### 3. Lazy Load with `x-intersect`

```liquid
<!-- Load image only when in viewport -->
<div x-data="{ visible: false }" x-intersect="visible = true">
  <template x-if="visible">
    <img src="large-image.jpg" alt="Product">
  </template>
</div>
```

### 4. Avoid Computed Properties in Loops

**✗ BAD - Expensive computation in loop**
```liquid
<template x-for="product in products">
  <div x-text="expensiveCalculation(product)"></div>
</template>
```

**✓ GOOD - Pre-compute before rendering**
```liquid
<div x-data="{
  products: [],

  async init() {
    const raw = await fetchProducts();
    this.products = raw.map(p => ({
      ...p,
      computed: expensiveCalculation(p)
    }));
  }
}">
  <template x-for="product in products">
    <div x-text="product.computed"></div>
  </template>
</div>
```

### 5. Scripts Already Loaded with `defer`

All external libraries are loaded with `defer` for optimal performance:
```liquid
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.15.3/dist/cdn.min.js" defer></script>
```

### 6. Use GSAP for Complex Animations

For complex animations, use GSAP instead of CSS:
```liquid
<div x-data="{
  animateIn() {
    gsap.from(this.$el, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
}" x-init="animateIn()">
  <!-- Content -->
</div>
```

---

## Integration with GSAP and Lenis

### GSAP Animations

```liquid
<div x-data="{
  init() {
    // Animate on component initialization
    gsap.from(this.$refs.hero, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out'
    });
  }
}">
  <div x-ref="hero" class="hero">
    <h1>Animated Hero</h1>
  </div>
</div>
```

### Lenis Smooth Scrolling

Lenis is automatically initialized in `layout/theme.liquid`. For custom scroll interactions:

```liquid
<div x-data="{
  init() {
    // Access global Lenis instance
    if (window.lenis) {
      window.lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
        // Custom scroll logic
      });
    }
  }
}">
  <!-- Content -->
</div>
```

---

## Checklist

Before considering JavaScript work complete:

- [ ] **Alpine.js used for interactivity** (not vanilla JavaScript)
- [ ] **Component state is simple and clear**
- [ ] **Complex components extracted** to Alpine.data()
- [ ] **Error handling in place** for all async operations
- [ ] **Loading states shown** for async operations
- [ ] **All console.log statements have TODO comments** (or removed before production)
- [ ] **Meaningful variable/property names** used
- [ ] **Comments added for complex logic**
- [ ] **Performance optimized** (x-show vs x-if, debouncing, etc.)
- [ ] **No direct DOM manipulation** (let Alpine handle it)
- [ ] **Tested on all breakpoints** (1440px, 1024px, 700px, 412px)
- [ ] **GSAP used for complex animations** (if applicable)
- [ ] **Shopify APIs integrated correctly** with Alpine
