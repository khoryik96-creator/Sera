// The Quaint Teahouse — five-years-later ("Beneath the Crooked Sign") reference.
//
// This is continuation / post-epilogue material sourced from the locked story
// skeleton (docs/STORY_SKELETON_LOCK.md, sections 3 and 4). It is future state
// relative to the original seasons 1-64 story. Seasons 65-84 now dramatize this
// development in complete first-draft prose. Only
// facts the skeleton states are included;
// undefined ability details are marked "TBD", story-locked techniques are marked
// as such, and no new techniques or mechanics are invented here.

export type ArtStatus = 'active' | 'details-tbd' | 'story-locked' | 'future-locked';

export interface TeahouseArt {
  name: string;
  tier: string;
  summary: string;
  status?: ArtStatus;
  note?: string;
}

export interface TeahouseMember {
  key: string;
  name: string;
  role: string;
  seat: string;
  cultivation: string;
  background: string;
  skillsHeading?: string;
  arts?: TeahouseArt[];
  skills?: string[];
}

export interface ApprenticeEntry {
  name: string;
  position: string;
  specialty: string;
}

export const teahouseIdentity = {
  publicName: 'Second Spring Tea House',
  covertName: 'The Quaint Teahouse',
  arc: 'Beneath the Crooked Sign',
  timeframe: 'Five years after the epilogue',
  tagline: 'Help people without returning to public martial rule.',
  summary:
    'Second Spring Tea House remains Rhen and Sera’s public home and ordinary business. Beneath it grows a covert relief guild — The Quaint Teahouse — built from the same desire to protect civilians, preserve medical access and prevent concealed disasters. It does not rule territory, replace governments, seek recognition, or intervene in ranking disputes. Its senior hierarchy is shaped like an orchid rather than a ranking board, and through the end of Year Five its existence remains unknown to the Top Ten.',
  quietHand:
    'The Quiet Hand is the guild’s ~200-person hidden force. Its founding cells are led by ten of Rhen’s original twelve apprentices — Peak Marquis-class by Year Five, drawn from healers rather than assassins, with authority rooted in judgment and restraint rather than raw strength.',
};

export const spoilerNotice =
  'Continuation spoilers. This tab covers the five-years-later "Beneath the Crooked Sign" state. Seasons 65–84 now contain the complete first-draft prose for the five-year arc and the northern continuation.';

