<template>
  <div class="passenger-dashboard page-wrapper">
    <div class="container dashboard-container">
      <section class="welcome-panel">
        <div class="welcome-copy">
          <span class="eyebrow">PASSENGER OVERVIEW</span>
          <h1>Welcome back, {{ firstName }} <span aria-hidden="true">✈</span></h1>
          <p>Your journeys, bookings and travel details — all in one place.</p>
        </div>
        <router-link to="/flights" class="primary-action">
          <span aria-hidden="true">＋</span> Book a flight
        </router-link>
        <div class="welcome-orbit orbit-one"></div>
        <div class="welcome-orbit orbit-two"></div>
      </section>

      <section class="dashboard-search" aria-label="Quick flight search">
        <div class="search-intro">
          <span class="eyebrow">PLAN YOUR NEXT JOURNEY</span>
          <h2>Where would you like to go?</h2>
          <p>Search the available SkyWings schedules and continue to seat selection.</p>
        </div>
        <form class="dashboard-search-form" @submit.prevent="searchFlights">
          <label>From<input v-model.trim="searchFrom" placeholder="City or airport code" /></label>
          <label>To<input v-model.trim="searchTo" placeholder="Destination" /></label>
          <label>Cabin<select v-model="searchClass"><option>Economy</option><option>Business</option><option>First Class</option></select></label>
          <button type="submit">Search flights <span aria-hidden="true">→</span></button>
        </form>
      </section>

      <section class="stats-grid" aria-label="Booking summary">
        <article class="stat-card">
          <div class="stat-top"><span class="stat-icon blue">▤</span><span class="stat-caption">ALL TIME</span></div>
          <strong>{{ totalBookingsCount }}</strong>
          <span class="stat-label">Total bookings</span>
        </article>
        <article class="stat-card">
          <div class="stat-top"><span class="stat-icon green">✈</span><span class="stat-caption">CURRENT</span></div>
          <strong>{{ activeBookingsCount }}</strong>
          <span class="stat-label">Confirmed bookings</span>
        </article>
        <article class="stat-card">
          <div class="stat-top"><span class="stat-icon violet">✓</span><span class="stat-caption">COMPLETED</span></div>
          <strong>{{ boardedBookingsCount }}</strong>
          <span class="stat-label">Boarded flights</span>
        </article>
        <article class="stat-card">
          <div class="stat-top"><span class="stat-icon amber">↺</span><span class="stat-caption">HISTORY</span></div>
          <strong>{{ cancelledBookingsCount }}</strong>
          <span class="stat-label">Cancelled bookings</span>
        </article>
      </section>

      <section class="spend-overview" aria-label="Travel spend and cabin breakdown">
        <div class="spend-total">
          <span class="eyebrow">BOOKING VALUE</span>
          <strong>{{ formatFare(totalCharges) }}</strong>
          <small>Total value of the bookings currently listed</small>
        </div>
        <div class="class-breakdown">
          <div><span class="class-dot economy-dot"></span><span>Economy</span><strong>{{ classCount('Economy') }}</strong></div>
          <div><span class="class-dot business-dot"></span><span>Business</span><strong>{{ classCount('Business') }}</strong></div>
          <div><span class="class-dot first-dot"></span><span>First Class</span><strong>{{ classCount('First Class') }}</strong></div>
          <div><span class="class-dot general-dot"></span><span>General</span><strong>{{ classCount('General') }}</strong></div>
        </div>
      </section>

      <section class="section-heading">
        <div>
          <span class="eyebrow">QUICK ACCESS</span>
          <h2>Make your next move</h2>
        </div>
      </section>

      <section class="quick-grid" aria-label="Quick actions">
        <router-link to="/flights" class="quick-card">
          <span class="quick-icon blue">⌕</span>
          <span class="quick-text"><strong>Find a flight</strong><small>Explore routes and available seats</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/my-bookings" class="quick-card">
          <span class="quick-icon violet">▣</span>
          <span class="quick-text"><strong>My bookings</strong><small>Review or manage reservations</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/boarding-pass" class="quick-card">
          <span class="quick-icon green">▤</span>
          <span class="quick-text"><strong>Boarding pass</strong><small>Open your digital travel pass</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/profile" class="quick-card">
          <span class="quick-icon amber">◎</span>
          <span class="quick-text"><strong>My profile</strong><small>Update your personal details</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/project-dashboard" class="quick-card">
          <span class="quick-icon blue">◈</span>
          <span class="quick-text"><strong>Airport & aircraft lab</strong><small>Explore 2D / 3D graphics and system modules</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/flights" class="quick-card">
          <span class="quick-icon green">▦</span>
          <span class="quick-text"><strong>Seat matrix</strong><small>Choose a flight to inspect its cabin layout</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/my-bookings" class="quick-card">
          <span class="quick-icon amber">◷</span>
          <span class="quick-text"><strong>Booking status</strong><small>Check confirmed, pending and cancelled reservations</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
        <router-link to="/flights" class="quick-card">
          <span class="quick-icon violet">▤</span>
          <span class="quick-text"><strong>Seat availability</strong><small>View available seats before selecting a flight</small></span>
          <span class="quick-arrow">↗</span>
        </router-link>
      </section>

      <section class="feedback-panel" aria-labelledby="feedback-title">
        <div class="feedback-copy">
          <span class="eyebrow">HELP US IMPROVE</span>
          <h2 id="feedback-title">How was your SkyWings experience?</h2>
          <p>Share a quick note about your booking or travel experience. Feedback is saved in this browser on this device.</p>
          <div v-if="feedbackMessage" class="feedback-confirmation" role="status">{{ feedbackMessage }}</div>
        </div>
        <form class="feedback-form" @submit.prevent="submitFeedback">
          <label for="feedback-rating">Your rating</label>
          <select id="feedback-rating" v-model="feedbackRating" required>
            <option value="5">★★★★★ — Excellent</option>
            <option value="4">★★★★☆ — Good</option>
            <option value="3">★★★☆☆ — Average</option>
            <option value="2">★★☆☆☆ — Needs improvement</option>
            <option value="1">★☆☆☆☆ — Poor</option>
          </select>
          <label for="feedback-note">Your feedback</label>
          <textarea id="feedback-note" v-model.trim="feedbackNote" rows="3" maxlength="600" placeholder="Tell us what went well or what we can improve…" required></textarea>
          <button type="submit" :disabled="!feedbackNote">Save feedback <span aria-hidden="true">→</span></button>
        </form>
      </section>

      <section class="booking-section">
        <div class="section-heading booking-heading">
          <div>
            <span class="eyebrow">YOUR ACTIVITY</span>
            <h2>Recent bookings</h2>
            <p>Keep track of your latest reservations.</p>
          </div>
          <router-link to="/my-bookings" class="view-all">View all bookings <span aria-hidden="true">→</span></router-link>
        </div>

        <div v-if="loading" class="state-panel" role="status">
          <span class="spinner"></span>
          <p>Loading your bookings…</p>
        </div>
        <div v-else-if="loadError" class="state-panel error-panel" role="alert">
          <strong>We couldn't load your bookings.</strong>
          <p>{{ loadError }}</p>
          <button class="retry-button" @click="loadBookings">Try again</button>
        </div>
        <div v-else-if="bookings.length === 0" class="state-panel empty-panel">
          <span class="empty-plane" aria-hidden="true">✈</span>
          <strong>Your next journey starts here.</strong>
          <p>You don't have any bookings yet. Search for a flight to get started.</p>
          <router-link to="/flights" class="empty-cta">Explore flights</router-link>
        </div>
        <div v-else class="booking-list">
          <article v-for="booking in recentBookings" :key="booking.id" class="booking-row">
            <div class="airline-mark">✈</div>
            <div class="booking-main">
              <div class="booking-route">
                <strong>{{ cityCode(booking, 'from') }}</strong>
                <span class="route-line"><i></i>✈<i></i></span>
                <strong>{{ cityCode(booking, 'to') }}</strong>
              </div>
              <div class="booking-meta">
                <span>{{ booking.flight_number || booking.flight?.flight_number || 'Flight details unavailable' }}</span>
                <span v-if="booking.booking_date">Booked {{ formatDate(booking.booking_date) }}</span>
                <span v-if="booking.seat_number">Seat {{ booking.seat_number }}</span>
                <span v-if="booking.travel_class">{{ booking.travel_class }}</span>
              </div>
            </div>
            <div class="booking-fare">
              <strong>{{ formatFare(booking.fare) }}</strong>
              <span class="status-pill" :class="statusClass(booking.booking_status)">{{ readableStatus(booking.booking_status) }}</span>
            </div>
            <div class="booking-actions">
              <router-link :to="'/booking-details/' + booking.id" class="details-link">Details</router-link>
              <router-link :to="{ path: '/boarding-pass', query: { pnr: booking.pnr } }" class="pass-link" v-if="booking.pnr">Pass</router-link>
            </div>
          </article>
        </div>
        <p v-if="!loading && !loadError && bookings.length > 5" class="more-note">Showing your 5 most recent reservations.</p>
      </section>

      <footer class="dashboard-footnote">
        <span class="footnote-dot"></span>
        Booking totals reflect the reservation records returned by the current project API. Verify inventory and persistence before treating demo data as live airline operations.
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useBookingStore } from '../stores/bookingStore';

