# 井字遊戲

本專案是跟著 [React 官方文件的教學](https://beta.reactjs.org/learn/tutorial-tic-tac-toe)實作後，再加入一些額外功能。詳細描述如下：

## 功能

### 官方文件有寫出功能描述，並提供程式碼

* 顯示目前是輪到 X 還是 O
* 輪流在九宮格中留下 X 或 O 的記號
* 判斷是哪一方獲勝
* 保存步驟的歷史
* 可以回到過去並創造新的未來

### 官方文件只寫出功能描述，自行實作

* 在當前步驟顯示你在第幾步的文字敘述，而非按鈕
* 用兩層迴圈產生九宮格，而非寫死

## 筆記

* `Array.map(() => { });` 的大括號裡面可以有 `return();`
* `for(){ }` 的大括號裡面的 `return();` 只會執行一次
* `return();` 裡面不能有迴圈

* `npm start`：編譯＋啟動開發用伺服器＋執行
* `npm run deploy`：產出正式程式檔案＋部署

## 參考資料

[[筆記][React]用 for 迴圈處理Component](https://ithelp.ithome.com.tw/articles/10201227)

[Deployment | Create React App](https://create-react-app.dev/docs/deployment/)