// The senior hierarchy — the "Orchid": Two Inner Petals, Three Sepals, Hidden Petal.
export const orchidHierarchy: TeahouseMember[] = [
  {
    key: 'sera',
    name: 'Sera',
    role: 'First Inner Petal — absolute leader, sole authority over lethal force',
    seat: 'Inner Petal',
    cultivation: 'Peak Sovereign — approaching Paragon',
    background:
      'The retired Pale Orchid covertly leads The Quaint Teahouse. Five years of training, martial refinement and the continuous strengthening of Rhen’s passive carried her completely past the old Duke boundary into the new Sovereign level, already near its upper end. She is considerably stronger than each of the Sovereign-level Top Three individually and can defeat Kael, Liang Yue and Jin Seoryu together — though their combined specializations force a serious fight. Her cultivation is permanently hers, and five uninterrupted years of passive refinement have completed her meridian reconstruction, permanently stopping her biological aging even after she asks Rhen to withdraw the barrier so she can protect herself through her own system. She remains aeons beneath Rhen.',
    skillsHeading: 'Five-year Orchid system',
    arts: [
      { name: 'Veiled Moon', tier: 'Transcended Passive', summary: 'Presence permanently synchronized with the environment: breath, footsteps, qi leakage and killing intent are suppressed automatically and hostile perception cannot hold a stable lock, striking a false position beside her true one. She chooses who may perceive her normally; it stays active while she attacks. Not invisibility or a barrier — it protects only through concealment and false positioning.' },
      { name: 'Orchid Shadow Steps', tier: 'Transcended', summary: 'Redirects repeatedly in mid-air through microscopic qi bursts with no readable preparation, reversing after an enemy commits; each step opens several equally plausible continuation paths. Still qinggong, not teleportation.' },
      { name: 'Seven Petals, One Breath', tier: 'Transcended', summary: 'Within one circulation cycle, seven strikes against seven functions — balance, grip, breath, vision, meridian flow, defensive circulation and conscious movement — against one target or divided among several, with the remaining sequence adaptable after any strike.' },
      { name: 'Fading Fragrance', tier: 'Transcended', summary: 'Layered combination poison, harmless until combined inside the target and accelerated by the enemy’s own circulation; forcefully purging one layer can trigger another. Still poison, and Rhen remains wholly immune.' },
      { name: 'Orchid Behind the Mirror', tier: 'Transcended', summary: 'Aligns every readable signal — gaze, tension, footing, breath, qi, killing intent, weapon line — behind a deliberately false future, so an opponent who reads her correctly still reaches the wrong conclusion. Manipulation of real information, not illusion.' },
      { name: 'Pale Veil Funeral', tier: 'Supreme', summary: 'Her multi-target art, now advanced to Supreme and constructible during an active battle: every movement seeds a threat and every enemy reaction prepares another’s defeat. It does not guarantee every Sovereign-level opponent dies; maximum targets and resistance rules are TBD.', status: 'details-tbd' },
      { name: 'The Orchid Blooms Only Once', tier: 'Evolved Supreme', summary: 'Her highest, most personal art: she engineers one perfect, decisive instant and owns it completely, now built during combat rather than prepared in advance. Story reveal is locked until the user approves it.', status: 'story-locked' },
      { name: 'Orchid Dominion', tier: 'Supreme Domain Skill (future)', summary: 'Her future Paragon domain — a one-mile battlefield of pale orchid petals governed by Counter-Bloom. Every hostile offensive commitment exposes a point the attacker has stopped defending; a bloom opens there and Sera chooses the counter that emerges from the opening itself — needle, disabling strike, poison, circulation-severing touch, false attack or concentrated Domain force. The stronger and more complete the attack, the more complete its bloom, while movement, defence, retreat or healing that carries no hostile offensive commitment triggers nothing, and allies and civilians never trigger a bloom unless they aim hostile offence at Sera or someone under the Domain’s protection. It does not suppress cultivation by a fixed amount — its terror is the forced choice between attacking at full power into a stronger counter or entering battle already diminished by restraint — and it continuously presents enemy commitments as one offensive battlefield map. Locked: Sera has not reached Paragon.', status: 'future-locked' },
    ],
    skills: ['Whispering Orchid Needles, Petal-Severing Touch and Silken Grave remain named techniques — now executed with Sovereign-level cultivation, precision and speed.'],
  },
  {
    key: 'qin',
    name: 'Qin Luo',
    role: 'Second Inner Petal — operational deputy and second-in-command',
    seat: 'Inner Petal',
    cultivation: 'Sovereign — comparable overall to Liang Yue',
    background:
      'The blind former World #6 arrived at the tea house in Year One near death. Rhen’s evolved healing repaired his destroyed highest vibration meridians and stabilized his circulation; his blindness is congenital and is not treated as a defect to be corrected. As the only person besides Sera to receive prolonged refinement from Frozen Petals Garden’s ordinary one-mile field, five years of restored cultivation carried him into Sovereign level. He handles medicinal cultivation, diagnosis, apprentice training, base security and vibration-based monitoring.',
    skillsHeading: 'Resonance arts',
    arts: [
      { name: 'Listening Through Stone', tier: 'Transcended Passive', summary: 'Continuously reads vibration through floors, walls, weapons, rain and air pressure, turning movement into a three-dimensional map and distinguishing heartbeats, circulation rhythms and concealed breathing. Perfectly motionless targets and vibration-erasing techniques may partially resist it. It gives a different perception system, not sight.' },
      { name: 'Wuyin Hums', tier: 'Transcended Evolution', summary: 'Identifies the resonant structure of weapons, barriers and meridian systems through contact and changes its vibration mid-exchange, so a blade may pass harmlessly across one object before turning destructive against the next; repeated contact makes him increasingly accurate.' },
    ],
  },
  {
    key: 'tae',
    name: 'Tae Muyeon',
    role: 'Senior Sepal — third-in-command; one of the two Offensive Generals',
    seat: 'Sepal',
    cultivation: 'High Sovereign — the "Iron Horizon Sovereign"; a public Co-#1',
    background:
      'Discovered close to death from an unknown poison and healed by the guild, Tae recovered through a sustained probationary period — treating the work seriously, helping clinics and training apprentices — before Sera formally appointed him Senior Sepal and third-in-command in early Year Four. He holds organizational seniority over the second Offensive General and does not receive Rhen’s passive.',
  },
  {
    key: 'huo',
    name: 'Huo Wujin',
    role: 'Sepal — the second Offensive General',
    seat: 'Sepal',
    cultivation: 'High Sovereign — same cultivation tier as Tae Muyeon',
    background:
      'Joins during Year Three, in the same period as Tae’s recovery and recruitment. He carries equal cultivation and, once Sera approves an offensive deployment, equal battlefield authority to Tae — but no equivalent administrative seniority. He does not receive Rhen’s passive.',
  },
  {
    key: 'lu',
    name: 'Lu Weiran',
    role: 'Sepal — Chief Steward and operational-network Sepal',
    seat: 'Sepal',
    cultivation: 'Non-martial — no meaningful combat reputation',
    background:
      'A non-martial logistics talent recruited for judgment rather than strength. As Chief Steward he controls deployment preparation, stores, couriers, intelligence routing and emergency extraction, remaining beneath Sera, Qin and Tae in command. While mapping abandoned supply routes he discovered a vast concealed cave near the summit of Cloudrest Mountain that becomes the guild’s hidden base. Formally appointed to the third Sepal seat in early Year Four, completing the Three Sepals.',
  },
  {
    key: 'rhen',
    name: 'Rhen',
    role: 'Hidden Petal — healing teacher, physician and medicinal farmer; holds no command',
    seat: 'Hidden Petal',
    cultivation: 'Unranked — beyond meaningful classification; his current strength cannot be measured',
    background:
      'Rhen supports the guild’s healing work but directs none of its interventions. Over the five-year withdrawal his internal energy has grown vastly denser and continuously regenerates — an effectively unending reservoir — and every named non-Ultimate technique has reached Supreme level. Frozen Petals Garden has reconstructed his meridian foundation into a self-sustaining ageless state, so he no longer biologically ages. The Petal Monarch is now closer to myth than to an active public figure, and his true five-year growth is largely unknown to the outside world. He remains Unranked and immeasurable, and is not forced into the public cultivation hierarchy.',
    skillsHeading: 'Ten five-year skills (nine Supreme/Transcended + the Ultimate)',
    arts: [
      { name: 'Frozen Petals Garden', tier: 'Evolved Supreme Passive', summary: 'The evolved passive: ageless self-sustaining meridian foundation, functionally limitless regenerating energy, automatic and absolute poison neutralization, distance-independent protection extended to Sera through their bond, and a divine-sense-like awareness that detects invisible/concealed attacks, killing intent, traps and hidden danger. An optional two-mile hostile field can drain enemy energy and cut enemy movement speed by 50%. Exact detection ranges and drain rates are TBD.', status: 'details-tbd' },
      { name: 'Drifting Petals', tier: 'Supreme (Movement)', summary: 'The merged evolution of Falling Petal Step and Ten Thousand Li Beneath One Step. Travels far, and afterward Rhen can remain invisible indefinitely until he chooses to reveal himself — and may carry one other person, keeping them invisible too. Maximum distance and whether more than one passenger is possible are TBD.', status: 'details-tbd' },
      { name: 'One Petal Severs the Winter Moon', tier: 'Supreme', summary: 'Consolidates the dependency-severing lineage (One Petal, One Petal Before Dawn, Winter Moon Severance): he perceives a martial structure as a web of relationships, finds the single dependency that keeps it functioning and severs that relationship precisely — making an overwhelming structure fail rather than overpowering it. Expanded range and target limits are TBD.', status: 'details-tbd' },
      { name: 'Sanctuary of Petals', tier: 'Supreme (Healing / Protection)', summary: 'The healing art’s permanent evolution (Spring After Snow → Heaven’s Return → Sanctuary of Petals). Its indestructible hemispheric sanctuary can expand to a 20-mile radius and heal up to 10,000 people at once, retaining extreme healing, poison cleansing, internal-energy restoration and reinforcement of healed targets.' },
      { name: 'Moonless Snowfield', tier: 'Supreme', summary: 'The five-year evolution of Silent Winter into a complete battlefield perception-and-control field: Rhen reads motion, qi, intent, terrain and structural dependency as one connected field while enemies lose sensory and spatial clarity. It freezes the blood of enemies and locks their movement, and no longer needs a weapon. Radius, duration and selection rules are TBD.', status: 'details-tbd' },
      { name: 'Winter Ends, Spring Blossoms', tier: 'Supreme', summary: 'A restoration / natural-law art (from Winter Mirror, Empty Spring and Autumn Without End): distorted, borrowed, prolonged or artificially maintained martial states are pushed back toward the natural course they should follow. It does not heal enemies, resurrect the dead or rewrite reality. Combat limits are TBD.', status: 'details-tbd' },
      { name: 'Petal Convergence', tier: 'Transcended', summary: 'Thousands of frozen petals scattered through the space converge on one selected point from every direction at once; avoiding one trajectory moves the target into countless others. He can concentrate them on one enemy or divide them among several, and control the force to incapacitate rather than kill. Maximum petal count and range are TBD.', status: 'details-tbd' },
      { name: 'Meridian Bloom', tier: 'Transcended', summary: 'A frozen petal that touches an enemy leaves a luminous pattern that splits their own internal-energy circulation into conflicting currents — every attempt to circulate more power intensifies the disruption. It is not poison, theft or dependency-severance; Rhen can release it before permanent damage and mark several enemies independently. Duration and range are TBD.', status: 'details-tbd' },
      { name: 'Petals in Stasis', tier: 'Supreme', summary: 'His causal-stasis art, distinct from the Ultimate; its stasis identity is unchanged and its exact additional five-year upgrades are TBD.', status: 'details-tbd' },
      { name: 'Petals Beneath a Frozen Moon', tier: 'Ultimate', summary: 'Resolves hostile possibilities into one peaceful, inevitable ending beneath a moon. Once invoked it cannot be interrupted; it can reach a 50-mile radius, strike all or only selected enemies, and heals and restores allies. Its graceful character is preserved even at catastrophic scale. Story use is locked — it may exist in reference only, never used in the continuation without direct user approval.', status: 'story-locked' },
    ],
  },
];

