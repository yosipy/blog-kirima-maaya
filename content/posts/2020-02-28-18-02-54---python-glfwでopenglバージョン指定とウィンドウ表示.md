---
template: post
title: Python GLFWでOpenGLバージョン指定とウィンドウ表示
socialImage: /media/dreams.png
draft: false
date: 2020-02-28T17:57:41.878Z
description: >-
  今回はまた下準備ですが、OpenGLのバージョン指定やウィンドウの表示をしていきます。OpenGLのバージョンは非常にややこしいのですが、最近のバージョンはかなりややこしさが軽減されていて助かります。PythonでGLFWを用いてコンテキストにOpenGLのバージョン4.0を指定し、ウィンドウを表示していきます。
category: プログラミング
tags:
  - Python
  - OpenGL
  - CG - Computer Graphics
series: Python3で始めるOpenGL4
seriesNumber: 2
---
第2回です。

どうも、ゆるキャン△を観たからではないですが、唐突にゴールデンウィークにキャンプを企画したyosiです。

今回はまた下準備ですが、OpenGLのバージョン指定やウィンドウの表示をしていきます。

OpenGLのバージョンは非常にややこしいのですが、最近のバージョンはかなりややこしさが軽減されていて助かります。

## まずはOpenGLのバージョンを指定

```cpp
glfw.init()
window = glfw.create_window(640, 480, 'Hello World', None, None)
glfw.make_context_current(window)
```

でコンテキストを作成した後、

```cpp
glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 4)
glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 0)
glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)
```

とOpenGL4.0のコアプロファイルを指定します。

コアプロファイルを指定することで、今はもう使われない古い関数を使えなくなります。

OpenGLが2.xにバージョンアップしたときに増えすぎた一部の関数が削除されました。

しかし、OpenGLは古いバージョンとの互換性を保つために、プログラマが非推奨となった関数を使えるようにしています。

余談ですが、OpenGLには拡張機能というものがあって、より新しいバージョンの一部機能を使うこともできます。

OpenGL3.3は既存のGPUハードウェアでOpenGL 4.0 機能を最大限サポートする物だということを初めて知りました。

まぁ、この辺は頭の中が大混乱する元（その上現代においてほとんど収穫がない）ので、OpenGLに慣れてきてそれでも気になった時か、必要に駆られたときに調べればいいと思います。

## ウィンドウを表示しよう

次にウィンドウを表示していきます。

```cpp
while not glfw.window_should_close(window):
    # バッファを指定色で初期化
    glClearColor(1, 0, 0, 1)
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

    # バッファを入れ替えて画面を更新
    glfw.swap_buffers(window)

    # イベントを受け付けます
    glfw.poll_events()
```

このwhileが描画を行うメインループになります。

glClearColor(1, 0, 0, 1)でバッファの初期化時の色を赤にして、glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)で初期化します。

先ほどからバッファという言葉が出てきてますが、イメージで説明するとこんな感じになります。

![](/media/SwapBuffer.png)

フロントバッファは画面に映っているものです。

初期化されるのはバックバッファになります。

この2つををglfw.swap_buffers(window)によって入れ替えることで画面を更新していきます。

どうしてこんなことをしているかというと、バッファに入っているデータは左上から順に更新されていくからです。

すると上の図でいえば上は青い画像の一部が表示されているのに、下にはオレンジの画像が表示されているというようなことになってしまいます。

glfw.swap_buffers()を使うことによって、一瞬でぱっと画面の表示を変えることができます。

## ソースコードまとめ

ここまでのコードをまとめるとこんな感じです。

```cpp
# OpenGLとGLFWをインポートします
from OpenGL.GL import *
import glfw


def main():
    # GLFW初期化
    if not glfw.init():
        return

    # ウィンドウを作成
    window = glfw.create_window(640, 480, 'Hello World', None, None)
    if not window:
        glfw.terminate()
        print('Failed to create window')
        return

    # コンテキストを作成
    glfw.make_context_current(window)

    # バージョンを指定
    glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 4)
    glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 0)
    glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)

    while not glfw.window_should_close(window):
        # バッファを指定色で初期化
        glClearColor(1, 0, 0, 1)
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)

        # バッファを入れ替えて画面を更新
        glfw.swap_buffers(window)

        # イベントを受け付けます
        glfw.poll_events()

    # ウィンドウを破棄してGLFWを終了
    glfw.destroy_window(window)
    glfw.terminate()


# Pythonのメイン関数はこんな感じで書きます
if __name__ == "__main__":
    main()

```

## 結果

![](/media/SnapCrab_NoName_2018-4-27_0-13-49_No-00.png)

赤色で初期化されたウィンドウが表示されましたね。

なお、今回使っているGUIライブラリはGLFWですので、その関連で悩んだ時には[GLFWの公式ドキュメント](http://www.glfw.org/documentation.html)を見ることをお勧めします。

C++向けのドキュメントですので、命名法則や引数など若干の違いはありますが役に立つと思います。
