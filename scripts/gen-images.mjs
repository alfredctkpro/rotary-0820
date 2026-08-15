// 產生本場演講用的手繪插圖（藍墨手繪＋暖紙風，橫式構圖）
//
// 用法：
//   node scripts/gen-images.mjs                # 產生尚未存在的圖
//   node scripts/gen-images.mjs --force        # 強制重產
//   node scripts/gen-images.mjs desk-overflow  # 只產指定的圖
//
// 依賴與 API Key 都重用既有專案，本 repo 不裝 node_modules、不放金鑰。
// ⚠️ 這些外部路徑會消失（8/15 壞過一次：原指的 ~/bni-ai-news/ctkpro-intro/node_modules
//    與 ~/ctkpro_blog_posts/.env 都已不在）。故改成候選清單，取第一個存在的。

import fs from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const NM_CANDIDATES = [
  '/Users/alfred/ctkpro_blog_posts/node_modules',
  '/Users/alfred/bni-ai-news/ctkpro-intro/node_modules',
];
const ENV_CANDIDATES = [
  '/Users/alfred/bid-slides/.env',
  '/Users/alfred/hermes-slides/.env',
  '/Users/alfred/ctkpro_blog_posts/.env',
];

const NM = NM_CANDIDATES.find((p) => existsSync(path.join(p, 'sharp')));
if (!NM) {
  console.error(`❌ 找不到可用的 node_modules，試過：\n   ${NM_CANDIDATES.join('\n   ')}`);
  process.exit(1);
}
const { GoogleGenerativeAI } = await import(`${NM}/@google/generative-ai/dist/index.mjs`);
const sharp = (await import(`${NM}/sharp/lib/index.js`)).default;
const dotenv = (await import(`${NM}/dotenv/lib/main.js`)).default;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(path.resolve(__dirname, '..'), 'assets');

const ENV_FILE = ENV_CANDIDATES.find((p) => existsSync(p));
if (ENV_FILE) dotenv.config({ path: ENV_FILE });
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error(`❌ 找不到 GEMINI_API_KEY，試過：\n   ${ENV_CANDIDATES.join('\n   ')}`);
  process.exit(1);
}
console.log(`🔑 金鑰：${ENV_FILE}\n📦 模組：${NM}`);
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3-pro-image-preview';

// 全庫統一風格：藍墨手繪＋暖紙，與白底高橋流投影片同調
// ⚠️ 圖內絕不含文字（大綱鐵律）
const STYLE = [
  'Hand-drawn illustration style: blue ballpoint-pen and pencil sketch doodles',
  'on warm cream/beige paper with subtle paper texture.',
  'Line-art figures sketched in blue ink with light shading;',
  'palette strictly limited to blue ink + warm paper tones (cream, beige, soft brown).',
  'Clean, generous negative space so the drawing reads clearly when projected.',
  'HORIZONTAL LANDSCAPE composition, clearly wider than tall.',
  'Calm, warm, wry mood.',
  'CRITICAL: absolutely NO text, NO words, NO letters, NO numbers, NO captions anywhere in the image.',
].join(' ');

// 電影海報致敬頁專用風格（不走藍墨手繪，要的是視覺衝擊）
// 8/15 改版：改走原片海報的血紅放射調——辨識度優先（Alfred：要讓人回想起那部電影）
// ⚠️ 只致敬「構圖語言」（紅底放射／中央前傾主角／上方疊人／漂浮雜物），
//    不複製原海報的人物、演員肖像、片名字體或任何文字
const POSTER = [
  'Vibrant cinematic movie-poster illustration, TALL VERTICAL PORTRAIT format (2:3 poster ratio).',
  'Dominant colour scheme: deep blood-red and crimson, with dark smoky maroon edges and',
  'bright radiating energy bursting outward from the centre behind the figures.',
  'Dramatic rim lighting on every figure; small colourful paper-confetti fragments floating in the air.',
  'Bold, painterly, high-contrast, slightly chaotic — the kinetic energy of a martial-arts multiverse poster.',
  'CRITICAL: absolutely NO text, NO words, NO letters, NO numbers, NO signage, NO logos,',
  'NO title treatment anywhere in the image.',
].join(' ');

