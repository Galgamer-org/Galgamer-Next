---
title: 'COSPLAY LOVE! : Enchanted Princess'
keywords: 'Emote, 单女主, Cosplay, 动态立绘'
banner_img: ../image/cosplaylove/banner.webp
index_img: ../image/cosplaylove/cover.webp
tags:
  - 巨乳
  - 纯爱
  - cosplay
  - 大小姐
categories:
  - [R-18]
  - [游戏公司, Confiture]
abbrlink: 55879
author: 木衛一
excerpt: Galgame版恋上换装娃娃
date: 2024-1-13 00:30:00
---

`作者：木衛一`

社畜凭借一手绝活拐走千金大小姐

![Cover](../image/cosplaylove/cover.png)

| 資訊一覽     |                 |
| :----------: | :------------------------------------ |
| **開發商**   | Confiture |
| **攻略人數** |   1    |
| **遊戲時長** | 3-5h |
| **結局數** | 2      |
| **難度**     |  低  |
| **分級**     | R-18      |
| **遊戲引擎**   | Animated by E-mote |


## 故事梗概

一无所成。
似乎只有这个词能描述自己如今的状态。
作为饰品设计师入职已然数年，但回顾过去，能想的只有埋首案牍苦思冥想的烦恶，
和设计稿一遍遍被打回的压抑。
好像推著巨石上山的西西弗斯，
在一次次巨石滾落的失敗中開始困惑自己所作所爲有何意義。

“不能再这样下去了”
察觉到自己热情的消退，我的内心不由得的惶恐起来。
我迫切地需要什么来激发我的灵感，唤起我入职时的激情与创造力。
为此，我以个人身份，参加了动画《Time’s Aegis》的同人活动。

在同人活动的会场上，一位少女俘获了我的目光。
她举止拘谨，或许是因为陌生的环境让她不知所措。
但这些却丝毫无损于她惊艳的美貌，精致的服饰，
以及言行举止之中对《Time’s Aegis》超人的热忱。

在活动结束后，我抓住机会和她攀谈。
交流中，我得知原来她的cos服一针一线都是自己亲手裁制。
为了能够最大程度的还原角色，她在每处细节都颇下苦功。

![Intro](../image/cosplaylove/intro.jpg)

只是在配饰方面，始终不得要领。

本以为这次邂逅就将如此结束，但在某天走进附近的咖啡店时，意外地，一位美麗的女性向我搭話。

![Intro](../image/cosplaylove/intro2.jpg)

命运的齿轮开始转动。

## 登场人物

