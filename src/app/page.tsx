import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-sky-700">Welcome to Ginu</h1>
      <p className="text-gray-600">This is the Home page with interactive buttons.</p>

      <div className="flex gap-4">
        <Button variant="primary">Primary Action</Button>
        <Button variant="secondary">Secondary</Button>
        <LinkButton href="/about">About Page →</LinkButton>
      </div>
    </div>
  );
}
