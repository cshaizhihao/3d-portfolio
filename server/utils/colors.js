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

// 扩展 String 原型
['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'].forEach((color) => {
  if (!String.prototype[color]) {
    String.prototype[color] = function() {
      return colors[color] + this + colors.reset;
    };
  }
});

// 添加 bold 方法
if (!String.prototype.bold) {
  String.prototype.bold = function() {
    return colors.bright + this + colors.reset;
  };
}

export default colors;
