import SectionWrapper from "@/components/common/SectionWrapper";

export default function ProductsPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-sky-700 mb-10">Our Products</h1>

      <SectionWrapper direction="up" stagger={0.15}>
        <p className="text-gray-600">
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
