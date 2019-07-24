<template>
    <div id="app">
        <transition :name="animation">
            <router-view class="router"></router-view>
        </transition>
        <transition name="bottom__navigation">
            <nav id="bottom__navigation" v-if="getCurrentRouterLine.length > 1">
                <div
                    @click="pushToX(item.floor)"
                    :class="`navigation_item ${item.floor == getCurrentRouter.floor ? ' navigation_item-current' : ''}`"
                    v-for="(item,index) in getCurrentRouterLine"
                    :key="index"
                ></div>
            </nav>
        </transition>
        <nav id="right__navigation">
            <div
                @click="pushToY(item.deep)"
                :class="`navigation_item ${item.deep == getCurrentRouter.deep ? ' navigation_item-current' : ''}`"
                v-for="(item,index) in getRightNavigationList"
                :key="index"
            ></div>
        </nav>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Router } from "./routerData";
export default Vue.extend({
    data() {
        return {
            animation: "down",
            currentRouterX: 0,
            currentRouterY: 0,

            clear: true
        };
    },
    created() {
        var current: Router = this.getRouterPosition
            .flat()
            .find((x: Router) => x.path == this.$router.currentRoute.path);
        this.currentRouterX = current.floor || 0;
        this.currentRouterY = current.deep || 0;

        addEventListener("wheel", e => {
            if (e.deltaY > 0 && this.currentRouterY < this.getMaximumY - 1) {
                this.pushToY(this.currentRouterY + 1);
            } else if (e.deltaY < 0 && this.currentRouterY > 0) {
                this.pushToY(this.currentRouterY - 1);
            }
        });
        addEventListener("mousedown",e=>{

        })
    },
    methods: {
        pushToY(y: number, loop?: boolean) {
            if (this.clear || loop) {
                this.clear = false;
                this.currentRouterX = 0;
                var gap = y - this.getCurrentRouter.deep;
                if (gap < 0) this.animation = "up";
                else this.animation = "down";
                if (gap > 1) {
                    this.currentRouterY++;
                    this.$router.replace(this.getCurrentRouter.path);
                    setTimeout(() => {
                        this.pushToY(y, true);
                    }, 500);
                } else if (gap < -1) {
                    this.currentRouterY--;
                    this.$router.replace(this.getCurrentRouter.path);
                    setTimeout(() => {
                        this.pushToY(y, true);
                    }, 500);
                } else {
                    this.currentRouterY = y;
                    setTimeout(() => {
                        this.clear = true;
                    }, 500);
                    this.$router.replace(this.getCurrentRouter.path);
                }
            }
        },
        pushToX(x: number, loop?: boolean) {
            if (this.clear || loop) {
                this.clear = false;
                var gap = x - this.getCurrentRouter.floor;
                if (gap < 0) this.animation = "right";
                else this.animation = "left";
                if (gap > 1) {
                    this.currentRouterX++;
                    this.$router.replace(this.getCurrentRouter.path);
                    setTimeout(() => {
                        this.pushToX(x, true);
                    }, 500);
                } else if (gap < -1) {
                    this.currentRouterX--;
                    this.$router.replace(this.getCurrentRouter.path);
                    setTimeout(() => {
                        this.pushToX(x, true);
                    }, 500);
                } else {
                    this.currentRouterX = x;
                    setTimeout(() => {
                        this.clear = true;
                    }, 500);
                    this.$router.replace(this.getCurrentRouter.path);
                }
            }
        }
    },
    computed: {
        getMaximumX(): any {
            var max = 0;
            this.getRouterPosition.forEach(x => {
                if (x.length > max) max = x.length;
            });
            return max;
        },
        getMaximumY(): number {
            return this.getRouterPosition.length;
        },
        getCurrentRouter(): Router {
            return this.getRouterPosition[this.currentRouterY][
                this.currentRouterX
            ];
        },
        getCurrentRouterLine(): Router[] {
            return this.getRouterPosition[this.currentRouterY];
        },
        getRouterPosition(): any[] {
            return this.$store.state.routerPosition;
        },
        getRightNavigationList(): Router[] {
            return this.getRouterPosition.map((x: Router[]) => x[0]);
        }
    }
});
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.down-enter {
    transform: translateY(100%);
}
.down-leave {
    transform: translateY(0);
}
.down-enter-to {
    transform: translateY(0);
}
.down-leave-to {
    transform: translateY(-100%);
}
.up-enter {
    transform: translateY(-100%);
}
.up-leave {
    transform: translateY(0);
}
.up-enter-to {
    transform: translateY(0);
}
.up-leave-to {
    transform: translateY(100%);
}

.left-enter {
    transform: translateX(100%);
}
.left-leave {
    transform: translateX(0);
}
.left-enter-to {
    transform: translateX(0);
}
.left-leave-to {
    transform: translateX(-100%);
}
.right-enter {
    transform: translateX(-100%);
}
.right-leave {
    transform: translateX(0);
}
.right-enter-to {
    transform: translateX(0);
}
.right-leave-to {
    transform: translateX(100%);
}

.bottom__navigation-enter {
    transform: translateY(100%);
}
.bottom__navigation-leave {
    transform: translateY(0);
}
.bottom__navigation-enter-to {
    transform: translateY(0);
}
.bottom__navigation-leave-to {
    transform: translateY(100%);
}

#app {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
#bottom__navigation {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
}
#right__navigation {
    position: absolute;
    right: 0;
    height: 100%;
    width: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.navigation_item {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    margin: 5px;
    transition: 0.2s;
}
.navigation_item-current {
    width: 15px;
    height: 15px;
    background-color: rgba(0, 0, 0, 0.5);
}
.router {
    position: absolute;
    top: 0;
    left: 0;
    transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
