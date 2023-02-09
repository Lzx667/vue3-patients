<script setup lang="ts"></script>

<template>
  <div class="msg msg-illness">
    <div class="patient van-hairline--bottom">
      <p>李富贵 男 31岁</p>
      <p>一周内 | 未去医院就诊</p>
    </div>
    <van-row>
      <van-col span="6">病情描述</van-col>
      <van-col span="18">头痛、头晕、恶心</van-col>
      <van-col span="6">图片</van-col>
      <van-col span="18">点击查看</van-col>
    </van-row>
    <div class="msg msg-tip">
      <div class="content">
        <span class="green">温馨提示：</span>
        <span>在线咨询不能代替面诊，医护人员建议仅供参考</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/room/room.scss';
</style>
