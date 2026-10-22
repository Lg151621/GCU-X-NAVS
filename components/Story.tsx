import Image from "next/image";
import { featuredStory } from "@/lib/content";
import SectionHead from "./SectionHead";

export default function Story() {
  return (
    <section id="story" aria-label="Look what God has done">
      <div className="story-layout">
        <div className="story-copy">
          <SectionHead
            label={featuredStory.eyebrow}
            title={<>{featuredStory.heading.lead} <em>{featuredStory.heading.emphasis}</em></>}
          >
            {featuredStory.intro}
          </SectionHead>
          <a
            className="btn story-cta"
            href={featuredStory.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="story-article-title"
          >
            {featuredStory.cta}
          </a>
        </div>
        <figure className="story-feature">
          <Image
            src={featuredStory.photo}
            alt={featuredStory.alt}
            width={2000}
            height={1500}
            sizes="(max-width: 860px) calc(100vw - 40px), (max-width: 1200px) 50vw, 600px"
            quality={90}
          />
          <figcaption>
            <p className="story-source">{featuredStory.attribution}</p>
            <h3 id="story-article-title">{featuredStory.title}</h3>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