const authStore = useAuthStore();
const bookingStore = useBookingStore();

const loading = ref(true);
const loadError = ref('');
const searchFrom = ref('');
const searchTo = ref('');
const searchClass = ref('Economy');
const feedbackRating = ref('5');
const feedbackNote = ref('');
const feedbackMessage = ref('');
const bookings = computed(() => bookingStore.myBookings || []);
const firstName = computed(() => (authStore.userName || 'traveller').trim().split(/\s+/)[0]);

const totalBookingsCount = computed(() => bookings.value.length);
const totalCharges = computed(() => bookings.value.reduce((sum, booking) => {
  const fare = Number(booking.fare);
  return sum + (Number.isFinite(fare) ? fare : 0);
}, 0));
const activeBookingsCount = computed(() => bookings.value.filter(b => b.booking_status === 'CONFIRMED').length);
const cancelledBookingsCount = computed(() => bookings.value.filter(b => b.booking_status === 'CANCELLED').length);
const boardedBookingsCount = computed(() => bookings.value.filter(b =>
  b.booking_status === 'BOARDED' || b.passengers?.some(p => p.boarding?.boarding_status === 'BOARDED')
).length);

const recentBookings = computed(() => [...bookings.value]
  .sort((a, b) => new Date(b.booking_date || 0) - new Date(a.booking_date || 0))
  .slice(0, 5));

