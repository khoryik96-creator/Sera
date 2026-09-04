import { PageHeader } from '../../components/Shared';
import { characterImageMap } from '../../../images';
import { orchidHierarchy, originalApprentices, spoilerNotice, teahouseIdentity } from './teahouseData';
import type { ArtStatus, TeahouseArt } from './teahouseData';
import '../../styles/teahouse.css';

const ART_STATUS_LABEL: Record<ArtStatus, string> = {
  active: '',
  'details-tbd': 'Details TBD',
  'story-locked': 'Story use locked',
  'future-locked': 'Not yet available',
};

function ArtRow({ art }: { art: TeahouseArt }) {
  const status = art.status && art.status !== 'active' ? ART_STATUS_LABEL[art.status] : '';
  return (
    <div className={`teahouse-art teahouse-art--${art.status || 'active'}`}>
      <div className="teahouse-art__head">
        <strong>{art.name}</strong>
        <span className="teahouse-art__tier">{art.tier}</span>
        {status ? <span className={`teahouse-art__flag teahouse-art__flag--${art.status}`}>{status}</span> : null}
      </div>
      <p>{art.summary}</p>
    </div>
  );
}

export function TeahousePage() {
  return (
    <section>
      <PageHeader
        eyebrow="Beneath the Crooked Sign · Five years later"
        title="The Quaint Teahouse"
        description="The covert relief guild growing beneath Second Spring Tea House — its Orchid hierarchy, the people who run it, and their five-year abilities."
      />

      <p className="teahouse-spoiler" role="note">⚠ {spoilerNotice}</p>

      <section className="teahouse-identity">
        <div className="teahouse-identity__names">
          <span className="eyebrow">Public front</span>
          <strong>{teahouseIdentity.publicName}</strong>
          <span className="eyebrow">Covert guild</span>
          <strong className="teahouse-identity__covert">{teahouseIdentity.covertName}</strong>
        </div>
        <p className="teahouse-identity__tagline">“{teahouseIdentity.tagline}”</p>
        <p>{teahouseIdentity.summary}</p>
        <p className="teahouse-identity__quiet"><span className="eyebrow">The Quiet Hand</span>{teahouseIdentity.quietHand}</p>
      </section>

      <h3 className="teahouse-section-title">The Orchid — senior hierarchy</h3>
      <div className="teahouse-members">
        {orchidHierarchy.map((member, index) => (
          <details className="teahouse-member" key={member.key} open={index < 2}>
            <summary>
              <div className="teahouse-member__portrait">
                {characterImageMap[member.key]
                  ? <img alt={`${member.name} portrait`} src={characterImageMap[member.key]} />
                  : <span aria-label={`${member.name} portrait to be added`} className="teahouse-member__portrait-placeholder">{member.name.slice(0, 1)}</span>}
              </div>
              <div className="teahouse-member__seat">{member.seat}</div>
              <div className="teahouse-member__id">
                <strong>{member.name}</strong>
                <span>{member.role}</span>
              </div>
              <b aria-hidden="true">⌄</b>
            </summary>
            <div className="teahouse-member__body">
              <p className="teahouse-member__cultivation"><span className="eyebrow">Cultivation</span>{member.cultivation}</p>
              <p className="teahouse-member__background">{member.background}</p>
              {member.arts?.length ? (
                <div className="teahouse-member__arts">
                  <p className="eyebrow">{member.skillsHeading || 'Signature arts'}</p>
                  {member.arts.map((art) => <ArtRow art={art} key={art.name} />)}
                </div>
              ) : null}
              {member.skills?.length ? (
                <ul className="teahouse-member__notes">
                  {member.skills.map((line) => <li key={line}>{line}</li>)}
                </ul>
              ) : null}
            </div>
          </details>
        ))}
      </div>

      <h3 className="teahouse-section-title">The original twelve apprentices</h3>
      <p className="teahouse-subnote">Rhen’s first Year One students. Ten became the founding Quiet Hand cell captains; two lead the guild’s civilian branches.</p>
      <div className="teahouse-apprentices">
        {originalApprentices.map((apprentice) => (
          <article className="teahouse-apprentice" key={apprentice.name}>
            <div className="teahouse-apprentice__head"><strong>{apprentice.name}</strong><span>{apprentice.position}</span></div>
            <p>{apprentice.specialty}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
