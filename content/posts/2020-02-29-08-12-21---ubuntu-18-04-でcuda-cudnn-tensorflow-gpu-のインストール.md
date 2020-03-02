---
template: post
title: 'Ubuntu 18.04 でCUDA, Cudnn, Tensorflow GPU のインストール'
socialImage: /media/colla.png
draft: false
date: 2020-02-29T07:57:42.290Z
description: >-
  CUDA, Cudnn、Tensorflowをインストールし、最終的にKerasを動かします。UbuntuのバージョンやCUDA,
  Cudnnのバージョン、Tensorflowのバージョンに悩まされ、環境構築だけで何日かければ気が済むのか。

  苦痛に耐え抜いた末にたどり着いた、環境構築手順をまとめておこうと思います。
category: プログラミング
tags:
  - Deep Learning
series: ''
seriesNumber: 1
---
今までで、一番環境構築に躓いたかもしれません。

テンション上がった日に何を考えたのかGeForce GTX 1060を購入し、デープラーニングを始めようと思ってしまったのが運の尽き。

UbuntuのバージョンやCUDA, Cudnnのバージョン、Tensorflowのバージョンに悩まされ、環境構築だけで何日かければ気が済むのか。 「お前達はまだ門の前にすら立てちゃいない」とは正にこのことです。

ってわけで、苦痛に耐え抜いた末にたどり着いた、環境構築手順をまとめておこうと思います。

## TensorFlow GPUの環境構築でとっても大事なこと

ハマった場所です。

というより、誰か教えてくれればこんなに苦労しなかったのに。。。って思ったことです。

まず、とにかく大事なのはそれぞれのバージョンです。

特に大事なのがCUDA, Cudnn, Tensorflowのバージョンの対応関係です。

以下のサイトで確認できます。

<https://www.tensorflow.org/install/source>

この関係を守らなければなりません。

また、CUDAはインストーラの種類をネットワークにするとCUDA10が強制インストールされるらしいので、ローカルを選びましょう。

Tensorflow 1.9.0から、CUDA9.2に対応しているらしいのですが、その場合、ソースからビルドしないといけないらしいです。おとなしくCUDA9.0を使いましょう。

Kerasを使う場合はこんなめんどくさいことをせずに、Condaを導入した後、1コマンドで環境が完成したかもしれない(泣きたい)。

この記事の最後の方に書いてます。

## Ubuntuのインストール

もうしている人は飛ばしてください。 簡単に説明します。

まずはファイルをダウンロードします。

僕はここからダウンロードしました。 <https://www.ubuntu.com/download/desktop>

次にお決まりのインストールUSBを作ります。

僕はRufusを使ってます。 インストール不要で便利です。
<https://rufus.ie/ja_JP.html>

起動して、デバイスにUSB、下の「選択」を押してダウンロードしたOSファイルを選択、あとはそのままでいいのでスタートを押します。 USBのデータが消えるので注意しましょう。

インストールUSBができたら、インストールしたいPCに挿し、電源を押してすぐにキーを連打（長押し）して、BIOSを起動します。 僕の環境(Gigabyte)では「F12」ですが、各自の環境でBIOS起動のキーは違うので調べてください。

BIOSに入ると起動するデバイスを聞かれるので、先程作ったUSBを選択します。

後は言われるがままに設定していけばインストール完了すると思います。

## Nvidiaのドライバインストール

まずは自分のGPUに合ったドライバを探します。

以下のサイトで自分のGPU情報を入力して検索すると、当てはまったバージョンが表示されます。 <https://www.nvidia.co.jp/Download/index.aspx?lang=jp>

僕の場合は、

製品のタイプ: Geforce 製品シリーズ: Geforce 10 Series
製品ファミリー:Geforce GTX 1060
オペレーティングシステム: Linux 64-bit
言語:Japanes

って感じで、「バージョン： 410.78」となってます。

![](/media/Screenshot-from-2018-12-16-02-23-37.png)

よって、バージョン410をインストールします。

リポジトリを追加します。 (分かっていると思いますが、端末を開いて打ち込みます。)

```
sudo add-apt-repository ppa:graphics-drivers/ppa
sudo apt update
```

