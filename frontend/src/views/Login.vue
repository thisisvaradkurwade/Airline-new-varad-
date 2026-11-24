<template>
  <main class="auth-experience">
    <section class="auth-visual">
      <div class="auth-visual-sky"></div>
      <div class="auth-visual-grid"></div>
      <div class="auth-visual-brand"><span class="brand-wing">S</span><span>SKYWINGS<small>THE ART OF TRAVEL</small></span></div>
      <div class="auth-visual-copy"><span class="auth-kicker">WELCOME ABOARD</span><h1>Your journey<br />starts <em>here.</em></h1><p>Step into a more seamless way to travel. Your flights, reservations, and boarding passes — all in one place.</p></div>
      <div class="auth-visual-footer"><span>01</span><i></i><span>THE WORLD, WITHIN REACH</span></div>
    </section>
    <section class="auth-form-side">
      <div class="auth-mobile-brand"><span>S</span> SKYWINGS</div>
      <div class="auth-form-wrap">
        <router-link to="/" class="back-home">← <span>Back to home</span></router-link>
        <div class="auth-heading"><span class="auth-kicker">YOUR SKYWINGS ACCOUNT</span><h2>Welcome <em>back.</em></h2><p>Sign in to continue your journey.</p></div>
        <div v-if="route.query.redirect" class="auth-notice" role="status">Sign in to continue to your requested page.</div>
        <div v-if="errorMessage" class="auth-error" role="alert">{{ errorMessage }}</div>
        <form @submit.prevent="handleLogin" class="premium-form">
          <label class="premium-field"><span>Email address</span><input v-model.trim="form.email" type="email" autocomplete="email" placeholder="you@example.com" required /></label>
          <label class="premium-field"><span>Password</span><input v-model="form.password" type="password" autocomplete="current-password" placeholder="Enter your password" required /></label>
          <button class="auth-submit" type="submit" :disabled="loading"><span>{{ loading ? 'Signing you in…' : 'Sign in to SkyWings' }}</span><b>↗</b></button>
        </form>
        <p class="auth-switch">New to SkyWings? <router-link to="/register">Create an account</router-link></p>
        <div class="auth-security"><span>✦</span> Your account and bookings are securely protected.</div>
      </div>
      <div class="auth-side-bottom"><span>SKYWINGS AIRLINES</span><span>TRAVEL BEAUTIFULLY.</span></div>
    </section>
    <div v-if="loading" class="signin-flight-overlay" aria-live="polite"><AirportAnimation /><div class="signin-flight-copy"><span>PREPARING FOR TAKEOFF</span><strong>Welcome aboard.</strong><i></i></div></div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import AirportAnimation from '../components/AirportAnimation.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const form = ref({ email: '', password: '' });
const loading = ref(false);
const errorMessage = ref('');

