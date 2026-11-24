<template>
  <div class="sky-home">
    <section class="sky-hero">
      <AirportAnimation class="sky-hero-scene" />
      <div class="sky-hero-shade"></div>
      <div class="container sky-hero-inner">
        <div class="sky-hero-copy">
          <div class="eyebrow"><span class="eyebrow-line"></span> THE ART OF EFFORTLESS TRAVEL</div>
          <h1>Above the ordinary.<br /><em>Beyond expectations.</em></h1>
          <p>Every journey deserves a beautiful beginning. Discover effortless booking, thoughtful comfort, and a smoother way to fly with SkyWings.</p>
          <div class="hero-actions">
            <router-link to="/flights" class="hero-primary">Explore flights <span>↗</span></router-link>
            <router-link to="/register" class="hero-secondary">Create your account <span>→</span></router-link>
          </div>
          <div class="hero-proof">
            <span class="proof-rule"></span>
            <span>ONE SEAMLESS JOURNEY</span>
            <span class="proof-dot">·</span>
            <span>FROM BOOKING TO BOARDING</span>
          </div>
        </div>
        <div class="hero-side-note">
          <span class="side-note-line"></span>
          <span>YOUR NEXT CHAPTER<br />STARTS IN THE SKY</span>
        </div>
        <div class="hero-scroll"><span></span> SCROLL TO DISCOVER</div>
      </div>
      <div class="hero-bottom-fade"></div>
    </section>

    <section class="booking-strip">
      <div class="container booking-strip-inner">
        <div class="booking-intro">
          <span class="booking-kicker">PLAN YOUR JOURNEY</span>
          <h2>Where to next?</h2>
          <p>Find your flight in just a few moments.</p>
        </div>
        <form class="quick-search" @submit.prevent="handleSearch">
          <label class="quick-field">
            <span>FROM</span>
            <input v-model.trim="form.from" aria-label="Origin city" placeholder="Departure city" />
          </label>
          <span class="field-divider"></span>
          <label class="quick-field">
            <span>TO</span>
            <input v-model.trim="form.to" aria-label="Destination city" placeholder="Where are you going?" />
          </label>
          <span class="field-divider"></span>
          <label class="quick-field class-field">
            <span>TRAVEL CLASS</span>
            <select v-model="form.travelClass" aria-label="Travel class">
              <option>Economy</option><option>Business</option><option>First Class</option>
            </select>
          </label>
          <button class="quick-search-button" type="submit" aria-label="Search flights">Find flights <span>↗</span></button>
        </form>
        <p v-if="validationError" class="search-error" role="alert">{{ validationError }}</p>
        <p v-if="flightStore.error" class="search-error" role="alert">Flights could not be loaded: {{ flightStore.error }}</p>
      </div>
    </section>

    <section class="journey-section container">
      <div class="section-heading">
        <div><span class="section-kicker">THE SKY IS OPEN</span><h2>Journeys worth looking forward to.</h2></div>
        <router-link to="/flights" class="text-link">View all flights <span>↗</span></router-link>
      </div>
      <div v-if="flightStore.loading" class="flight-loading">Preparing your flight options…</div>
      <div v-else-if="!flightStore.flights.length" class="flight-empty">No flights are available right now. Please check again shortly.</div>
      <div v-else class="flight-grid">
        <article v-for="(flight, index) in flightStore.flights.slice(0, 3)" :key="flight.id" class="flight-card">
          <div class="flight-card-top"><span>SKYWINGS <b>·</b> {{ flight.flight_number }}</span><span class="flight-status">{{ flight.status || 'Scheduled' }}</span></div>
          <div class="flight-route">
            <div><strong>{{ flight.from_code || 'DEP' }}</strong><span>{{ flight.from_city || 'Departure' }}</span><small>{{ flight.departure_time || '—' }}</small></div>
            <div class="flight-route-line"><span>✈</span><i></i><small>{{ flight.duration || 'Direct' }}</small></div>
            <div class="destination"><strong>{{ flight.to_code || 'ARR' }}</strong><span>{{ flight.to_city || flight.destination || 'Arrival' }}</span><small>{{ flight.arrival_time || '—' }}</small></div>
          </div>
          <div class="flight-card-bottom"><div><small>FARES FROM</small><strong>₹{{ (flight.economy_fare || 5000).toLocaleString('en-IN') }}</strong></div><button @click="viewFlight(flight)" type="button">Choose flight <span>→</span></button></div>
        </article>
      </div>
    </section>

    <section class="experience-section">
      <div class="container experience-inner">
        <div class="experience-heading"><span class="section-kicker">THE SKYWINGS EXPERIENCE</span><h2>Every detail.<br /><em>In perfect motion.</em></h2><p>From the first search to the final boarding call, your journey stays beautifully connected.</p></div>
        <div class="experience-grid">
          <article class="experience-card"><span class="experience-number">01</span><div class="experience-symbol">⌕</div><h3>Find your way</h3><p>Explore available flights with a simple, intuitive search experience.</p><span class="experience-arrow">↗</span></article>
          <article class="experience-card"><span class="experience-number">02</span><div class="experience-symbol">▦</div><h3>Your seat, your choice</h3><p>Choose from a detailed cabin layout across Economy, Business, and First Class.</p><span class="experience-arrow">↗</span></article>
          <article class="experience-card"><span class="experience-number">03</span><div class="experience-symbol">✧</div><h3>Travel with confidence</h3><p>Keep bookings, check-in details, and your digital boarding pass together.</p><span class="experience-arrow">↗</span></article>
        </div>
      </div>
    </section>

    <section class="closing-section">
      <div class="closing-orbit orbit-one"></div><div class="closing-orbit orbit-two"></div>
      <div class="closing-content"><span class="section-kicker">YOUR JOURNEY, REIMAGINED</span><h2>The world is waiting.<br /><em>Let's take you there.</em></h2><router-link to="/flights" class="hero-primary">Book your next flight <span>↗</span></router-link></div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFlightStore } from '../stores/flightStore';
