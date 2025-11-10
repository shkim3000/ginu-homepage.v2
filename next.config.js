/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // ✅ 개발 중에는 압축/도메인 제한 해제
  },
};

module.exports = nextConfig; // ✅ 이렇게!
