<template>
  <div>
    <AppDrop @drop="moveTaskOrColumn">
      <AppDrag
        :transferData="{
          type: 'task',
          fromColumnIndex: columnIndex,
          fromTaskIndex: taskIndex
        }"
        class="task"
        @click="goToTask(task)"
      >
        <span class="w-full flex-shrink-0 font-bold">
          {{ task.name }}
        </span>
        <p v-if="task.description" class="w-full flex-shrink-0 mt-1 text-sm">
          {{ task.description }}
        </p>
      </AppDrag>
    </AppDrop>
  </div>
</template>

<script>
import movingTasksAndColumns from '../mixins/movingTasksAndColumnsMixin'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
export default {
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [movingTasksAndColumns],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }
  }
}
</script>

<style lang="css" scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
