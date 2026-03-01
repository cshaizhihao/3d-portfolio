import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // 这些选项在 Mongoose 6+ 已经是默认的，但为了兼容性还是写上
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`.cyan.bold);
    console.log(`📦 Database: ${conn.connection.name}`.cyan);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// 监听连接事件
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB'.green);
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Mongoose connection error: ${err}`.red);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB'.yellow);
});

// 优雅关闭
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 Mongoose connection closed through app termination'.yellow);
  process.exit(0);
});

export default connectDB;
