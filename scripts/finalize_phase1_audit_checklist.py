from pathlib import Path

p = Path('docs/FINAL_ARC_PHASE1_FINAL_AUDIT_CHECKLIST.md')
text = p.read_text(encoding='utf-8')

replacements = {
    '- [ ] Three-way Domain overlap in Sera\'s Phase II fight must receive a real physical/qi rules payoff rather than generic "three auras collide" prose.': '- [x] **Phase II map fixed:** Chapter 428 now defines simultaneous Domains as coexisting battlefield rules unless an art explicitly disrupts another; Orchid / Crimson Crucible / Crownless overlap physically rather than becoming generic aura collision.',
    '## Remaining Phase I work before integration can be called final': '## Phase I implementation status',
    '- [ ] Fold Seven Bridges insert into Ch316.': '- [x] Seven Bridges integrated into Ch316.',
    '- [ ] Correct Ch319 five-week contradiction.': '- [x] Ch319 five-week contradiction corrected.',
    '- [ ] Reword Ch331 as start/inside of the third month rather than three completed months.': '- [x] Ch331 reworded as the third month rather than three completed months.',
    '- [ ] Fold private Luo line into Ch335 **and outbound packet**.': '- [x] Private Luo line integrated into Ch335 **and copied into the outbound packet**.',
    '- [ ] Fold Yurushi information-boundary insert into Ch349.': '- [x] Yurushi information-boundary scene integrated into Ch349.',
    '- [ ] Fold hostile-window domestic insert into Ch353.': '- [x] Hostile-window domestic scene integrated into Ch353.',
    '- [ ] Final read for chapter-length/pacing after inserts; do not pad.': '- [x] Final audit read completed after inserts; additions remain short scene payoffs rather than padding.',
    'Once those items are integrated, **Phase I itself has no unresolved structural gap**. The remaining critical work is the Phase II seam and later payoffs listed above.': '**Phase I itself now has no unresolved structural gap from this audit.** The Phase II seam and later legend/domain/payoff requirements are corrected at map level and remain obligations for the still-unwritten Seasons 101–108 prose.'
}
for old, new in replacements.items():
    if old not in text:
        raise RuntimeError(f'Missing checklist anchor: {old}')
    text = text.replace(old, new, 1)

p.write_text(text, encoding='utf-8')
Path('scripts/finalize_phase1_audit_checklist.py').unlink(missing_ok=True)
Path('.github/workflows/finalize-phase1-audit-checklist.yml').unlink(missing_ok=True)
print('Checklist finalized')