// Rhen's original twelve Year One apprentices: ten founding Quiet Hand cell
// captains plus two senior civilian specialists.
export const originalApprentices: ApprenticeEntry[] = [
  { name: 'Han Mira', position: 'Captain, Cell One', specialty: 'The first apprentice — calm during mass casualties, exceptional at evacuation command.' },
  { name: 'Chen Wulian', position: 'Captain, Cell Two', specialty: 'Blunt and relentless; the strongest formation-breaker among the originals.' },
  { name: 'Seo Dabin', position: 'Captain, Cell Three', specialty: 'A dry-humoured physician and poison analyst who challenges a diagnosis before accepting it.' },
  { name: 'Lin Tao', position: 'Captain, Cell Four', specialty: 'Quiet and meticulous; excels at scouting, observation and reading changes in familiar terrain.' },
  { name: 'Mei Rulan', position: 'Captain, Cell Five', specialty: 'Playful but disciplined; disguise, infiltration and reading human behaviour.' },
  { name: 'Gu Seongho', position: 'Captain, Cell Six', specialty: 'Protective and resilient; rear-guard defence and extracting the wounded.' },
  { name: 'Bai Nari', position: 'Captain, Cell Seven', specialty: 'Fast-thinking; codes, signals and battlefield communication.' },
  { name: 'Ren Shuo', position: 'Captain, Cell Eight', specialty: 'Inventive and mechanical; nonlethal traps, field shelters and escape routes.' },
  { name: 'Yeo Hwan', position: 'Captain, Cell Nine', specialty: 'Compassionate but unshakable; the strongest field surgeon among the captains.' },
  { name: 'Tang Lumei', position: 'Captain, Cell Ten', specialty: 'Reserved and analytical; the strongest pure strategist beneath Sera and Jin.' },
  { name: 'Jiang Fen', position: 'Director of Regional Clinics', specialty: 'Refuses covert combat leadership and builds the distributed civilian treatment network.' },
  { name: 'Oh Minseok', position: 'Director of Medicinal Cultivation', specialty: 'Limited martial talent; responsible for farms, seed preservation and medicine quality.' },
];
