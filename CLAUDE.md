# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 本 repo 全程使用**繁體中文（台灣）**：文件、投影片內容、commit message 皆是。

## 這個 repo 是什麼

2026-08-20（四）扶輪社演講《貓的 AI 多重宇宙》的**內容製作庫**——講者 Alfred（康貓 PP），40 分鐘，聽眾約 40 位企業主／高階主管（碰過 AI 的不到 10 人）。

**現場條件**（由主辦海報 `assets/talk-ads.jpg` 確認）：台北市新世代扶輪社「新世代 AI 工作坊**三部曲 EPISODE 1**」· 8/20（四）**18:30** · **華山町餐酒館**（台北市中正區八德路一段 34 號）· 年度主題 Rotary「CREATE LASTING IMPACT」· 現場用**簡報筆**操作。

**沒有程式碼、沒有 build／test／lint。** 產出物是一份**單檔自足的 37 頁 HTML 投影片**（`index.html` 放 **repo 根目錄**）＋四支 demo 影片。驗證方式＝用瀏覽器翻一遍。

⚠️ **這是 public repo**，且 GitHub Pages 已啟用：`https://alfredctkpro.github.io/rotary-0820/`。根目錄的 `index.html` 就是演講網址。進 git 的東西全世界看得到，history 刪不掉。

## 現況：投影片已完成

37 頁 `index.html` 已做完並逐頁驗證，四支影片全數在位。**剩下的是排練與微調，不是重做。**

| 檔案 | 地位 |
|---|---|
| `index.html` | **成品**。改任何一頁都直接改這裡 |
| [題詞跟轉場.md](題詞跟轉場.md) | **現場提詞卡**（逐頁重點＋按鍵節奏＋轉場句＋上台前檢查清單）。Alfred 台上看的就是這份 |
| [大綱與素材.md](大綱與素材.md) | **內容依據**。逐頁骨架＋完整話術＋金句庫，改內容時回這裡對 |

### ⚠️ 頁碼基準

**本檔與 `題詞跟轉場.md` 的頁碼＝ `index.html` 實際頁碼（37 頁）。**
`大綱與素材.md` 是 36 頁版，**P2 之後全部比 index 少 1**（8/13 在 P1／P2 之間插入意象頁）。引用大綱時記得換算。

## 已知的檔案間矛盾（踩過的坑）

1. **影片檔名**：大綱結尾「Demo 影片清單」的檔名（`demo1-line-input.mp4`、`demo2b-trip-live.mp4` 等）**與磁碟實況不符**。正確路徑：`demos/demo1/demo1.mp4`（P10，1.25 倍速）、`demos/demo2/demo2.mp4`（P27）、`demos/demo3/demo3-1-explain-investiment-base.mp4`（P31）、`demos/demo3/demo3-2-call-a-roundtable-meeting.mp4`（P33）。
2. **P10 素材**：大綱寫兩支影片（輸入端＋陪伴端），實際 Alfred 錄成**一支合一**（4:27，含輸入→確認→GCal→晨間提醒→拜拜提醒）。按鈕**一顆**、單一 src、無 fallback。
3. **插圖頁碼**：大綱結尾插圖表的頁碼是舊的。實際：`assets/desk-overflow.png`→**P18**（Context 桌面有限）、`assets/monkey-clones.png`→**P22**（孫悟空，以 `alfred.jpg` 圖生圖，猴王是 Alfred）。P4 的宇宙圈**改用純 CSS 版**（8/13 拍板，不走 gen-images）。
4. **P26 素材**：大綱寫「截圖」，實際做成**文件卡片**（檔名標頭＋原文引用＋表格原樣），來源在 `~/thinkr/2_family/trips/`。
5. **拍攝腳本位置不一致**：demo1 的在 `demos/demo1/` 內，demo2／demo3 的在 `demos/` 根層。
6. **目錄**：`slides/` 是空的（沒有 Keynote／PDF，成品就是根目錄 `index.html`）；`scripts/` 只有 `gen-images.mjs`（**本 repo 這份是橫式構圖、支援參考圖**，不是 `~/bni-ai-news/ctkpro-intro/` 那份直式版）。

## 🚨 紅線（public repo，不可越線）

