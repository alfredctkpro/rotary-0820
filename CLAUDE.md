# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 本 repo 全程使用**繁體中文（台灣）**：文件、投影片內容、commit message 皆是。

## 這個 repo 是什麼

2026-08-20（四）扶輪社演講《貓的 AI 多重宇宙》的**內容製作庫**——講者 Alfred（康貓），40 分鐘，聽眾約 40 位企業主／高階主管（碰過 AI 的不到 10 人）。

**沒有程式碼、沒有 build／test／lint。** 產出物是一份**單檔自足的 36 頁 HTML 投影片**（`index.html` 放 **repo 根目錄**）＋四支 demo 影片。驗證方式＝用瀏覽器翻一遍。

⚠️ **這是 public repo**，且 GitHub Pages 已啟用：`https://alfredctkpro.github.io/rotary-0820/`。根目錄的 `index.html` 就是演講網址。進 git 的東西全世界看得到，history 刪不掉。

## 內容權威鏈（照這個順序信）

| 檔案 | 地位 |
|---|---|
| [instruction.md](instruction.md) | **新 session 入口**。當前狀態、已定案的風格決策、影片實況、待辦。與其他檔衝突時**以此為準** |
| [大綱與素材.md](大綱與素材.md) | **唯一內容依據**。36 頁逐頁骨架＋每頁話術＋視覺指示，全寫好了 |
| [README.md](README.md) | 對外門面（給社友看的），不是製作規格 |
| [貓的 AI 多重宇宙投影片架構.md](貓的%20AI%20多重宇宙投影片架構.md) | 最早的心智圖草稿，**已被大綱取代**，僅供理解脈絡 |

**不要重新發明內容。** 大綱 36 頁照做即可。風格決策（instruction.md §二）已定案，別翻案。

## 已知的檔案間矛盾（踩過的坑）

1. **投影片位置**：README 的目錄說明寫 `slides/` 放 Keynote 與 PDF——**過時**。實際產出是根目錄 `index.html`（GitHub Pages 需要）。`slides/`、`scripts/`、`assets/` 目前都只有 `.gitkeep`。
2. **影片檔名**：大綱結尾「Demo 影片清單」的檔名（`demo1-line-input.mp4`、`demo2b-trip-live.mp4` 等）**與磁碟實況不符**。正確路徑見 instruction.md §三 —— `demos/demo1/demo1.mp4`、`demos/demo2/demo2.mp4`、`demos/demo3/demo3-1-explain-investiment-base.mp4`、`demos/demo3/demo3-2-call-a-roundtable-meeting.mp4`。
3. **P9 素材**：大綱寫兩支影片（輸入端＋陪伴端），實際 Alfred 錄成**一支合一**（約 4.5 分鐘）。按鈕做**一顆**。
4. **插圖頁碼**：大綱結尾插圖表寫 `desk-overflow`→P15、`monkey-clones`→P18，**是舊頁碼**。正確為 **P17**（Context 桌面有限）與 **P21**（孫悟空），以 instruction.md 為準。
5. **拍攝腳本位置不一致**：demo1 的在 `demos/demo1/` 內，demo2／demo3 的在 `demos/` 根層。

## 🚨 紅線（public repo，不可越線）

- **絕對金額不出現**——投資段（宇宙三）只能有百分比與匯率警戒線。圓桌 agent 已設金額鐵律，仍需目視檢查。
- **家人名字遮蔽**——太太與孩子的名字一律不出現（「15:30 鼓課」這種可保留）。爸媽年齡（77/75）留不留由 Alfred 判斷。
- **demo1 已單一原版公開（8/13 Alfred 拍板）**：醫生名＝公開資訊、機器人 ID 有 Messaging API 白名單鎖、就醫規律風險經評估接受。四支影片全數在 repo，P9 按鈕單一 src、無 fallback。
- **安全故事（P14／P15）講現象不報精確數字、不出當事人名。**

### .gitignore 的雷

- **不要寫 `*.key`**——Keynote 副檔名也是 `.key`，會把 `slides/` 整個擋掉。憑證用 `*-private.key` 這種帶後綴寫法。
- 已擋：`**/investiment-base/`、`**/對帳單*`、`*持倉*`、`*-raw.*`、`**/未遮蔽/`、Hermes／LINE 設定（含 channel secret／access token）。
- 影片方針（8/13 定案）：**H.264 `.mp4` 成品進 git**、由 Pages 網址播放；原始 `.mov`／`.m4v`／`.avi`／`.mkv` 不進。