onMounted(loadBookings);

function searchFlights() {
  const query = { travelClass: searchClass.value };
  if (searchFrom.value) query.from = searchFrom.value;
  if (searchTo.value) query.to = searchTo.value;
  window.location.hash = '/flights?' + new URLSearchParams(query).toString();
}

function classCount(name) {
  return bookings.value.filter(booking =>
    String(booking.travel_class || '').toLowerCase() === name.toLowerCase()
  ).length;
}

function submitFeedback() {
  const entry = {
    rating: Number(feedbackRating.value),
    message: feedbackNote.value,
    submittedAt: new Date().toISOString(),
    user: authStore.user?.email || authStore.userName || 'Passenger'
  };
  try {
    const saved = JSON.parse(localStorage.getItem('skywings_feedback') || '[]');
    saved.unshift(entry);
    localStorage.setItem('skywings_feedback', JSON.stringify(saved.slice(0, 25)));
    feedbackNote.value = '';
    feedbackMessage.value = 'Thanks — your feedback has been saved on this device.';
  } catch {
    feedbackMessage.value = 'Feedback could not be saved in this browser. Please try again.';
  }
}

async function loadBookings() {
  loading.value = true;
  loadError.value = '';
  try {
    await bookingStore.fetchUserBookings();
  } catch (err) {
    loadError.value = err.message || 'Please check your connection and try again.';
  } finally {
    loading.value = false;
  }
}

function cityCode(booking, direction) {
  const flight = booking.flight || {};
  const code = direction === 'from'
    ? (flight.from_code || booking.from_code)
    : (flight.to_code || booking.to_code);
  const city = direction === 'from'
    ? (flight.from_city || booking.from_city)
    : (flight.to_city || booking.to_city || booking.destination);
  return code || city || '—';
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatFare(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) : '—';
}

