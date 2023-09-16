/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  // 添加dark到html的class启动暗黑模式
  darkMode: ['class', '[arco-theme="dark"]'],
  plugins: []
}
