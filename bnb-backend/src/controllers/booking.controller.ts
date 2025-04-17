import { Request, Response } from 'express';
import Booking from '../models/booking.model';
import Room from '../models/room.model';
import Transaction from '../models/transaction.model';
import { generateReceiptCode } from '../utils/booking.util';
import { CREATED, OK } from 'http-status-codes';
import { IBooking } from '../interfaces/booking.interface';

export const createBooking = async (req: Request, res: Response) => {
  const { roomId, checkIn, checkOut, guests, paymentMethod } = req.body;
  const userId = req.user._id;

  // Check room availability
  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  // Calculate total amount (could be more complex with seasonal pricing)
  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
  const totalAmount = room.price * nights;

  // Create booking
  const booking = await Booking.create({
    room: roomId,
    user: userId,
    checkIn,
    checkOut,
    guests,
    totalAmount,
    paymentMethod,
    receiptCode: generateReceiptCode()
  });

  // Update room booked dates
  room.bookedDates.push({ start: checkIn, end: checkOut });
  await room.save();

  // Create transaction if payment is not cash
  if (paymentMethod !== 'cash') {
    await Transaction.create({
      booking: booking._id,
      amount: totalAmount,
      paymentMethod,
      transactionReference: `TXN-${Date.now()}`,
      status: 'pending'
    });
  }

  res.status(CREATED).json(booking);
};

export const getBooking = async (req: Request, res: Response) => {
  const booking = await Booking.findById(req.params.id)
    .populate('room')
    .populate('user', 'name email phone');
  
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Only allow access to the booking owner or admins
  if (booking.user._id.toString() !== req.user._id.toString() && req.user.role === 'guest') {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.status(OK).json(booking);
};

export const getBookingsByUser = async (req: Request, res: Response) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('room')
    .sort({ createdAt: -1 });
  
  res.status(OK).json(bookings);
};

export const getAllBookings = async (req: Request, res: Response) => {
  // Only allow admins to access all bookings
  if (req.user.role === 'guest') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const bookings = await Booking.find()
    .populate('room')
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 });
  
  res.status(OK).json(bookings);
};

export const approveBooking = async (req: Request, res: Response) => {
  // Only allow admins to approve bookings
  if (req.user.role === 'guest') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  booking.status = 'confirmed';
  booking.approvedBy = req.user._id;
  await booking.save();

  res.status(OK).json(booking);
};