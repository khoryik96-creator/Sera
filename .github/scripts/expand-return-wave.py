from pathlib import Path
import re

part2_path = Path('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_2.md')
part3_path = Path('docs/prose/FINAL_ARC_SEASON109_PROSE_DRAFT_3.md')
test_path = Path('test/petalsMonarchReturn.test.ts')

part2 = part2_path.read_text()
part3 = part3_path.read_text()
test = test_path.read_text()

# 1) Turn the first recognition into a message physically moving through the Wuyue rear.
anchor = '''“Now they're falling on our side.”\n\nPetals Monarch.\n\nThe words moved without a courier.\n'''
insert = '''“Now they're falling on our side.”\n\nPetals Monarch.\n\nA Wuyue runner came around the hospital corner at speed and nearly collided with the stretcher team.\n\n“What happened?”\n\nThe stretcher bearer pointed at the petal on his spear.\n\nThe runner stopped.\n\nFor one heartbeat he simply stared.\n\nThen he grabbed the nearest orderly by both shoulders.\n\n“West reserve.”\n\nThe orderly blinked.\n\n“What?”\n\n“Go to west reserve. Tell them the Petals Monarch is back.”\n\nThe orderly looked at the petal.\n\n“Confirmed?”\n\nThe runner almost laughed.\n\n“Look at the sky.”\n\nThe orderly ran.\n\nThe runner turned to the next road.\n\n“North hospital!” he shouted. “Pass it!”\n\nSomeone farther away answered without knowing why yet.\n\n“Pass what?”\n\nThe reply came from three voices at once.\n\n“PETALS MONARCH IS BACK!”\n\nThe words moved without a courier.\n'''
assert anchor in part2, 'first recognition anchor missing'
part2 = part2.replace(anchor, insert, 1)

# 2) Make the news propagate through camp like living battlefield rumor, with the six-month payoff.
anchor = '''“Now I think Shinsei should be worried.”\n\nThat was when the first Isgard weapon struck frozen earth.\n\nThey did not need an explanation now.\n'''
insert = '''“Now I think Shinsei should be worried.”\n\nA Wuyue pikeman on the neighboring road heard him and barked a laugh.\n\n“They had six months.”\n\nHis partner looked over.\n\n“Six months for what?”\n\n“To beat us before he woke up.”\n\nThe partner looked toward the falling petals.\n\n“They didn't.”\n\n“No.”\n\nThe pikeman's grin widened.\n\n“That's their problem now.”\n\nA messenger came sprinting between the two formations.\n\n“Command confirmation!”\n\nHeads turned.\n\nThe messenger did not slow.\n\n“PETALS MONARCH IS BACK! PASS IT TO EVERY LINE!”\n\nA Wuyue soldier cupped both hands around his mouth.\n\n“EAST LINE!”\n\nAnother voice answered from beyond the wagons.\n\n“WE HEARD!”\n\n“THEN TELL THE NORTH!”\n\n“THE NORTH ALREADY KNOWS!”\n\nLaughter broke out.\n\nIt had been weeks since that sound had traveled farther than one campfire.\n\nAn Isgard officer tried to restore order and failed because he was smiling too.\n\n“Stop shouting and get into formation!”\n\nA soldier called back, “Which part?”\n\n“The formation part!”\n\n“Can we keep the shouting?”\n\nThe officer looked at the petals.\n\n“Yes.”\n\nThat was when the first Isgard weapon struck frozen earth.\n\nThey did not need an explanation now.\n'''
assert anchor in part2, 'camp wave anchor missing'
part2 = part2.replace(anchor, insert, 1)

