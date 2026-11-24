const { supabase } = require('../lib/supabaseClient');

function db(req) {
  return req.supabase || supabase;
}

async function getSeatsByFlight(req, res, next) {
  try {
    const flightId = req.params.flightId;
    if (!flightId) return res.status(400).json({ success: false, message: 'A valid flight ID is required.' });
    const { data, error } = await db(req)
      .from('seats')
      .select('*')
      .eq('flight_id', Number(flightId))
      .order('seat_number', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, count: data.length, seats: data });
  } catch (err) { next(err); }
}

async function getAvailableSeats(req, res, next) {
  try {
    const flightId = req.params.flightId;
    if (!flightId) return res.status(400).json({ success: false, message: 'A valid flight ID is required.' });
    const { data, error } = await db(req)
      .from('seats')
      .select('*')
      .eq('flight_id', Number(flightId))
      .eq('seat_status', 'AVAILABLE')
      .order('seat_number', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, count: data.length, seats: data });
  } catch (err) { next(err); }
}

async function getBookedSeats(req, res, next) {
  try {
    const flightId = req.params.flightId;
    if (!flightId) return res.status(400).json({ success: false, message: 'A valid flight ID is required.' });
    const { data, error } = await db(req)
      .from('seats')
      .select('*')
      .eq('flight_id', Number(flightId))
      .in('seat_status', ['BOOKED', 'BLOCKED'])
      .order('seat_number', { ascending: true });
    if (error) throw error;
    return res.json({ success: true, count: data.length, seats: data });
  } catch (err) { next(err); }
}

async function createSeat(req, res, next) {
  try {
    const { flightId, seatNumber, seatClass } = req.body;
    if (!flightId || !seatNumber) {
      return res.status(400).json({ success: false, message: 'Flight ID and seat number are required.' });
    }
    const { data, error } = await db(req)
      .from('seats')
      .insert({
        flight_id: Number(flightId),
        seat_number: seatNumber.trim().toUpperCase(),
        seat_class: seatClass || 'Economy',
        seat_status: 'AVAILABLE'
      })
      .select('*')
      .single();
    if (error) throw error;
    return res.status(201).json({ success: true, seat: data });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ success: false, message: 'That seat already exists for this flight.' });
    next(err);
  }
}

async function releaseSeat(req, res, next) {
  try {
    const { data, error } = await db(req)
      .from('seats')
      .update({ seat_status: 'AVAILABLE' })
      .eq('id', Number(req.params.id))
      .eq('seat_status', 'BOOKED')
      .select('*')
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ success: false, message: 'Booked seat was not found.' });
    return res.json({ success: true, message: 'Seat released successfully.', seat: data });
  } catch (err) { next(err); }
}

async function updateSeatStatus(req, res, next) {
  try {
    const blocked = req.body.seat_status
      ? req.body.seat_status === 'BLOCKED'
      : !!req.body.is_blocked;
    const { data, error } = await db(req).rpc('set_airline_seat_blocked', {
      p_seat_id: Number(req.params.id),
      p_blocked: blocked
    });
    if (error) throw error;
    return res.json({ success: true, message: 'Seat status updated successfully.', seat: data });
  } catch (err) { next(err); }
}

module.exports = {
  getSeatsByFlight,
  getAvailableSeats,
  getBookedSeats,
  createSeat,
  releaseSeat,
  updateSeatStatus
};
