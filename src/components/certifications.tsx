import { Link as LinkIcon } from 'lucide-react';
import { LICENSES } from 'data/profile';
import { Panel } from './section';

export function Certifications() {
  return (
    <Panel id="licenses" title="Licenses & Certifications">
      <div className="space-y-4 py-4">
        {LICENSES.map((license) => (
          <div key={license.id} className="group/license flex items-start gap-3">
            {license.issuerLogo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={license.issuerLogo}
                alt={`${license.issuer} logo`}
                width="24"
                height="24"
                className="mx-1 size-6 shrink-0 rounded-full object-contain grayscale transition-[filter] duration-300 group-hover/license:grayscale-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium">{license.title}</h3>
              <p className="text-xs text-muted">{license.issuer}</p>
              {(license.issued || license.expires) && (
                <p className="mt-0.5 text-xs text-muted">
                  {license.issued && `Issued ${license.issued}`}
                  {license.issued && license.expires && ' · '}
                  {license.expires && `Expires ${license.expires}`}
                </p>
              )}
              {license.credentialId && (
                <p className="mt-0.5 text-xs text-subtle">Credential ID: {license.credentialId}</p>
              )}
            </div>
            {license.credentialUrl && (
              <a
                href={license.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Show credential for ${license.title}`}
                className="flex size-6 shrink-0 items-center justify-center text-accent transition-opacity duration-150 hover:opacity-80"
              >
                <LinkIcon className="size-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </Panel>
  );
}
