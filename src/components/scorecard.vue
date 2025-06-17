<script setup lang="ts">


import {Association} from "../model/Association.ts";
import {nextTick, ref} from "vue";

const props = defineProps({
  association: Association
})

const emit = defineEmits(['changed', 'delete'])

const nameInput = ref(null);

const editMode = ref(false)

function leftClick(e: MouseEvent) {
  if(e.shiftKey && (e.ctrlKey || e.metaKey)) {
    deletePrompt()
    return
  }

  if (!e.shiftKey && (e.ctrlKey || e.metaKey)) {
    enableEditMode()
    return
  }

  increase()
}

function increase() {
  if (!props.association || editMode.value) {
    return;
  }
  props.association.score++
  emit('changed')
}

function decrease() {
  if (!props.association || props.association.score < 1 || editMode.value) {
    return;
  }
  props.association.score--
  emit('changed')
}

function disableEditMode() {
  setTimeout(() => editMode.value = false, 100) //delay to not increase counter when blur click
}

function enableEditMode() {
  editMode.value = true
  nextTick(() => { //wait for input to be rendered
    if (nameInput.value) {
      (nameInput.value as any).focus();
    }
  })
}

function updateName(name: string) {
  if (props.association) {
    props.association.name = name
  }
  emit('changed')
}

function deletePrompt() {
  if(confirm(`Are you sure you want to delete "${props.association?.name}"?`)) {
    emit('delete')
  }
}
</script>

<template>
  <div class="card"
       v-if="!!association"
       @click="leftClick"
       @contextmenu.prevent="decrease">
    <div v-if="!editMode" class="name">{{ association?.name }}</div>
    <input type="text" v-if="editMode"
           ref="nameInput"
           @blur="disableEditMode"
           @keyup.enter="disableEditMode"
           @keyup.esc="disableEditMode"
           :value="association.name"
           @input="updateName(($event.target as any).value)"
    >
    <div class="score">{{ association.score }}</div>
  </div>
</template>

<style scoped>
.card {
  flex: 1 1 20rem;
  max-width: 35rem;
  min-width: 20rem;

  user-select: none;
  background-color: var(--card-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
}

input {
  font-size: 2rem;
}

.name {
  font-size: 2rem;
}

.score {
  font-size: 8rem;
}

</style>