async function handleLogin() {
  errorMessage.value = '';
  loading.value = true;
  try {
    const res = await authStore.login({ email: form.value.email, password: form.value.password });
    const redirectPath = route.query.redirect || (res.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
    await router.push(redirectPath);
  } catch (err) {
    errorMessage.value = err.message || 'Unable to sign in. Please check your details and try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-experience{min-height:calc(100vh - 72px);display:grid;grid-template-columns:minmax(0,1.08fr) minmax(420px,.92fr);background:#f8fafc;color:#122c45}
.auth-visual{position:relative;min-height:760px;overflow:hidden;background:radial-gradient(ellipse at 72% 30%,#1a5277 0%,#0b2b49 40%,#06182d 78%);color:#fff;padding:48px clamp(30px,6vw,90px);isolation:isolate}
.auth-visual-grid{position:absolute;inset:0;z-index:-1;opacity:.16;background-image:linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(90deg,black,transparent)}
.auth-visual-sky{position:absolute;width:550px;height:550px;border-radius:50%;right:-150px;top:-190px;border:1px solid rgba(202,229,244,.13);box-shadow:0 0 0 55px rgba(202,229,244,.025),0 0 0 110px rgba(202,229,244,.02);z-index:-1}
.auth-visual-brand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.18em;font-size:13px}
.auth-visual-brand>span:last-child{display:flex;flex-direction:column;gap:4px}.auth-visual-brand small{font-size:8px;letter-spacing:.3em;color:#a9c4d6;font-weight:600}
.brand-wing{width:38px;height:38px;border:1px solid rgba(225,190,139,.6);border-radius:50%;display:grid;place-items:center;color:#e5bd83;font-size:17px}
.auth-visual-copy{position:relative;z-index:2;margin-top:clamp(100px,17vh,185px);max-width:480px}
.auth-kicker{font-size:9px;letter-spacing:.28em;font-weight:800;color:#b88e5c}
.auth-visual-copy h1{font-size:clamp(55px,6vw,83px);line-height:.99;letter-spacing:-.065em;color:#fff;font-weight:600;margin:22px 0}
.auth-visual-copy h1 em,.auth-heading h2 em{font-family:Georgia,serif;font-weight:400;color:#e6bd84}
.auth-visual-copy p{max-width:380px;color:#b8cbd9;font-size:14px;line-height:1.9}
.auth-visual-footer{position:absolute;bottom:42px;left:clamp(30px,6vw,90px);right:clamp(30px,6vw,90px);display:flex;align-items:center;gap:14px;font-size:8px;letter-spacing:.23em;color:#9cb6c8;font-weight:800}
.auth-visual-footer i{height:1px;width:45px;background:#c49b68}
.auth-form-side{position:relative;display:flex;align-items:center;justify-content:center;padding:70px 36px;background:linear-gradient(145deg,#fff,#f4f7fa)}
.auth-form-wrap{width:min(100%,420px);margin:auto}
.back-home{display:inline-flex;align-items:center;gap:10px;color:#6f8191;font-size:12px;font-weight:700;margin-bottom:58px}
.back-home:first-letter{color:#b78c58}
.auth-heading{margin-bottom:34px}
.auth-heading h2{font-size:48px;letter-spacing:-.06em;color:#142f48;margin:13px 0 8px}
.auth-heading>p{font-size:13px;color:#7c8b98}
.auth-notice,.auth-error{padding:13px 15px;border-radius:4px;font-size:12px;margin-bottom:18px}
.auth-notice{background:#edf5fa;color:#28516d;border:1px solid #d6e6f0}.auth-error{background:#fff0ef;color:#a52b24;border:1px solid #f4d2cf}
.premium-form{display:flex;flex-direction:column;gap:22px}
.premium-field{display:flex;flex-direction:column;gap:9px}
.premium-field>span{font-size:11px;color:#344e64;font-weight:800}
.premium-field input{height:52px;border:1px solid #dce4ea;border-radius:3px;background:#fff;padding:0 15px;color:#17334c;font:500 13px var(--font-ui);outline:none;transition:border .2s,box-shadow .2s}
.premium-field input:focus{border-color:#9a774e;box-shadow:0 0 0 3px rgba(183,140,88,.12)}
.premium-field input::placeholder{color:#a5b0ba}
.auth-submit{height:55px;margin-top:7px;border:0;border-radius:3px;background:#102e48;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font:800 12px var(--font-ui);cursor:pointer;transition:background .2s,transform .2s}
.auth-submit:hover:not(:disabled){background:#1a4a6a;transform:translateY(-2px)}.auth-submit:disabled{opacity:.7;cursor:wait}.auth-submit b{font-size:20px;color:#e4bc84}
.auth-switch{margin-top:27px;text-align:center;font-size:12px;color:#748595}.auth-switch a{color:#173b59;font-weight:800;margin-left:4px}
.auth-security{margin-top:50px;padding-top:18px;border-top:1px solid #e5eaee;color:#8997a3;font-size:10px;text-align:center}.auth-security span{color:#b58b57;margin-right:7px}
.auth-side-bottom{position:absolute;bottom:24px;left:36px;right:36px;display:flex;justify-content:space-between;color:#a5b1ba;font-size:8px;letter-spacing:.17em;font-weight:800}
.auth-mobile-brand{display:none}
.signin-flight-overlay{position:fixed;inset:0;z-index:9999;overflow:hidden;background:#06182d;color:#fff;animation:overlay-in .25s ease both}
.signin-flight-copy{position:absolute;z-index:20;left:0;right:0;bottom:13%;display:flex;align-items:center;flex-direction:column;text-align:center;text-shadow:0 2px 18px #06182d}
.signin-flight-copy>span{color:#e5bd84;font-size:9px;font-weight:800;letter-spacing:.32em}
.signin-flight-copy>strong{margin-top:10px;font:400 clamp(30px,5vw,48px) Georgia,serif}
.signin-flight-copy>i{margin-top:22px;width:160px;height:2px;background:linear-gradient(90deg,transparent,#e5bd84,transparent);animation:runway-glow 1.7s ease-in-out infinite}
@keyframes runway-glow{0%,100%{opacity:.35;transform:scaleX(.7)}50%{opacity:1;transform:scaleX(1.2)}}
@keyframes overlay-in{from{opacity:0}to{opacity:1}}
@media(max-width:900px){.auth-experience{grid-template-columns:1fr}.auth-visual{display:none}.auth-form-side{min-height:calc(100vh - 72px);padding:55px 25px}.auth-mobile-brand{display:flex;justify-content:center;align-items:center;gap:10px;margin-bottom:42px;font-size:12px;font-weight:800;letter-spacing:.2em;color:#17334c}.auth-mobile-brand span{width:30px;height:30px;display:grid;place-items:center;border:1px solid #b58b57;border-radius:50%;color:#b58b57;font-size:14px}.back-home{margin-bottom:42px}.auth-side-bottom{bottom:15px}}
@media(max-width:480px){.auth-form-side{padding:35px 22px 60px}.auth-heading h2{font-size:42px}.auth-security{margin-top:36px}}
@media(prefers-reduced-motion:reduce){.auth-experience *, .signin-flight-overlay *{animation:none!important;transition:none!important}}
</style>