const IMAGES = {
  // P2 · 多重宇宙意象（致敬原片海報構圖，但畫面中每一張臉都是 Alfred 本人）
  'multiverse-me': {
    out: [900, 1350],          // 直式 2:3 海報比例
    pad: '#1A0508',            // 補邊用暗紅黑，與海報邊緣同調
    refs: [`${ASSETS}/movie-poster.jpg`, 'FACE'],
    prompt:
      `Use the FIRST image ONLY as a COMPOSITION and COLOUR reference — the tall poster shape, ` +
      `the blood-red radiating background, and the way figures are stacked in an overlapping cluster. ` +
      `⛔ Do NOT copy any person, face, costume, prop or lettering from that first image. ` +
      `⚠️ ABSOLUTE CASTING RULE — read carefully: the ONLY human being allowed to appear anywhere in ` +
      `this image is the man in the SECOND photo (rectangular black-framed glasses, short spiky black hair, ` +
      `warm open smile, friendly middle-aged Taiwanese man). He appears FOUR times as four versions ` +
      `of himself, and every single face must be clearly recognisable as HIM. ` +
      `There must be NO other people whatsoever — no women, no children, no elderly people, ` +
      `no background crowds, no monsters, no creatures, no animals, no strange blobs. ` +
      `If in doubt, draw fewer figures, not more. ` +
      `LAYOUT: the LARGEST version of him occupies the lower-centre, leaning forward towards the viewer ` +
      `with one hand thrust out flat in a martial-arts ready stance — determined, heroic, eyes to camera. ` +
      `Directly above and behind him, three smaller versions of him overlap in a tight cluster: ` +
      `one in a crisp business shirt holding a smartphone, one in casual clothes carrying grocery bags, ` +
      `one with a travel backpack and a sun hat. ` +
      `Floating around the cluster: a smartphone, a paper wall calendar, a car key, a coffee cup, ` +
      `a shopping bag — all blank and unbranded. ` +
      `Convey "whichever universe you are in, you can handle it". ${POSTER}`,
  },

  // P20 · 三層架構具象化：一隻機器人＝耳朵嘴巴（Prompt）／桌上文件（Context）／手腳工具（Harness）
  // ⚠️ 圖內不可有字——三個標籤由頁面用 HTML 疊上去，才能配合簡報筆逐一浮現。
  //    構圖要求「頭在上、桌在中、工具在兩側」並留白，就是為了讓標籤有地方放。
  'three-layers-robot': {
    prompt:
      `A single friendly robot behind a large desk, drawn as a clear three-part diagram ` +
      `so that captions can be attached to each part later. ` +
      `TOP — its HEAD sits in the upper centre, large and unmistakable: prominent ears on both ` +
      `sides of the head and an open friendly mouth, as if it is listening and about to answer. ` +
      `MIDDLE — the DESK in front of it is covered with spread-out papers, documents, folders ` +
      `and a stack of files, filling the width of the desk. ` +
      `SIDES — two articulated mechanical arms reach outwards left and right, each holding a tool, ` +
      `with a few more tools floating near the hands: a wrench, a magnifying glass, a paintbrush, ` +
      `a small laptop, a calendar page, a shopping basket. ` +
      `Keep GENEROUS EMPTY SPACE above the head, and to the outer left and outer right of the ` +
      `two arms, so captions can be placed there later. Keep the robot centred and symmetrical. ` +
      `Exactly ONE robot, no humans, no other creatures. ` +
      `Warm, wry and competent — not scary, not childishly cute. ${STYLE}`,
  },

  // P17 · Context 的限制：桌面有限
  'desk-overflow': {
    prompt:
      `A wry scene about a workspace that has run out of room. ` +
      `A meeting table completely buried under stacks of loose papers, folders and documents, ` +
      `piled so high that older sheets are sliding off the edges and scattering onto the floor below. ` +
      `A small overwhelmed person stands beside the table trying to hold the pile together. ` +
      `Convey "the desk is finite — when new things arrive, old things fall off". ${STYLE}`,
  },

  // P21 · 孫悟空拔毫毛變分身（回收 P3 伏筆）
  // 需要參考頭像：把 Alfred 的臉畫成主角猴王（圖生圖）
  'monkey-clones': {
    needsFace: true,
    prompt:
      `Redraw the person in the reference photo as the Monkey King (Sun Wukong) from Journey to the West, ` +
      `in the same blue-ink hand-drawn sketch style. Keep his recognisable features — ` +
      `the rectangular glasses, the short spiky hair, the warm friendly smile — ` +
      `but give him the Monkey King's headband and cape. ` +
      `He stands at the centre plucking a hair from his own arm and blowing it out; ` +
      `from his breath a cheerful crowd of small monkey clones springs into the air, ` +
      `each clone holding a different tool — a wrench, a calendar, a magnifying glass, ` +
      `a paintbrush, a tiny laptop, a shopping basket. ` +
      `The clones fan outwards across the page. Playful and heroic, not scary. ${STYLE}`,
  },
};

