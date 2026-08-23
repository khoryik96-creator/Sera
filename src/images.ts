// Character portraits are imported (not referenced by string path) so the
// bundler owns them: in the web build they become hashed files, and in the
// single-file build they are inlined as base64 data URIs.
import sera from './assets/sera.jpg';
import rhen from './assets/rhen.jpg';
import arin from './assets/arin.jpg';
import liang from './assets/liang.jpg';
import kael from './assets/kael.jpg';
import jin from './assets/jin.jpg';
import lei from './assets/lei.jpg';
import rui from './assets/rui.jpg';
import qin from './assets/qin.jpg';
import han from './assets/han.jpg';
import ilyra from './assets/ilyra.jpg';
import mo from './assets/mo.jpg';
import yun from './assets/yun.jpg';
import wen from './assets/wen.jpg';
import seraExtra1 from './assets/sera-extra-1.jpg';
import seraExtra2 from './assets/sera-extra-2.jpg';
import seraExtra3 from './assets/sera-extra-3.jpg';

/** Main portrait per character key. */
export const characterImageMap: Record<string, string> = {
  sera, rhen, arin, liang, kael, jin, lei, rui, qin, han, ilyra, mo, yun, wen,
};

/** Additional gallery portraits per character key. */
export const characterExtraImages: Record<string, string[]> = {
  sera: [seraExtra1, seraExtra2, seraExtra3],
};
