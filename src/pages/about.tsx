import Meta from 'components/meta';
import { Section } from 'components/section';
import { CONTENT } from 'data/content';
import styles from 'styles/site.module.css';

export default function About() {
  return (
    <>
      <Meta title="ye — About" description="About me." />
      <div className="pt-20 md:pt-24">
        <Section>
          <div className="space-y-4">
            {CONTENT.about.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-12 flex items-center justify-center text-xl font-medium text-accent">
            Coming Soon
            <span className={styles.dots} aria-hidden>
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        </Section>
      </div>
    </>
  );
}