async function loadFace() {
  // 優先用 Alfred 提供的正面照；沒有就退回海報裁切
  for (const n of ['alfred.jpg', 'alfred.png', 'alfred-face.jpg', 'alfred-face.png']) {
    try {
      const p = path.join(ASSETS, n);
      await fs.access(p);
      console.log(`  🙂 參考頭像：assets/${n}`);
      // 縮到長邊 1024 再送，原圖 4000px 級別沒有必要且拖慢請求
      const buf = await sharp(p).resize(1024, 1024, { fit: 'inside' }).jpeg({ quality: 92 }).toBuffer();
      return { data: buf.toString('base64'), mimeType: 'image/jpeg' };
    } catch { /* 換下一個 */ }
  }
  const poster = path.join(ASSETS, 'talk-ads.jpg');
  await fs.access(poster);
  console.log('  🙂 參考頭像：從 talk-ads.jpg 裁切（未找到 assets/alfred-face.*）');
  // 海報 1536×1024，Alfred 的頭部在右上；裁完放大送出，模型比較看得清五官
  const buf = await sharp(poster)
    .extract({ left: 945, top: 30, width: 290, height: 300 })
    .resize(768, 794, { kernel: 'lanczos3' })
    .jpeg({ quality: 95 })
    .toBuffer();
  return { data: buf.toString('base64'), mimeType: 'image/jpeg' };
}

// 把參考圖路徑讀成 inlineData；'FACE' 是特例，代表 Alfred 的頭像
async function loadRef(ref) {
  if (ref === 'FACE') return loadFace();
  const buf = await sharp(ref).resize(1024, 1024, { fit: 'inside' }).jpeg({ quality: 92 }).toBuffer();
  console.log(`  🖼  參考圖：${path.basename(ref)}`);
  return { data: buf.toString('base64'), mimeType: 'image/jpeg' };
}

async function generateOne(genAI, name, spec) {
  const model = genAI.getGenerativeModel({ model: MODEL });
  const parts = [];
  if (spec.refs) for (const r of spec.refs) parts.push({ inlineData: await loadRef(r) });
  else if (spec.needsFace) parts.push({ inlineData: await loadFace() });
  parts.push({ text: spec.prompt });

  let result;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try { result = await model.generateContent(parts); break; }
    catch (err) {
      const status = err.status || err.httpCode;
      if ((status === 503 || status === 429) && attempt < 3) {
        const delay = attempt * 15000;
        console.warn(`  ⚠️  API 暫時無法使用 (${status})，${delay / 1000}s 後重試 (${attempt}/3)`);
        await new Promise((r) => setTimeout(r, delay));
      } else throw err;
    }
  }

  const response = await result.response;
  const cand = response.candidates?.[0];
  if (!cand) throw new Error('回應中沒有 candidates');

  let imageData = null;
  for (const part of cand.content.parts) {
    if (part.inlineData) { imageData = part.inlineData.data; break; }
    if (part.text) console.log(`  ℹ️  AI 文字回應：${part.text.slice(0, 140)}`);
  }
  if (!imageData) throw new Error('回應中找不到圖片資料');

  // 預設橫式 4:3；直式圖用 spec.out 指定，避免被補邊成橫的
  const [W, H] = spec.out || [1400, 1050];
  const PAD = spec.pad || '#FBFAF7';
  const outPath = path.join(ASSETS, `${name}.png`);
  await sharp(Buffer.from(imageData, 'base64'))
    .resize(W, H, { fit: 'contain', background: PAD })
    .flatten({ background: PAD })
    .png({ compressionLevel: 9 })
    .toFile(outPath);

  const { size } = await fs.stat(outPath);
  console.log(`  ✅ ${name}.png （${(size / 1024).toFixed(0)} KB）`);
}

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));
const targets = Object.entries(IMAGES).filter(([n]) => (only.length ? only.includes(n) : true));

if (!targets.length) {
  console.error(`找不到指定的圖名。可用：${Object.keys(IMAGES).join(', ')}`);
  process.exit(1);
}

console.log(`🎨 模型：${MODEL}`);
console.log(`📁 輸出：${ASSETS}\n`);
const genAI = new GoogleGenerativeAI(API_KEY);

for (const [name, spec] of targets) {
  const outPath = path.join(ASSETS, `${name}.png`);
  if (!force) {
    try { await fs.access(outPath); console.log(`⏭️  ${name}.png 已存在，略過（--force 重產）`); continue; }
    catch { /* 不存在 → 產生 */ }
  }
  console.log(`⏳ 產生 ${name} …`);
  try { await generateOne(genAI, name, spec); }
  catch (err) { console.error(`  ❌ ${name} 失敗：${err.message}`); }
}
console.log('\n完成。');
