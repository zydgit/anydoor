<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>

</head>

<body>
  <div class="container">
    {{#each files}} 
      {{#if @last}}
      {{#if ../dir}}
        <div class="item item-prev">
          <a href="{{../prevDir}}" title="返回">←</a>
        </div>
        {{/if}} 
      {{else}}
      <div class="item">
        <image class="img-sm" src="{{icon}}" alt="图片未找到" />
        <a href="{{../dir}}/{{file}}" title="{{file}}">{{file}}</a>
      </div>
      {{/if}} 
    {{/each}}
    <div>
</body>
<style>
  div.container {
    width: 80%;
    margin: 60px auto;
    overflow: hidden;
  }

  .container .item {
    margin-top: 10px;
    float: left;
    width: 20%;
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .container .item-prev a {
    font-size: 30px;
    text-decoration: none;
    color: green;
    margin-left:10px;
  }

  .container .item .a {
    display: block;
    font-size: 25px;
  }

  .img-sm {
    display: inline-block;
    width: 40px;
    height: 40px;
  }
</style>

</html>