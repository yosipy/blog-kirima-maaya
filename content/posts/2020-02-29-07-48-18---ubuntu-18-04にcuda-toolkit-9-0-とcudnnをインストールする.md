---
template: post
title: Ubuntu 18.04にCUDA Toolkit 9.0 とCuDNNをインストールする
socialImage: /media/nvidia.png
draft: false
date: 2020-02-29T07:42:45.218Z
description: |-
  CUDA Toolkit 9.0とCuDNN7 をインストールしていきます。

  特にCUDAインストールは、注意点があります。
category: プログラミング
series: ''
seriesNumber: 1
---
CUDA Toolkit 9.0とCuDNN7 をインストールしていきます。

特にCUDAインストールは、注意点があります。

参考：<https://medium.com/codezillas/step-by-step-guide-to-install-tensorflow-gpu-on-ubuntu-18-04-lts-6feceb0df5c0>

## CUDA Toolkit 9.0をインストール

CUDA Toolkit 9.0をインストールしていきます。

以下のリンクからダウンロードします。

<https://developer.nvidia.com/cuda-90-download-archive>

オペレーティング・システム→Linux Architecture→x86_64
Distribution→Ubuntu
Version→17.04
Installer Type →runfile(local)

と進み、下の「Base Installer」からダウンロードします。

![](/media/cuda9ver2.png)

Ubuntuのバージョンと違いますが、問題ありません。

ダウンロードしたら、ファイルのある場所に移動します。 

通常は「ダウンロード」フォルダにあると思います。

右クリックして、「端末で開く」をクリックします。 

もちろん、ターミナルで直接移動しても問題ありません。

CUDAをインストールするために以下のコマンドを実行してください。

```
sudo chmod +x cuda_9.0.176_384.81_linux.run
./cuda_9.0.176_384.81_linux.run --override
```

利用規約的なものが表示されるので、無心でエンターキーを押していきます。

終わると設定が出てくるので答えます。

注意ですが、「Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 384.81?」は「n(No)」にしてください。 

「Enter Toolkit Location」は空欄のままでエンターを押してください。
その他はYesで大丈夫です。

```
Do you accept the previously read EULA?
accept/decline/quit: accept

You are attempting to install on an unsupported configuration. Do you wish to continue?
(y)es/(n)o [ default is no ]: y

Install NVIDIA Accelerated Graphics Driver for Linux-x86_64 384.81?
(y)es/(n)o/(q)uit:  n   # <-  ***!注意!***

Install the CUDA 9.0 Toolkit?
(y)es/(n)o/(q)uit: y

Enter Toolkit Location
 [ default is /usr/local/cuda-9.0 ]: 

/usr/local/cuda-9.0 is not writable.
Do you wish to run the installation with 'sudo'?
(y)es/(n)o: y

Please enter your password: 
Do you want to install a symbolic link at /usr/local/cuda?
(y)es/(n)o/(q)uit: y

Install the CUDA 9.0 Samples?
(y)es/(n)o/(q)uit: y

Enter CUDA Samples Location
 [ default is /home/○○ ]: 
```

これで「/usr/local/cuda-9.0」にファイルが作成されました。 

見たければファイルソフトを開いて「他の場所→コンピュータ→usr→local」にある「cuda-9.0」というフォルダがそれです。

この場所に、パスを通していきます。

```
echo -e "\n## CUDA and cuDNN paths"  >> ~/.bashrc
echo 'export PATH=/usr/local/cuda-9.0/bin:${PATH}' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-9.0/lib64:${LD_LIBRARY_PATH}' >> ~/.bashrc
source ~/.bashrc
```

パスが通っているか確認します。

`echo $PATH`

「/usr/local/cuda-9.0/bin:/usr/local/sbin」と表示されれば大丈夫です。

## CuDNNをインストール

以下のサイトでCuDNN7をダウンロードします。

ダウンロードするためには、登録するしかありませんので、我慢して登録しましょう。

<https://developer.nvidia.com/cudnn>

「Download cuDNN v7.4.1 (Nov 8, 2018), for CUDA 9.0」の「cuDNN Library for Linux」をダウンロードします。

![](/media/Screenshot-from-2018-12-16-04-24-06.png)

端末でダウンロードフォルダに移動し、

```
＃アーカイブを解凍します。
tar -zxvf cudnn-9.0-linux-x64-v7.4.1.5.tgz
＃解凍した内容をCUDAディレクトリに移動します
sudo cp -P cuda/lib64/* /usr/local/cuda-9.0/lib64/
sudo cp cuda/include/* /usr/local/cuda-9.0/include/
＃すべてのユーザーに読み取り権限を与える
sudo chmod a+r /usr/local/cuda-9.0/include/cudnn.h
```

これで完了です。
