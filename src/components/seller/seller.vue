<template>
    <full-calendar :events="fcEvents"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
      <!-- 1. slot组件插入 -->
       <p slot='fc-header-left'>left</p>
       <p slot='fc-header-right' class="header-right">right</p>
        <template slot="fc-event-card" scope="p">
            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
        </template>
      </full-calendar>
</template>
<script>

let demoEvents = [
    {
      title: '洗衣服 725-727',
      start: '2017-02-25',
      end: '2017-02-27',
      cssClass: 'family'
    },
    {
      title: '锻炼 726-727',
      start: '2018-05-26',
      end: '2018-05-27',
      cssClass: ['home', 'work']
    },
    {
      title: '睡觉 2/27-2/28',
      start: '2018-02-27',
      end: '2018-02-28'
    },
    {
        title: '吃饭 2/27-2/28',
        start: '2018-02-27',
        end: '2018-02-28'
    },
    {
        title: '打游戏 2/27-2/28',
        start: '2018-02-27',
        end: '2018-02-28'
    },
    {
        title: '想家 2/26-3/05',
        start: '2018-02-26',
        end: '2018-03-05'
    },
    {
        title: '游玩 1/27-1/28',
        start: '2018-01-27',
        end: '2018-01-28'
    },
    {
        title: '陪妹子 1/27-2/2',
        start: '2018-01-27',
        end: '2018-02-02'
    },
    {
        title: '逛街 3/27-3/28',
        start: '2018-03-27',
        end: '2018-03-28'
    }
  ];
 export default {
    data() {
        return {
            fcEvents: demoEvents
        };
    },
    methods: {
    'changeMonth' (start, end, current) {
      console.error(start, end, current);
      console.log('changeMonth', start.format(), end.format(), current.format());
    },
    'eventClick' (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos);
    },
    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent);
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent);
    }
    }

 };

</script>

<style scoped>
    .header-right {
      text-align: right;
    }
</style>/*假如代码到此结束，那么必须在下面加一行空行*/
