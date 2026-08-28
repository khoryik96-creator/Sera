import '../styles/overview.css';
import '../styles/progress.css';
import { OverviewPage as OverviewView } from '../features/overview/OverviewPage';
import { withReactData } from './withReactData';

export const OverviewPage = withReactData(OverviewView, ['ranks']);