## 投影片工法（來自外部 repo）

骨架與設計規範**不在本 repo**，動手前依序讀：

1. `~/ctkpro-slides/CLAUDE.md`——工法總綱（設計 token、版面規則、元件庫、demo 影片播放層）
2. `~/ctkpro-slides/bids/yilan-bids/index.html`——**複製這個檔當骨架**。1280×720 `#stage` 縮放舞台、`playDemos()` 影片播放層、左右各 1/6 點擊翻頁（中間 2/3 留給選字強調）、播放中鎖翻頁、鍵盤導覽、進度條，全部現成
3. `~/bni-ai-news/ctkpro-intro/index.html`——白底高橋流風格基準
4. `~/bni-ai-news/2026-07-31/index.html`——最近一場對外分享成品（逐行浮現、大字對比手法）

**本場風格**：白底高橋流，每頁兩層＝**大字主張（一頁一個意思）＋一行白話補述**（小一號灰階，給分心回神的人一個重新掛上點）。**不做 bullet 牆**，需要列點最多三條。Token 用白底、藍墨強調 `#2f4fb0`、Noto Sans TC（900/700/500/400）。對外簡報右側留白 `padding-right:148px`，右上角 CTK Pro logo 對齊內容右緣。

**三層主視覺**（Prompt 2024→Context 2025→Harness 2026）在 P12、P33 重複出現——**同一張圖、不同高亮，別畫兩張**。

**插圖三張**走 gen-images 管線（藍墨手繪＋暖紙風），腳本參考 `~/bni-ai-news/ctkpro-intro/scripts/gen-images.mjs`，API key 重用 `~/ctkpro_blog_posts/.env`。**圖內絕不含文字**。

**單檔自足原則**：CSS/JS 全內嵌，QR code 產完下載存 `assets/`，不要外連。

## 影片轉檔

```bash
ffmpeg -i in.mov -c:v libx264 -preset medium -crf 23 \
  -vf "scale=720:-2,fps=30" -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart out.mp4
```

`playDemos()` 用相對路徑掛影片，檔名不要有空白。

## 全場敘事骨幹（改任何一頁前要懂的）

主線：**別人在學招式，我在練心法**（P3 點題 · P22 轉折 · P33-35 收束）。

比喻三件套互相咬合，全場只用這三個：**多重宇宙**（人生角色）×**分身**（AI Agent，孫悟空拔毫毛，P3 埋伏筆／P21 回收／P33 再收）×**心法**（三層架構 Prompt→Context→Harness）。

三個宇宙各自兌現 Harness 的不同零件：

| 宇宙 | 頁 | 場景 | 兌現的零件 |
|---|---|---|---|
| 一 | P4-P10 | 爸媽的 LINE（語音記行程、每日自動回報） | 全套入職（Harness） |
| 二 | P23-P26 | 全家週末旅遊 | Workflow（每週交卷） |
| 三 | P27-P32 | 投資決策（AI 抓出判準的錯） | Agent＋Skill（圓桌） |

**誠實原則**（務實老手人設的技術實作）：投影片**不寫死任何影片引言**（「這些見解我沒想過」是萬用收束句）；話術用「我只要說一句」，不說「全自動」。

**不內容砍清單**：P3、P8、P9、P12、P19-P20、P21、P22、P29-P32、P33／P35。需壓回 40 分才動砍法，順序見大綱節奏配比表。

**P32 證據鏈**：頁面大字＝那行指令，必須與影片 B 裡打進去的**一字不差**。

## 工作慣例

- **本 repo 由 Claude 直接 commit＋push**（與 `~/investiment-base` 的「AI 不主動 commit」相反）。commit message 繁中。
- 大綱有「金句庫」（投影片大字候選池，19 條，標好對應頁碼）——需要換句時從那裡挑，別自己編。
- 演講後待辦：講稿類檔案是否轉私有、`~/thinkr` MEMORY 瘦身、圓桌議事錄結論回寫 `2_decisions`。
