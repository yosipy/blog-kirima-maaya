---
template: post
title: wxWidgetsをインストールして初期設定をする Visual Studio 2017
socialImage: /media/SnapCrab_NoName_2017-7-29_0-56-5_No-00.jpg
draft: false
date: 2020-02-24T19:10:00.299Z
description: >-
  GUIアプリケーションを作成したいと思ったときに、少し調べれば様々なライブラリが見つかると思います。


  その中でも今回はwxWidgetsについて書こうと思います。


  クロスプラットフォームなGUIライブラリといえばQtなどが有名ですが、Qtはライセンス的にあまり使いたくない。（クロスプラットフォームとは複数のOSで動作することです）


  無料で使いたいし、ライセンス的にも難しいことを言われたくない。

  その上、定期的にメンテナンスされていて、バグが少なく、使いやすい。


  そんなご都合主義丸出しなライブラリがwxWidgetsです！
category: プログラミング
tags:
  - wxWidgets
seriesNumber: 1
---
GUIアプリケーションを作成したいと思ったときに、少し調べれば様々なライブラリが見つかると思います。

その中でも今回はwxWidgetsについて書こうと思います。

クロスプラットフォームなGUIライブラリといえばQtなどが有名ですが、Qtはライセンス的にあまり使いたくない。（クロスプラットフォームとは複数のOSで動作することです）

無料で使いたいし、ライセンス的にも難しいことを言われたくない。 その上、定期的にメンテナンスされていて、バグが少なく、使いやすい。

そんなご都合主義丸出しなライブラリがwxWidgetsです！

## wxWidgetsとは？

wxWidgetsはC++とPython用のクロスプラットフォームGUIライブラリです。（ PerlやRuby等にも対応してるようです。今回はC++を使います。）

対応OSはWindows、OS X(Mac OS)、Linuxなど向けのアプリケーションを作成できます。

ライセンスは非常に緩いことで有名で「wxWindows Library Licence」と「wxWindows Free Documentation License」の条文によってライセンスされています。

また、見た目もネイティブに寄せてくれるので非常に優秀ですね。

## wxWidgetsのインストール

