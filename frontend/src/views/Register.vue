<template>
  <main class="auth-experience register-experience">
    <section class="auth-visual">
      <div class="auth-visual-sky"></div><div class="auth-visual-grid"></div>
      <div class="auth-visual-brand"><span class="brand-wing">✈</span><span>SKYWINGS<small>THE ART OF TRAVEL</small></span></div>
      <div class="auth-visual-copy"><span class="auth-kicker">MAKE ROOM FOR MORE</span><h1>A world of<br /><em>possibilities.</em></h1><p>Create your SkyWings account and bring every part of your journey together — from choosing your seat to reaching your destination.</p></div>
      <div class="auth-visual-plane" aria-hidden="true"><svg viewBox="0 0 520 190"><path d="M15 94 Q25 77 64 74 L422 74 Q472 78 505 96 Q472 114 422 118 L64 112 Q25 110 15 94Z" fill="#f5f8fb" stroke="#b9d2e3" stroke-width="2"/><path d="M170 78 L248 10 Q263 2 277 10 L252 80 L295 111 L251 112 L170 78Z" fill="#a9cce2"/><path d="M67 78 L101 43 Q111 37 120 43 L108 80 L128 111 L103 111 L67 110Z" fill="#c6dfed"/><path d="M31 94 L453 94" stroke="#137cb1" stroke-width="7"/><path d="M62 86 L390 86" stroke="#e6b56f" stroke-width="3"/></svg></div>
      <div class="auth-visual-footer"><span>02</span><i></i><span>WELCOME TO A BETTER WAY TO FLY</span></div>
    </section>
    <section class="auth-form-side">
      <div class="auth-mobile-brand"><span>✈</span> SKYWINGS</div>
      <div class="auth-form-wrap">
        <router-link to="/" class="back-home">← <span>Back to home</span></router-link>
        <div class="auth-heading"><span class="auth-kicker">JOIN THE JOURNEY</span><h2>Let's get you <em>started.</em></h2><p>A few details, then the world is yours.</p></div>
        <div v-if="errorMessage" class="auth-error" role="alert">{{ errorMessage }}</div>
        <div v-if="successMessage" class="auth-notice" role="status">{{ successMessage }}</div>
        <form @submit.prevent="handleRegister" class="premium-form">
          <label class="premium-field"><span>Full name</span><input v-model.trim="form.name" type="text" autocomplete="name" placeholder="Your full name" required /></label>
          <label class="premium-field"><span>Email address</span><input v-model.trim="form.email" type="email" autocomplete="email" placeholder="you@example.com" required /></label>
          <label class="premium-field"><span>Phone number</span><input v-model.trim="form.phone" type="tel" autocomplete="tel" placeholder="+91 98765 43210" required /></label>
          <div class="register-passwords">
            <label class="premium-field"><span>Password</span><input v-model="form.password" type="password" autocomplete="new-password" placeholder="At least 6 characters" minlength="6" required /></label>
            <label class="premium-field"><span>Confirm password</span><input v-model="form.confirmPassword" type="password" autocomplete="new-password" placeholder="Repeat password" required /></label>
          </div>
          <button class="auth-submit" type="submit" :disabled="loading"><span>{{ loading ? 'Creating your account…' : 'Create your SkyWings account' }}</span><b>↗</b></button>
        </form>
        <p class="auth-switch">Already flying with us? <router-link to="/login">Sign in</router-link></p>
        <div class="auth-security"><span>✦</span> Your details are handled securely.</div>
      </div>
      <div class="auth-side-bottom"><span>SKYWINGS AIRLINES</span><span>TRAVEL BEAUTIFULLY.</span></div>
    </section>
    <div v-if="loading" class="signin-flight-overlay" aria-live="polite"><div class="signin-flight-orbit"></div><div class="signin-flight-plane">✈</div><span>PREPARING FOR TAKEOFF</span><strong>Your journey awaits.</strong><i></i></div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter();
const authStore = useAuthStore();
const form = ref({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

async function handleRegister() {
  errorMessage.value = '';
  successMessage.value = '';
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Your passwords do not match.';
    return;
  }
  if (form.value.password.length < 6) {
    errorMessage.value = 'Your password must contain at least 6 characters.';
    return;
  }
  loading.value = true;
  try {
    const response = await authStore.register({
      name: form.value.name, email: form.value.email, phone: form.value.phone,
      password: form.value.password, confirmPassword: form.value.confirmPassword
    });
    if (response.token) {
      await router.push('/dashboard');
    } else if (response.requiresEmailConfirmation) {
      successMessage.value = response.message || 'Check your email to confirm your account, then sign in.';
    } else {
      await router.push('/login');
    }
  } catch (err) {
    errorMessage.value = err.message || 'We could not create your account. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
@import './Login.vue';
.register-experience .auth-visual-copy{margin-top:clamp(90px,15vh,160px)}
.register-experience .auth-form-wrap{max-width:470px}
.register-experience .auth-heading{margin-bottom:25px}
.register-experience .auth-heading h2{font-size:clamp(38px,4vw,48px)}
.register-experience .premium-form{gap:15px}
.register-passwords{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.register-experience .auth-security{margin-top:28px}
@media(max-width:480px){.register-passwords{grid-template-columns:1fr}}
</style>