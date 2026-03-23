import React from 'react';

interface DirectoryCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
}

export function DirectoryCTA({
  title = "Join the Deep South Directory",
  description = "Connect with the Outsider Economics ecosystem and list your business in the definitive guide to independent Southern enterprise.",
  buttonText = "Apply for Listing",
  href = "/directory/apply"
}: DirectoryCTAProps) {
  return (
    <div className="directory-cta-wrapper rounded-lg border border-gray-800 bg-gray-950 p-8 text-center shadow-lg">
      <h3 className="mb-3 text-2xl font-bold text-gray-100">{title}</h3>
      <p className="mb-6 text-gray-400 max-w-xl mx-auto">
        {description}
      </p>
      <a 
        href={href}
        className="inline-block rounded-md bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
      >
        {buttonText}
      </a>
    </div>
  );
}
