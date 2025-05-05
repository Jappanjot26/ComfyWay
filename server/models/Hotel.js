import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  type: {
    type: String,
    required: true,
    enum: ['Hotel', 'Resort', 'Boutique', 'Lodge', 'Suite']
  },
  rooms: {
    type: Number,
    required: true,
    min: 1
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  availableDates: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel