<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="container nav-content">
        <router-link to="/" class="brand-logo" aria-label="SkyWings home">
          <span class="logo-icon">✈</span>
          <span class="logo-text"><strong>SKYWINGS</strong><small>AIRLINES</small></span>
        </router-link>
        <nav class="nav-links" aria-label="Main navigation">
          <router-link to="/" class="nav-item" exact-active-class="active">Home</router-link>
          <router-link to="/flights" class="nav-item">Flights</router-link>
          <template v-if="authStore.isAuthenticated">
            <router-link to="/my-bookings" class="nav-item">My bookings</router-link>
            <router-link to="/boarding-pass" class="nav-item">Boarding pass</router-link>
            <router-link v-if="!authStore.isAdmin" to="/dashboard" class="nav-item">Dashboard</router-link>
            <router-link v-if="authStore.isAdmin" to="/admin/dashboard" class="nav-item">Admin</router-link>
          </template>
        </nav>
        <div class="nav-actions">
          <template v-if="authStore.isAuthenticated">
            <router-link to="/profile" class="user-pill"><span class="avatar">{{ userInitial }}</span><span>{{ authStore.userName }}</span></router-link>
            <button @click="handleLogout" class="nav-logout" type="button">Sign out</button>
          </template>
          <template v-else>
            <router-link to="/login" class="nav-login">Sign in</router-link>
            <router-link to="/register" class="nav-register">Get started <span>↗</span></router-link>
          </template>
        </div>
      </div>
    </header>
    <main class="main-content"><router-view /></main>
    <footer class="footer">
      <div class="container footer-main">
        <div class="footer-brand">
          <router-link to="/" class="brand-logo"><span class="logo-icon">✈</span><span class="logo-text"><strong>SKYWINGS</strong><small>AIRLINES</small></span></router-link>
          <p>A more thoughtful way to plan, book, and experience every journey. From your first search to your boarding pass, travel beautifully with SkyWings.</p>
        </div>
        <div class="footer-links"><strong>EXPLORE</strong><router-link to="/">Home</router-link><router-link to="/flights">Find flights</router-link><router-link to="/my-bookings">My bookings</router-link><router-link to="/boarding-pass">Boarding pass</router-link></div>
        <div class="footer-links"><strong>YOUR ACCOUNT</strong><router-link to="/login">Sign in</router-link><router-link to="/register">Create account</router-link><router-link to="/profile">Passenger profile</router-link></div>
        <div class="footer-note"><span class="footer-star">✦</span><strong>THE JOURNEY MATTERS.</strong><p>Designed to bring flight reservations, seat selection, check-in, and boarding together in one seamless experience.</p></div>
      </div>
      <div class="footer-bottom"><div class="container"><span>© 2026 SkyWings Airlines</span><span>TRAVEL BEAUTIFULLY. ARRIVE INSPIRED.</span></div></div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const userInitial = computed(() => authStore.user?.name?.charAt(0).toUpperCase() || 'U');

function handleLogout() {
  authStore.logout();
  router.push('/login');
}
</script>

<style scoped>
.app-layout{min-height:100vh;display:flex;flex-direction:column;background:#f8fafc}
.navbar{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.96);backdrop-filter:blur(18px);border-bottom:1px solid #e7edf2}
.nav-content{height:76px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.brand-logo{display:flex;align-items:center;gap:11px;flex-shrink:0}
.logo-icon{width:39px;height:39px;border-radius:50%;display:grid;place-items:center;background:#102f49;color:#e9c18b;font-size:18px;border:1px solid #d4b17d}
.logo-text{display:flex;flex-direction:column;gap:2px}
.logo-text strong{font-size:13px;letter-spacing:.2em;color:#122f48;font-weight:900}
.logo-text small{font-size:8px;letter-spacing:.3em;color:#9a774d;font-weight:800}
.nav-links{display:flex;align-items:center;gap:7px}
.nav-item{padding:10px 12px;border-radius:3px;color:#64788a;font-size:11px;font-weight:800;transition:color .2s,background .2s}
.nav-item:hover,.nav-item.active{color:#153b59;background:#edf3f7}
.nav-actions{display:flex;align-items:center;gap:17px;flex-shrink:0}
.nav-login{font-size:11px;font-weight:800;color:#23435d}
.nav-register{display:flex;align-items:center;gap:15px;background:#102f49;color:#fff;padding:12px 16px;border-radius:3px;font-size:11px;font-weight:800;transition:background .2s}
.nav-register:hover{background:#1b4b6b}.nav-register span{font-size:17px;color:#e8bd82}
.user-pill{display:flex;align-items:center;gap:8px;color:#17354e;font-size:11px;font-weight:800}
.avatar{width:30px;height:30px;display:grid;place-items:center;border-radius:50%;background:#e9f0f5;color:#173b59}
.nav-logout{border:0;background:transparent;color:#9a6841;font:800 11px var(--font-ui);cursor:pointer}
.main-content{flex:1;min-width:0}
.footer{background:#081d31;color:#a8b8c5;padding-top:58px}
.footer-main{display:grid;grid-template-columns:1.7fr .8fr .8fr 1.25fr;gap:48px;padding-bottom:48px}
.footer-brand p{max-width:330px;color:#8fa3b3;font-size:11px;line-height:1.9;margin-top:20px}
.footer-brand .logo-text strong{color:#fff}.footer-brand .logo-text small{color:#d5ad77}
.footer-links{display:flex;flex-direction:column;align-items:flex-start;gap:13px}
.footer-links strong,.footer-note>strong{font-size:9px;letter-spacing:.2em;color:#e4bd86;margin-bottom:5px}
.footer-links a{font-size:11px;color:#a8b8c5;transition:color .2s}.footer-links a:hover{color:#fff}
.footer-note{border-left:1px solid rgba(255,255,255,.14);padding-left:26px}
.footer-star{display:block;font-size:25px;color:#e4bd86;margin-bottom:13px}
.footer-note>strong{color:#fff}.footer-note p{font-size:11px;line-height:1.9;color:#8fa3b3;margin-top:10px}
.footer-bottom{border-top:1px solid rgba(255,255,255,.1);padding:18px 0}
.footer-bottom .container{display:flex;justify-content:space-between;gap:20px;color:#71889a;font-size:8px;letter-spacing:.16em;font-weight:700}
@media(max-width:950px){.nav-links{display:none}.footer-main{grid-template-columns:1.4fr 1fr 1fr}.footer-note{grid-column:1/-1;border-left:0;border-top:1px solid rgba(255,255,255,.14);padding:20px 0 0}}
@media(max-width:600px){.nav-content{height:66px;gap:10px}.nav-actions{gap:10px}.nav-register{padding:10px 11px}.user-pill span:last-child{display:none}.footer-main{grid-template-columns:1fr 1fr;gap:30px}.footer-brand,.footer-note{grid-column:1/-1}.footer-note{padding-top:18px}.footer-bottom .container{flex-direction:column;align-items:center;text-align:center}}
</style>