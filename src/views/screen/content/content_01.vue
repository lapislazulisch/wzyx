<template>
    <div id="ground" ref="Rocks">
    </div>
</template>

<script>

export default {
  name: 'gamescreen',
  components: {

  },
  data (){
    return {
        rocks: [],
        //整体场地方格
        GROUND_WIDTH: 32,
        GROUND_HEIGTH: 18,
        rockPoint:[],
        result:{},
        f: 2,
        delay: 80,
        DELAY: '',
        //场地生态
        String1_1: '这是我的房间。',
        Start1_1:61,
        String1_2: '有一张床，床边有一盏灯，等下有一个茶杯。',
        Start1_2:63,
        String1_3: '茶杯里有半杯水。▲',
        Start1_3:64,
        
        String2_1:'这是我的……房间？',
        Start2_1:61,
        String2_2:'墙上挂着一幅画，画着大大小小的方块',
        Start2_2:63,
        String2_3:'看不懂什么意思。▲',
        Start2_3:64,

        String3_1:'这是，我的房间。',
        Start3_1:61,
        String3_2:'阳光将熟悉的被窝晒的暖烘烘的，',
        Start3_2:63,
        String3_3:'让人忍不住想再多睡一下……▲',
        Start3_3:64,

        String4_1:'其实，我睡上一整天也没有关系。',
        Start4_1:61,
        String4_2:'毕竟没有什么非做不可的事情。',
        Start4_2:62,
        String4_3:'捕鱼，造船，卖东西都是别人的工作。▲',
        Start4_3:64,

        String5_1:'其实，我觉得航海可能蛮有趣的。',
        Start5_1:61,
        String5_2:'可以去很远的地方，认识什么是[远]。',
        Start5_2:62,
        String5_3:'不过航海和煮咖喱一样，都是别人的工作。▲',
        Start5_3:64,

        String6_1:'其实，我只要去小卖部晃一圈，然后回家。',
        Start6_1:61,
        String6_2:'把地下室的纸箱搬出来再放回去，一天就结束了。',
        Start6_2:62,
        String6_3:'想着这些有的没的事情，不知不觉就醒了。▲',
        Start6_3:64,

        String7_1:'也应该要出去了，没错。',
        Start7_1:61,
        String7_2:'我一边这么想着，一边缓缓的离开床铺',
        Start7_2:63,
        String7_3:'穿上一件伸出手就能碰到的大衣▲',
        Start7_3:64,

    }
  },
  mounted() {
    window.app = this;
    this.createRocksData();
    this.initializeContainer();
    this.createWall();
    //监听键盘指令
    document.addEventListener("keydown", e => {
        switch (e.key.toLocaleUpperCase ()){
            case " ":
            case 'ENTER':
            console.log(e.key);
            this.judgmentContent(this.f)
            break;
        }
      });
      //将文本内容填充
      this.DELAY = this.String1_1.length * this.delay + this.String1_2.length * this.delay + this.String1_3.length * this.delay
      this.initializeF(this.DELAY)
      this.drawsimplerow(this.String1_1,this.Start1_1)
      setTimeout(()=>this.drawsimplerow(this.String1_2,this.Start1_2), 
        this.String1_1.length * this.delay);
      setTimeout(()=>this.drawsimplerow(this.String1_3,this.Start1_3), 
        this.String1_1.length * this.delay + this.String1_2.length * this.delay);
    },
    methods:{
        //初始化
        initializeRocks(){
            for(let i = 0; i < this.GROUND_WIDTH * this.GROUND_HEIGTH; i++){
                this.changeRocksContent('',i+1)
            }
        },
        createRocksData(){
            this.Data = [];
            for (let i = 0; i < this.GROUND_WIDTH; i++) {
                let Ground = [];
                for (let j = 0; j < this.GROUND_HEIGTH; j++) {
                    Ground.push(null);
                }
                this.Data.push(Ground)
            }
            return this.Data;
            // console.log(this.data); this.data这个数组就是场地
        },
        //场地容器
        initializeContainer() {
            // this.$refs.Rocks.style.top = '280px';
            this.$refs.Rocks.style.left = '25px';
            // this.$refs.Rocks.style.width = '100px';
            // this.$refs.Rocks.style.height = '100px';
            this.$refs.Rocks.style.backgroundColor = 'black';
            this.$refs.Rocks.style.position = "relative";
            this.$refs.Rocks.style.display = "inline-block";
        },
        //画出每个小方格
        drawRocks(i,j){
            let rock = document.createElement("div");
            rock.style.width = '43px';
            rock.style.height = '43px';
            rock.style.backgroundColor = 'black';
            //找爸爸
            rock.style.position = "absolute";
            rock.style.top = `${j * 43}px`;
            rock.style.left = `${i * 43}px`;
            rock.style.textAlign = 'center';
            rock.style.fontSize = '37px';
            rock.style.color = 'white';
            this.$refs.Rocks.append(rock);
            return rock;
        },
        //为方格填充内容
        drawRock(i, j, world,id){
            let span = document.createElement("span");
            let text = document.createTextNode(world);
            let rock = this.drawRocks(i,j)
            span.setAttribute('id',`${id}`)
            span.appendChild(text);
            rock.appendChild(span);
        },
        //创建具体每个方格
        createWall(){
            for (let i = 0; i < this.GROUND_WIDTH; i++) {
                for (let j = 0; j < this.GROUND_HEIGTH; j++) {
                    this.drawRocks(i,j)
                    if(this.Data[i][j] == null) {
                        this.result = {
                            x: i+1,
                            y: j+1,
                            content: '',
                            id: this.rockPoint.length+1,
                        };
                        this.rockPoint.push(this.result);
                        this.drawRock(i,j,'',this.result.id)
                    }
                }
            }
        },
        //填充内容具体方法
        changeRocksContent(world,id){
            let changeContent = document.getElementById(id);
            changeContent.innerHTML = world;
        },
        //判断触发
        judgmentContent(f){
            switch (f){
            case 0:
            return;
            case 2:
            this.DELAY = this.String2_1.length * this.delay 
                        + this.String2_2.length * this.delay 
                        + this.String2_3.length * this.delay
            this.initializeF(this.DELAY)
            this.initializeRocks()
            this.drawsimplerow(this.String2_1,this.Start2_1)
            setTimeout(()=>this.drawsimplerow(this.String2_2,this.Start2_2), 
                this.String2_1.length * this.delay);
            setTimeout(()=>this.drawsimplerow(this.String2_3,this.Start2_3), 
                this.String2_1.length * this.delay 
                + this.String2_2.length * this.delay);
            break;
            case 3:
            this.DELAY = this.String3_1.length * this.delay 
                        + this.String3_2.length * this.delay 
                        + this.String3_3.length * this.delay
            this.initializeF(this.DELAY)
            this.initializeRocks()
            this.drawsimplerow(this.String3_1,this.Start3_1)
            setTimeout(()=>this.drawsimplerow(this.String3_2,this.Start3_2), 
                this.String3_1.length * this.delay);
            setTimeout(()=>this.drawsimplerow(this.String3_3,this.Start3_3), 
                this.String3_1.length * this.delay 
                + this.String3_2.length * this.delay);
            break;
            case 4:
            this.DELAY = this.String4_1.length * this.delay 
                        + this.String4_2.length * this.delay 
                        + this.String4_3.length * this.delay
            this.initializeF(this.DELAY)
            this.initializeRocks()
            this.drawsimplerow(this.String4_1,this.Start4_1)
            setTimeout(()=>this.drawsimplerow(this.String4_2,this.Start4_2), 
                this.String4_1.length * this.delay);
            setTimeout(()=>this.drawsimplerow(this.String4_3,this.Start4_3), 
                this.String4_1.length * this.delay 
                + this.String4_2.length * this.delay);
            break;
            case 5:
            this.DELAY = this.String5_1.length * this.delay 
                        + this.String5_2.length * this.delay 
                        + this.String5_3.length * this.delay
            this.initializeF(this.DELAY)
            this.initializeRocks()
            this.drawsimplerow(this.String5_1,this.Start5_1)
            setTimeout(()=>this.drawsimplerow(this.String5_2,this.Start5_2), 
                this.String5_1.length * this.delay);
            setTimeout(()=>this.drawsimplerow(this.String5_3,this.Start5_3), 
                this.String5_1.length * this.delay 
                + this.String5_2.length * this.delay);
            break;
            case 6:
            this.DELAY = this.String6_1.length * this.delay 
                        + this.String6_2.length * this.delay 
                        + this.String6_3.length * this.delay
            this.initializeF(this.DELAY)
            this.initializeRocks()
            this.drawsimplerow(this.String6_1,this.Start6_1)
            setTimeout(()=>this.drawsimplerow(this.String6_2,this.Start6_2), 
                this.String6_1.length * this.delay);
            setTimeout(()=>this.drawsimplerow(this.String6_3,this.Start6_3), 
                this.String6_1.length * this.delay 
                + this.String6_2.length * this.delay);
            break;
            case 7:
            this.DELAY = this.String7_1.length * this.delay 
                        + this.String7_2.length * this.delay 
                        + this.String7_3.length * this.delay
            this.initializeF(this.DELAY)
            this.initializeRocks()
            this.drawsimplerow(this.String7_1,this.Start7_1)
            setTimeout(()=>this.drawsimplerow(this.String7_2,this.Start7_2), 
                this.String7_1.length * this.delay);
            setTimeout(()=>this.drawsimplerow(this.String7_3,this.Start7_3), 
                this.String7_1.length * this.delay 
                + this.String7_2.length * this.delay);
            break;
            case 8:
            this.$router.push({
                path: 'puzzle_01'
            })
        }
        },
        //横向填充
        drawsimplerow(String,number){
            for(let i = 0; i < String.length; i++){
                setTimeout(() => this.changeRocksContent(String.charAt(i),number + i * this.GROUND_HEIGTH), i*this.delay);
                // this.changeRocksContent(String.charAt(i),number + i * this.GROUND_HEIGTH)
            }
        },
        //纵向填充
        drawsimplecolumn(String,number){
            for(let i = 0; i < String.length; i++){
                this.changeRocksContent(String.charAt(i),number + i)
            }
        },
        //重置f
        initializeF(DELAY){
            let IF = this.f;
            this.f = 0
            setTimeout(() => {this.f = IF+1;this.DELAY = ''}, DELAY);
        },
    }
}
</script>

<style lang="scss">
html{
    background-color: black;
}

</style>