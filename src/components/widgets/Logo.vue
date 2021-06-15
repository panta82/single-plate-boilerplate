<template>
  <div class="Logo">
    <p>Single</p>
    <p>Plate</p>
    <p>Boilerplate</p>
  </div>
</template>

<style scoped>
.Logo {
  color: var(--primary);
  text-transform: uppercase;
  font-family: Teko, sans-serif;
  font-weight: bold;
  width: calc(100% + 20px);
  margin-left: -10px;
  cursor: default;
}

.Logo > * {
  position: relative;
  padding: 0;
  margin: 0;
  text-align: center;
  /*-webkit-text-stroke-width: 2px;*/
  /*-webkit-text-stroke-color: var(--primary);*/
  /*-webkit-text-stroke-color: rgba(255, 255, 255, 0.5);*/
}

.Logo > :nth-child(1) {
  font-size: 85px;
  line-height: 70px;
}

.Logo > :nth-child(2) {
  font-size: 97px;
  line-height: 60px;
}

.Logo > :nth-child(3) {
  font-size: 45px;
  line-height: 35px;
}
</style>
