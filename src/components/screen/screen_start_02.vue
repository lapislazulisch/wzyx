<template>
    <div id="ground" ref="Rocks">
    </div>
</template>

<script>

export default {
  name: 'gamescreen02',
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
        delay: 80,
        //初始化 '我' 的位置
        ID: 24,
        //场地生态
        String1: '房间外是一条长廊',
        Start1:5,
        String2: '这里没有什么东西',
        Start2:12,

        String3: '，黑漆漆的。',
        Start3: 149,
        String4: '，空荡荡的。',
        Start4: 156,

        String5: '不远处的长廊尽头隐约可见火光闪动。',
        Start5: 257,
        String6: '除了一步一步向前迈进没有其他办法。',
        Start6: 264,

        String7:'前进的不二法门，肯定是大步跨越。',
        Start7: 560,
        
        //触发点
        tp:'门',
    }
  },
  mounted() {
    this.createRocksData();
    this.initializeContainer();
    this.createWall();
    //监听键盘指令
    this.keyDownEvent = (event) => {this.keyDownEvents(event)}
    document.addEventListener("keydown",this.keyDownEvent);
    //将文本内容填充
    this.initializeRocks()
    this.changeRocksContent('我',this.ID)
    this.drawsimplerow(this.String1,this.Start1)
    this.drawsimplerow(this.String2,this.Start2)
    },
    beforeDestroy(){
        console.log('1');
        document.removeEventListener("keydown",this.keyDownEvent); 
    },
    methods:{
        initializeRocks(){
            this.ID = 24;
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
            rock.style.fontSize = '35px';
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
            let two = document.getElementById('149');
            let three = document.getElementById('267');
            let four = document.getElementById('560')
            if(this.ID + z <= this.GROUND_WIDTH * this.GROUND_HEIGTH
            && this.ID + z > 0 
            && futureMe.innerHTML === ''){
                this.changeRocksContent('我',`${this.ID + z}`)
                this.changeRocksContent('',this.ID)
                if(this.ID + z > 131 
                && this.ID + z < 137
                && two.innerHTML === ''){
                    this.drawsimplerow(this.String3,this.Start3); 
                    this.drawsimplerow(this.String4,this.Start4); 
                }
                if(this.ID + z > 257
                && this.ID + z < 264
                && three.innerHTML === ''){
                    this.drawsimplerow(this.String5,this.Start5); 
                    this.drawsimplerow(this.String6,this.Start6);
                }
                if(this.ID + z > 545
                && this.ID + z < 552
                && four.innerHTML === ''){
                    this.drawsimplecolumn(this.String7,this.Start7); 
                }
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
                    document.removeEventListener("keydown",this.keyDownEvent);   
                    alert('you win')
                }else return
            }else return
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
                setTimeout(() => this.changeRocksContent(String.charAt(i),number + i), i*this.delay)
            }
        },
        keyDownEvents(e){    
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
        }
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