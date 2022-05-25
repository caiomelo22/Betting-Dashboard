<template>
  <div>
    <span
      v-if="FieldTitle"
      class="text-field-label"
      :class="{ 'after-outer-text': Type == numberFieldEnum.Currency }"
    >{{ FieldTitle }}</span>
    <div :class="{ 'col-flex': Type == numberFieldEnum.Currency }">
      <span
        v-if="Type == numberFieldEnum.Currency"
        class="text-field-outer-text"
      >$</span>
      <v-text-field
        v-model="value"
        outlined
        dense
        filled
        :rules="Required ? [validationService.required(value)] : []"
        type="number"
        class="text-field"
        :disabled="Disabled"
      />
    </div>
  </div>
</template>
<script src="./index.js"></script>
