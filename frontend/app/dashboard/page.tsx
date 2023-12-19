import fs from 'fs'

export default async function Dashboard() {
  try {
    const nist_standards = fs.readFileSync('lib/parsed_text.json', {encoding: 'utf8', flag: 'r'});
    const json_nist_standards = JSON.parse(nist_standards);
    return (
      <main>
        {Object.entries(json_nist_standards).map(([majorSectionNumber, majorSection]) => (
          <section key={majorSectionNumber}>
            <h1>{majorSectionNumber}</h1>
            <h2>{majorSection.title}</h2>
            {Object.entries(majorSection.sections).map(([minorSectionNumber, minorSection]) => (
              <section key={minorSectionNumber}>
                <h2>{minorSectionNumber}</h2>
                <p><strong>{minorSection.brief_description}</strong></p>
                <p>{minorSection.detailed_description}</p>
              </section>
            ))}
          </section>
        ))}
      </main>
    )
  } catch (error) {
    console.error('Couldn\' read nist standards:', error);
    return (
      <div className="flex items-center justify-center h-full w-full">
        <h1>Something has gone horribly wrong displaying this data.</h1>
      </div>
    )
  }
}
