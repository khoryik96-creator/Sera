import '../styles/characters-v2.css';
import { CharactersPage as CharactersView } from '../features/characters/CharactersPage';
import { withReactData } from './withReactData';

export const CharactersPage = withReactData(CharactersView, ['legends', 'seasonCast']);