# 3) Let the cheering reach frontline units and make the swagger feel earned, not narrated.
anchor = '''Banners that had hung limp in the evening cold were lifted higher.\n\nA stretcher patient heard the title and started laughing until his ribs hurt badly enough for the medic to threaten him.\n'''
insert = '''Banners that had hung limp in the evening cold were lifted higher.\n\nAt a forward rest trench, a Wuyue corporal came running down the line without his helmet.\n\n“Up.”\n\nNobody moved.\n\nOne exhausted soldier looked at him from beneath a blanket.\n\n“We rotate in an hour.”\n\n“Not for rotation.”\n\nThe corporal pointed south.\n\n“He's back.”\n\nSilence.\n\nThen somebody asked the only question that mattered.\n\n“Who?”\n\nThe corporal stared at him.\n\nA frost-white petal drifted into the trench between them.\n\nNobody needed the answer anymore.\n\nOne man stood.\n\nThen another.\n\nA third soldier started laughing.\n\n“Six months they kept telling us Wuyue had no answer left.”\n\nThe corporal picked up his helmet.\n\n“We had an answer.”\n\nHe looked at the petal.\n\n“He was asleep.”\n\nAcross the trench, an Isgard sergeant heard that and shook his head.\n\n“You people are unbearable.”\n\nThe Wuyue soldier grinned.\n\n“You're smiling.”\n\n“I'm allowed one mistake.”\n\n“Make it two. Say the title.”\n\nThe sergeant looked north toward Shinsei's lines.\n\nThen he said it loud enough for both armies to hear.\n\n“PETALS MONARCH!”\n\nThe trench answered him.\n\nA stretcher patient heard the title and started laughing until his ribs hurt badly enough for the medic to threaten him.\n'''
assert anchor in part2, 'front trench anchor missing'
part2 = part2.replace(anchor, insert, 1)

# 4) Deepen Shinsei POV: the frightening thing is not only the man, but the enemy army becoming alive again.
anchor = '''The lieutenant's patience broke.\n\n“Then what exactly do we know?”\n\nThe roar crossed the valley again.\n\n**PETALS MONARCH.**\n\nThe veteran closed the file.\n\n“He's here.”\n\nAcross the northern line, Shinsei signal flags changed.\n'''
insert = '''The lieutenant's patience broke.\n\n“Then what exactly do we know?”\n\nThe roar crossed the valley again.\n\n**PETALS MONARCH.**\n\nA second Shinsei scout looked toward the allied trenches through a long glass.\n\n“They're passing it down every line.”\n\nThe lieutenant took the glass.\n\nWuyue runners were moving between positions. Isgard soldiers were striking spear shafts into the ground. Men who had spent the previous week sitting whenever they were not ordered to stand were standing without orders now.\n\n“They were exhausted yesterday.”\n\n“They're exhausted today.”\n\n“Then why do they look like that?”\n\nThe veteran closed the file.\n\n“Because yesterday they thought they had to survive us.”\n\nHe looked toward the petals.\n\n“Today they think we have to survive him.”\n\nThe junior lieutenant said nothing.\n\nA cheer rolled across the valley again, clearer this time.\n\n**PETALS MONARCH IS BACK.**\n\nThe scout swallowed.\n\n“He's here.”\n\nAcross the northern line, Shinsei signal flags changed.\n'''
assert anchor in part2, 'Shinsei first POV anchor missing'
part2 = part2.replace(anchor, insert, 1)

# 5) Make Sanctuary produce another contagious round of soldier talk rather than a single cheer.
anchor = '''The shield line came up as one.\n\nAcross the road, an Isgard veteran stared into the petal-filled sky.\n'''
insert = '''The shield line came up as one.\n\nA runner reached the next Wuyue company already out of breath.\n\n“Petals Monarch is back!”\n\nA soldier under a bandaged brow shouted back, “You're late!”\n\nThe runner stopped.\n\n“What?”\n\n“We've got eyes!”\n\nThe whole company laughed.\n\nAnother man slapped the runner on the shoulder.\n\n“Keep going. Tell the ones who don't.”\n\n“Everyone knows!”\n\n“Then tell them again.”\n\nThe runner grinned and took off.\n\n“PETALS MONARCH IS BACK!”\n\nAcross the road, an Isgard veteran stared into the petal-filled sky.\n'''
assert anchor in part2, 'Sanctuary runner anchor missing'
part2 = part2.replace(anchor, insert, 1)