別にしなくてもいいですが、推奨ドライバーは

`ubuntu-drivers devices`

で確認できます。

色んなサイトではapt-getでドライバーをインストールしてましたが、何故か僕の環境ではできなかったので、以下のコマンドでインストール。

`sudo apt install nvidia-driver-410`

これで完了です。

`sudo reboot`

などで再起動しましょう。

僕の場合はエラーが出ませんでしたが、エラーの出る場合はaptitudeで壊れた変更禁止パッケージを対処すると良いようです。

```
sudo apt install aptitude
sudo aptitude install nvidia-driver-410
sudo reboot
```

参考：<https://kinacon.hatenablog.com/entry/2018/10/31/141219>

きちんとインストールできたか、確認します。

`nvidia-smi`

と入力すると、

```
○○○○@○○○○○○-H87-D3H:~$ nvidia-smi
Sun Dec 16 01:50:28 2018       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 410.78       Driver Version: 410.78       CUDA Version: 10.0     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 106...  Off  | 00000000:01:00.0  On |                  N/A |
|  0%   50C    P0    24W / 120W |    156MiB /  6075MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|    0      1014      G   /usr/lib/xorg/Xorg                            86MiB |
|    0      1154      G   /usr/bin/gnome-shell                          68MiB |
+-----------------------------------------------------------------------------+
```

のように表示され、ドライバが入っているのが確認できます。

また、このコマンドでGPUにどのくらい負荷がかかっているのか確認できるので、学習中などによく使うと思います。

## CUDA Toolkitのインストール

参考：<https://medium.com/codezillas/step-by-step-guide-to-install-tensorflow-gpu-on-ubuntu-18-04-lts-6feceb0df5c0>

CUDAがすでにインストールしてある場合は、一度アンインストールします。

```
sudo apt-get --purge remove cuda
sudo apt autoremove
```

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

ダウンロードしたら、ファイルのある場所に移動します。 通常は「ダウンロード」フォルダにあると思います。

右クリックして、「端末で開く」をクリックします。 もちろん、ターミナルで直接移動しても問題ありません。

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

パスを通していきます。

```
echo -e "\n## CUDA and cuDNN paths"  >> ~/.bashrc
echo 'export PATH=/usr/local/cuda-9.0/bin:${PATH}' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-9.0/lib64:${LD_LIBRARY_PATH}' >> ~/.bashrc
source ~/.bashrc
```

パスが通っているか確認します。

`echo $PATH`

「/usr/local/cuda-9.0/bin:/usr/local/sbin」と表示されれば大丈夫です。

