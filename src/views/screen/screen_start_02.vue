<template>
    <div id="ground" ref="Rocks">
        <!-- <div><h1 @click="test()">233</h1></div> -->
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'gamescreen',
  components: {

  },
  data (){
    return {
        rocks: [],
        //整体场地方格
        GROUND_WIDTH: 16,
        GROUND_HEIGTH: 3,
        rockPoint:[],
        result:{},
        //初始化 '我' 的位置
        ID: 3,
        //场地生态
        String1: '[赶快开门出去吧……]',
        Start1:1,
        String2: '我在心里对自己说，并举步向前。',
        Start2:3,
        //触发点
        tp:'门',
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
            case "ARROWRIGHT":
            case 'D':
            console.log(e.key) ;
            this.turn(this.GROUND_HEIGTH);
            break;
            case "ARROWLEFT":
            case 'A':
            console.log(e.key);
            this.turn(-this.GROUND_HEIGTH);
            break;
            case "ARROWDOWN":
            case 'S':
            console.log(e.key);
            this.turn(1);
            break;
            case "ARROWUP":
            case 'W':
            console.log(e.key);
            this.turn(-1);
            break;
            case " ":
            case '0':
            console.log(e.key);
            this.judgment(this.tp)
            break;
        }
      });
      //将文本内容填充
      this.drawsimplerow(this.String1,this.Start1)
      this.drawsimplerow(this.String2,this.Start2)
    },
    methods:{
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
            this.$refs.Rocks.style.top = '280px';
            this.$refs.Rocks.style.left = '60px';
            this.$refs.Rocks.style.width = '100px';
            this.$refs.Rocks.style.height = '100px';
            this.$refs.Rocks.style.backgroundColor = 'black';
            this.$refs.Rocks.style.position = "relative";
            this.$refs.Rocks.style.display = "inline-block";
        },
        //画出每个小方格
        drawRocks(i,j){
            let rock = document.createElement("div");
            rock.style.width = '40px';
            rock.style.height = '40px';
            rock.style.backgroundColor = 'black';
            //找爸爸
            rock.style.position = "absolute";
            rock.style.top = `${j * 45}px`;
            rock.style.left = `${i * 45}px`;
            rock.style.textAlign = 'center';
            rock.style.fontSize = '30px';
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
        //移动
        turn(z){
            let futureMe = document.getElementById(`${this.ID + z}`);
            if(this.ID + z <= this.GROUND_WIDTH * this.GROUND_HEIGTH
            && this.ID + z > 0 
            && futureMe.innerHTML === ''){
                this.changeRocksContent('我',`${this.ID + z}`)
                this.changeRocksContent('',this.ID)
                this.ID += z;
            }else return
           
        },
        //判断触发
        judgment(t){
            let upMe = document.getElementById(`${this.ID - 1}`)
            let downMe = document.getElementById(`${this.ID + 1}`)
            let leftMe = document.getElementById(`${this.ID - this.GROUND_HEIGTH}`)
            let rightMe = document.getElementById(`${this.ID + this.GROUND_HEIGTH}`)
            if(this.ID + this.GROUND_HEIGTH > 0
            && this.ID - this.GROUND_HEIGTH > 0
            && this.ID + this.GROUND_HEIGTH <= this.GROUND_WIDTH * this.GROUND_HEIGTH
            && this.ID - this.GROUND_HEIGTH <= this.GROUND_WIDTH * this.GROUND_HEIGTH){
                if(upMe.innerHTML === t 
                || downMe.innerHTML === t 
                || leftMe.innerHTML === t 
                || rightMe.innerHTML === t ){
                    alert('You Win！')
                }else return
            }else return
        },
        //横向填充
        drawsimplerow(String,number){
            for(let i = 0; i < String.length; i++){
                this.changeRocksContent(String.charAt(i),number + i * this.GROUND_HEIGTH)
            }
        },
        //纵向填充
        drawsimplecolumn(String,number){
            for(let i = 0; i < String.length; i++){
                this.changeRocksContent(String.charAt(i),number + i)
            }
        },
    }
}
</script>

<style lang="scss">
html{
    background-color: black;
}
// #ground{
//     overflow: auto;
//     //属性控制元素在移动设备上是否使用滚动回弹效果.
//     -webkit-overflow-scrolling: touch;
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
//     overflow: auto;
//     height: 100vh;
//     width: 100vh;
// }



</style>