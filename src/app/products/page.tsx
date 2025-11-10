import SectionWrapper from "@/components/common/SectionWrapper";

export default function ProductsPage() {
  return (
    <div className="space-y-20">
      <SectionWrapper direction="up" stagger={0.15}>
        <h1 className="text-3xl font-bold text-sky-700">Our Products</h1>
        <p className="text-gray-600 mt-2">
          Explore our BLE-based devices and accessibility platforms.
        </p>
        <ul className="mt-6 space-y-3 list-disc list-inside text-gray-500">
          <li>Tagless Beacon (BLE accessibility marker)</li>
          <li>Visual Kiosk Interface</li>
          <li>BlissWorld AI Service</li>
        </ul>
      </SectionWrapper>
    </div>
  );
}
