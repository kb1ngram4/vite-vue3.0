<template>
  <div>
    <!-- 树形结构拖拽组件 -->
    <nested-draggable :list="treeData" />
  </div>
</template>

<script>
import { ref } from 'vue';
import draggable from 'vuedraggable';

export default {
  components: {
    // 递归组件
    nestedDraggable: {
      props: ['list'],
      template: `
        <draggable
          v-model="list"
          group="tree"
          item-key="id"
          @start="onDragStart"
          @end="onDragEnd"
          :animation="200"
          :ghost-class="'ghost-class'"
        >
          <template #item="{ element }">
            <div class="tree-node">
              <div class="node-content">{{ element.name }}</div>
              <!-- 递归渲染子节点 -->
              <nested-draggable
                v-if="element.children"
                :list="element.children"
              />
            </div>
          </template>
        </draggable>
      `,
      components: {
        draggable,
      },
      methods: {
        onDragStart(event) {
          console.log('开始拖拽', event);
        },
        onDragEnd(event) {
          console.log('拖拽结束', event);
        },
      },
    },
  },
  setup() {
    // 树形结构数据
    const treeData = ref([
      {
        id: 1,
        name: '节点 1',
        children: [
          {
            id: 2,
            name: '节点 1.1',
            children: [
              { id: 3, name: '节点 1.1.1' },
              { id: 4, name: '节点 1.1.2' },
            ],
          },
          { id: 5, name: '节点 1.2' },
        ],
      },
      {
        id: 6,
        name: '节点 2',
        children: [
          { id: 7, name: '节点 2.1' },
          { id: 8, name: '节点 2.2' },
        ],
      },
    ]);

    return {
      treeData,
    };
  },
};
</script>

<style scoped>
.tree-node {
  margin-left: 20px;
  padding: 5px;
  border-left: 1px dashed #ccc;
}

.node-content {
  padding: 5px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: move;
}

.ghost-class {
  opacity: 0.5;
  background-color: #c8ebfb;
}
</style>