- **絕對金額不出現**——投資段（宇宙三）只能有百分比與匯率警戒線。圓桌 agent 已設金額鐵律，仍需目視檢查。
- **家人名字遮蔽**——太太與孩子的名字一律不出現（「15:30 鼓課」這種可保留）。爸媽年齡（77/75）留不留由 Alfred 判斷。
- **demo1 已單一原版公開（8/13 Alfred 拍板）**：醫生名＝公開資訊、機器人 ID 有 Messaging API 白名單鎖、就醫規律風險經評估接受。同一標準也適用 `assets/real-calendar.jpg`（月曆上的醫師名不模糊，但 **EXIF 必須清除**，原檔帶爸媽家 GPS）。
- **安全故事（P15／P16）講現象不報精確數字、不出當事人名。**

### .gitignore 的雷

- **不要寫 `*.key`**——Keynote 副檔名也是 `.key`，會把 `slides/` 整個擋掉。憑證用 `*-private.key` 這種帶後綴寫法。
- 已擋：`**/investiment-base/`、`**/對帳單*`、`*持倉*`、`*-raw.*`、`**/未遮蔽/`、Hermes／LINE 設定（含 channel secret／access token）。
- 影片方針（8/13 定案）：**H.264 `.mp4` 成品進 git**、由 Pages 網址播放；原始 `.mov`／`.m4v`／`.avi`／`.mkv` 不進。

## 投影片工法（來自外部 repo）

骨架與設計規範**不在本 repo**，要動版面時依序讀：

1. `~/ctkpro-slides/CLAUDE.md`——工法總綱（設計 token、版面規則、元件庫、demo 影片播放層）
2. `~/ctkpro-slides/bids/yilan-bids/index.html`——**本檔的骨架來源**。1280×720 `#stage` 縮放舞台、`playDemos()` 影片播放層、左右各 1/6 點擊翻頁（中間 2/3 留給選字強調）、鍵盤導覽、進度條
3. `~/bni-ai-news/ctkpro-intro/index.html`——白底高橋流風格基準
4. `~/bni-ai-news/2026-07-31/index.html`——最近一場對外分享成品（逐行浮現、大字對比手法）

**本場風格**：白底高橋流，每頁兩層＝**大字主張（一頁一個意思）＋一行白話補述**（小一號灰階，給分心回神的人一個重新掛上點）。**不做 bullet 牆**，需要列點最多三條。Token 用暖紙白 `#FBFAF7`、藍墨強調 `#2f4fb0`、Noto Sans TC（900/700/500/400）。對外簡報右側留白 `padding-right:148px`，右上角 CTK Pro logo 對齊內容右緣。

**全白底是定案**（8/13）——餐酒館環境光關不掉（聽眾要用餐），深底會糊成灰。放棄與海報深藍宇宙風的視覺連貫，換取可讀性。

**兩張深色頁例外**：P2 意象頁與 P36 收束頁＝**直式海報＋深藍底 `#0C1B44`**，P36 用 `.rev` 鏡像（圖右文左）與 P2 形成首尾書擋。⚠️ **必須維持直式**——曾做成橫式滿版，Alfred 反饋「裁成橫的就認不出那部電影」。深色頁在 `<section>` 掛 `.dark`，JS 會同步在 `<body>` 掛 `.on-hero` 讓導覽轉淺色，**新增深色頁記得掛**。

**三層主視覺**（Prompt 2024→Context 2025→Harness 2026）在 **P13、P34** 重複出現——**同一張圖、不同高亮，別畫兩張**。兩頁都是由下而上逐層浮現。

**插圖**走 gen-images 管線（藍墨手繪＋暖紙風），API key 重用 `~/ctkpro_blog_posts/.env`。**圖內絕不含文字**。產完記得 `magick <檔> -fuzz 3% -trim +repage <檔>` 裁掉 letterbox 補邊。

**單檔自足原則**：CSS/JS 全內嵌，QR code 產完下載存 `assets/`，不要外連。

**社徽**：`assets/rcgn-logo.png`（162×125，從海報裁切去背；官網原檔僅 126×200 且無去背，別用）。只在 P1 使用，顯示約 110px 寬。P1 標「三部曲 EPISODE 1」、只放「康貓 PP Alfred Kang」不放頭銜（海報印的「數位生法實踐家」疑為誤植，不沿用）。**EPISODE 1 只標 P1**，收尾不預告 EP2／EP3。

⚠️ **海報副標順序（LINE→投資→旅遊）與實際講序（LINE→旅遊→投資，投資壓軸）不同**——副標只是列舉不是議程，P1 照抄海報原句，P4 話術維持正確講序，別被海報帶偏。

