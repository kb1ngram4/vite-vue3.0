<template>
  <div>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="item.id"
        draggable="true"
        @dragstart="handleDragStart(index)"
        @dragover.prevent="handleDragOver(index)"
        @drop="handleDrop(index)"
        :class="{ 'dragging': draggingIndex === index }"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const items = ref([
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      { id: 4, text: 'Item 4' },
      { id: 5, text: 'Item 5' },
    ]);

    const draggingIndex = ref(null);

    const handleDragStart = (index) => {
      draggingIndex.value = index;
    };

    const handleDragOver = (index) => {
      if (draggingIndex.value !== null && draggingIndex.value !== index) {
        const draggedItem = items.value.splice(draggingIndex.value, 1)[0];
        items.value.splice(index, 0, draggedItem);
        console.log(items.value);
        
        draggingIndex.value = index;
      }
    };

    const handleDrop = () => {
      draggingIndex.value = null;
    };

    return {
      items,
      draggingIndex,
      handleDragStart,
      handleDragOver,
      handleDrop,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: move;
}

.dragging {
  opacity: 0.5;
}
</style>