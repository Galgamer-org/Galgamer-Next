# Brand new Galgamer website with Next.js

## 調試

    1. 安裝 Node.js
    2. 安裝 pnpm
    3. 安裝依賴：`pnpm install`
    4. 啟動開發服務器：`pnpm dev`

使用之前，可以先從原本的 Hexo 倉庫複製 md 文件到 _post 文件夾裏面，複製文章對應的整個圖片文件夾到 public/assets/blog-images 裏面
原 md 裏面的 ../image/圖片文件夾 會在 Next 裏面自動轉換，不用擔心

## 部署

    1. 編譯：`pnpm build`，這個命令將進行靜態導出
    2. 啓動服務器：`pnpm start`


## 目標

先實現基本的功能，錦上添花的之後再說

    - 按照原 Hexo 的風格編寫網站首頁，一篇 Featured 文章在最頂上，其餘文章按照時間排序
    - 想辦法設計一個好看的 Galgamer Logo
    - 頂部導航欄和底部的 footer 欄，支持手機版介面
    - 設計一個好看的文章頁面，PC 端想在最左邊顯示作者的簡介大頭貼等
    - 儘量支持原 Hexo 的模板語法，但是那個 HTML 的 template 真的有點搞不懂
    - CSS 的設計儘量兼容原來的主題，至少那些文章 MD 裏面內嵌的通過修改 CSS 變量來修改主題顏色或者背景圖片的功能能夠正常使用

    - tag 頁面，分類頁面，歸檔頁面，作者牆頁面，404 頁面，Galgame 金曲頁面等等
    - 支持夜間模式切換
    - 拿不準的可以參考一下 blog.skk.moe
    - 支持原來的谷歌字體
    - 使用 Next.js 的 Metadata API 來生成 meta 標籤

    - 實現一個接口，能讓在 MD 裏面調用 Next.js 的函數或者 API 等（我不是很清楚怎麼搞）


