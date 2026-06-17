document.addEventListener("DOMContentLoaded", () => {
  // --- Global Navigation & Scroll Logic ---
  const header = document.querySelector("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  
  // Scrolled header effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking navigation link
    document.querySelectorAll(".nav-item a").forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // --- Shopping Cart Logic ---
  let cart = JSON.parse(localStorage.getItem("aurasteps_cart")) || [];
  const cartIcon = document.getElementById("cart-icon-btn");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const cartClose = document.getElementById("cart-close");
  const cartCountBubble = document.querySelector(".cart-count");
  const cartItemsContainer = document.querySelector(".cart-drawer-items");
  const cartTotalVal = document.querySelector(".cart-summary-total");

  // Open/Close Cart Drawer
  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    renderCart();
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
  }

  if (cartIcon) cartIcon.addEventListener("click", (e) => { e.preventDefault(); openCart(); });
  if (cartClose) cartClose.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Add Item to Cart
  window.addToCart = function(productId, size = "US 9", quantity = 1) {
    const product = window.productsData.find(p => p.id === productId);
    if (!product) return;

    // Check if item already exists with the same size
    const existingIndex = cart.findIndex(item => item.id === productId && item.size === size);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: size,
        quantity: quantity
      });
    }

    localStorage.setItem("aurasteps_cart", JSON.stringify(cart));
    updateCartBubble();
    
    // Animate cart icon bubble
    if (cartCountBubble) {
      cartCountBubble.style.transform = "scale(1.3)";
      setTimeout(() => {
        cartCountBubble.style.transform = "scale(1)";
      }, 300);
    }

    // Automatically open cart to show the added item
    openCart();
  };

  // Remove Item from Cart
  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("aurasteps_cart", JSON.stringify(cart));
    updateCartBubble();
    renderCart();
  };

  // Update quantity in cart drawer
  window.updateCartQty = function(index, newQty) {
    if (newQty < 1) return;
    cart[index].quantity = parseInt(newQty);
    localStorage.setItem("aurasteps_cart", JSON.stringify(cart));
    updateCartBubble();
    renderCart();
  };

  // Update Cart Count Bubble
  function updateCartBubble() {
    if (!cartCountBubble) return;
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBubble.textContent = totalCount;
  }

  // Render Cart Items
  function renderCart() {
    if (!cartItemsContainer || !cartTotalVal) return;
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<div class="cart-empty-message">您的購物袋目前是空的。</div>`;
      cartTotalVal.textContent = "NT$ 0";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const itemHTML = `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">尺寸: ${item.size}</div>
            <div class="cart-item-price">NT$ ${item.price.toLocaleString()}</div>
            <div style="display:flex; align-items:center; gap: 10px; margin-top: 5px;">
              <label style="font-size:0.8rem; color:var(--text-muted);">數量:</label>
              <input type="number" min="1" value="${item.quantity}" 
                     style="width: 50px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color:#fff; text-align:center; border-radius:3px;" 
                     onchange="updateCartQty(${index}, this.value)">
            </div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">
            <span style="font-size: 1.2rem;">&times;</span>
          </button>
        </div>
      `;
      cartItemsContainer.insertAdjacentHTML("beforeend", itemHTML);
    });

    cartTotalVal.textContent = `NT$ ${total.toLocaleString()}`;
  }

  // Initialize bubble on load
  updateCartBubble();

  // --- Dynamic Products List Renderer (Shared) ---
  const dynamicGrid = document.getElementById("dynamic-product-grid");
  if (dynamicGrid) {
    const pageCategory = dynamicGrid.dataset.category; // womens, mens, accessories, new
    const pageSort = document.getElementById("sort-select");
    let displayProducts = [];

    // Filter products
    if (pageCategory === "new") {
      displayProducts = window.productsData.filter(p => p.isNew);
    } else if (pageCategory) {
      displayProducts = window.productsData.filter(p => p.category === pageCategory);
    } else {
      displayProducts = [...window.productsData];
    }

    function renderProductGrid() {
      dynamicGrid.innerHTML = "";
      
      if (displayProducts.length === 0) {
        dynamicGrid.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color: var(--text-muted); padding: 50px 0;">目前無相關商品</p>`;
        return;
      }

      displayProducts.forEach(prod => {
        const hasDiscount = prod.originalPrice && prod.originalPrice > prod.price;
        const discountBadge = hasDiscount ? `<span class="badge badge-discount">SALE</span>` : "";
        const newBadge = prod.isNew ? `<span class="badge badge-new">NEW</span>` : "";
        const originalPriceHTML = hasDiscount ? `<span class="price-original">NT$ ${prod.originalPrice.toLocaleString()}</span>` : "";

        const cardHTML = `
          <div class="product-card" data-id="${prod.id}">
            <div class="card-img-wrapper">
              <a href="product-detail.html?id=${prod.id}">
                <img src="${prod.image}" alt="${prod.name}" class="card-img" loading="lazy">
              </a>
              <div class="card-badges">
                ${newBadge}
                ${discountBadge}
              </div>
              <div class="card-actions-overlay">
                <button class="card-btn" onclick="addToCart('${prod.id}')" title="加入購物袋">
                  <span>🛍️</span>
                </button>
                <a href="product-detail.html?id=${prod.id}" class="card-btn" title="查看商品細節">
                  <span>👁️</span>
                </a>
              </div>
            </div>
            <div class="card-info">
              <span class="card-category">${prod.category === 'womens' ? '女鞋' : prod.category === 'mens' ? '男鞋' : '配件'}</span>
              <h4 class="card-title"><a href="product-detail.html?id=${prod.id}">${prod.name}</a></h4>
              <div class="card-price-row">
                <span class="price">NT$ ${prod.price.toLocaleString()}</span>
                ${originalPriceHTML}
              </div>
            </div>
          </div>
        `;
        dynamicGrid.insertAdjacentHTML("beforeend", cardHTML);
      });

      // Update count on page if exists
      const countEl = document.getElementById("results-count-number");
      if (countEl) countEl.textContent = displayProducts.length;
    }

    // Sorting functionality
    if (pageSort) {
      pageSort.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "price-asc") {
          displayProducts.sort((a, b) => a.price - b.price);
        } else if (val === "price-desc") {
          displayProducts.sort((a, b) => b.price - a.price);
        } else {
          // Default sorting (by id or order)
          if (pageCategory === "new") {
            displayProducts = window.productsData.filter(p => p.isNew);
          } else if (pageCategory) {
            displayProducts = window.productsData.filter(p => p.category === pageCategory);
          } else {
            displayProducts = [...window.productsData];
          }
        }
        renderProductGrid();
      });
    }

    // Initial render for shop list pages
    renderProductGrid();
  }

  // --- Dynamic Product Detail Page Renderer ---
  const detailPage = document.getElementById("product-detail-view");
  if (detailPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const product = window.productsData.find(p => p.id === productId);

    if (!product) {
      detailPage.innerHTML = `
        <div class="container" style="text-align:center; padding: 100px 0;">
          <h2 style="font-size: 2rem; margin-bottom: 20px;">找不到該商品</h2>
          <p style="color: var(--text-muted); margin-bottom: 40px;">抱歉，我們找不到您所查詢的商品資訊。</p>
          <a href="index.html" class="btn btn-primary">返回首頁</a>
        </div>
      `;
      return;
    }

    // Render breadcrumb or header tags
    const categoryName = product.category === 'womens' ? '女鞋' : product.category === 'mens' ? '男鞋' : '配件';
    const categoryLink = product.category === 'womens' ? 'womens.html' : product.category === 'mens' ? 'mens.html' : 'accessories.html';
    
    // Dynamic page title updates
    document.title = `${product.name} | AURA STEPS 奢華鞋履`;

    // Render product details
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const priceHTML = hasDiscount 
      ? `<span class="detail-price">NT$ ${product.price.toLocaleString()}</span>
         <span class="detail-price-original">NT$ ${product.originalPrice.toLocaleString()}</span>`
      : `<span class="detail-price">NT$ ${product.price.toLocaleString()}</span>`;

    // Render dynamic size picker based on category
    let sizeSelectorHTML = "";
    if (product.category !== "accessories") {
      sizeSelectorHTML = `
        <div class="selection-title">選擇尺寸 (US Size)</div>
        <div class="option-grid" id="size-options">
          <div class="size-pill active">US 7</div>
          <div class="size-pill">US 8</div>
          <div class="size-pill">US 9</div>
          <div class="size-pill">US 10</div>
          <div class="size-pill">US 11</div>
        </div>
      `;
    } else {
      sizeSelectorHTML = `
        <div class="selection-title">規格規格</div>
        <div class="option-grid" id="size-options">
          <div class="size-pill active">標準單一尺碼</div>
        </div>
      `;
    }

    // Create specs table lines
    let specsRowsHTML = "";
    for (const [key, val] of Object.entries(product.specs)) {
      specsRowsHTML += `
        <tr>
          <td class="spec-label">${key}</td>
          <td class="spec-value">${val}</td>
        </tr>
      `;
    }

    detailPage.innerHTML = `
      <div class="container">
        <div style="margin-bottom: 30px; font-size: 0.9rem; color: var(--text-muted);">
          <a href="index.html" style="hover: color: var(--primary);">首頁</a> &nbsp;/&nbsp; 
          <a href="${categoryLink}" style="hover: color: var(--primary);">${categoryName}</a> &nbsp;/&nbsp; 
          <span style="color: var(--text-main);">${product.name}</span>
        </div>
        
        <div class="product-detail-container">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="main-image-panel">
              <img src="${product.image}" alt="${product.name}" id="main-product-img">
            </div>
            <div class="thumbnail-row">
              <div class="thumb-box active" onclick="setProductImage('${product.image}', this)">
                <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="thumb-box" onclick="setProductImage('${product.image}', this)">
                <img src="${product.image}" alt="${product.name}" style="filter: brightness(0.9) contrast(1.1);">
              </div>
              <div class="thumb-box" onclick="setProductImage('${product.image}', this)">
                <img src="${product.image}" alt="${product.name}" style="filter: hue-rotate(15deg);">
              </div>
              <div class="thumb-box" onclick="setProductImage('${product.image}', this)">
                <img src="${product.image}" alt="${product.name}" style="filter: grayscale(0.5);">
              </div>
            </div>
          </div>
          
          <!-- Detail Info -->
          <div class="detail-info-panel">
            <span class="detail-category">${categoryName}</span>
            <h1 class="detail-title">${product.name}</h1>
            <div class="detail-price-row">
              ${priceHTML}
            </div>
            
            <p class="detail-desc">${product.description}</p>
            
            ${sizeSelectorHTML}
            
            <div class="selection-title">數量</div>
            <div style="display:flex; align-items:center; gap:20px; margin-bottom: 40px;">
              <div class="quantity-control">
                <button class="qty-btn" id="qty-dec">-</button>
                <div class="qty-val" id="qty-count">1</div>
                <button class="qty-btn" id="qty-inc">+</button>
              </div>
            </div>
            
            <div class="detail-actions-row">
              <button class="btn btn-primary" id="btn-add-to-cart-page">加入購物袋 🛍️</button>
              <button class="btn btn-secondary" id="btn-wishlist">收藏 🤍</button>
            </div>
            
            <!-- Specifications -->
            <div class="spec-tabs">
              <div class="spec-tab-title">詳細規格</div>
              <table class="spec-table">
                ${specsRowsHTML}
              </table>
            </div>
          </div>
        </div>
        
        <!-- Related Products Section -->
        <div class="section" style="padding-bottom: 0; border-bottom: none;">
          <div class="section-header" style="margin-bottom: 40px; text-align: left;">
            <span class="section-tag" style="text-align: left;">推薦商品</span>
            <h3 class="section-title" style="font-size: 1.8rem;">您可能也會喜歡</h3>
          </div>
          <div class="product-grid" id="related-product-grid" style="padding: 0;">
            <!-- Rendered via JS -->
          </div>
        </div>
      </div>
    `;

    // Size Selection handler
    const sizePills = document.querySelectorAll(".size-pill");
    let selectedSize = sizePills[0] ? sizePills[0].textContent : "US 9";
    sizePills.forEach(pill => {
      pill.addEventListener("click", () => {
        sizePills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        selectedSize = pill.textContent;
      });
    });

    // Quantity Inc/Dec handler
    const qtyCount = document.getElementById("qty-count");
    const qtyInc = document.getElementById("qty-inc");
    const qtyDec = document.getElementById("qty-dec");
    let currentQty = 1;

    if (qtyInc && qtyDec && qtyCount) {
      qtyInc.addEventListener("click", () => {
        currentQty++;
        qtyCount.textContent = currentQty;
      });
      qtyDec.addEventListener("click", () => {
        if (currentQty > 1) {
          currentQty--;
          qtyCount.textContent = currentQty;
        }
      });
    }

    // Add to Cart from page button
    const addToCartPageBtn = document.getElementById("btn-add-to-cart-page");
    if (addToCartPageBtn) {
      addToCartPageBtn.addEventListener("click", () => {
        addToCart(product.id, selectedSize, currentQty);
      });
    }

    // Wishlist simulation
    const wishlistBtn = document.getElementById("btn-wishlist");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", () => {
        wishlistBtn.textContent = wishlistBtn.textContent === "收藏 🤍" ? "已收藏 ❤️" : "收藏 🤍";
      });
    }

    // Thumbnail switcher
    window.setProductImage = function(src, element) {
      const mainImg = document.getElementById("main-product-img");
      if (mainImg) {
        mainImg.src = src;
        // Apply filters or styling if thumbnail has special class or is clicked
        if (element.children[0]) {
          mainImg.style.filter = element.children[0].style.filter;
        }
      }
      
      const thumbs = document.querySelectorAll(".thumb-box");
      thumbs.forEach(t => t.classList.remove("active"));
      element.classList.add("active");
    };

    // Render Related Products (same category, max 4 items, exclude current)
    const relatedGrid = document.getElementById("related-product-grid");
    if (relatedGrid) {
      const relatedProducts = window.productsData
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

      relatedProducts.forEach(prod => {
        const hasDiscount = prod.originalPrice && prod.originalPrice > prod.price;
        const discountBadge = hasDiscount ? `<span class="badge badge-discount">SALE</span>` : "";
        const newBadge = prod.isNew ? `<span class="badge badge-new">NEW</span>` : "";
        const originalPriceHTML = hasDiscount ? `<span class="price-original">NT$ ${prod.originalPrice.toLocaleString()}</span>` : "";

        const cardHTML = `
          <div class="product-card" data-id="${prod.id}">
            <div class="card-img-wrapper">
              <a href="product-detail.html?id=${prod.id}">
                <img src="${prod.image}" alt="${prod.name}" class="card-img" loading="lazy">
              </a>
              <div class="card-badges">
                ${newBadge}
                ${discountBadge}
              </div>
              <div class="card-actions-overlay">
                <button class="card-btn" onclick="addToCart('${prod.id}')" title="加入購物袋">
                  <span>🛍️</span>
                </button>
                <a href="product-detail.html?id=${prod.id}" class="card-btn" title="查看商品細節">
                  <span>👁️</span>
                </a>
              </div>
            </div>
            <div class="card-info">
              <span class="card-category">${prod.category === 'womens' ? '女鞋' : prod.category === 'mens' ? '男鞋' : '配件'}</span>
              <h4 class="card-title"><a href="product-detail.html?id=${prod.id}">${prod.name}</a></h4>
              <div class="card-price-row">
                <span class="price">NT$ ${prod.price.toLocaleString()}</span>
                ${originalPriceHTML}
              </div>
            </div>
          </div>
        `;
        relatedGrid.insertAdjacentHTML("beforeend", cardHTML);
      });
    }
  }

  // --- Dynamic Home Page Popular Products Renderer ---
  const homePopularGrid = document.getElementById("home-popular-products");
  if (homePopularGrid) {
    const popularProds = window.productsData.filter(p => p.isPopular).slice(0, 4);
    
    popularProds.forEach(prod => {
      const hasDiscount = prod.originalPrice && prod.originalPrice > prod.price;
      const discountBadge = hasDiscount ? `<span class="badge badge-discount">SALE</span>` : "";
      const newBadge = prod.isNew ? `<span class="badge badge-new">NEW</span>` : "";
      const originalPriceHTML = hasDiscount ? `<span class="price-original">NT$ ${prod.originalPrice.toLocaleString()}</span>` : "";

      const cardHTML = `
        <div class="product-card" data-id="${prod.id}">
          <div class="card-img-wrapper">
            <a href="product-detail.html?id=${prod.id}">
              <img src="${prod.image}" alt="${prod.name}" class="card-img" loading="lazy">
            </a>
            <div class="card-badges">
              ${newBadge}
              ${discountBadge}
            </div>
            <div class="card-actions-overlay">
              <button class="card-btn" onclick="addToCart('${prod.id}')" title="加入購物袋">
                <span>🛍️</span>
              </button>
              <a href="product-detail.html?id=${prod.id}" class="card-btn" title="查看商品細節">
                <span>👁️</span>
              </a>
            </div>
          </div>
          <div class="card-info">
            <span class="card-category">${prod.category === 'womens' ? '女鞋' : prod.category === 'mens' ? '男鞋' : '配件'}</span>
            <h4 class="card-title"><a href="product-detail.html?id=${prod.id}">${prod.name}</a></h4>
            <div class="card-price-row">
              <span class="price">NT$ ${prod.price.toLocaleString()}</span>
              ${originalPriceHTML}
            </div>
          </div>
        </div>
      `;
      homePopularGrid.insertAdjacentHTML("beforeend", cardHTML);
    });
  }
});
