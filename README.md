# Black-Spin-the-Wheel
黑箱輪盤
###### *version-V1.3* 
---

## 簡介&功能

1. 修改機率（針對[隨機抽籤輪盤](https://tw.piliapp.com/random/wheel/)）
    - 右鍵點選擴充圖標 -> 擴充功能選項 -> 照順序按下鍵盤 **a** - **b** - **c**　(****1***）
    - 左邊輸入標籤名稱,右邊輸入機率（任意正數）
    - 機率為 $$ \frac{特定標籤機率}{所有機率} $$  （**“_xx_”** 為不干預轉盤的標籤保留字元）
    - 範例：
    
    |  標籤   | 機率  |
    |  ----  | ----  |
    | a  | 10 |
    | b  | 30 |
    | c  | 40 | 
    |\_XX\_|50|

      如果轉盤上有 **c** 則 **c** 被轉到的機率為 $\frac{40}{10+30+40+50}$
   
      且有 $\frac{50}{10+30+40+50}$ 的機率不干預轉盤選轉
    - 點擊右側的 **T** 或 **F** 可開啟或關閉擴充（顯示T為啟用）
    ##### （****1***）：密碼可至 **[options.js](https://github.com/jx06T/Black-Spin-the-Wheel/blob/main/options.js)** 第一行 *const password = [65,66,67]* 利用**keyCode**設定（見：[鍵盤按鍵KeyCode碼,獲取KeyAscii值,KeyCode值在線獲取工具-愛工具](https://tool.chkaja.com/keyboardcode/#:~:text=%E5%9C%A8%E6%AD%A4%E8%BC%B8%E5%85%A5%E6%8C%89%E9%8D%B5-,%E6%AD%A4%E8%99%95%E9%A1%AF%E7%A4%BAKeyCode%E5%80%BC,-%E5%AD%97%E6%AF%8D%E5%92%8C%E6%95%B8%E5%AD%97%E9%8D%B5)）

## 下載&安裝

1.下載資料夾並解壓縮：code -> download ZIP

2.開啟擴充頁面並打開開發者模式：擴充功能圖示(右上) -> 管理擴充功能 -> 開發人員模式

3.載入擃充資料夾：載入未封裝項目(載入解壓縮) -> 選擇剛剛下載的資料夾

## 更新

- 目前不定期更新需自行至此重新安裝(目前版本1.3)

**！若功能異常請先自行更新**

## 更新日誌
    2023/08/17 (1.3) -> 解決任意標籤被隱藏時盤面與標題不同的狀態
    2023/07/20 (1.2) -> 改善使用者介面&修改邏輯
    2023/07/10 (1.2) -> 改善使用者介面
    2023/07/01 (1.0) -> 完成修改鑾輪盤主要邏輯
    
