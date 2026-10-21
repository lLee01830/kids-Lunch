import { useEffect, useMemo, useState, type FormEvent } from "react";
import { business, categories, delivery, menu, type MenuItem } from "./menu";

type Cart = Record<string, number>;
type DeliveryRoute = "participating" | "quote";
type DemoOrderDetails = {
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  school: string;
  grade: string;
  deliveryDate: string;
  instructions: string;
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(amount);

function App() {
  const [cart, setCart] = useState<Cart>({});
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [route, setRoute] = useState<DeliveryRoute>("quote");
  const [orderPreview, setOrderPreview] = useState(false);
  const [orderDetails, setOrderDetails] = useState<DemoOrderDetails | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!cartOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setCartOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [cartOpen]);

  const cartLines = useMemo(
    () => menu.flatMap((item) => {
      const quantity = cart[item.id];
      return quantity ? [{ item, quantity }] : [];
    }),
    [cart],
  );
  const itemCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const lunchboxCount = cartLines.reduce(
    (sum, line) => sum + (line.item.lunchbox ? line.quantity : 0),
    0,
  );
  const fee = subtotal >= delivery.freeDeliveryThreshold
    ? 0
    : lunchboxCount >= 2
      ? delivery.multipleLunchboxesFee
      : delivery.singleLearnerFee;
  const today = new Date();
  const minimumDeliveryDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const filteredMenu = menu.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch = `${item.name} ${item.description}`.toLowerCase().includes(search.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  function updateQuantity(item: MenuItem, change: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[item.id] ?? 0) + change;
      if (quantity <= 0) delete next[item.id];
      else next[item.id] = quantity;
      return next;
    });
    setOrderPreview(false);
    setOrderDetails(null);
  }

  function openCart() {
    setCheckout(false);
    setOrderPreview(false);
    setOrderDetails(null);
    setCartOpen(true);
  }

  function placeDemoOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setOrderDetails({
      parentName: String(form.get("parentName") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      childName: String(form.get("childName") ?? ""),
      school: String(form.get("school") ?? ""),
      grade: String(form.get("grade") ?? ""),
      deliveryDate: String(form.get("deliveryDate") ?? ""),
      instructions: String(form.get("instructions") ?? ""),
    });
    setOrderPreview(true);
  }

  return (
    <div>
      <div className="announcement">Fresh school-day favourites, made for happy little lunch breaks <span>✦</span></div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label={`${business.name} home`}>
          <img src="/lunchbox.svg" alt="" />
          <span><strong>{business.name}</strong><small>{business.slogan}</small></span>
        </a>
        <nav className={mobileNavOpen ? "desktop-nav mobile-nav-open" : "desktop-nav"} aria-label="Main navigation">
          <a href="#menu" onClick={() => setMobileNavOpen(false)}>Our menu</a>
          <a href="#how-it-works" onClick={() => setMobileNavOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMobileNavOpen(false)}>About us</a>
        </nav>
        <div className="header-actions">
          <button className="mobile-menu-toggle" onClick={() => setMobileNavOpen((open) => !open)} aria-expanded={mobileNavOpen} aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}>☰</button>
          <button className="cart-button" onClick={openCart} aria-label={`Open cart, ${itemCount} items`}>
            <span aria-hidden="true">♡</span><span className="cart-label">Cart</span><b>{itemCount}</b>
          </button>
          <a className="button button-dark header-order" href="#menu">Order lunch <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span>✳</span> MADE FOR LITTLE LUNCH BREAKS</div>
            <h1>Healthy lunches.<br /><span>Happy kids!</span></h1>
            <p>School-day favourites, packed with care and ready to make lunchtime the best part of their day.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#menu">Explore the menu <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-note"><span className="avatar-stack" aria-hidden="true"><i>🍎</i><i>🥪</i><i>🍊</i></span><span>Little favourites, big lunchtime smiles</span></div>
          </div>
          <div className="hero-art" aria-label="Illustration of a colourful lunch spread">
            <div className="sun-shape" />
            <div className="hero-food-card">
              <div className="hero-bento">
                <span>🍓</span><span>🥪</span><span>🥕</span><span>🍇</span><span>🧀</span><span>🥒</span>
              </div>
              <div className="bento-lid"><span>HAPPY<br />LUNCH!</span><span className="lid-smile">⌣</span></div>
            </div>
            <div className="floating fruit">🍊</div>
            <div className="floating leaf">✿</div>
            <div className="art-caption"><span>♡</span> Packed with a little extra love</div>
          </div>
          <div className="hero-bottom"><span>GOOD FOOD, GOOD MOOD</span><span>SCROLL TO FIND THEIR NEW FAVOURITE ↓</span></div>
        </section>

        <section className="trust-strip" aria-label="Our values">
          <div><span>✿</span> Kid-approved favourites</div><i>✳</i>
          <div><span>♡</span> Easy for busy parents</div><i>✳</i>
          <div><span>☼</span> Made for school days</div>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading">
            <div><div className="eyebrow"><span>✳</span> A MENU FULL OF LITTLE WINS</div><h2>What's for <em>lunch?</em></h2></div>
            <p>From first-break bites to lunchtime favourites, there’s something to make every school day a little brighter.</p>
          </div>
          <div className="menu-toolbar">
            <div className="category-list" role="group" aria-label="Filter menu by category">
              {categories.map((value) => (
                <button key={value} className={category === value ? "category-chip active" : "category-chip"} onClick={() => setCategory(value)} aria-pressed={category === value}>
                  {value}
                </button>
              ))}
            </div>
            <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search menu</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a favourite..." /></label>
          </div>
          {filteredMenu.length ? (
            <div className="menu-grid">
              {filteredMenu.map((item) => (
                <article className="food-card" key={item.id}>
                  <div className={`food-art ${item.color}`} aria-label={`Illustration of ${item.name}`} role="img">
                    <span>{item.emoji}</span><small>{item.category === "Lunch boxes" ? "LUNCHBOX FAVOURITE" : item.category.toUpperCase()}</small>
                  </div>
                  <div className="food-info">
                    <div className="food-title"><h3>{item.name}</h3><strong>{money(item.price)}</strong></div>
                    <p>{item.description}</p>
                    <p className="availability-note">Sample item · confirm availability</p>
                    {item.note && <p className="food-note">{item.note}</p>}
                    <button className="add-button" onClick={() => updateQuantity(item, 1)}>Add to cart <span aria-hidden="true">+</span></button>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="empty-search"><span>🔎</span><h3>No lunchbox matches that search</h3><p>Try another word or choose a different category.</p></div>}
          <p className="sample-price-note">Sample menu and prices shown in South African rand (ZAR). Confirm availability and final prices before launch.</p>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-wrap">
            <div className="section-heading centered-heading"><div><div className="eyebrow"><span>✳</span> LUNCH PLANS, MADE SIMPLE</div><h2>Good things come in <em>three steps.</em></h2></div><p>Fewer morning scrambles. More lunchtime smiles.</p></div>
            <div className="steps-grid">
              <article className="step-card"><span className="step-number">01</span><div className="step-emoji">🧺</div><h3>Pick their favourites</h3><p>Explore the menu and pop the things they love into your basket.</p></article>
              <article className="step-card"><span className="step-number">02</span><div className="step-emoji">📝</div><h3>Tell us the school details</h3><p>Add the learner and school information needed for a lunch delivery.</p></article>
              <article className="step-card"><span className="step-number">03</span><div className="step-emoji">☀️</div><h3>Lunch, looking lovely</h3><p>Once real ordering is set up, their school-day meal can be on its way.</p></article>
            </div>
            <div className="delivery-callout"><span className="callout-icon">🚲</span><div><strong>School delivery, with a little planning.</strong><p>We’re still setting up our routes. Delivery depends on your school location and schedule.</p></div><a href="#contact">Delivery details <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-illustration"><div className="about-sun">☀</div><div className="about-card">🥪<span>MADE WITH A<br />LITTLE LOVE</span></div><span className="about-sparkle">✳</span></div>
          <div className="about-copy"><div className="eyebrow"><span>✳</span> A LITTLE ABOUT US</div><h2>Big care for<br /><em>little lunches.</em></h2><p>Happy Lunchbox is a school-lunch idea built around the little moments that make a school day feel special. We’re putting together a menu that’s easy for parents and fun for kids.</p><p className="placeholder-note">Business details and school partnerships will be added once confirmed.</p><a className="text-link" href="#contact">Say hello <span aria-hidden="true">→</span></a></div>
        </section>

        <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><div><div className="eyebrow"><span>✳</span> WE’D LOVE TO HEAR FROM YOU</div><h2>Have a school<br />in mind?</h2><p>Let’s chat about delivery routes and lunchtime possibilities.</p></div><div className="contact-details"><div><span>PHONE</span><strong><a href={`tel:${business.phone.replace(/\s/g, "")}`}>{business.phone}</a></strong></div><div><span>EMAIL</span><strong><a href={`mailto:${business.email}`}>{business.email}</a></strong></div><div><span>WHATSAPP</span><strong><a href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}>{business.whatsapp}</a></strong></div><p>{business.hours}</p></div></div></section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#home"><img src="/lunchbox.svg" alt="" /><span><strong>{business.name}</strong><small>{business.slogan}</small></span></a><span>Sample website · Business details to be confirmed</span><a href="#home">Back to top ↑</a></footer>

      {cartOpen && <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <section className="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-describedby="cart-description">
          <div className="cart-heading"><div><div className="eyebrow"><span>✳</span> A LITTLE BOX OF GOODNESS</div><h2 id="cart-title">{checkout ? "Checkout" : "Your basket"}</h2><span id="cart-description" className="sr-only">Review your lunch selections and estimated order total.</span></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
          {orderPreview ? (
            <div className="order-preview">
              <div className="preview-icon">📝</div><h3>Demo order preview</h3>
              <p>Your order details were checked in this page only. Nothing was sent, paid for, or confirmed.</p>
              <div className="summary-box"><strong>Order summary</strong>{cartLines.map(({ item, quantity }) => <div key={item.id}><span>{quantity} × {item.name}</span><span>{money(quantity * item.price)}</span></div>)}<div className="summary-total"><span>Food subtotal</span><strong>{money(subtotal)}</strong></div>{route === "participating" ? <div><span>Delivery</span><span>{fee === 0 ? "Free" : money(fee)}</span></div> : <div><span>Delivery</span><span>Quote required</span></div>}<div className="summary-total"><span>{route === "participating" ? "Estimated total" : "Food total (delivery not included)"}</span><strong>{route === "participating" ? money(subtotal + fee) : money(subtotal)}</strong></div></div>
              {orderDetails && <div className="summary-box"><strong>Delivery details</strong><div><span>Parent or guardian</span><span>{orderDetails.parentName}</span></div><div><span>Phone</span><span>{orderDetails.phone}</span></div>{orderDetails.email && <div><span>Email</span><span>{orderDetails.email}</span></div>}<div><span>Learner</span><span>{orderDetails.childName} · {orderDetails.grade}</span></div><div><span>School</span><span>{orderDetails.school}</span></div><div><span>Delivery date</span><span>{orderDetails.deliveryDate}</span></div>{orderDetails.instructions && <div><span>Instructions</span><span>{orderDetails.instructions}</span></div>}</div>}
              <button className="button button-dark full-button" onClick={() => { setCart({}); setOrderPreview(false); setOrderDetails(null); setCheckout(false); setCartOpen(false); }}>Done</button>
            </div>
          ) : cartLines.length === 0 ? (
            <div className="empty-cart"><div>🧺</div><h3>Your basket is waiting</h3><p>Pick a few school-day favourites and they’ll show up here.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Explore the menu</button></div>
          ) : checkout ? (
            <form className="checkout-form" onSubmit={placeDemoOrder}>
              <div className="checkout-items">{cartLines.map(({ item, quantity }) => <div key={item.id}><span>{quantity} × {item.name}</span><strong>{money(quantity * item.price)}</strong></div>)}</div>
              <div className="form-section-title">Parent or guardian</div>
              <label>Full name <input name="parentName" autoComplete="name" required /></label>
              <div className="form-row"><label>Telephone <input name="phone" type="tel" autoComplete="tel" required /></label><label>Email <input name="email" type="email" autoComplete="email" required /></label></div>
              <div className="form-section-title">Learner and delivery</div>
              <div className="form-row"><label>Learner's first name <input name="childName" required /></label><label>Class or grade <input name="grade" required /></label></div>
              <label>School name <input name="school" required /></label>
              <div className="form-row"><label>Delivery date <input name="deliveryDate" type="date" min={minimumDeliveryDate} required /></label><label>School route status<select value={route} onChange={(event) => setRoute(event.target.value === "participating" ? "participating" : "quote")}><option value="quote">Not sure / outside route — request a quote</option><option value="participating">Confirmed participating route</option></select></label></div>
              <label>Special instructions <span className="optional">(optional)</span><textarea name="instructions" rows={2} /></label>
              <p className="privacy-note">Only enter information needed for this demo. Children’s details are not sent to a business or saved.</p>
              <label className="checkbox-label"><input type="checkbox" required /> I have reviewed the order details above.</label>
              <div className="checkout-total"><div><span>Food subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong>{route === "quote" ? "Contact us for a quote" : fee === 0 ? "Free" : money(fee)}</strong></div><div className="grand-total"><span>{route === "quote" ? "Food total (delivery not included)" : "Estimated total"}</span><strong>{route === "quote" ? money(subtotal) : money(subtotal + fee)}</strong></div></div>
              {route === "quote" && <p className="route-warning">{business.serviceNote}</p>}
              <div className="demo-disclaimer"><strong>Demo checkout only.</strong> Orders are not sent, paid for, or confirmed. No payment details are collected.</div>
              <button className="button button-dark full-button" type="submit">Review demo order <span aria-hidden="true">→</span></button>
              <button className="back-button" type="button" onClick={() => setCheckout(false)}>← Back to basket</button>
            </form>
          ) : (
            <div className="cart-content">
              <div className="cart-lines">{cartLines.map(({ item, quantity }) => <div className="cart-line" key={item.id}><div className={`line-emoji ${item.color}`}>{item.emoji}</div><div className="line-info"><strong>{item.name}</strong><span>{money(item.price)} each</span><div className="quantity-control"><button onClick={() => updateQuantity(item, -1)} aria-label={`Remove one ${item.name}`}>−</button><span>{quantity}</span><button onClick={() => updateQuantity(item, 1)} aria-label={`Add one ${item.name}`}>+</button></div></div><strong className="line-total">{money(item.price * quantity)}</strong><button className="remove-line" onClick={() => updateQuantity(item, -quantity)} aria-label={`Remove ${item.name}`}>×</button></div>)}</div>
              <button className="keep-shopping" onClick={() => setCartOpen(false)}>← Keep browsing</button>
              <div className="cart-summary"><div><span>Food subtotal</span><strong>{money(subtotal)}</strong></div><label className="cart-route-select">Delivery location<select value={route} onChange={(event) => setRoute(event.target.value === "participating" ? "participating" : "quote")}><option value="quote">School not confirmed / other location</option><option value="participating">Confirmed participating school</option></select></label><div><span>Delivery</span><strong>{route === "quote" ? "Quote required" : fee === 0 ? "Free" : money(fee)}</strong></div>{route === "participating" && subtotal >= delivery.freeDeliveryThreshold && <p className="free-delivery-note">Lovely! Your order qualifies for free delivery.</p>}<div className="grand-total"><span>{route === "quote" ? "Food total (delivery not included)" : "Estimated total"}</span><strong>{money(subtotal + (route === "participating" ? fee : 0))}</strong></div>{route === "quote" && <p className="route-warning">{business.serviceNote}</p>}<button className="button button-dark full-button" onClick={() => setCheckout(true)}>Continue to checkout <span aria-hidden="true">→</span></button><p className="demo-caption">Demo only · no orders or payments are processed</p></div>
            </div>
          )}
        </section>
      </div>}
    </div>
  );
}

export default App;