# 6) Let Shinsei rank-and-file react to the morale reversal, not just command staff.
anchor = '''The captain watched frost-white petals turn the allied sky pale.\n\n“Exact wording.”\n\nHe waited until the officer was ready.\n\n“THE PETALS MONARCH IS ACTIVE.”\n\nThe brush stopped for half a heartbeat.\n'''
insert = '''The captain watched frost-white petals turn the allied sky pale.\n\nBelow the observation post, two Shinsei infantrymen were listening to the allied noise.\n\nOne muttered, “They sound different.”\n\nThe other kept his eyes on the distant shields.\n\n“They are different.”\n\n“They were breaking.”\n\n“They were bending.”\n\n“What's the difference?”\n\nThe second soldier looked up at thirty miles of winter.\n\n“That.”\n\nThe captain heard them.\n\nHe did not correct either man.\n\n“Exact wording.”\n\nHe waited until the officer was ready.\n\n“THE PETALS MONARCH IS ACTIVE.”\n\nThe brush stopped for half a heartbeat.\n'''
assert anchor in part2, 'Shinsei Sanctuary POV anchor missing'
part2 = part2.replace(anchor, insert, 1)

# 7) Chapter 449: let ordinary Isgard soldiers keep talking about the impossible fact that he came back for them too.
anchor = '''The man who ended Isgard's last war had returned to Isgard by healing it.\n\nThen Aldric Veyrhald woke angry.\n'''
insert = '''The man who ended Isgard's last war had returned to Isgard by healing it.\n\nAt a mess line two streets away, a young Isgard soldier asked the question for the fourth time that morning.\n\n“That's really him?”\n\nThe cook did not look up.\n\n“Yes.”\n\n“The actual Petals Monarch?”\n\n“Yes.”\n\n“The one from the last war?”\n\nThe cook put down the ladle.\n\n“Boy, if you ask me again, I am putting you back in the hospital.”\n\nThe soldier accepted his bowl.\n\n“I just keep expecting somebody to say the rumor was wrong.”\n\nA Wuyue veteran behind him snorted.\n\n“First time?”\n\nThe Isgard soldier turned.\n\n“Seeing him? Yes.”\n\n“You get used to the face.”\n\n“What about the rest?”\n\nThe veteran looked up at the Sanctuary.\n\n“No.”\n\nSomeone farther down the queue called, “Is he really as strong as they say?”\n\nThe Wuyue veteran answered without raising his voice.\n\n“No.”\n\nThe queue went quiet.\n\nHe took his bowl from the cook.\n\n“He's worse.”\n\nThe quiet lasted one heartbeat.\n\nThen half the line started talking at once.\n\n“Worse how?”\n\n“What does that mean?”\n\n“Did you actually see him fight?”\n\n“Was the mountain story true?”\n\n“Which mountain story?”\n\n“There are several?”\n\nThe Wuyue veteran closed his eyes.\n\nThe cook started laughing.\n\nFor the first time in months, the loudest thing in that street was not a casualty cart.\n\nThen Aldric Veyrhald woke angry.\n'''
assert anchor in part3, 'Chapter 449 living camp anchor missing'
part3 = part3.replace(anchor, insert, 1)

# Regression locks for the desired emotional function.
needle = '''    expect(part2).toContain('Shinsei heard it too.');\n'''
replacement = '''    expect(part2).toContain('Shinsei heard it too.');\n    expect(part2).toContain('PETALS MONARCH IS BACK!');\n    expect(part2).toContain('To beat us before he woke up.');\n    expect(part2).toContain('Today they think we have to survive him.');\n'''
assert needle in test, 'test anchor missing'
test = test.replace(needle, replacement, 1)

part2_path.write_text(part2)
part3_path.write_text(part3)
test_path.write_text(test)
