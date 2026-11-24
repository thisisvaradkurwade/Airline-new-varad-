const { supabase } = require('../lib/supabaseClient');

function db(req) {
  return req.supabase || supabase;
}

async function getMyPassenger(req, res, next) {
  try {
    if (!req.user?.id || !req.supabase) {
      return res.status(401).json({ success: false, message: 'Please sign in again.' });
    }
    const { data, error } = await db(req)
      .from('passengers')
      .select('id, user_id, full_name, email, phone, created_at')
      .eq('user_id', req.user.id)
      .single();
    if (error) throw error;
    const { count, error: countError } = await db(req)
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('passenger_id', data.id);
    if (countError) throw countError;
    return res.json({
      success: true,
      passenger: {
        ...data,
        name: data.full_name,
        total_bookings: count || 0,
        active_bookings: count || 0
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getPassengers(req, res, next) {
  try {
    const { data, error } = await db(req)
      .from('passengers')
      .select('id, user_id, full_name, email, phone, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return res.json({ success: true, count: data.length, passengers: data });
  } catch (err) { next(err); }
}

async function getPassengerById(req, res, next) {
  try {
    const { data, error } = await db(req)
      .from('passengers')
      .select('id, user_id, full_name, email, phone, created_at')
      .eq('id', Number(req.params.id))
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Passenger not found.' });
    if (data.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }
    return res.json({ success: true, passenger: data });
  } catch (err) { next(err); }
}

async function createPassenger(req, res) {
  return res.status(405).json({ success: false, message: 'Passenger profiles are created automatically when an account is registered.' });
}
async function updatePassenger(req, res, next) {
  try {
    const updates = {};
    const name = req.body.fullName || req.body.full_name;
    if (name) updates.full_name = name;
    if (req.body.email) updates.email = req.body.email.toLowerCase();
    if (req.body.phone !== undefined) updates.phone = req.body.phone;
    const { data, error } = await db(req).from('passengers').update(updates)
      .eq('id', Number(req.params.id)).eq('user_id', req.user.id)
      .select().maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Passenger not found or not authorized.' });
    return res.json({ success: true, passenger: data });
  } catch (err) { next(err); }
}
async function deletePassenger(req, res) {
  return res.status(405).json({ success: false, message: 'Passenger records are linked to user accounts and cannot be deleted here.' });
}
async function updatePassengerStatus(req, res, next) {
  try {
    const { status, error } = await db(req).from('users')
      .update({ status: req.body.status }).eq('id', req.params.id).select().maybeSingle();
    if (error) throw error;
    if (!status) return res.status(404).json({ success: false, message: 'User not found.' });
    return res.json({ success: true, message: 'Passenger account status updated.', user: status });
  } catch (err) { next(err); }
}

module.exports = {
  getPassengers, createPassenger, getMyPassenger, getPassengerById,
  updatePassenger, deletePassenger, updatePassengerStatus
};
