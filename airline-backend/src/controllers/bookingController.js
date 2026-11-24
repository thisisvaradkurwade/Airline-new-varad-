const { supabase } = require('../lib/supabaseClient');

function db(req) {
  return req.supabase || supabase;
}

function requireSupabaseUser(req, res) {
  if (!req.user?.id || !req.supabase) {
    res.status(401).json({
      success: false,
      message: 'Please sign out and sign in again to create a booking with your passenger account.'
    });
    return false;
  }
  return true;
}

async function getPassengerForUser(client, userId) {
  const { data, error } = await client
    .from('passengers')
    .select('id, user_id, full_name, email, phone')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}

async function createBooking(req, res, next) {
  try {
    if (!requireSupabaseUser(req, res)) return;
    const { flightId, seatId, travelClass } = req.body;
    if (!flightId || !seatId || !travelClass) {
      return res.status(400).json({
        success: false,
        message: 'Flight, selected seat, and travel class are required.'
      });
    }

    const client = db(req);
    const passenger = await getPassengerForUser(client, req.user.id);
    const { data: booking, error } = await client.rpc('create_airline_booking', {
      p_passenger_id: passenger.id,
      p_flight_id: Number(flightId),
      p_seat_id: Number(seatId),
      p_travel_class: travelClass
    });

    if (error) {
      const status = /not available|not found|does not match|already|authorized/i.test(error.message) ? 409 : 400;
      return res.status(status).json({ success: false, message: error.message });
    }

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed and saved to the database.',
      booking: { ...booking, passenger, seat_number: req.body.seatNumber || null }
    });
  } catch (err) {
    next(err);
  }
}

async function getUserBookings(req, res, next) {
  try {
    if (!requireSupabaseUser(req, res)) return;
    const client = db(req);
    const passenger = await getPassengerForUser(client, req.user.id);
    const { data, error } = await client
      .from('bookings')
      .select('*, flights(*), seats(*), passengers(*)')
      .eq('passenger_id', passenger.id)
      .order('booking_date', { ascending: false });
    if (error) throw error;
    return res.json({ success: true, count: data.length, bookings: data });
  } catch (err) {
    next(err);
  }
}

async function getBookingById(req, res, next) {
  try {
    if (!requireSupabaseUser(req, res)) return;
    const identifier = String(req.params.pnr || req.params.id || '').trim();
    if (!identifier) return res.status(400).json({ success: false, message: 'PNR or ID is required.' });
    const client = db(req);
    const passenger = await getPassengerForUser(client, req.user.id);
    let query = client.from('bookings').select('*, flights(*), seats(*), passengers(*)').eq('passenger_id', passenger.id);
    query = /^\\d+$/.test(identifier) ? query.eq('id', Number(identifier)) : query.eq('pnr', identifier.toUpperCase());
    const { data, error } = await query.maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Booking not found.' });
    return res.json({ success: true, booking: data });
  } catch (err) {
    next(err);
  }
}

async function cancelBooking(req, res, next) {
  try {
    if (!requireSupabaseUser(req, res)) return;
    const identifier = String(req.params.id || req.params.pnr || '').trim();
    const client = db(req);
    const passenger = await getPassengerForUser(client, req.user.id);
    let lookup = client.from('bookings').select('id').eq('passenger_id', passenger.id);
    lookup = /^\\d+$/.test(identifier) ? lookup.eq('id', Number(identifier)) : lookup.eq('pnr', identifier.toUpperCase());
    const { data: found, error: lookupError } = await lookup.maybeSingle();
    if (lookupError) throw lookupError;
    if (!found) return res.status(404).json({ success: false, message: 'Booking not found.' });
    const { data, error } = await client.rpc('cancel_airline_booking', { p_booking_id: found.id });
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, message: 'Booking cancelled and seat released.', booking: data });
  } catch (err) {
    next(err);
  }
}

async function getAllBookings(req, res, next) {
  try {
    const client = db(req);
    let query = client.from('bookings').select('*, flights(*), seats(*), passengers(*)').order('booking_date', { ascending: false });
    if (req.query.status) query = query.eq('booking_status', req.query.status);
    if (req.query.pnr) query = query.ilike('pnr', `%${req.query.pnr.trim()}%`);
    const { data, error } = await query;
    if (error) throw error;
    return res.json({ success: true, count: data.length, bookings: data });
  } catch (err) {
    next(err);
  }
}

async function updateBookingStatus(req, res, next) {
  try {
    const { status, booking_status } = req.body;
    const newStatus = status || booking_status;
    if (!newStatus) return res.status(400).json({ success: false, message: 'A booking status is required.' });
    const { data, error } = await db(req).rpc('update_airline_booking_status', {
      p_booking_id: Number(req.params.id),
      p_status: newStatus
    });
    if (error) return res.status(400).json({ success: false, message: error.message });
    return res.json({ success: true, message: `Booking status updated to ${newStatus}.`, booking: data });
  } catch (err) {
    next(err);
  }
}

async function enrichBookings(client, bookings) {
  return bookings;
}

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  enrichBookings
};
