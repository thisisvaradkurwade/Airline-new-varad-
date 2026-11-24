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
    <div v-if="loading" class="signin-flight-overlay" aria-live="polite">
      <div class="flight-horizon"></div>
      <div class="flight-runway"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="landing-plane" aria-hidden="true">
        <svg viewBox="0 0 220 86" role="img" aria-label="SkyWings aircraft landing">
          <defs><linearGradient id="landing-body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".7" stop-color="#dcebf5"/><stop offset="1" stop-color="#9bbbd0"/></linearGradient></defs>
          <path d="M8 42 Q13 35 28 34 L185 34 Q202 35 214 43 Q201 50 185 51 L28 49 Q13 48 8 42Z" fill="url(#landing-body)" stroke="#b5cbd9" stroke-width="1.5"/>
          <path d="M88 35 L120 5 Q126 2 132 6 L119 36 L141 50 L119 49 L88 35Z" fill="#9ebed2" stroke="#d9eaf4"/>
          <path d="M40 35 L55 17 Q60 14 65 17 L59 36 L67 49 L57 49 L40 47Z" fill="#c4d9e7"/>
          <path d="M19 43 L187 43" stroke="#1479ad" stroke-width="3.5"/>
          <path d="M28 39 L177 39" stroke="#e7b66d" stroke-width="1.5"/>
          <g fill="#31536c"><rect x="82" y="39" width="5" height="2" rx="1"/><rect x="92" y="39" width="5" height="2" rx="1"/><rect x="102" y="39" width="5" height="2" rx="1"/><rect x="112" y="39" width="5" height="2" rx="1"/><rect x="122" y="39" width="5" height="2" rx="1"/></g>
          <path d="M77 51 L73 60 M151 51 L148 59" stroke="#d9e8f1" stroke-width="2" stroke-linecap="round"/>
          <circle cx="72" cy="62" r="3" fill="#e7b66d"/><circle cx="147" cy="61" r="3" fill="#e7b66d"/>
        </svg>
        <span class="plane-shadow"></span>
      </div>
      <div class="signin-flight-copy"><span>SKYWINGS · ARRIVAL</span><strong>Your journey continues.</strong><i></i></div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

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
    // Keep the landing sequence on screen long enough to complete smoothly.
    await new Promise(resolve => window.setTimeout(resolve, 1850));
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
.signin-flight-overlay{position:fixed;inset:0;z-index:9999;overflow:hidden;background:radial-gradient(ellipse at 50% 36%,#173e5c 0%,#0a2742 48%,#041426 100%);color:#fff;animation:overlay-in .35s ease both}
.flight-horizon{position:absolute;left:0;right:0;top:42%;height:1px;background:linear-gradient(90deg,transparent,rgba(181,220,239,.28),transparent);box-shadow:0 0 42px rgba(116,198,231,.2)}
.flight-runway{position:absolute;left:50%;bottom:-16%;width:min(78vw,850px);height:43%;transform:translateX(-50%) perspective(420px) rotateX(62deg);transform-origin:bottom;background:linear-gradient(180deg,rgba(39,85,113,.42),rgba(2,13,25,.96));border-top:1px solid rgba(194,225,241,.36);box-shadow:0 -15px 70px rgba(91,173,211,.12)}
.flight-runway:before{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;background:repeating-linear-gradient(180deg,rgba(240,248,252,.7) 0 13px,transparent 13px 30px)}
.flight-runway span{position:absolute;top:9%;bottom:0;width:2px;background:repeating-linear-gradient(180deg,rgba(225,190,139,.9) 0 3px,transparent 3px 24px);filter:drop-shadow(0 0 5px rgba(225,190,139,.55))}
.flight-runway span:nth-child(1){left:12%}.flight-runway span:nth-child(2){left:30%}.flight-runway span:nth-child(3){left:70%}.flight-runway span:nth-child(4){left:88%}.flight-runway span:nth-child(5){display:none}
.landing-plane{position:absolute;z-index:3;width:clamp(145px,19vw,220px);left:-24%;top:27%;animation:plane-landing 1.85s cubic-bezier(.22,.72,.2,1) forwards;filter:drop-shadow(0 12px 18px rgba(0,0,0,.35))}
.landing-plane svg{display:block;width:100%}
.plane-shadow{position:absolute;left:20%;right:10%;bottom:7%;height:5px;border-radius:50%;background:rgba(0,0,0,.35);filter:blur(5px);opacity:0;animation:shadow-arrive 1.85s ease-out forwards}
.signin-flight-copy{position:absolute;z-index:5;left:0;right:0;bottom:12%;display:flex;align-items:center;flex-direction:column;text-align:center;text-shadow:0 2px 18px #061a2c;animation:copy-arrive .7s .55s both}
.signin-flight-copy>span{color:#e5bd84;font-size:9px;font-weight:800;letter-spacing:.32em}
.signin-flight-copy>strong{margin-top:12px;font:400 clamp(27px,4.5vw,43px) Georgia,serif;letter-spacing:.01em}
.signin-flight-copy>i{margin-top:22px;width:150px;height:1px;background:linear-gradient(90deg,transparent,#e5bd84,transparent);animation:runway-glow 1.7s ease-in-out infinite}
@keyframes plane-landing{0%{left:-25%;top:21%;transform:rotate(7deg) scale(.78);opacity:0}10%{opacity:1}48%{left:37%;top:30%;transform:rotate(1deg) scale(.94)}72%{left:54%;top:35%;transform:rotate(-1deg) scale(.9)}88%{left:61%;top:37%;transform:rotate(0) scale(.84)}100%{left:67%;top:38%;transform:rotate(0) scale(.8);opacity:0}}
@keyframes shadow-arrive{0%,65%{opacity:0;transform:scale(.35)}100%{opacity:.8;transform:scale(1)}}
@keyframes copy-arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes runway-glow{0%,100%{opacity:.35;transform:scaleX(.7)}50%{opacity:1;transform:scaleX(1.2)}}
@keyframes overlay-in{from{opacity:0}to{opacity:1}}
@media(max-width:600px){.landing-plane{width:170px;top:29%}.flight-runway{width:110vw}.signin-flight-copy{bottom:15%}}
@media(prefers-reduced-motion:reduce){.landing-plane,.signin-flight-copy,.signin-flight-copy>i{animation:none!important}.landing-plane{left:40%;top:32%;opacity:1}}
@media(max-width:900px){.auth-experience{grid-template-columns:1fr}.auth-visual{display:none}.auth-form-side{min-height:calc(100vh - 72px);padding:55px 25px}.auth-mobile-brand{display:flex;justify-content:center;align-items:center;gap:10px;margin-bottom:42px;font-size:12px;font-weight:800;letter-spacing:.2em;color:#17334c}.auth-mobile-brand span{width:30px;height:30px;display:grid;place-items:center;border:1px solid #b58b57;border-radius:50%;color:#b58b57;font-size:14px}.back-home{margin-bottom:42px}.auth-side-bottom{bottom:15px}}
@media(max-width:480px){.auth-form-side{padding:35px 22px 60px}.auth-heading h2{font-size:42px}.auth-security{margin-top:36px}}
@media(prefers-reduced-motion:reduce){.auth-experience *, .signin-flight-overlay *{animation:none!important;transition:none!important}}
</style>