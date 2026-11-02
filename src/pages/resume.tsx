import Meta from 'components/meta';
import { Resume } from 'components/resume';

export default function ResumePage() {
  return (
    <>
      <Meta title="Ye — Resume" description="Resume." noindex />
      <div className="pt-20 md:pt-24">
        <Resume />
      </div>
    </>
  );
}
