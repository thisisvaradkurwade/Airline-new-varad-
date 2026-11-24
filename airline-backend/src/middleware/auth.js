const { createSupabaseClient } = require('../lib/supabaseClient');
const userStore = require('../utils/userStore');

async function getAuthenticatedUser(req) {
  const authorization = req.headers.authorization || '';
  const [scheme, token] = authorization.split(' ');
  if (scheme !== 'Bearer' || !token) return null;

  // Always try Supabase first. Passenger database operations require a real
  // Supabase access token so auth.uid() is available to RLS and RPC functions.
  try {
    const client = createSupabaseClient(token);
    const { data: authData, error: authError } = await client.auth.getUser(token);
    if (!authError && authData.user) {
      let profile = null;
      const { data, error: profileError } = await client
        .from('users')
        .select('id, name, email, role, phone, address, dob, status, created_at')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (!profileError && data) profile = data;
      if (!profile) {
        const meta = authData.user.user_metadata || {};
        profile = {
          id: authData.user.id,
          name: meta.name || authData.user.email.split('@')[0],
          email: authData.user.email,
          role: meta.role || 'passenger',
          phone: meta.phone || '',
          address: '',
          dob: null,
          status: 'ACTIVE',
          created_at: authData.user.created_at || new Date().toISOString()
        };
      }

      if (profile.status !== 'ACTIVE') return null;
      req.supabase = client;
      req.authProvider = 'supabase';
      req.authUser = authData.user;
      req.user = { ...authData.user, ...profile, id: authData.user.id };
      return req.user;
    }
  } catch (err) {
    // Fall through to the legacy administrator-only token check.
  }

  // Legacy locally signed tokens are retained only for admin dashboard access.
  const localPayload = userStore.verifyToken(token);
  if (localPayload?.id) {
    const user = userStore.getUserById(localPayload.id);
    if (user && user.status === 'ACTIVE' && user.role === 'admin') {
      req.user = userStore.toPublicUser(user);
      req.supabase = null;
      req.authProvider = 'local-admin';
      return req.user;
    }
  }
  return null;
}

function authenticateToken(req, res, next) {
  getAuthenticatedUser(req)
    .then(user => {
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Your session is missing, invalid, or is not a Supabase passenger session. Please sign in again.'
        });
      }
      next();
    })
    .catch(next);
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden. Administrator privileges are required.'
    });
  }
  next();
}

function optionalAuth(req, res, next) {
  getAuthenticatedUser(req)
    .then(() => next())
    .catch(next);
}

module.exports = { authenticateToken, requireAdmin, optionalAuth };
