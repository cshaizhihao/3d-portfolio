import User from '../models/User.js';
import { sendTokenResponse } from '../utils/jwt.js';
import { errorResponse } from '../utils/response.js';

// @desc    注册新用户
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    // 检查用户是否已存在
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return errorResponse(res, 400, 'User already exists');
    }

    // 创建用户
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'user', // 默认为普通用户
    });

    // 发送 token 响应
    sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    用户登录
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 查找用户（包含密码字段）
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // 验证密码
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid credentials');
    }

    // 检查账户是否激活
    if (!user.isActive) {
      return errorResponse(res, 401, 'Account is deactivated');
    }

    // 更新最后登录时间
    user.lastLogin = Date.now();
    await user.save();

    // 发送 token 响应
    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

// @desc    获取当前用户信息
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    更新用户信息
// @route   PUT /api/auth/update
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { username, email, bio, avatar } = req.body;

    const fieldsToUpdate = {};
    if (username) fieldsToUpdate.username = username;
    if (email) fieldsToUpdate.email = email;
    if (bio !== undefined) fieldsToUpdate.bio = bio;
    if (avatar !== undefined) fieldsToUpdate.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    修改密码
// @route   PUT /api/auth/password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 获取用户（包含密码）
    const user = await User.findById(req.user.id).select('+password');

    // 验证当前密码
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return errorResponse(res, 401, 'Current password is incorrect');
    }

    // 更新密码
    user.password = newPassword;
    await user.save();

    // 发送新 token
    sendTokenResponse(user, 200, res, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};
