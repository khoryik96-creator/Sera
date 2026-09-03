from pathlib import Path

outline = Path('docs/FINAL_ARC_OUTLINE.md')
power = Path('docs/FINAL_ARC_POWER_OPTIONS.md')

for p in (outline, power):
    text = p.read_text(encoding='utf-8')
    text = text.replace('Horizon Cage Dominion', 'Iron Chain Dominion')
    p.write_text(text, encoding='utf-8')

text = power.read_text(encoding='utf-8')
start = text.index('### 3.1 Tae Muyeon — **Iron Chain Dominion**')
end = text.index('\n---\n\n### 3.2 Qin Luo', start)
new = '''### 3.1 Tae Muyeon — **Iron Chain Dominion**

**Core identity:** every meaningful hostile action inside Tae's Domain forges additional iron-qi chains onto the person who performed it.

- Movement creates chains.
- Attacking creates chains.
- Dodging, rushing, forceful repositioning or other committed combat actions create chains.
- Heavy internal-energy releases create thicker and heavier chains than small movements because more force has been committed.
- The chains bind to the opponent's body and martial circulation as compressed iron qi; they are not summoned metal and they are not magical restraints.
- One or two actions are manageable. The danger is accumulation.
- The longer an enemy fights, the more chains are forged around them.
- Every additional chain increases physical weight, drag and resistance, making later movement and technique execution more exhausting.
- Strong opponents may break individual chains with force or qi, but breaking them also costs energy and does not erase the Domain's rule: the next action simply forges more chains.
- Repeated attempts to escape therefore become a contest of endurance that Tae is specifically built to win.
- As the total chain burden rises, the enemy's stance slows, limbs become harder to accelerate, breathing and circulation become more expensive, and techniques require progressively more qi to complete.
- At extreme accumulation, the compressed iron burden can press through the body strongly enough to bruise or disrupt meridians, but meridian damage is a late-stage consequence of sustained iron pressure rather than the Domain's primary function.
- Standing still or acting with extreme restraint slows the rate of accumulation, but gives Tae control of the pace and initiative.
- Tae can maintain chains on multiple enemies, though the total number and strength of targets raises his own qi burden.

**Combat identity:** every action the enemy takes makes the next action heavier. Fighting harder does not free them; it gradually chains them into exhaustion.
'''
text = text[:start] + new + text[end:]

# Update any short baseline summaries that still describe the old prison mechanic.
text = text.replace('Enemy committed movement forges their own iron-qi cage.', 'Every meaningful hostile action forges additional iron-qi chains onto its user.')
text = text.replace('Breaking out wears them down; every breakout rebuilds the cage **denser and smaller**.', 'Movement, attacks, dodges and committed qi releases add more chains; breaking chains costs energy but does not stop new chains from forming.')
text = text.replace('Repeated compression eventually bruises/disrupts/damages meridians as a physical consequence of the shrinking iron prison.', 'Accumulated chain weight progressively wears the enemy down and can eventually bruise/disrupt meridians through sustained iron pressure.')
power.write_text(text, encoding='utf-8')

# Basic locks.
assert 'Horizon Cage Dominion' not in outline.read_text(encoding='utf-8')
assert 'Horizon Cage Dominion' not in power.read_text(encoding='utf-8')
assert 'Iron Chain Dominion' in outline.read_text(encoding='utf-8')
assert 'Iron Chain Dominion' in power.read_text(encoding='utf-8')
assert outline.read_text(encoding='utf-8').count('### Chapter ') == 200