<style>
  .charname {
    font-size: 150%;
  }
  .namearea hr {
    margin: 1rem 0;
  }
  .sp-character img, .img-shade {
    filter: drop-shadow(0 0 6px #000c);
  }
  .sp-character {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 5px 11px 0 rgb(0 0 0 / 18%), 0 4px 15px 0 rgb(0 0 0 / 15%);

    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    
    background-color: var(--chara-card-color);
    
    /* background-color: transparent;
    background-image: var(--this-bg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */

  }
  .sp-character .char-overlay {
    background-color: var(--chara-card-color);
    min-height: 400px;
    background-image: var(--right-bg);
    background-repeat: no-repeat;
    background-position: top 0px right calc(100% * 0.3 - 130px);
    background-size: auto 480px;

    margin: 0;
    padding: 0;
  }
  :root { /* 配色 */
    --chara-card-color: #ffffffcf;
  }
  [data-user-color-scheme='dark'] {
    --chara-card-color: #1a1a1aa6;
  }
  @media screen and (max-width: 767px) {
    .namearea hr {
      margin: 0.75rem 0;
    }
    .pc-left {
      -webkit-backdrop-filter: blur(3px);
      backdrop-filter: blur(3px);
      
      background: var(--chara-card-color);
      transition: opacity 0.3s;
    }
    .pc-left.touch {
      opacity: 0.1;
    }
    .sp-character {
     /*background: unset;*/
      /*-webkit-backdrop-filter: unset;
    backdrop-filter: unset;*/
    }
    .sp-character .char-overlay {
      min-height: unset;
      background-size: cover;
      background-position: top 0px right 0px; 
    }
    :root { /* 配色 */
      --chara-card-color: #ffffff87;
    }
    [data-user-color-scheme='dark'] {
      --chara-card-color: #1a1a1aa6;
    }
  }
</style>

{% template sp-character name no yomi CV uid html %}
<div class={`row sp-character ${uid}`} style={`--this-bg: url(../image/cosplaylove/chars/${no}b.webp)`}>
  <div class="col-12 char-overlay row" style={`--right-bg: url(../image/cosplaylove/chars/${no}.webp)`}>
    <div class="pc-left col-12 col-md-8">
      <div class="namearea col-12 pt-2">
        <div class="charname font-serif font-weight-bold font-italic">
          {name}
        </div>
        <div class="yomi font-italic">
          {yomi}
        </div>
        <div class="">
          CV: {CV}
        </div>
        <hr />
      </div>
      <div class="infoarea col-12" html={html}>
      </div>  
    </div>
  </div>  
</div>
{% endtemplate %}

<sp-character no=0 name="御月 千代" yomi="MIZUKI CHIYO" CV="野中みかん" uid="mizuki">

  <p>
   本作女主角，现役女子大生。<br>
   当地华族御月家的千金。<br>
  </p>
  <p>
   是一位有大和抚子气质的美少女<br>
   着迷于动画 TA，也因此迷上了 Cosplay<br>
   但家里人却不太认同这种不甚体面的爱好<br>
  </p>
  <p>
   目前正瞒着爸妈偷偷参加 Cosplay 活动<br>
   cos 服则凭借着自己精妙的裁缝技巧手制<br>
   为了能更好的还原角色，她找上男主角，<br>
   希望能由身为专业人士的主角制作角色配饰<br><br>
  </p>

</sp-character>

## 游戏 CG（不含 R-18）

![](../image/cosplaylove/cg/01.webp)

![](../image/cosplaylove/cg/02.webp)

![](../image/cosplaylove/cg/03.webp)

![](../image/cosplaylove/cg/04.webp)

![](../image/cosplaylove/cg/05.webp)

## 试玩

<video controls preload="metadata" width='100%' poster="../image/cosplaylove/cover.webp">
<source src="https://storage-zone0.galgamer.eu.org/video-2d35/cosplay-love/movie.mp4" type="video/mp4"/>
<p> To view this video please enable JavaScript</p>
</video>

如果你仔细看 video 会发现游戏里有一段文本错误，这个 bug 在 Steam 上已经修复了，但目前流传的网路盗版都是有文本错误的版本。

## 简评

社团Confiture的第一部作品也是目前为止的唯一一部作品。游戏时长只有大约3小时，但在这三个小时中有4段H场景，内容丰富包括但不限于口交、乳交、女上位、后入等多种玩法。可以说是一部质量优秀的短篇萌拔类视觉小说游戏。

游戏有2个结局，normal end与ture end，区别在于女主最后有没有带你去见家长。剧情也是经典的boy meets girl，饰品设计师男主偶遇爱好 Cosplay 的千金大小姐御月千代，两人于是组队出cos，在一起准备cos服化道的过程在感情急剧升温，最后为了恋人~~激烈地打了四炮~~，女主成了地方知名的 Cosplayer，御月家最后也接受了女主的 Cosplay 爱好和倒插门的男主角。

游戏搭载了live2d，可惜的是只有对话时的立绘是动态的，H场景是静态的。不过动态立绘极其精致~~(同样是Emote制作的动态立绘，这质感比NinNinDay好得多了)~~。
值得一提的是设置里的“超分辨率”功能，玩家在增大窗口大小的同时图像和文本也会更随着会变得更为清晰，按推特宣传的说法目前仅此一家搭载了此功能。

![Comment](../image/cosplaylove/1.jpg)

推特宣传图之女仆装千代


## 资源和下载

本作在Steam上有发售，希望大家多多支持正版。

{% steam_widget 1770820 %}

However，如果你要白嫖的话：

[🔗OneDrive](https://www.shinnku.com/api/download/legacy/win/COSPLAY%20LOVE!%20%20Enchanted%20princess.7z)

<style>
details {
    border: 1px solid #aaa;
    border-radius: 4px;
    padding: .5em .5em 0;
}

summary {
    font-weight: bold;
    margin: -.5em -.5em 0;
    padding: .5em;
}

details[open] {
    padding: .5em;
}

details[open] summary {
    border-bottom: 1px solid #aaa;
    margin-bottom: .5em;
}
</style>

<script>
  //document.documentElement.setAttribute('data-user-color-scheme', 'dark');
  document.addEventListener("DOMContentLoaded", function(){
    let pclefts = document.querySelectorAll('.pc-left');
    pclefts.forEach((el) => {
      el.addEventListener('touchstart', function(){
        el.classList.add('touch');
      })
      el.addEventListener('touchend', function(){
        el.classList.remove('touch');
      })
    });
    //setTimeout(() => document.documentElement.setAttribute('data-user-color-scheme', 'light'), 1000)
  })
</script>
