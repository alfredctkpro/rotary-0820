# instruction.md — 投影片製作交接（新 session 從這裡開始）

> **你的任務**：為 2026-08-20（四）扶輪社演講《貓的 AI 多重宇宙》製作 **36 頁 HTML 投影片**（單檔自足的 `index.html`，放本 repo 根目錄）。
> **唯一內容依據**＝同資料夾的 [`大綱與素材.md`](大綱與素材.md)（逐頁骨架＋每頁話術＋視覺指示，36 頁全寫好了，照做即可，**不要重新發明內容**）。
> **時程**：8/14（五）下班前要能全套演練——投影片今天就要能用。

---

## 一、動手前先讀（順序）

1. **`大綱與素材.md`**（本資料夾）——36 頁逐頁規格，這是製作藍圖
2. **`~/ctkpro-slides/CLAUDE.md`**——投影片工法總綱（設計 token、版面規則、元件庫、demo 影片播放層）
3. **`~/ctkpro-slides/bids/yilan-bids/index.html`**——**複製這個檔當骨架**（1280×720 `#stage` 縮放舞台、`playDemos()` 影片播放層、左右 1/6 點擊翻頁、播放中鎖翻頁、鍵盤導覽、進度條——全部現成，照搬）
4. **`~/bni-ai-news/ctkpro-intro/index.html`**——白底高橋流的風格基準（大字、極簡、一頁一重點）
5. **`~/bni-ai-news/2026-07-31/index.html`**——最近一場對外分享成品（20 頁，逐行浮現、大字對比等手法可抄）

## 二、風格決策（本場已定案，別翻案）

- **白底高橋流＋每頁兩層**：大字主張（一頁一個意思）＋一行白話補述（小一號、灰階——給分心回神的人的重新掛上點）。**不做 bullet 牆**，需要列點的頁最多三條。
- **Token**：白底、藍墨強調 `#2f4fb0`（BNI 基準）、Noto Sans TC（900/700/500/400）。yilan-bids 骨架的 token 結構沿用、色票換白底系。
- **三層主視覺**（Prompt 2024→Context 2025→Harness 2026 三階圖）在 P12、P33 重複出現——同一張圖、不同高亮，別畫兩張。
- **手繪插圖三張**走 gen-images 管線（藍墨手繪＋暖紙風，腳本參考 `~/bni-ai-news/ctkpro-intro/scripts/gen-images.mjs`，API key 重用 `~/ctkpro_blog_posts/.env`）：`universe-circles`（P3）、`desk-overflow`（P17）、`monkey-clones`（P21）。圖內**絕不含文字**。
- **P25 的 Demo 2 靜態素材不用截圖**——做成「文件卡片」（檔名標頭＋原文引用＋表格原樣），來源檔在 `~/thinkr/2_family/trips/`（對照表見大綱的「Demo 2 截圖清單」段）。**遮名規則：孩子與太太的名字一律不出現**（「15:30 鼓課」保留即可）。
- 對外簡報右側留白 `padding-right:148px`、右上角 CTK Pro logo 對齊內容右緣（工法見 ctkpro-slides CLAUDE.md）。

## 三、影片狀態（`demos/`，playDemos 用相對路徑）

| 檔案 | 狀態 | 用在 |
|---|---|---|
| `demos/demo2/demo2.mp4` | ✅ 已進 repo | P26（trip 實跑） |
| `demos/demo3/demo3-1-explain-investiment-base.mp4` | ✅ 已進 repo | P30（庫導覽） |
| `demos/demo3/demo3-2-call-a-roundtable-meeting.mp4` | ✅ 已進 repo | P32（圓桌實況） |
| `demos/demo1/demo1.mp4` | ⚠️ **暫扣**（.gitignore 有一行暫擋） | P9 |

- ⚠️ **demo1 暫扣原因**：影片中 Google Calendar 捲動段含**多筆真實人名＋領藥行程**（高國維領藥、陳鋮忠領藥等），公開 repo 不可上。**待 Alfred 重剪**（用乾淨的 demo 專用日曆重錄該段、或裁掉）後，移除 .gitignore 那行暫擋、再 add+push。
- **P9 投影片照常做**：按鈕掛 `demos/demo1/demo1.mp4` 路徑，檔案補上後自動生效。
- ⚠️ **P9 的實際素材與大綱描述不同**：大綱寫兩支影片（輸入端＋陪伴端），實際 Alfred 錄成**一支合一**（約 4.5 分鐘，含輸入→確認→GCal→晨間提醒→拜拜提醒）。按鈕做**一顆**即可；P9 話術的 cue 順序對應影片內段落。
- 影片方針（8/13 定案）：**H.264 mp4 成品進 git、GitHub Pages 網址播放**；原始 .mov 不進。新影片如需轉檔：`ffmpeg -i in.mov -c:v libx264 -preset medium -crf 23 -vf "scale=720:-2,fps=30" -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4`。

## 四、發佈

- **GitHub Pages 已啟用**：`https://alfredctkpro.github.io/rotary-0820/`（main branch 根目錄）——`index.html` 放根目錄就是演講網址。
- **P36 謝幕頁的 QR code 指向上面這個網址**（QR 可用 api.qrserver.com 產生後下載存 `assets/`，別用外連——投影片單檔自足原則）。
- 本 repo 是 **public**：投影片內容＝可公開內容。**紅線：絕對金額不出現（投資段只有百分比與匯率線）、家人名字遮蔽、demo1 修復前不進 repo。**

## 五、本 session 重要決策備忘（理解脈絡用，均已反映在大綱中）

1. **主線**：別人學招式、我練心法。比喻三件套互相咬合：多重宇宙（人生角色）×分身（Agent，孫悟空）×心法（三層 2024→2025→2026）。
2. **三個宇宙各自兌現 Harness 的不同零件**：宇宙一＝全套入職、宇宙二＝Workflow（每週交卷）、宇宙三＝Agent＋Skill（圓桌）。
3. **誠實原則**（務實老手人設的技術實作）：投影片不寫死任何影片引言（「這些見解我沒想過」是萬用收束句）；話術用「我只要說一句」不說「全自動」；安全故事講現象不報精確數字、不出當事人名。
4. **P32 證據鏈**：頁面大字＝那行指令，與影片 B 裡打進去的一字不差。
5. **P31 有一個 Alfred 待拍板**（頁面上有註記）：影片 A 若已完整介紹分身名單，P31 縮成 10 秒或併入 P30 口述。**先照大綱做全版**，他拍板後再調。
6. **時間可長可短**（晚上自家社場），節奏表當參考、砍法備而不用。

## 六、接下來的完整待辦（依序）

1. **投影片 `index.html` 36 頁**（本 session 的主任務）＋三張 gen-images 插圖
2. demo1 重剪（Alfred 動手）→ 移除 .gitignore 暫擋行 → add+push
3. 影片 YT 未公開備援連結回填 `demos/demo*-拍攝腳本.md`
4. 8/14 全套演練 ×3（投影片＋現場講影片 cue）
5. 演講後：講稿類檔案是否轉私有、`~/thinkr` MEMORY 瘦身、圓桌議事錄結論回寫 `2_decisions`

> 工作慣例：本 repo 由 Claude 直接 commit＋push（與 investiment-base 的「AI 不主動 commit」不同）。commit message 繁中。
