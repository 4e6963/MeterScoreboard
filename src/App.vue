<script setup lang="ts">
import Scorecard from "./components/scorecard.vue";
import {onMounted, ref} from "vue";
import {Association} from "./model/Association.ts";

const associations = ref<Association[]>([]);

function addAssociation() {
  associations.value.push(new Association("Neuer Verein"));
}

function deleteAssociation(association: Association) {
  const index = associations.value.indexOf(association);
  if (index > -1) {
    associations.value.splice(index, 1);
  }
}

function saveScores() {
  localStorage.setItem("scores", JSON.stringify(associations.value));
}

function loadScores() {
  const payload = localStorage.getItem("scores");
  if ("string" !== typeof payload) {
    return
  }
  let payloadObject = JSON.parse(payload) as any[];
  associations.value = payloadObject.map(item => Object.assign(new Association(), item) as Association)
}

onMounted(() => {
  loadScores()
})

</script>

<template>
  <div class="card-grid">
    <scorecard v-for="(association, i) in associations"
               :tabindex="i + 1"
               :association="association"
               @changed="saveScores"
               @delete="deleteAssociation(association)"/>
  </div>
  <div class="add" @click="addAssociation">+</div>
</template>

<style scoped>
.card-grid {
  display: flex;
  flex-flow: row wrap;
}

.add {
  background-color: var(--card-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;
  margin: .5rem;
  user-select: none;
  font-weight: bold;
}
</style>
