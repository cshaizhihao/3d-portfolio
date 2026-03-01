import mongoose from 'mongoose';

const configSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed, // 可以存储任何类型
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['general', 'social', 'seo', 'api', 'theme', 'other'],
      default: 'other',
    },
    isPublic: {
      type: Boolean,
      default: false, // 是否可以公开访问（不需要认证）
    },
  },
  {
    timestamps: true,
  }
);

// 索引
configSchema.index({ key: 1 });
configSchema.index({ category: 1 });

const Config = mongoose.model('Config', configSchema);

export default Config;
