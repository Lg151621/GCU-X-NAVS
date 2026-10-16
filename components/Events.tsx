import SectionHead from "./SectionHead";

export default function Events() {
  return (
    <section id="week">
      <SectionHead label="Our week" title={<>Gather. Pray. <em>Go.</em></>}>
        Three rhythms shape our week. Come to one or all three. No experience needed, and you don&apos;t need a friend to bring you.
      </SectionHead>
      <div className="week">
        <article className="event">
          <h3>NavNight</h3>
          <p>focused on abiding with Jesus together in His Word</p>
        </article>
        <article className="event">
          <h3>Prayer walk</h3>
          <p>We walk campus together and pray for GCU, our classmates, and our city.</p>
        </article>
        <article className="event">
          <h3>ASU Evangelism</h3>
          <p>We head to Arizona State to share the gospel and have real conversations about Jesus. First-timers go out with someone experienced.</p>
        </article>
      </div>
    </section>
  );
}