import AirportAnimation from '../components/AirportAnimation.vue';

const router = useRouter();
const flightStore = useFlightStore();
const validationError = ref('');
const form = ref({ from: '', to: '', travelClass: 'Economy' });

onMounted(() => flightStore.searchFlights().catch(() => {}));

function handleSearch() {
  if (!form.value.from && !form.value.to) {
    validationError.value = 'Enter a departure or destination city to begin your search.';
    return;
  }
  validationError.value = '';
  const params = { from: form.value.from, to: form.value.to, travelClass: form.value.travelClass };
  flightStore.setSearchParams(params);
  router.push({ path: '/flights', query: params });
}

function viewFlight(flight) {
  router.push(`/flights/${flight.id}`);
}
</script>

<style scoped>
.sky-home{background:#f8fafc;color:#10263d}
.sky-hero{position:relative;min-height:690px;height:min(790px,calc(100svh - 72px));overflow:hidden;background:#06172b;color:#fff;isolation:isolate}
.sky-hero-scene{position:absolute;inset:0;z-index:-2}
.sky-hero-shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(3,15,30,.96) 0%,rgba(5,23,42,.88) 38%,rgba(4,22,40,.32) 74%,rgba(4,19,35,.18) 100%),linear-gradient(0deg,rgba(3,13,25,.58),transparent 34%)}
.sky-hero-inner{position:relative;height:100%;min-height:690px;display:flex;align-items:center}
.sky-hero-copy{max-width:720px;padding:54px 0 95px;animation:hero-rise 1s cubic-bezier(.2,.7,.2,1) both}
.eyebrow,.section-kicker,.booking-kicker{font-size:10px;letter-spacing:.28em;font-weight:800;color:#e9bd78}
.eyebrow{display:flex;align-items:center;gap:13px;margin-bottom:26px}
.eyebrow-line{width:38px;height:1px;background:#e9bd78}
.sky-hero h1{font-size:clamp(3.2rem,6.2vw,6.1rem);line-height:1.02;letter-spacing:-.065em;font-weight:600;color:#fff;margin:0 0 26px}
.sky-hero h1 em,.experience-heading h2 em,.closing-content h2 em{font-family:Georgia,serif;font-weight:400;color:#e8c18a}
.sky-hero-copy>p{max-width:510px;color:#c2d1df;font-size:16px;line-height:1.85;margin-bottom:34px}
.hero-actions{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.hero-primary{display:inline-flex;align-items:center;gap:28px;padding:16px 22px;background:#d7ad70;color:#142b40;border-radius:3px;font-size:13px;font-weight:800;letter-spacing:.02em;transition:transform .25s,background .25s}
.hero-primary:hover{transform:translateY(-3px);background:#edc58a}
.hero-primary span{font-size:19px}
.hero-secondary{color:#f4f7fa;font-size:13px;font-weight:700;border-bottom:1px solid rgba(255,255,255,.42);padding:0 0 8px}
.hero-secondary span{margin-left:12px;color:#e8c18a}
.hero-proof{display:flex;align-items:center;gap:12px;margin-top:68px;color:#a6bacb;font-size:9px;letter-spacing:.19em;font-weight:700}
.proof-rule{width:28px;height:1px;background:#d7ad70}.proof-dot{color:#d7ad70}
.hero-side-note{position:absolute;right:22px;top:33%;display:flex;gap:12px;align-items:center;color:#d8e5ed;font-size:9px;letter-spacing:.2em;line-height:1.8}
.side-note-line{width:34px;height:1px;background:#d7ad70}
.hero-scroll{position:absolute;bottom:34px;left:20px;display:flex;align-items:center;gap:13px;color:#a8bdcc;font-size:8px;letter-spacing:.22em;font-weight:800}
.hero-scroll span{width:1px;height:35px;background:linear-gradient(#d7ad70,transparent)}
.hero-bottom-fade{position:absolute;bottom:0;left:0;right:0;height:80px;background:linear-gradient(transparent,rgba(4,15,27,.5));pointer-events:none}
.booking-strip{position:relative;background:#fff;border-bottom:1px solid #e6ebf0;box-shadow:0 18px 45px rgba(12,36,58,.07);z-index:3}
.booking-strip-inner{position:relative;display:grid;grid-template-columns:220px 1fr;gap:28px;align-items:center;padding-top:30px;padding-bottom:30px}
.booking-kicker{color:#a47b46;font-size:9px}
.booking-intro h2{font-size:26px;letter-spacing:-.04em;margin:5px 0;color:#122b43}
.booking-intro p{font-size:12px;color:#7b8b9a}
.quick-search{display:flex;align-items:center;min-height:78px;border:1px solid #e4eaf0;border-radius:5px;background:#fff;padding:10px 10px 10px 20px;box-shadow:0 8px 24px rgba(18,43,67,.04)}
.quick-field{display:flex;flex:1;min-width:0;flex-direction:column;gap:7px;padding:0 16px}
.quick-field>span{font-size:8px;letter-spacing:.2em;color:#9a7b54;font-weight:800}
.quick-field input,.quick-field select{border:0;outline:0;background:transparent;color:#18334c;font:600 13px var(--font-ui);min-width:0;width:100%}
.quick-field input::placeholder{color:#a0acb8;font-weight:500}
.quick-field select{cursor:pointer}
.field-divider{height:38px;width:1px;background:#e7edf2}
.quick-search-button{align-self:stretch;min-width:140px;border:0;border-radius:3px;background:#102c45;color:#fff;font:700 12px var(--font-ui);cursor:pointer;transition:background .2s}
.quick-search-button:hover{background:#1b4968}.quick-search-button span{margin-left:12px;color:#e9bd78;font-size:17px}
.search-error{grid-column:2;color:#b42318;font-size:12px;margin-top:-18px}
.journey-section{padding-top:92px;padding-bottom:100px}
.section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:32px}
.section-kicker{color:#a47b46;font-size:9px}
.section-heading h2{font-size:clamp(27px,3vw,39px);letter-spacing:-.05em;color:#122b43;margin-top:9px}
.text-link{font-size:12px;color:#23445e;font-weight:800;border-bottom:1px solid #c9a36d;padding-bottom:8px;white-space:nowrap}
.text-link span{color:#b88b53;margin-left:10px}
.flight-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
.flight-card{padding:24px;background:#fff;border:1px solid #e5ebf0;border-radius:5px;box-shadow:0 8px 25px rgba(14,43,66,.035);transition:transform .25s,box-shadow .25s}
.flight-card:hover{transform:translateY(-5px);box-shadow:0 18px 35px rgba(14,43,66,.09)}
.flight-card-top{display:flex;justify-content:space-between;gap:8px;font-size:9px;letter-spacing:.12em;font-weight:800;color:#718394}
.flight-card-top b{color:#c19a64}
.flight-status{color:#28765d;letter-spacing:.04em;text-transform:uppercase}
.flight-route{display:grid;grid-template-columns:1fr 1fr 1fr;align-items:center;padding:30px 0 25px}
.flight-route>div{display:flex;flex-direction:column;gap:4px}
.flight-route strong{font-size:29px;letter-spacing:-.05em;color:#142e47}
.flight-route span{font-size:11px;color:#6e8090}.flight-route small{font-size:10px;color:#9aa7b3}
.flight-route .destination{text-align:right;align-items:flex-end}
.flight-route-line{align-items:center;gap:4px!important;position:relative}
.flight-route-line i{width:100%;height:1px;background:#d5dfe7}
.flight-route-line span{color:#bd9259;font-size:18px;transform:rotate(0deg)}
.flight-route-line small{font-size:8px!important}
.flight-card-bottom{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #edf1f4;padding-top:17px}
.flight-card-bottom>div{display:flex;flex-direction:column;gap:3px}
.flight-card-bottom small{font-size:8px;letter-spacing:.16em;color:#8998a6;font-weight:800}
.flight-card-bottom strong{font-size:19px;color:#17354f}
.flight-card-bottom button{border:0;background:transparent;color:#173c5a;font:800 11px var(--font-ui);cursor:pointer}
.flight-card-bottom button span{color:#b78b53;margin-left:7px;font-size:16px}
.flight-loading,.flight-empty{padding:35px;text-align:center;border:1px solid #e5ebf0;background:#fff;color:#708191}
.experience-section{background:#0b2035;color:#fff;padding:96px 0 105px;position:relative;overflow:hidden}
.experience-section:before{content:"";position:absolute;width:620px;height:620px;border:1px solid rgba(221,190,145,.11);border-radius:50%;right:-240px;top:-300px;box-shadow:0 0 0 65px rgba(221,190,145,.025),0 0 0 130px rgba(221,190,145,.018)}
.experience-inner{position:relative}
.experience-heading{max-width:570px;margin-bottom:48px}
.experience-heading h2{font-size:clamp(38px,5vw,58px);line-height:1.05;letter-spacing:-.055em;color:#fff;margin:15px 0}
.experience-heading>p{max-width:430px;color:#aabac8;line-height:1.8;font-size:14px}
.experience-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(255,255,255,.15);border-bottom:1px solid rgba(255,255,255,.15)}
.experience-card{position:relative;padding:30px 30px 35px 0;min-height:250px}
.experience-card+.experience-card{padding-left:30px;border-left:1px solid rgba(255,255,255,.15)}
.experience-number{font-size:9px;color:#d8b17a;letter-spacing:.2em;font-weight:800}
.experience-symbol{font-size:30px;color:#e4c18f;margin:27px 0 17px}
.experience-card h3{color:#fff;font-size:19px;letter-spacing:-.03em;margin-bottom:10px}
.experience-card p{max-width:270px;color:#a8b9c7;font-size:12px;line-height:1.8}
.experience-arrow{position:absolute;right:25px;bottom:30px;color:#d8b17a}
.closing-section{position:relative;overflow:hidden;background:linear-gradient(110deg,#e9eef2,#f8f9fa 55%,#e6edf2);padding:105px 20px;text-align:center}
.closing-content{position:relative;z-index:1}
.closing-content h2{font-size:clamp(39px,5.5vw,65px);line-height:1.05;letter-spacing:-.06em;color:#132e47;margin:16px 0 30px}
.closing-content h2 em{color:#a77d4a}
.closing-orbit{position:absolute;border:1px solid rgba(23,58,84,.08);border-radius:50%;width:650px;height:650px;top:50%;left:50%;transform:translate(-50%,-50%)}
.orbit-two{width:820px;height:820px}
@keyframes hero-rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:900px){.booking-strip-inner{grid-template-columns:1fr;gap:18px}.flight-grid{grid-template-columns:1fr 1fr}.hero-side-note{display:none}}
@media(max-width:640px){.sky-hero,.sky-hero-inner{min-height:670px;height:auto}.sky-hero-copy{padding:80px 0 100px}.sky-hero h1{font-size:clamp(42px,12vw,64px)}.sky-hero-copy>p{font-size:14px}.hero-proof{font-size:7px;letter-spacing:.12em;flex-wrap:wrap;margin-top:46px}.quick-search{align-items:stretch;flex-direction:column;padding:12px}.quick-field{padding:12px 8px}.field-divider{width:100%;height:1px}.quick-search-button{min-height:48px}.search-error{grid-column:1;margin:0}.journey-section{padding-top:65px;padding-bottom:70px}.section-heading{align-items:flex-start;flex-direction:column}.flight-grid{grid-template-columns:1fr}.experience-section{padding:70px 0}.experience-grid{grid-template-columns:1fr}.experience-card,.experience-card+.experience-card{padding:25px 35px 25px 0;min-height:0;border-left:0;border-bottom:1px solid rgba(255,255,255,.15)}.experience-symbol{margin:16px 0 10px}.experience-arrow{right:8px;bottom:30px}.closing-section{padding:80px 20px}}
@media(prefers-reduced-motion:reduce){.sky-home *{animation:none!important;transition:none!important}}
</style>