まずは公式サイトの[ダウンロードページ](http://wxwidgets.org/downloads/)に行きます。

![](/media/SnapCrab_NoName_2017-7-29_0-48-15_No-00.jpg)

今回は3.1.0のバージョンを使うので「Latest Development Release: 3.1.0」→「Source Code」→「Windows Installer」と進んでダウンロードしてください。

「男ならパスを通して…」とか「バイナリを作成して」とか解説しているところもありましたが、せっかくインストーラを用意してくれているのでそれをおとなしく使いましょう。

ダウンロードしたファイルをダブルクリックします。

next→I accept the agreement→next→next→インストール場所を変えたければ変えてnext→Install→Next→Finish　と進みます。

これでインストールは完了です。

## VisualStudioで初期設定＆HelloWorld

VisualStudioをインストールしてない人は[こちら](http://codelabo.com/144/)を参考にインストールしてください。

まずファイルエクスプローラを開いて、C:\wxWidgets-3.1.0\build\mswにアクセスして、wx_vc14.slnをダブルクリックしてください。

![](/media/SnapCrab_NoName_2017-7-29_1-59-56_No-00.jpg)

すると何か出てくるのでOKを押します。

![](/media/SnapCrab_NoName_2017-7-29_2-1-44_No-00.jpg)

設定はDebugにしときます。

![](/media/SnapCrab_NoName_2017-7-29_2-26-4_No-00-300x131.jpg)

そして下の図のようにソリューションのビルドを行います。 

これ結構引っかかりました。

![](/media/SnapCrab_NoName_2017-7-29_2-5-14_No-00.jpg)

しかし、なぜか僕の環境ではエラー。。。\
ログファイルを見てみるとソリューションの再ターゲットをするといいとあるので、上記画像にも写ってるソリューションの再ターゲットを行う。\
その後にもう一度ソリューションのビルド。

今度は成功しました。めっちゃ親切ですね。\
設定をReleaseに変えてもう一度ビルドします。

C:\wxWidgets-3.1.0\libにvc_libというフォルダが作成されたかと思います。\
このフォルダは後の設定で使います。\
ここまで来たら1度VisualStudioは閉じても構いません。

VisualStudioを開いてファイル→新規作成→プロジェクトと進み、Visual C++でWin32プロジェクトを作成します（←大事）。\
ここでコンソールアプリケーション等を選択するとエラーが出て壮大にツボる可能性があります（僕みたく）。古い記事ではコンソールを選んでるんだけど仕様が変わったのかな？

![](/media/SnapCrab_NoName_2017-7-29_3-24-44_No-00.jpg)

空のプロジェクトにチェックを入れます。

![](/media/SnapCrab_NoName_2017-7-29_3-25-9_No-00.jpg)

ソースファイルを右クリックして追加→新しい項目と進んで.cppファイルを作成します。ファイル名は好きにしてください。

プロジェクト→”プロジェクト名”のプロパティを進みます。

インクルードファイルの設定です。\
左上の構成がアクティブ(Debug)になっていることを確認して、C++→全般と進み、追加のインクルードファイルのところをクリックしたら矢印が出るのでそれを押して、編集を押します。\
その後、以下の様にインクルードディレクトリを指定します。

![](/media/SnapCrab_NoName_2017-7-29_1-52-8_No-00.jpg)

次はライブラリのリンクの設定です。 

リンカー→全般→追加のライブラリディレクトリと進み、先ほど作成したvc_libのフォルダを指定します。

![](/media/SnapCrab_NoName_2017-7-29_2-38-26_No-00.jpg)

OKを押していくとすべての設定が終了しました。 デバッグ同様にリリースもインクルードファイルと追加のライブラリディレクトリの設定してください。

C++→全般からSDLチェックをいいえにしてください。 C++→詳細設定から指定の警告を無効にするに4996と入力してください。

以上で設定は終了です。

[公式サイトにあるサンプル](http://docs.wxwidgets.org/trunk/overview_helloworld.html)を動かしてみましょう。 下のコードを作成した.cppファイルにコピーします。

```cpp
// wxWidgets "Hello world" Program
// For compilers that support precompilation, includes "wx/wx.h".
#include <wx/wxprec.h>
#ifndef WX_PRECOMP
#include <wx/wx.h>
#endif
class MyApp : public wxApp
{
public:
    virtual bool OnInit();
};
class MyFrame : public wxFrame
{
public:
    MyFrame();
private:
    void OnHello(wxCommandEvent& event);
    void OnExit(wxCommandEvent& event);
    void OnAbout(wxCommandEvent& event);
};
enum
{
    ID_Hello = 1
};
wxIMPLEMENT_APP(MyApp);
bool MyApp::OnInit()
{
    MyFrame *frame = new MyFrame();
    frame->Show(true);
    return true;
}
MyFrame::MyFrame()
    : wxFrame(NULL, wxID_ANY, "Hello World")
{
    wxMenu *menuFile = new wxMenu;
    menuFile->Append(ID_Hello, "&Hello...\tCtrl-H",
        "Help string shown in status bar for this menu item");
    menuFile->AppendSeparator();
    menuFile->Append(wxID_EXIT);
    wxMenu *menuHelp = new wxMenu;
    menuHelp->Append(wxID_ABOUT);
    wxMenuBar *menuBar = new wxMenuBar;
    menuBar->Append(menuFile, "&File");
    menuBar->Append(menuHelp, "&Help");
    SetMenuBar(menuBar);
    CreateStatusBar();
    SetStatusText("Welcome to wxWidgets!");
    Bind(wxEVT_MENU, &MyFrame::OnHello, this, ID_Hello);
    Bind(wxEVT_MENU, &MyFrame::OnAbout, this, wxID_ABOUT);
    Bind(wxEVT_MENU, &MyFrame::OnExit, this, wxID_EXIT);
}
void MyFrame::OnExit(wxCommandEvent& event)
{
    Close(true);
}
void MyFrame::OnAbout(wxCommandEvent& event)
{
    wxMessageBox("This is a wxWidgets' Hello world sample",
        "About Hello World", wxOK | wxICON_INFORMATION);
}
void MyFrame::OnHello(wxCommandEvent& event)
{
    wxLogMessage("Hello world from wxWidgets!");
}
```

デバッグ→デバッグの開始を押します。

![](/media/SnapCrab_NoName_2017-7-29_3-45-30_No-00.jpg)

うまく動作しました！
