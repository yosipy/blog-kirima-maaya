---
template: post
title: 初めてのwxGladeとwxWidgets
socialImage: /media/SnapCrab_NoName_2017-9-23_13-22-13_No-00.jpg
draft: false
date: 2020-02-25T14:07:33.930Z
description: |-
  初めてwxGladeやwxWidgetsを使ってみると結構わかりにくかったりします。

  しかし、覚え始めるとそんなに難しくなかったりもします。

  そんなわけでとりあえず手を動かしていきましょう。
category: プログラミング
tags:
  - C / C++
  - wxWidgets
seriesNumber: 1
---
初めてwxGladeやwxWidgetsを使ってみると結構わかりにくかったりします。

しかし、覚え始めるとそんなに難しくなかったりもします。

そんなわけでとりあえず手を動かしていきましょう。

## wxGladeとwxWidgetsの準備

wxWidgetsの準備は下の様にしてください。

[wxWidgetsをインストールして初期設定をする Visual Studio 2017](https://codelabo.com/379/)

wxGladeについてはそんなに難しいこともないので簡単にいきます。

問題が起こったら頑張って検索してください(笑)

wxGladeを動かすためにはPythonの環境が必要です。

Python公式サイトからインストーラをダウンロードしてインストールしましょう。

Pythonは3.x系と2.x系で異なるものとなっています。(ある程度、互換性はあるようですが)

ここでは2.x系のほうを使います。 この記事を書いているときの最新は2.7.14ですが、より新しいバージョンがあればそちらを使うといいでしょう。

<https://www.python.org/>

wxgladeをインストールしていきます。

<http://wxglade.sourceforge.net/>

wxgladeを実行してみてwxPythonがないと言われたらwxPythonをインストールします。

<https://wxpython.org/>

## 使い方

起動してみて、まず最初にすることはフレームを作ることです。

3つあるうちアイコンがたくさん並んでいるウィンドウの1番左上にあるアイコンをクリックしてください。

その後、OKを押すと下の様になるはずです。

![](/media/SnapCrab_NoName_2017-9-23_13-42-16_No-00.jpg)

サイザーというのは、wxWidgets独特のものですが、パーツを乗せる土台のようなものです。

ここに左のアイコンを選択してボタンなどを追加していきます。

このサイザーは1つしかものを置けませんが、複数に分割してくれるサイザーもあります。(一番下の右側ですね。後から変更もできます)

wxGlade:Treeのフレームのとこか、Designのとこを右クリックするとプレビューを表示することができメニューが現れます。

wxGlade:Treeのウィンドウで選択したプロパティがその右のウィンドウに表示されます。

サイザーならクラスをwxGridSizerやwxFlexGridSizerにするとグリッドの設定が増えます。 プレビューしたウィンドウを拡大縮小してみるとレイアウトの違いが判ると思います。

## ソースコードの出力

wxGlade:TreeのApplicationを選択してください。

するとPropertiesの表示が出力用の設定になります。

C++の場合以下の様に設定します。

![](/media/SnapCrab_NoName_2017-9-23_14-45-4_No-00.jpg)

エンコーディングはUTF-8にしといたほうがいいのかもしれないが、特にこのままで問題ない。 ちなみにCP932はShift-JISのことです。

ファイル名はこの名前がヘッダファイルにも適用されるので実際に使用するファイル名にしておくと後で楽です。

Code GenerationでSeparate file fo each classを選択すると出力パスはフォルダを選択しないといけないので再設定が必要です。
