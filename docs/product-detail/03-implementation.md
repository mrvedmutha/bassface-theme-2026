# Product Detail Section - Implementation Guide

## Liquid Schema

```liquid
{% schema %}
{
  "name": "Product Detail",
  "tag": "section",
  "class": "section-product-detail",
  "settings": [
    {
      "type": "product",
      "id": "product",
      "label": "Product"
    },
    {
      "type": "url",
      "id": "size_guide_url",
      "label": "Size Guide URL"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "richtext",
      "id": "shipping_returns",
      "label": "Shipping & Returns"
    }
  ]
}
{% endschema %}
```

## HTML Structure

```liquid
<div class="product-detail">
  <div class="product-detail__gallery">
    <div class="gallery__dots"></div>
    <div class="gallery__image">
      <img src="{{ product.featured_image | img_url: '1000x' }}" alt="{{ product.title }}">
      <button class="gallery__zoom" aria-label="Zoom image"></button>
    </div>
  </div>

  <div class="product-detail__divider"></div>

  <div class="product-detail__info">
    <p class="info__category">{{ product.type }}</p>
    <h1 class="info__title">{{ product.title }}</h1>

    <div class="info__size-selector">
      <!-- Desktop: buttons -->
      <div class="size-buttons"></div>
      <!-- Mobile: dropdown -->
      {% render 'size-dropdown' %}
    </div>

    <a href="{{ section.settings.size_guide_url }}" class="info__size-guide">SHOW SIZE GUIDE</a>

    <div class="info__actions">
      <div class="quantity-selector"></div>
      <button class="save-button" aria-label="Save"></button>
    </div>

    <button class="info__add-to-cart">ADD TO CART - {{ product.price | money }}</button>

    <div class="info__tabs">
      <button class="tab active">DESCRIPTION</button>
      <button class="tab">SHIPPING & RETURNS</button>
    </div>
  </div>
</div>
```

## CSS - Base (1440px)

```css
.product-detail {
  display: flex;
  gap: 0;
  max-width: 1440px;
  margin: 0 auto;
}

.product-detail__gallery {
  display: flex;
  width: 708px;
  position: relative;
}

.gallery__dots {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 16px;
}

.gallery__zoom {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
}

.product-detail__divider {
  width: 1px;
  height: 836px;
  background: #000;
}

.product-detail__info {
  width: 480px;
  padding-left: 40px;
}

.info__category {
  font-size: 16px;
  font-weight: 300;
}

.info__title {
  font-size: 24px;
  font-weight: 400;
}

.size-buttons {
  display: flex;
  gap: 5px;
}

.size-buttons button {
  height: 64px;
  border-radius: 5px;
  flex: 1;
}

.size-dropdown {
  display: none;
}

.quantity-selector,
.save-button,
.info__add-to-cart {
  height: 64px;
  border-radius: 5px;
}

.info__actions {
  display: flex;
  gap: 5px;
}
```

## CSS - Tablet (1024px)

```css
@media (max-width: 1024px) {
  .product-detail__info {
    width: 440px;
  }
}
```

## CSS - Mobile (700px)

```css
@media (max-width: 700px) {
  .product-detail {
    flex-direction: column;
  }

  .product-detail__gallery {
    width: 100%;
    flex-direction: column;
    height: 500px;
  }

  .gallery__dots {
    flex-direction: row;
    justify-content: center;
    padding: 16px 0 0 0;
  }

  .gallery__zoom {
    width: 32px;
    height: 32px;
  }

  .product-detail__divider {
    display: none;
  }

  .product-detail__info {
    width: 440px;
    max-width: 100%;
    padding: 40px;
    background: #EFEFEF;
    border-radius: 10px 10px 0 0;
    margin: 0 auto;
  }

  .size-buttons {
    display: none;
  }

  .size-dropdown {
    display: block;
  }
}
```

## CSS - Compact Mobile (412px)

```css
@media (max-width: 412px) {
  .product-detail__gallery {
    height: 294px;
  }

  .product-detail__info {
    width: 392px;
  }

  .info__title {
    font-size: 22px;
  }
}
```

## JavaScript

```javascript
// Gallery carousel
// Quantity selector
// Size selection
// Tab switching
// Zoom functionality
```
