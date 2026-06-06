document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. Cursor Glow — Sage-tinted, smooth follow
  // ==========================================
  const cursorGlow = document.getElementById("cursorGlow");

  let cursorX = 0,
    cursorY = 0;
  let glowX = 0,
    glowY = 0;

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  // Smooth follow with 80ms lag
  const animateCursor = () => {
    glowX += (cursorX - glowX) * 0.08;
    glowY += (cursorY - glowY) * 0.08;
    if (cursorGlow) {
      cursorGlow.style.left = `${glowX - 120}px`;
      cursorGlow.style.top = `${glowY - 120}px`;
    }
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Scale cursor on hoverable elements
  const hoverTargets = document.querySelectorAll(
    "a, button, .product-card, .concern-btn, .science-card, .series-card, .byos-product-tile",
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursorGlow) {
        cursorGlow.style.width = "340px";
        cursorGlow.style.height = "340px";
        cursorGlow.style.opacity = "0.7";
      }
    });
    el.addEventListener("mouseleave", () => {
      if (cursorGlow) {
        cursorGlow.style.width = "240px";
        cursorGlow.style.height = "240px";
        cursorGlow.style.opacity = "0.5";
      }
    });
  });

  // ==========================================
  // 1.5 Magnetic Tags (Micro-Interaction)
  // ==========================================
  const magneticTags = document.querySelectorAll(".ingredient-tag");
  magneticTags.forEach((tag) => {
    tag.addEventListener("mousemove", (e) => {
      const rect = tag.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      tag.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      tag.style.transition = "none";
      tag.style.zIndex = "20";
    });
    tag.addEventListener("mouseleave", () => {
      tag.style.transform = "";
      tag.style.transition = "transform 0.5s var(--ease-spring)";
      tag.style.zIndex = "10";
    });
  });

  // ==========================================
  // 2. Navbar — Scroll State + Glass Morphism
  // ==========================================
  const navbar = document.getElementById("navbar");
  const announcementBar = document.querySelector(".announcement-bar");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Hide announcement bar on scroll
    if (scrollY > 60) {
      if (navbar) navbar.classList.add("scrolled");
      if (announcementBar) {
        announcementBar.style.transform = "translateY(-100%)";
        announcementBar.style.transition = "transform 0.4s ease";
      }
    } else {
      if (navbar) navbar.classList.remove("scrolled");
      if (announcementBar) {
        announcementBar.style.transform = "translateY(0)";
      }
    }
  });

  // ==========================================
  // 3. Scroll Reveal — IntersectionObserver
  // ==========================================
  const revealElements = document.querySelectorAll(".reveal, .reveal-stagger");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ==========================================
  // 4. Hero Text Entrance — Staggered Reveal
  // ==========================================
  const heroLines = document.querySelectorAll(".hero-line");

  if (heroLines.length > 0) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroLines.forEach((line, i) => {
              setTimeout(() => {
                line.classList.add("visible");
              }, i * 150);
            });
            heroObserver.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    heroObserver.observe(heroLines[0]);
  }

  // ==========================================
  // 5. Interactive 3D Bottle Showcase (Hero)
  // ==========================================
  const heroVisual = document.querySelector(".hero-visual");
  const bottleScene = document.getElementById("bottleScene");

  if (heroVisual && bottleScene) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = -(y - centerY) / 12;
      const rotateY = (x - centerX) / 12;

      bottleScene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
      bottleScene.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }

  // ==========================================
  // 6. Counter Animation — Science Section
  // ==========================================
  const scienceCards = document.querySelectorAll(".science-card");

  if (scienceCards.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.classList.add("visible");

            const counterEl = card.querySelector(".counter-value");
            const target = parseFloat(card.dataset.countTarget) || 0;

            if (counterEl && !counterEl.dataset.animated) {
              counterEl.dataset.animated = "true";
              animateCounter(counterEl, target, 1500);
            }

            const barFill = card.querySelector(".science-bar-fill");
            if (barFill) {
              const targetWidth =
                barFill.style.getPropertyValue("--target-width");
              setTimeout(() => {
                barFill.style.width = targetWidth;
              }, 300);
            }
          }
        });
      },
      { threshold: 0.3 },
    );

    scienceCards.forEach((card) => counterObserver.observe(card));
  }

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (isDecimal) {
          el.textContent = target.toFixed(1);
        } else {
          el.textContent = target;
        }
      }
    };

    requestAnimationFrame(step);
  }

  // ==========================================
  // 7. Canvas-based Ingredient Reactor
  // ==========================================
  const canvas = document.getElementById("reactorCanvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    const canvasInstructions = document.getElementById("canvasInstructions");
    const reactorResult = document.getElementById("reactorResult");
    const resultTitle = document.getElementById("resultTitle");
    const resultDesc = document.getElementById("resultDesc");
    const resultIcon = document.getElementById("resultIcon");

    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];
    let reactorActiveProduct = null;
    let systemColor = "#B8CCBF";
    let animationFrameId = null;

    class MolecularParticle {
      constructor(x, y, label, color) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.targetX = this.x;
        this.targetY = this.y;
        this.radius = Math.random() * 5 + 3;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.label = label || "";
        this.color = color || "rgba(184, 204, 191, 0.4)";
        this.alpha = 0.7;
      }

      update(isReactorLocked) {
        if (isReactorLocked) {
          this.x += (this.targetX - this.x) * 0.06;
          this.y += (this.targetY - this.y) * 0.06;
          this.alpha = 1;
        } else {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 15 || this.x > canvas.width - 15) this.vx *= -1;
          if (this.y < 15 || this.y > canvas.height - 15) this.vy *= -1;
          this.alpha = 0.5;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = this.color + "20";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.label) {
          ctx.fillStyle = "#B8B3AE";
          ctx.font = "500 9px Inter, sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(this.label, this.x, this.y - this.radius - 8);
        }

        ctx.restore();
      }
    }

    const spawnIdleParticles = () => {
      particles = [];
      const baseActives = [
        "BHA",
        "Aloe",
        "B3",
        "Zn",
        "HA",
        "SPF",
        "TiO₂",
        "Niacinamide",
      ];

      for (let i = 0; i < 16; i++) {
        particles.push(
          new MolecularParticle(
            null,
            null,
            baseActives[i % baseActives.length],
            "#B8CCBF",
          ),
        );
      }
    };

    spawnIdleParticles();

    const animateReactor = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLocked = !!reactorActiveProduct;

      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = isLocked ? 110 : 80;
          if (dist < maxDist) {
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
          }
        }
      }
      ctx.strokeStyle = isLocked
        ? systemColor + "30"
        : "rgba(184, 204, 191, 0.06)";
      ctx.lineWidth = isLocked ? 1.5 : 0.8;
      ctx.stroke();

      particles.forEach((p) => {
        p.update(isLocked);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animateReactor);
    };

    animateReactor();

    const concernButtons = document.querySelectorAll(".concern-btn");
    const concernProducts = {
      fw: {
        color: "#7CC09A",
        title: "Botanical BHA Complex Activated",
        desc: "Salicylic + Chamomile cleanser to control sebum and clear pigmentation.",
        actives: [
          "Salicylic",
          "Green Tea",
          "Chamomile",
          "Aloe Vera",
          "BHA",
          "Citric",
          "Zinc",
          "Cleanser",
        ],
      },
      sr: {
        color: "#89B5C0",
        title: "Active Barrier Boost Formula Synced",
        desc: "10% Niacinamide + Zinc PCA to heal acne marks and lock moisture.",
        actives: [
          "Niacinamide",
          "Zinc PCA",
          "Hyaluronic",
          "Ceramide",
          "Lipids",
          "Hydration",
          "B3",
          "Barrier",
        ],
      },
      ss: {
        color: "#CCAB82",
        title: "UV Shield Capsule Synthesized",
        desc: "SPF 50+ matte defense matrix protecting from sun tan and blue-light.",
        actives: [
          "SPF 50+",
          "UVA Filter",
          "UVB Guard",
          "Titanium",
          "Matte Silica",
          "Anti-Blue",
          "Barrier",
          "UV Guard",
        ],
      },
    };

    concernButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        concernButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const productType = btn.dataset.product;
        reactorActiveProduct = productType;
        const productInfo = concernProducts[productType];
        systemColor = productInfo.color;

        if (canvasInstructions) canvasInstructions.classList.add("hidden");
        if (resultTitle) resultTitle.textContent = productInfo.title;
        if (resultDesc) resultDesc.textContent = productInfo.desc;
        if (reactorResult) reactorResult.classList.add("visible");

        particles = [];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const totalPoints = productInfo.actives.length;

        for (let i = 0; i < totalPoints; i++) {
          const angle = (i / totalPoints) * Math.PI * 2;
          const radius = i % 2 === 0 ? 80 : 120;
          const targetX = centerX + Math.cos(angle) * radius;
          const targetY = centerY + Math.sin(angle) * radius;

          const spawnAngle = Math.random() * Math.PI * 2;
          const startX = centerX + Math.cos(spawnAngle) * 250;
          const startY = centerY + Math.sin(spawnAngle) * 250;

          particles.push(
            new MolecularParticle(
              startX,
              startY,
              productInfo.actives[i],
              systemColor,
            ),
          );

          particles[i].targetX = targetX;
          particles[i].targetY = targetY;
        }
      });
    });
  } // end reactor

  // ==========================================
  // 8. Shopping Cart State Management
  // ==========================================


  // Inject toast HTML dynamically if it doesn't exist
  if (!document.getElementById("cartToast")) {
    const toastHTML = `
      <div class="toast" id="cartToast">
        <div class="toast-dot"></div>
        <span id="toastMessage">Product added to routine!</span>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", toastHTML);
  }

  const cartTrigger = document.getElementById("cartTrigger");
  const cartTriggers = document.querySelectorAll(".cart-trigger");
  const cartDrawer = document.getElementById("cartDrawer");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartBadgeCount = document.getElementById("cartBadgeCount");
  const cartTotalValue = document.getElementById("cartTotalValue");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const toast = document.getElementById("cartToast");
  const toastMessage = document.getElementById("toastMessage");
  const continueShoppingBtn = document.getElementById("continueShoppingBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Shipping bar elements
  const shippingMessage = document.getElementById("shippingMessage");
  const shippingPercent = document.getElementById("shippingPercent");
  const shippingFill = document.getElementById("shippingFill");
  const FREE_SHIPPING_THRESHOLD = 499;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const toggleCart = (e) => {
    if (e) e.preventDefault();
    window.location.href = "cart.html";
  };

  if (cartTrigger) cartTrigger.addEventListener("click", toggleCart);
  cartTriggers.forEach((btn) => btn.addEventListener("click", toggleCart));

  const triggerToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => {
      toast.classList.remove("visible");
    }, 2800);
  };

  const updateShippingBar = (totalSum) => {
    if (!shippingMessage || !shippingPercent || !shippingFill) return;

    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalSum);
    const pct = Math.min(
      100,
      Math.round((totalSum / FREE_SHIPPING_THRESHOLD) * 100),
    );

    shippingFill.style.width = `${pct}%`;
    shippingPercent.textContent = `${pct}%`;

    if (remaining <= 0) {
      shippingMessage.innerHTML =
        '🎉 You\'ve unlocked <span class="highlight">free shipping!</span>';
    } else {
      shippingMessage.innerHTML = `Add ₹${remaining} more for <span class="highlight">free shipping</span>`;
    }
  };

  const updateCartUI = () => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadgeCount) cartBadgeCount.textContent = totalQty;

    const totalSum = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (cartTotalValue) cartTotalValue.textContent = `₹${totalSum}`;

    updateShippingBar(totalSum);

    if (cart.length === 0) {
      if (cartItemsContainer)
        cartItemsContainer.innerHTML = `<div class="cart-empty-message">Your routine is empty.<br>Add a product to begin your journey.</div>`;
      return;
    }

    if (cartItemsContainer) cartItemsContainer.innerHTML = "";

    cart.forEach((item, idx) => {
      const itemNode = document.createElement("div");
      itemNode.classList.add("cart-item");
      itemNode.style.animationDelay = `${idx * 80}ms`;

      let imgSrc = "";
      if (item.img === "fw")
        imgSrc = "Product Images/Face wash/Transparent_Facewash.png?v=3";
      else if (item.img === "sr")
        imgSrc = "Product Images/Serum/Transparent_Serum.png?v=3";
      else if (item.img === "ss")
        imgSrc = "Product Images/Sunscreen/Transparent_Sunscreen.png?v=3";

      itemNode.innerHTML = `
        <div class="cart-item-img">
          <img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: contain; transform: scale(1.5); filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price} · Active Formula</p>
          <div class="cart-item-quantity">
            <button class="qty-btn dec-btn" data-id="${item.id}">−</button>
            <span class="item-qty">${item.qty}</span>
            <button class="qty-btn inc-btn" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="cart-item-price">₹${item.price * item.qty}</div>
      `;

      if (cartItemsContainer) cartItemsContainer.appendChild(itemNode);
    });

    document.querySelectorAll(".dec-btn").forEach((btn) => {
      btn.addEventListener("click", () => adjustQuantity(btn.dataset.id, -1));
    });
    document.querySelectorAll(".inc-btn").forEach((btn) => {
      btn.addEventListener("click", () => adjustQuantity(btn.dataset.id, 1));
    });
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
    triggerToast(`${product.name} added to your routine`);
  };

  const adjustQuantity = (productId, amount) => {
    const product = cart.find((item) => item.id === productId);
    if (!product) return;
    product.qty += amount;
    if (product.qty <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
    updateCartUI();
  };

  // Bind add-to-cart buttons (works on any page)
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    if (!btn.hasAttribute("data-cart-listener")) {
      btn.setAttribute("data-cart-listener", "true");
      btn.addEventListener("click", () => {
        if (btn.classList.contains("adding") || btn.classList.contains("added"))
          return;

        const originalText = btn.innerHTML;
        const originalWidth = btn.offsetWidth;

        btn.style.width = originalWidth + "px";
        btn.classList.add("adding");

        setTimeout(() => {
          btn.classList.remove("adding");
          btn.classList.add("added");

          btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `;

          const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price),
            img: btn.dataset.img,
          };
          addToCart(product);

          setTimeout(() => {
            btn.classList.remove("added");
            btn.innerHTML = originalText;
            btn.style.width = "";
          }, 2000);
        }, 600);
      });
    }
  });

  // ==========================================
  // 8.5 Auth Gate & Checkout Flow
  // ==========================================
  // Inject Auth Modal HTML dynamically
  if (!document.getElementById("authModal")) {
    const authHTML = `
      <div class="auth-overlay" id="authOverlay"></div>
      <div class="ms-auth-modal" id="authModal">
        <button class="ms-close-btn" id="closeAuthBtn">&times;</button>
        <div class="ms-auth-wrapper" style="max-width:100%;">
          <div class="ms-auth-card" style="border:none; box-shadow:none; padding:2rem;">
            <!-- Top Section -->
            <div class="ms-auth-header">
              <img src="Product Images/Logo/Wordmark Logo.png" alt="Man Series" class="ms-auth-logo">
              <h2>WELCOME</h2>
              <p>Sign in to continue shopping and manage your orders.</p>
            </div>

            <!-- Auth Tabs -->
            <div class="ms-auth-tabs">
              <button class="ms-tab-btn active" id="modal-tab-mobile" onclick="switchAuthTab('mobile', true)">Continue with Mobile</button>
              <button class="ms-tab-btn" id="modal-tab-email" onclick="switchAuthTab('email', true)">Continue with Email</button>
            </div>

            <!-- Mobile Flow -->
            <div id="modalAuthFlowMobile" class="ms-auth-flow">
              <div id="modalMobileStep1">
                <div class="ms-input-group">
                  <span class="ms-country-code">+91</span>
                  <input type="tel" id="modalMobileNumberInput" placeholder="Mobile Number" maxlength="10" inputmode="numeric">
                </div>
                <p class="ms-microcopy">Get updates about your orders directly on your phone.</p>
                <button class="ms-primary-btn" onclick="sendOtp('mobile', true)">Continue</button>
              </div>
              <div id="modalMobileStep2" style="display: none;">
                <h3 style="text-align:center; font-family:var(--font-display); margin-bottom:0.5rem;">Verify Your Number</h3>
                <p style="text-align:center; font-size:0.9rem; color:var(--muted); margin-bottom:1.5rem;">Enter the 6-digit code sent to your mobile number.</p>
                <div class="ms-otp-container" id="modalMobileOtpBoxes">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                </div>
                <p class="ms-error-text" id="modalMobileErrorMsg" style="display: none;"></p>
                <button class="ms-primary-btn" onclick="verifyOtp('mobile', true)">Verify & Continue</button>
                <div class="ms-auth-options">
                  <button class="ms-text-btn" onclick="resendOtp('mobile', true)">Resend OTP</button>
                  <button class="ms-text-btn" onclick="changeLoginId('mobile', true)">Change Number</button>
                </div>
              </div>
            </div>

            <!-- Email Flow -->
            <div id="modalAuthFlowEmail" class="ms-auth-flow" style="display: none;">
              <div id="modalEmailStep1">
                <div class="ms-input-group">
                  <input type="email" id="modalEmailAddressInput" placeholder="Email Address">
                </div>
                <p class="ms-microcopy">Receive order confirmations and tracking updates.</p>
                <button class="ms-primary-btn" onclick="sendOtp('email', true)">Continue</button>
              </div>
              <div id="modalEmailStep2" style="display: none;">
                <h3 style="text-align:center; font-family:var(--font-display); margin-bottom:0.5rem;">Verify Your Email</h3>
                <p style="text-align:center; font-size:0.9rem; color:var(--muted); margin-bottom:1.5rem;">Enter the 6-digit code sent to your email address.</p>
                <div class="ms-otp-container" id="modalEmailOtpBoxes">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                  <input type="tel" maxlength="1" inputmode="numeric">
                </div>
                <p class="ms-error-text" id="modalEmailErrorMsg" style="display: none;"></p>
                <button class="ms-primary-btn" onclick="verifyOtp('email', true)">Verify & Continue</button>
                <div class="ms-auth-options">
                  <button class="ms-text-btn" onclick="resendOtp('email', true)">Resend Code</button>
                  <button class="ms-text-btn" onclick="changeLoginId('email', true)">Change Email</button>
                </div>
              </div>
            </div>

            <!-- Guest Checkout -->
            <div class="ms-guest-section">
              <div class="ms-divider"><span>OR</span></div>
              <button class="ms-secondary-btn" onclick="continueAsGuest()">Continue as Guest</button>
              <p class="ms-guest-text">You can create an account later during checkout.</p>
            </div>

            <!-- Trust Bar -->
            <div class="ms-trust-bar">
              <div class="ms-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>Secure Checkout</span>
              </div>
              <div class="ms-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>Fast Delivery</span>
              </div>
              <div class="ms-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>Easy Returns</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", authHTML);
  }

  const authOverlay = document.getElementById("authOverlay");
  const authModal = document.getElementById("authModal");
  const closeAuthBtn = document.getElementById("closeAuthBtn");

  const closeAuth = () => {
    if (authModal) authModal.classList.remove("open");
    if (authOverlay) authOverlay.classList.remove("open");
  };

  if (closeAuthBtn) closeAuthBtn.addEventListener("click", closeAuth);
  if (authOverlay) authOverlay.addEventListener("click", closeAuth);

  // Expose global functions for auth flow
  window.switchAuthTab = function (type, isModal = false) {
    const flowMobile = document.getElementById(isModal ? "modalAuthFlowMobile" : "authFlowMobile");
    const flowEmail = document.getElementById(isModal ? "modalAuthFlowEmail" : "authFlowEmail");
    const tabMobile = document.getElementById(isModal ? "modal-tab-mobile" : "tab-btn-mobile");
    const tabEmail = document.getElementById(isModal ? "modal-tab-email" : "tab-btn-email");

    if (type === "mobile") {
      if (flowMobile) flowMobile.style.display = "block";
      if (flowEmail) flowEmail.style.display = "none";
      if (tabMobile) tabMobile.classList.add("active");
      if (tabEmail) tabEmail.classList.remove("active");
    } else {
      if (flowMobile) flowMobile.style.display = "none";
      if (flowEmail) flowEmail.style.display = "block";
      if (tabMobile) tabMobile.classList.remove("active");
      if (tabEmail) tabEmail.classList.add("active");
    }
  };

  window.sendOtp = function (type, isModal = false) {
    let inputVal = "";

    if (type === "mobile") {
      const inputEl = document.getElementById(isModal ? "modalMobileNumberInput" : "mobileNumberInput");
      inputVal = inputEl ? inputEl.value.trim() : "";
      if (inputVal.length !== 10 || isNaN(inputVal)) {
        triggerToast("Please enter a valid 10-digit number");
        return;
      }
    } else {
      const inputEl = document.getElementById(isModal ? "modalEmailAddressInput" : "emailAddressInput");
      inputVal = inputEl ? inputEl.value.trim() : "";
      if (!inputVal.includes("@")) {
        triggerToast("Please enter a valid email address");
        return;
      }
    }

    // Move to step 2
    const step1Id = isModal 
      ? (type === "mobile" ? "modalMobileStep1" : "modalEmailStep1") 
      : (type === "mobile" ? "mobileStep1" : "emailStep1");
    const step2Id = isModal 
      ? (type === "mobile" ? "modalMobileStep2" : "modalEmailStep2") 
      : (type === "mobile" ? "mobileStep2" : "emailStep2");

    const step1 = document.getElementById(step1Id);
    const step2 = document.getElementById(step2Id);

    if (step1) step1.style.display = "none";
    if (step2) step2.style.display = "block";

    triggerToast("Code sent successfully");
  };

  window.changeLoginId = function (type, isModal = false) {
    const step1Id = isModal 
      ? (type === "mobile" ? "modalMobileStep1" : "modalEmailStep1") 
      : (type === "mobile" ? "mobileStep1" : "emailStep1");
    const step2Id = isModal 
      ? (type === "mobile" ? "modalMobileStep2" : "modalEmailStep2") 
      : (type === "mobile" ? "mobileStep2" : "emailStep2");

    const step1 = document.getElementById(step1Id);
    const step2 = document.getElementById(step2Id);

    if (step1) step1.style.display = "block";
    if (step2) step2.style.display = "none";
  };

  window.resendOtp = function (type, isModal = false) {
    triggerToast("New code sent");
  };

  window.verifyOtp = function (type, isModal = false) {
    const containerId = isModal 
      ? (type === "mobile" ? "modalMobileOtpBoxes" : "modalEmailOtpBoxes") 
      : (type === "mobile" ? "mobileOtpBoxes" : "emailOtpBoxes");
    const inputs = document.querySelectorAll("#" + containerId + " input");
    let code = "";
    inputs.forEach((i) => (code += i.value));

    if (code.length < 6) {
      triggerToast("Please enter the 6-digit code");
      return;
    }

    triggerToast("Verified Successfully!");
    localStorage.setItem("isLoggedIn", "true");
    setTimeout(() => {
      window.location.href = "payment.html";
    }, 800);
  };

  window.continueAsGuest = function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("redirect") === "payment") {
      window.location.href = "payment.html";
    } else {
      window.location.href = "index.html";
    }
  };

  // OTP Auto-focus Logic
  function setupOtpInputs() {
    const otpContainers = document.querySelectorAll(".ms-otp-container");
    otpContainers.forEach((container) => {
      const inputs = container.querySelectorAll("input");
      inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
          let val = e.target.value.replace(/\D/g, "");
          e.target.value = val;
          if (val.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
          }
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            inputs[index - 1].focus();
          }
        });
      });
    });
  }

  // Setup mobile input formatter
  document.querySelectorAll('input[type="tel"]').forEach((input) => {
    if (input.id.toLowerCase().includes("mobile")) {
      input.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 10) val = val.slice(0, 10);
        e.target.value = val;
      });
    }
  });

  setupOtpInputs();

  // Open modal logic from cart drawer
  const drawerCheckoutBtn = document.getElementById("checkoutBtn");
  if (drawerCheckoutBtn) {
    drawerCheckoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        triggerToast("Your routine is empty.");
        return;
      }

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        window.location.href = "payment.html";
      } else {
        window.location.href = "account.html?redirect=payment";
      }
    });
  }

  // ==========================================
  // 9. Filter/Sort Dropdowns — Series Section
  // ==========================================
  window.toggleDropdown = function (id) {
    const menu = document.getElementById(id);
    const btn = menu ? menu.previousElementSibling : null;
    if (!menu) return;

    document.querySelectorAll(".dropdown-menu.open").forEach((m) => {
      if (m.id !== id) {
        m.classList.remove("open");
        if (m.previousElementSibling)
          m.previousElementSibling.classList.remove("open");
      }
    });

    const isOpen = menu.classList.toggle("open");
    if (btn) btn.classList.toggle("open", isOpen);
  };

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-dropdown")) {
      document.querySelectorAll(".dropdown-menu.open").forEach((m) => {
        m.classList.remove("open");
        if (m.previousElementSibling)
          m.previousElementSibling.classList.remove("open");
      });
    }
  });

  const sortOptions = document.querySelectorAll(".sort-option");
  const sortLabel = document.getElementById("sortLabel");
  const seriesGrid = document.getElementById("seriesGrid");

  sortOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      sortOptions.forEach((o) => o.classList.remove("active"));
      opt.classList.add("active");
      if (sortLabel) sortLabel.textContent = opt.textContent;
      const sortDropdown = document.getElementById("sortDropdown");
      if (sortDropdown) sortDropdown.classList.remove("open");
      const sortBtn = document.querySelector("#sortBy .filter-btn");
      if (sortBtn) sortBtn.classList.remove("open");
      sortSeriesCards(opt.dataset.sort);
    });
  });

  function sortSeriesCards(method) {
    if (!seriesGrid) return;
    const cards = Array.from(seriesGrid.querySelectorAll(".series-card"));
    cards.sort((a, b) => {
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();
      const priceA = parseInt(a.dataset.price);
      const priceB = parseInt(b.dataset.price);
      if (method === "alpha-asc") return nameA.localeCompare(nameB);
      if (method === "alpha-desc") return nameB.localeCompare(nameA);
      if (method === "price-asc") return priceA - priceB;
      if (method === "price-desc") return priceB - priceA;
      return 0;
    });
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
    });
    setTimeout(() => {
      cards.forEach((card) => seriesGrid.appendChild(card));
      requestAnimationFrame(() => {
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, i * 60);
        });
      });
    }, 150);
  }

  // Price filter
  document.querySelectorAll('input[name="price"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const val = radio.value;
      const cards = document.querySelectorAll(".series-card");
      let count = 0;
      cards.forEach((card) => {
        const price = parseInt(card.dataset.price);
        let show = true;
        if (val === "under300" && price >= 300) show = false;
        if (val === "300to400" && (price < 300 || price > 400)) show = false;
        card.style.display = show ? "" : "none";
        if (show) count++;
      });
      const countEl = document.getElementById("seriesProductCount");
      if (countEl)
        countEl.textContent = `${count} product${count !== 1 ? "s" : ""}`;
    });
  });

  // ==========================================
  // 10. B.Y.O.S. — Build Your Own Set Logic
  // ==========================================
  const byosProducts = {
    fw: { name: "Multi-Active Face Wash", price: 249, img: "fw" },
    sr: { name: "Barrier Boost Serum", price: 349, img: "sr" },
    ss: { name: "Ultra-Shield Sunscreen", price: 299, img: "ss" },
  };

  let byosSelected = new Set();

  window.toggleByos = function (tile) {
    const id = tile.dataset.byosId;
    if (byosSelected.has(id)) {
      byosSelected.delete(id);
      tile.classList.remove("selected");
    } else {
      byosSelected.add(id);
      tile.classList.add("selected");
    }
    updateByosSummary();
  };

  function updateByosSummary() {
    const emptyState = document.getElementById("byosEmpty");
    const itemsEl = document.getElementById("byosItems");
    const pricingEl = document.getElementById("byosPricing");
    const addBtn = document.getElementById("byosAddBtn");
    const subtotalEl = document.getElementById("byosSubtotal");
    const discountEl = document.getElementById("byosDiscount");
    const discountLabelEl = document.getElementById("byosDiscountLabel");
    const totalEl = document.getElementById("byosTotal");

    if (!emptyState) return;

    if (byosSelected.size === 0) {
      emptyState.style.display = "";
      if (itemsEl) itemsEl.innerHTML = "";
      if (pricingEl) pricingEl.style.display = "none";
      if (addBtn) addBtn.style.display = "none";
      return;
    }

    emptyState.style.display = "none";

    if (itemsEl) {
      itemsEl.innerHTML = "";
      let subtotal = 0;
      byosSelected.forEach((id) => {
        const p = byosProducts[id];
        subtotal += p.price;
        const row = document.createElement("div");
        row.className = "byos-item-row";
        row.innerHTML = `<span>${p.name}</span><strong>₹${p.price}</strong>`;
        itemsEl.appendChild(row);
      });

      let discountPct = 0;
      if (byosSelected.size === 2) discountPct = 10;
      if (byosSelected.size === 3) discountPct = 15;
      const discountAmt = Math.round((subtotal * discountPct) / 100);
      const total = subtotal - discountAmt;

      if (pricingEl) pricingEl.style.display = "";
      if (addBtn) addBtn.style.display = "";

      if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
      if (discountPct > 0 && discountLabelEl) {
        discountLabelEl.textContent = `Bundle Discount (${discountPct}% off)`;
      } else if (discountLabelEl) {
        discountLabelEl.textContent = "Bundle Discount";
      }
      if (discountEl) discountEl.textContent = `−₹${discountAmt}`;
      if (totalEl) totalEl.textContent = `₹${total}`;
    }
  }

  window.addByosToCart = function () {
    if (byosSelected.size === 0) return;
    byosSelected.forEach((id) => {
      const p = byosProducts[id];
      addToCart({ id: id, name: p.name, price: p.price, img: p.img });
    });
    byosSelected.clear();
    document
      .querySelectorAll(".byos-product-tile")
      .forEach((t) => t.classList.remove("selected"));
    updateByosSummary();
    triggerToast("Custom set added to your routine!");
  };

  // Initialize cart badge on load
  updateCartUI();

  // ==========================================
  // 11. Mobile Navigation Menu Toggle
  // ==========================================
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  const toggleMobileNav = () => {
    if (navMenu) navMenu.classList.toggle("open");
    if (mobileMenuBtn) mobileMenuBtn.classList.toggle("open");
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMobileNav);
});

// Testing Tool: Reset Data Button
const resetBtn = document.createElement("button");
resetBtn.innerHTML = "?? Reset Data";
resetBtn.style.cssText =
  "position:fixed; bottom:20px; left:20px; z-index:9999; background:#b84c30; color:#fff; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-size:0.8rem; box-shadow:0 4px 10px rgba(0,0,0,0.2);";
resetBtn.title = "Clear all cart, login, and profile data to test from scratch";
resetBtn.onclick = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index.html";
};
document.body.appendChild(resetBtn);
