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
        GROUND_WIDTH: 16,
        GROUND_HEIGTH: 3,
        GROUND_SIZE:'100%',
        ROCK_SIZE:`${1/16}%`,
        rockPoint:[],
        result:{},
        ID: 3,
    }
  },
  mounted() {
    window.app = this;
    this.createRocksData();
    this.initializeContainer();
    this.createWall();
    //   this.fillRocks(11,3,'测',44)
    document.addEventListener("keydown", e => {
        switch (e.key.toLocaleUpperCase ()){
            case "ARROWRIGHT":
            case 'D':
            console.log(e.key) ;
            this.turn(3);
            break;
            case "ARROWLEFT":
            case 'A':
            console.log(e.key);
            this.turn(-3);
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
        }
      });


      this.changeRocksContent('[',1)
      this.changeRocksContent('赶',4)
      this.changeRocksContent('快',7)
      this.changeRocksContent('开',10)
      this.changeRocksContent('门',13)
      this.changeRocksContent('出',16)
      this.changeRocksContent('去',19)
      this.changeRocksContent('吧',22)
      this.changeRocksContent('...',25)
      this.changeRocksContent('...',28)
      this.changeRocksContent(']',31)
      this.changeRocksContent('我',3)
      this.changeRocksContent('在',6)
      this.changeRocksContent('心',9)
      this.changeRocksContent('里',12)
      this.changeRocksContent('对',15)
      this.changeRocksContent('着',18)
      this.changeRocksContent('自',21)
      this.changeRocksContent('己',24)
      this.changeRocksContent('说',27)
      this.changeRocksContent('，',30)
      this.changeRocksContent('并',33)
      this.changeRocksContent('举',36)
      this.changeRocksContent('步',39)
      this.changeRocksContent('向',42)
      this.changeRocksContent('前',45)
      this.changeRocksContent('。',48)
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
        changeRocksContent(world,id){
            let changeContent = document.getElementById(id);
            changeContent.innerHTML = world;
        },
        //移动
        turn(z){
            let futureMe = document.getElementById(`${this.ID + z}`);
            if(this.ID + z <= 48 
            && this.ID + z > 0 
            && futureMe.innerHTML === ''){
                this.changeRocksContent('我',`${this.ID + z}`)
                this.changeRocksContent('',this.ID)
                this.ID += z;
            }else return
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