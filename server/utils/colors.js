// 添加颜色支持到 console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// 扩展 String 原型（仅用于开发环境）
if (process.env.NODE_ENV === 'development') {
  Object.keys(colors).forEach((color) => {
    String.prototype[color] = function() {
      return colors[color] + this + colors.reset;
    };
  });
}

export default colors;
