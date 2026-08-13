// 產生本場演講用的手繪插圖（藍墨手繪＋暖紙風，橫式構圖）
//
// 用法：
//   node scripts/gen-images.mjs                # 產生尚未存在的圖
//   node scripts/gen-images.mjs --force        # 強制重產
//   node scripts/gen-images.mjs desk-overflow  # 只產指定的圖
//
// 依賴與 API Key 都重用既有專案，本 repo 不裝 node_modules、不放金鑰：
//   模組  → ~/bni-ai-news/ctkpro-intro/node_modules
//   金鑰  → ~/ctkpro_blog_posts/.env 的 GEMINI_API_KEY

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const NM = '/Users/alfred/bni-ai-news/ctkpro-intro/node_modules';
const { GoogleGenerativeAI } = await import(`${NM}/@google/generative-ai/dist/index.mjs`);
const sharp = (await import(`${NM}/sharp/lib/index.js`)).default;
const dotenv = (await import(`${NM}/dotenv/lib/main.js`)).default;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(path.resolve(__dirname, '..'), 'assets');

dotenv.config({ path: '/Users/alfred/ctkpro_blog_posts/.env' });
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ 找不到 GEMINI_API_KEY（預期在 ~/ctkpro_blog_posts/.env）');
  process.exit(1);
}
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
// 深藍主調＝對齊主辦海報的 #011C47 系，讓它跟投影片同一家族
const CINEMATIC = [
  'Vibrant cinematic movie-poster illustration in a TALL VERTICAL PORTRAIT format (2:3 poster ratio).',
  'Dominant colour scheme: deep midnight navy blue (#0C1B44) background and atmosphere,',
  'with warm gold and teal accent highlights only. Do NOT use a rainbow of clashing colours.',
  'Swirling multiverse energy radiating outward from the centre, dramatic rim lighting, painterly and bold.',
  'CRITICAL: absolutely NO text, NO words, NO letters, NO numbers, NO signage, NO logos,',
  'NO title treatment, NO shop signs anywhere in the image.',
].join(' ');

const IMAGES = {
  // P2 · 多重宇宙意象（致敬構圖，但畫面中每一個人都是 Alfred 本人）
  'multiverse-me': {
    out: [900, 1350],          // 直式 2:3 海報比例
    pad: '#0C1B44',            // 補邊用深藍，與 P2 底色同色
    refs: ['/private/tmp/claude-501/-Users-alfred-rotary-0820/efa444a5-7992-4bfc-953c-93e8f1fa378d/scratchpad/eeaao.jpg', 'FACE'],
    prompt:
      `Use the FIRST image as the composition reference: a confident central hero figure ` +
      `surrounded by a swirling vortex of everyday objects, with a few smaller figures arranged above ` +
      `and behind. Keep its TALL VERTICAL POSTER shape and its sense of chaotic energy. ` +
      `⚠️ ABSOLUTE CASTING RULE — read carefully: the ONLY human being allowed to appear anywhere in ` +
      `this image is the man in the SECOND photo (rectangular black-framed glasses, short spiky greying hair, ` +
      `friendly middle-aged Taiwanese man). He appears FIVE times as five versions of himself. ` +
      `There must be NO other people whatsoever — no women, no children, no elderly people, ` +
      `no background crowds, no monsters, no creatures, no animals, no strange blobs. ` +
      `Every single face in the image is HIS face. If in doubt, draw fewer figures, not more. ` +
      `Do NOT reproduce any person from the first image. ` +
      `His five versions: centre — heroic, arms open, confident; ` +
      `then one in a business shirt, one carrying grocery bags, one with a travel backpack and sun hat, ` +
      `one holding a tablet. ` +
      `Floating around them: a smartphone, a paper wall calendar, an umbrella, a car key, ` +
      `a lunch box, a shopping bag, coffee cups — all blank and unbranded. ` +
      `Convey "whichever universe you are in, you can handle it". ${CINEMATIC}`,
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
  const buf = await sharp(poster).extract({ left: 930, top: 20, width: 300, height: 300 }).jpeg({ quality: 95 }).toBuffer();
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
