export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alberto (JAG) Pascoe',
    jobTitle: 'Chief Digital Executive & Strategic Technology Leader',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent Consultant'
    },
    url: 'https://albertopascoe.com',
    sameAs: [
      'https://www.linkedin.com/in/agpascoe'
    ],
    knowsAbout: [
      'Digital Transformation',
      'AI/ML Implementation',
      'Strategic Technology Leadership',
      'FinTech Innovation',
      'PropTech Solutions'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
} 