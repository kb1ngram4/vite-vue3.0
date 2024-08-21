<template>
    <!-- 立方体 -->
    <div class="cube">
        <div class="box">
            <div v-for="item in list" :class="item.name" class="item"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const list = reactive([
    { name: 'top' },
    { name: 'bottom' },
    { name: 'front' },
    { name: 'back' },
    { name: 'left' },
    { name: 'right' },
])
</script>
<style scoped>
.box {
    margin-top: 100px;
    position: relative;
    width: 200px;
    height: 200px;
    /* background-color: skyblue; */
    transform: rotate(45deg, 45deg);
    transform-style: preserve-3d;
    /* perspective: 200px; */
    /* transform-origin: (0,0); */
    transform: rotateX(-33.5deg) rotateY(45deg) scaleX(2);
}

.item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

}

.top {
    background-color: rgba(255, 0, 0, 1);
    transform: rotateX(90deg) translateZ(100px);
}

.bottom {
    background-color: rgba(0, 255, 0, 1);
    transform: rotateX(-90deg) translateZ(100px);
}

.front {
    background-color: rgba(100, 100, 100, 1);
    transform: rotateY(0deg) translateZ(100px);
}

.back {
    background-color: rgba(100, 100, 100, 1);
    transform: rotateY(-180deg) translateZ(100px);
}

.left {
    background-color: rgba(255, 255, 0, 1);
    transform: rotateY(-90deg) translateZ(100px);
}

.right {
    background-color: rgba(255, 255, 0, 1);
    transform: rotateY(90deg) translateZ(100px);
}
</style>