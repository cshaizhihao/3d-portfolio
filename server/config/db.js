import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// 监听连接事件
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from MongoDB');
});

// 优雅关闭
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 Mongoose connection closed through app termination');
  process.exit(0);
});

export default connectDB;
