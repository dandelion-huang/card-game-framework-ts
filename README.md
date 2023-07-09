# 卡牌遊戲框架 (Card Game Framework)

以 TypeScript 撰寫的卡牌遊戲框架，以控制台遊玩。

> 主要在練習依賴反轉與注入、組合取代繼承的觀念，還有樣板工廠方法的使用。

## 遊戲類型 (Games)

目前支援兩款遊戲：攤牌 (Showdown) 以及 Uno。

> 關於攤牌遊戲可以參考[之前的專案](https://github.com/Dandelion64/showdown-ts)。

## 遊玩方式 (How to Play)

首先安裝必要的套件：

``` bash
npm install
```

然後打包一次：

``` bash
npm run build
```

接下來：

``` text
請到 `app.js` 中，根據想遊玩的遊戲類型反註解 11 行或 14 行。
```

最後在控制台 (console) 中運行以下指令即可：

``` bash
npm run start
```

## 套件 (Packages)

CLI 相關套件選擇著重在以下三者：

* [enquirer](https://github.com/enquirer/enquirer)
* [figlet](https://github.com/patorjk/figlet.js)
* [colorette](https://github.com/jorgebucaran/colorette)