### 🎮 簡報筆邏輯（已實作於 `index.html`，改 JS 前先懂）

現場站台用簡報筆，只送 `PageDown`／`PageUp`，**按不到影片的 `onclick` 按鈕**。已實作的解法：

1. **頁內分段 `step` 狀態機**——`stepsOf()` ＝ 有無影片 ＋ `.step` 元素數。影片頁：「▶ 播放 → ▶ 關閉留在原頁 → ▶ 才翻頁」。**P27 為三段**（多一段浮現 `trips/` 檔案清單）。
2. **鐵律：影片播完不自動翻頁**（`ended` 事件只 `closeVideo()`）——四個影片頁播完後都還有話術要在同一頁講。
3. **已攔 `F5`**（部分簡報筆送 F5＝瀏覽器重載，會跳回第 1 頁）；`b`／`.` 為黑屏鍵。
4. **播放中不鎖死鍵盤**——簡報筆沒有 Esc，播放中按翻頁鍵＝關閉影片。
5. **上一頁鍵倒退 step**，退到 0 才回前一頁；翻頁後 `document.body.focus()` 拉回焦點。
6. 滑鼠點按鈕的路徑保留當備援（`playSlideVideo()` 與簡報筆共用同一條路徑）。
7. 網址 `#N` 可直接跳頁（排練用）。

### 字體風險（現場必做）

字體走 Google Fonts 線上載入，**餐酒館斷網會掉回 PingFang TC，大字明顯變細**。上台前必須**連網把投影片完整開一次**讓瀏覽器快取。換瀏覽器或清快取就失效，當天現場要再開一次。

## 影片轉檔

```bash
ffmpeg -i in.mov -c:v libx264 -preset medium -crf 23 \
  -vf "scale=720:-2,fps=30" -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart out.mp4
```

`playDemos()` 用相對路徑掛影片，檔名不要有空白。四支影片實播共 11:53（P10 因 1.25 倍速由 4:27 縮為 3:34），全場約 44 分。

## 全場敘事骨幹（改任何一頁前要懂的）

主線：**別人在學招式，我在練心法**（P4 點題 · P23 轉折 · P34-36 收束）。

比喻三件套互相咬合，全場只用這三個：**多重宇宙**（人生角色）×**分身**（AI Agent，孫悟空拔毫毛，P4 埋伏筆／P22 回收／P32 再收）×**心法**（三層架構 Prompt→Context→Harness）。

三個宇宙各自兌現 Harness 的不同零件：

| 宇宙 | 頁 | 場景 | 兌現的零件 |
|---|---|---|---|
| 一 | P5-P11 | 爸媽的 LINE（語音記行程、每日自動回報） | 全套入職（Harness） |
| 二 | P24-P27 | 全家週末旅遊 | Workflow（每週交卷） |
| 三 | P28-P33 | 投資決策（AI 抓出判準的錯） | Agent＋Skill（圓桌） |

**伏筆已閉環**：P11 埋的是「**小龍蝦**」這個名字，P15 安全故事一（「幫我整理 email」→ 信箱清空）就是回收。Hermes 本身不需要再回收，**P11 不要加回「這個名字先記住」那句**（8/13 Alfred 指示捨棄）。

**誠實原則**（務實老手人設的技術實作）：投影片**不寫死任何影片引言**（「這些見解我沒想過」是萬用收束句）；話術用「我只要說一句」，不說「全自動」——P27 目前是例行提醒＋一句話交辦，不是無人排程。

**不砍清單**：P4、P9、P10、P13、P20-P21、P22、P23、P30-P33、P34／P36。需壓回 40 分才動砍法，順序見 `題詞跟轉場.md` 節奏表。

**P33 證據鏈**：頁面大字＝那行 `/roundtable` 指令，必須與影片 B 裡打進去的**一字不差**。

## 工作慣例

- **本 repo 由 Claude 直接 commit＋push**（與 `~/investiment-base` 的「AI 不主動 commit」相反）。commit message 繁中。
- 大綱有「金句庫」（投影片大字候選池，19 條，標好對應頁碼——**是大綱頁碼，換算 +1**）——需要換句時從那裡挑，別自己編。
- 演講後待辦：講稿類檔案是否轉私有、`~/thinkr` MEMORY 瘦身、圓桌議事錄結論回寫 `2_decisions`。