function readableStatus(status) {
  if (!status) return 'Status unavailable';
  return status.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function statusClass(status) {
  return String(status || '').toLowerCase();
}
</script>

<style scoped>
.dashboard-container { max-width: 1180px; }
.welcome-panel {
  position: relative; overflow: hidden; isolation: isolate;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  min-height: 208px; padding: 42px 48px; margin-bottom: 26px;
  color: #fff; border-radius: 22px;
  background: linear-gradient(115deg, #071b35 0%, #103d68 58%, #17618b 100%);
}
.welcome-copy { position: relative; z-index: 2; }
.eyebrow { display: block; color: #2784b9; font-size: .68rem; font-weight: 800; letter-spacing: .16em; margin-bottom: 10px; }
.welcome-panel .eyebrow { color: #9bd8f2; }
.welcome-panel h1 { margin: 0 0 9px; color: #fff; font-size: clamp(1.8rem, 4vw, 2.55rem); letter-spacing: -.045em; }
.welcome-panel p { margin: 0; color: #d2e5f2; font-size: .98rem; }
.primary-action, .empty-cta {
  position: relative; z-index: 2; display: inline-flex; align-items: center; justify-content: center; gap: 9px;
  padding: 13px 19px; border-radius: 11px; background: #fff; color: #103d68; font-weight: 800; white-space: nowrap;
  box-shadow: 0 8px 22px #001b3630; transition: transform .2s ease, box-shadow .2s ease;
}
.primary-action:hover, .empty-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 28px #001b3645; }
.primary-action span { font-size: 1.2rem; }
.welcome-orbit { position: absolute; z-index: -1; border: 1px solid #ffffff18; border-radius: 50%; }
.orbit-one { width: 340px; height: 340px; right: 10%; top: -180px; }
.orbit-two { width: 470px; height: 470px; right: -3%; top: -230px; }
.dashboard-search { display: grid; grid-template-columns: minmax(220px, .8fr) minmax(0, 1.7fr); gap: 26px; align-items: center; padding: 25px 28px; margin-bottom: 22px; background: #fff; border: 1px solid #e7edf3; border-radius: 17px; box-shadow: 0 4px 18px #102c460c; }
.search-intro h2 { margin: 0; color: #102b46; font-size: 1.25rem; letter-spacing: -.03em; }
.search-intro p { margin: 6px 0 0; color: #7a8998; font-size: .78rem; }
.dashboard-search-form { display: grid; grid-template-columns: 1fr 1fr .8fr auto; align-items: end; gap: 10px; }
.dashboard-search-form label { display: flex; flex-direction: column; gap: 6px; color: #617487; font-size: .7rem; font-weight: 800; }
.dashboard-search-form input, .dashboard-search-form select { min-width: 0; width: 100%; height: 42px; padding: 0 11px; border: 1px solid #dce5ec; border-radius: 9px; background: #fbfdff; color: #17344f; font: inherit; font-size: .78rem; outline: none; }
.dashboard-search-form input:focus, .dashboard-search-form select:focus { border-color: #3283b4; box-shadow: 0 0 0 3px #3283b41c; }
.dashboard-search-form button { height: 42px; padding: 0 15px; border: 0; border-radius: 9px; background: #1766a0; color: #fff; font: inherit; font-size: .78rem; font-weight: 800; cursor: pointer; white-space: nowrap; }
.dashboard-search-form button:hover { background: #0f4f80; }
.spend-overview { display: grid; grid-template-columns: minmax(220px, .8fr) minmax(0, 1.7fr); gap: 22px; align-items: center; padding: 20px 25px; margin: 0 0 36px; background: #f1f7fb; border: 1px solid #dceaf3; border-radius: 15px; }
.spend-total strong { display: block; color: #102b46; font-size: 1.8rem; letter-spacing: -.04em; }
.spend-total small { color: #7a8998; font-size: .72rem; }
.class-breakdown { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.class-breakdown > div { display: flex; align-items: center; gap: 7px; padding: 11px; background: #fff; border: 1px solid #e2ebf2; border-radius: 10px; color: #65788a; font-size: .73rem; }
.class-breakdown strong { margin-left: auto; color: #17344f; font-size: 1rem; }
.class-dot { width: 8px; height: 8px; flex: 0 0 8px; border-radius: 50%; }
.economy-dot { background: #16805e; } .business-dot { background: #3977c7; } .first-dot { background: #c18a25; } .general-dot { background: #64748b; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 38px; }
.stat-card { padding: 20px 22px; background: #fff; border: 1px solid #e7edf3; border-radius: 15px; box-shadow: 0 4px 16px #102c4610; }
.stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px; }
.stat-icon, .quick-icon { display: inline-flex; align-items: center; justify-content: center; border-radius: 11px; font-weight: 800; }
.stat-icon { width: 38px; height: 38px; font-size: 1.1rem; }
.stat-caption { color: #9aa8b7; font-size: .62rem; font-weight: 800; letter-spacing: .1em; }
.stat-card > strong { display: block; color: #102b46; font-size: 2rem; line-height: 1.1; letter-spacing: -.04em; }
.stat-label { display: block; margin-top: 6px; color: #758496; font-size: .82rem; font-weight: 600; }
.blue { color: #1766a0; background: #e8f3fb; }
.green { color: #16805e; background: #e7f7f0; }
.violet { color: #6552b5; background: #f0edfc; }
.amber { color: #a66b16; background: #fff4df; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 17px; }
.section-heading h2 { margin: 0; color: #102b46; font-size: 1.35rem; letter-spacing: -.025em; }
.section-heading p { margin: 6px 0 0; color: #7a8998; font-size: .86rem; }
.section-heading .eyebrow { margin-bottom: 5px; }
.quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 40px; }
.quick-card { display: flex; align-items: center; gap: 12px; min-width: 0; padding: 17px 15px; background: #fff; border: 1px solid #e7edf3; border-radius: 14px; color: #17344f; transition: border-color .2s ease, transform .2s ease, box-shadow .2s ease; }
.quick-card:hover { transform: translateY(-3px); border-color: #a9cce3; box-shadow: 0 8px 20px #102c4612; }
.quick-icon { flex: 0 0 40px; width: 40px; height: 40px; font-size: 1.2rem; }
.quick-text { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.quick-text strong { font-size: .85rem; }
.quick-text small { color: #8391a0; font-size: .7rem; line-height: 1.35; }
.quick-arrow { margin-left: auto; color: #9aabba; font-size: 1rem; }
.feedback-panel {
  display: grid; grid-template-columns: minmax(220px, .9fr) minmax(0, 1.1fr); gap: 28px;
  align-items: start; padding: 26px; margin: 0 0 24px; background: #fff;
  border: 1px solid #e7edf3; border-radius: 17px; box-shadow: 0 4px 18px #102c460c;
}
.feedback-copy h2 { margin: 0; color: #102b46; font-size: 1.25rem; letter-spacing: -.03em; }
.feedback-copy p { margin: 8px 0 0; color: #7a8998; font-size: .82rem; line-height: 1.55; }
.feedback-form { display: grid; grid-template-columns: 1fr; gap: 8px; }
.feedback-form label { color: #617487; font-size: .72rem; font-weight: 800; }
.feedback-form select, .feedback-form textarea {
  width: 100%; padding: 10px 12px; border: 1px solid #dce5ec; border-radius: 9px;
  background: #fbfdff; color: #17344f; font: inherit; font-size: .82rem; resize: vertical;
}
.feedback-form select:focus, .feedback-form textarea:focus { outline: none; border-color: #3283b4; box-shadow: 0 0 0 3px #3283b41c; }
.feedback-form button { justify-self: start; padding: 10px 15px; border: 0; border-radius: 9px; background: #1766a0; color: #fff; font: inherit; font-size: .8rem; font-weight: 800; cursor: pointer; }
.feedback-form button:disabled { opacity: .45; cursor: not-allowed; }
.feedback-confirmation { margin-top: 12px; padding: 9px 11px; border-radius: 8px; background: #eaf7f1; color: #137452; font-size: .75rem; font-weight: 700; }
.booking-section { padding: 26px; background: #fff; border: 1px solid #e7edf3; border-radius: 17px; box-shadow: 0 4px 18px #102c460c; }
.booking-heading { align-items: center; margin-bottom: 21px; }
.view-all { color: #1766a0; font-size: .82rem; font-weight: 800; white-space: nowrap; }
.view-all span { margin-left: 5px; }
.booking-list { display: flex; flex-direction: column; }
.booking-row { display: grid; grid-template-columns: 42px minmax(0, 1fr) auto auto; align-items: center; gap: 16px; padding: 17px 0; border-top: 1px solid #edf1f5; }
.airline-mark { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; color: #1766a0; background: #eaf4fb; }
.booking-route { display: flex; align-items: center; gap: 13px; color: #17344f; font-size: 1.02rem; }
.route-line { display: flex; align-items: center; gap: 5px; color: #6f9bb9; font-size: .78rem; }
.route-line i { display: block; width: 24px; border-top: 1px dashed #a8c3d5; }
.booking-meta { display: flex; flex-wrap: wrap; gap: 6px 13px; margin-top: 6px; color: #8996a4; font-size: .72rem; }
.booking-fare { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.booking-fare > strong { color: #17344f; font-size: .9rem; }
.status-pill { padding: 4px 8px; border-radius: 999px; color: #687787; background: #f0f3f6; font-size: .65rem; font-weight: 800; }
.status-pill.confirmed, .status-pill.boarded { color: #137452; background: #e8f7f0; }
.status-pill.cancelled { color: #b44c4c; background: #fff0f0; }
.status-pill.pending { color: #946313; background: #fff5df; }
.booking-actions { display: flex; align-items: center; gap: 9px; }
.details-link, .pass-link { color: #1766a0; font-size: .75rem; font-weight: 800; }
.pass-link { padding: 7px 10px; border-radius: 8px; background: #edf5fb; }
.more-note { margin: 14px 0 0; color: #8795a3; font-size: .74rem; text-align: center; }
.state-panel { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 190px; padding: 24px; border-top: 1px solid #edf1f5; text-align: center; color: #647789; }
.state-panel p { max-width: 420px; margin: 7px 0 0; font-size: .84rem; }
.state-panel strong { color: #17344f; }
.empty-plane { display: grid; place-items: center; width: 48px; height: 48px; margin-bottom: 13px; border-radius: 15px; color: #1766a0; background: #eaf4fb; font-size: 1.5rem; }
.empty-cta { margin-top: 16px; padding: 10px 16px; background: #1766a0; color: #fff; font-size: .82rem; }
.retry-button { margin-top: 14px; padding: 9px 15px; border: 0; border-radius: 8px; background: #1766a0; color: #fff; font-weight: 700; cursor: pointer; }
.error-panel p { color: #a24b4b; }
.spinner { width: 27px; height: 27px; border: 3px solid #dcebf5; border-top-color: #1766a0; border-radius: 50%; animation: spin .8s linear infinite; }
.dashboard-footnote { display: flex; align-items: center; gap: 8px; margin: 17px 2px 0; color: #9aa6b2; font-size: .72rem; }
.footnote-dot { width: 7px; height: 7px; border-radius: 50%; background: #38a77b; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 900px) {
  .stats-grid, .quick-grid { grid-template-columns: repeat(2, 1fr); }
  .dashboard-search, .spend-overview, .feedback-panel { grid-template-columns: 1fr; }
  .class-breakdown { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dashboard-search-form { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .welcome-panel { padding: 34px; }
}
@media (max-width: 620px) {
  .welcome-panel { align-items: flex-start; flex-direction: column; padding: 28px 23px; }
  .dashboard-search { padding: 20px 16px; }
  .dashboard-search-form { grid-template-columns: 1fr; }
  .dashboard-search-form button { width: 100%; }
  .class-breakdown { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .feedback-panel { padding: 20px 16px; }
  .welcome-panel h1 { font-size: 1.8rem; }
  .stats-grid { gap: 10px; }
  .stat-card { padding: 15px; }
  .stat-card > strong { font-size: 1.65rem; }
  .quick-grid { gap: 10px; }
  .quick-card { align-items: flex-start; flex-direction: column; padding: 13px; }
  .quick-arrow { display: none; }
  .booking-section { padding: 19px 15px; }
  .booking-heading { align-items: flex-start; }
  .booking-row { grid-template-columns: 36px minmax(0, 1fr); gap: 11px; }
  .airline-mark { width: 36px; height: 36px; }
  .booking-fare { grid-column: 2; align-items: flex-start; flex-direction: row; }
  .booking-actions { grid-column: 2; }
  .route-line i { width: 13px; }
  .booking-meta { gap: 5px 9px; }
}
</style>
