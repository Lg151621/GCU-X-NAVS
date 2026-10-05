import Image from "next/image";
import { GROUP_CHAT, STAFF_EMAIL } from "@/lib/content";
import ContactWay from "./ContactWay";
import SectionHead from "./SectionHead";

export default function Connect() {
  return (
    <section id="connect">
      <SectionHead label="Come say hi" title={<>See you <em>Monday.</em></>}>
        The easiest first step is showing up to NavNight. If you&apos;d rather reach out first, any of these works.
      </SectionHead>
      <div className="connect">
        <div className="way groupme">
          <div className="qr-card">
            {GROUP_CHAT.qr ? (
              <Image className="qr" src={GROUP_CHAT.qr} alt="QR code to join the Navigators at GCU GroupMe" width={400} height={400} unoptimized />
            ) : (
              <div className="qr qr-empty">QR code</div>
            )}
          </div>
          <div className="groupme-text">
            <h3>Group chat</h3>
            <p className="lead">Scan the QR code to join our GroupMe.</p>
            <p>Where rides, meetups, and last-minute changes go out.</p>
            {GROUP_CHAT.url && (
              <a className="btn" href={GROUP_CHAT.url} target="_blank" rel="noopener">Join GroupMe</a>
            )}
          </div>
        </div>
        <ContactWay className="email" {...STAFF_EMAIL} />
      </div>
    </section>
  );
}
