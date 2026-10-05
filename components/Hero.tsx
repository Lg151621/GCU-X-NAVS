import Image from "next/image";

export default function Hero() {
  return (
    <div className="hero">
      <Image className="hero-logo" src="/assets/navigators-logo-white.png" alt="" width={64} height={62} priority />
      <span className="label">The Navigators at Grand Canyon University</span>
      <h1>
        To know Christ, make Him known, <em>and help others do the same.</em>
      </h1>
    </div>
  );
}