[Ubuntu 18.04にCUDA Toolkit 9.0 をインストールする](https://codelabo.com/1124/)

## CUDNN 7.0をインストール

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

完了です。

## libcuptiをインストール

`sudo apt-get install libcupti-dev`

## MiniCondaインストール

公式サイトからインストーラをダウンロードします。

<https://conda.io/miniconda.html>

![](/media/miniconda.png)

「Miniconda3-latest-Linux-x86_64.sh」のようなファイルがダウンロードされます。

`cd ダウンロード`

でファイルがダウンロードされたフォルダに移動します。

インストールするためのコマンドを入力します。

`bash Miniconda3-latest-Linux-x86_64.sh`

ライセンスに同意するか聞かれるので、下のように「yes」と入力します。

```
Do you accept the license terms? [yes|no]
[no] >>> conda install -c anaconda tensorflow-gpu 
Please answer 'yes' or 'no':'
>>> yes
```

インストールが終了し、Minicondaが実行された状態になります。

```
  - Press ENTER to confirm the location
  - Press CTRL-C to abort the installation
  - Or specify a different location below
```

と聞かれるので、エンターを押します。

パスを通すか聞かれるので板のようにyesと答えます。

```
Do you wish the installer to prepend the Miniconda3 install location
to PATH in your /home/○○/.bashrc ? [yes|no]
[no] >>> yes 
```

するとホームに「miniconda3」を言うフォルダが作成されます。

インストール完了です。

試しに端末でホームに行って、conda情報を表示してみましょう。

```
cd
conda info
```

次に環境の作成します。

環境の作成と有効化コマンドです。

```
#環境を作成
conda create -n keras36 python=3.6
# 有効化
source activate keras36
```

「keras36」は別の文字列でも構いません。

これで「keras36」という名前の環境が作られました。

「home/miniconda3/envs」にフォルダが作成されています。

## TensorFlow GPU のインストール

基本的にcondaとpipは混ぜないほうが良いらしいので、condaを使ってインストールします。

`conda install -c anaconda tensorflow-gpu`

これで終了です。

TensorFlow側からGPUを認識できているか確認します。

まず、端末に

`python`

と入力し、Pythonを起動させます。

次に、

```
from tensorflow.python.client import device_lib
device_lib.list_local_devices()
```

と入力すると、

```
>>> from tensorflow.python.client import device_lib
>>> device_lib.list_local_devices()
2018-12-16 07:21:00.861700: I tensorflow/core/platform/cpu_feature_guard.cc:141] Your CPU supports instructions that this TensorFlow binary was not compiled to use: SSE4.1 SSE4.2 AVX AVX2 FMA
2018-12-16 07:21:00.981687: I tensorflow/stream_executor/cuda/cuda_gpu_executor.cc:964] successful NUMA node read from SysFS had negative value (-1), but there must be at least one NUMA node, so returning NUMA node zero
2018-12-16 07:21:00.982461: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1432] Found device 0 with properties: 
name: GeForce GTX 1060 6GB major: 6 minor: 1 memoryClockRate(GHz): 1.759
pciBusID: 0000:01:00.0
totalMemory: 5.93GiB freeMemory: 5.49GiB
2018-12-16 07:21:00.982489: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1511] Adding visible gpu devices: 0
2018-12-16 07:21:01.220430: I tensorflow/core/common_runtime/gpu/gpu_device.cc:982] Device interconnect StreamExecutor with strength 1 edge matrix:
2018-12-16 07:21:01.220464: I tensorflow/core/common_runtime/gpu/gpu_device.cc:988]      0 
2018-12-16 07:21:01.220471: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1001] 0:   N 
2018-12-16 07:21:01.221496: I tensorflow/core/common_runtime/gpu/gpu_device.cc:1115] Created TensorFlow device (/device:GPU:0 with 5260 MB memory) -> physical GPU (device: 0, name: GeForce GTX 1060 6GB, pci bus id: 0000:01:00.0, compute capability: 6.1)
[name: "/device:CPU:0"
device_type: "CPU"
memory_limit: 268435456
locality {
}
incarnation: 13450465619506730274
, name: "/device:XLA_CPU:0"
device_type: "XLA_CPU"
memory_limit: 17179869184
locality {
}
incarnation: 7005398788790236954
physical_device_desc: "device: XLA_CPU device"
, name: "/device:XLA_GPU:0"
device_type: "XLA_GPU"
memory_limit: 17179869184
locality {
}
incarnation: 16309486260679671884
physical_device_desc: "device: XLA_GPU device"
, name: "/device:GPU:0"
device_type: "GPU"
memory_limit: 5515575296
locality {
  bus_id: 1
  links {
  }
}
incarnation: 7510805979581923165
physical_device_desc: "device: 0, name: GeForce GTX 1060 6GB, pci bus id: 0000:01:00.0, compute capability: 6.1"
]
```

「device_type: “GPU”」という記述があれば認識できています。

認識できていない場合は、

```
>>> from tensorflow.python.client import device_lib
>>> device_lib.list_local_devices()
2018-12-16 07:21:00.861700: I tensorflow/core/platform/cpu_feature_guard.cc:141] Your CPU suppor......
[name: "/device:CPU:0"
device_type: "CPU"
memory_limit: 268435456
locality {
}
]
```

のように「device_type」が「CPU」しか出てきません。

## Kerasのインストール

おまけです。

`conda install -c anaconda keras-gpu`

もしかすると、このコマンドだけでtensorflow-gpu や cudatoolkit、cudannなど GPU を使うために必要なを全てが入っちゃうみたいな記事を後々見つけた。

今回は、KerasではなくTensorFlowの環境の作り方がメインなのでいいが、もしこれだけで環境ができるのなら、今までの努力は何だったのかと言いたい。
