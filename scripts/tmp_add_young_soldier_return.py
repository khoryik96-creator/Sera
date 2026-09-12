from pathlib import Path
import re

prose_path = Path('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md')
text = prose_path.read_text()
anchor = 'Her hand tightened around the hilt at her hip.\n\n“For yourself. You don\'t sit through this.”\n\nAn Isgard veteran heard them.'
insert = '''Her hand tightened around the hilt at her hip.\n\n“For yourself. You don't sit through this.”\n\nOne of the youngest Wuyue soldiers leaned around the wagon and finally found the man coming down from the ridge.\n\nFaded dark-green coat.\n\nBlack hair moving in the cold.\n\nNo banner.\n\nNo escort.\n\nOnly frozen petals.\n\nThe recruit stared.\n\n“Who is that?”\n\nThe Silver Horizon veteran turned to him.\n\nFor weeks, the young soldier had known her as a woman who rationed words, sleep and smiles with equal cruelty.\n\nNow her face split into the first real grin he had ever seen on her.\n\nNot relief.\n\nExcitement.\n\n“Boy.”\n\nThe recruit blinked.\n\n“What?”\n\n“You joined this army at a very good time.”\n\nHe looked from her to the lone man on the ridge.\n\n“Why?”\n\nThe veteran drew her sword.\n\n“Because that's the Petals Monarch.”\n\nThe recruit froze.\n\n“The one from the stories?”\n\nThe veteran laughed.\n\n“No. The one the stories couldn't keep up with.”\n\nShe rested the sword against her shoulder and looked north, toward Shinsei.\n\n“Boy...”\n\nHer grin widened.\n\n“We are in for a ride.”\n\nAn Isgard veteran heard them.'''
if anchor not in text:
    raise SystemExit('prose anchor not found')
text = text.replace(anchor, insert, 1)
prose_path.write_text(text)

test_path = Path('test/petalsMonarchReturn.test.ts')
test = test_path.read_text()
test_anchor = "    expect(part2).toContain('To beat us before he woke up.');\n"
extra = "    expect(part2).toContain('Who is that?');\n    expect(part2).toContain(\"Because that's the Petals Monarch.\");\n    expect(part2).toContain('We are in for a ride.');\n"
if test_anchor not in test:
    raise SystemExit('test anchor not found')
test = test.replace(test_anchor, test_anchor + extra, 1)
test_path.write_text(test)
