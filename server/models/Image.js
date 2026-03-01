import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
      default: '',
    },
    filename: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    tags: [{
      type: String,
      trim: true,
    }],
    category: {
      type: String,
      enum: ['hero', 'project', 'gallery', 'avatar', 'other'],
      default: 'gallery',
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 索引
imageSchema.index({ category: 1, isPublic: 1 });
imageSchema.index({ uploadedBy: 1 });
imageSchema.index({ createdAt: -1 });

const Image = mongoose.model('Image', imageSchema);

export default Image;
