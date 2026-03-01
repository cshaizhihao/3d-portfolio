import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    url: {
      type: String,
      required: [true, 'Project URL is required'],
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL',
      ],
    },
    github: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/,
        'Please provide a valid GitHub URL',
      ],
      default: null,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    images: [{
      type: String,
    }],
    tags: [{
      type: String,
      trim: true,
    }],
    technologies: [{
      type: String,
      trim: true,
    }],
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'draft'],
      default: 'active',
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: '#00ff88',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color'],
    },
    resultMetrics: [{
      type: String,
      trim: true,
      maxlength: [100, 'Metric too long'],
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 索引优化
projectSchema.index({ title: 'text', description: 'text' }); // 全文搜索
projectSchema.index({ featured: -1, order: 1 }); // 排序优化
projectSchema.index({ status: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
