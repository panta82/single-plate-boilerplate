<template>
  <div class="Content">
    <a class="repo" href="https://github.com/panta82/single-plate-boilerplate" target="_blank">
      <img src="../assets/github.png" alt="github" />
    </a>
    <section v-if="blocks">
      <header>
        <h1>{{ boilerplate ? boilerplate.title : '' }}</h1>
        <h2>{{ boilerplate ? boilerplate.description : '' }}</h2>
      </header>

      <CodeBlock
        v-for="block in blocks"
        :key="block.name"
        :language="block.language"
        :title="block.title"
        :code="block.code"
        :instructions="block.instructions"
        :wrap="block.wrap"
      />
    </section>
  </div>
</template>

<script>
import CodeBlock from './widgets/CodeBlock.vue';

export default {
  name: 'Menu',
  components: {
    CodeBlock,
  },
  computed: {
    /** @return {CodeBlock[]} */
    blocks() {
      if (!this.boilerplate || !this.options) {
        return [];
      }

      const blocks = [];
      for (const block of this.boilerplate.blocks || []) {
        const display = !block.displayIf || block.displayIf(this.options, this.boilerplate);
        if (!display) {
          continue;
        }
        blocks.push({
          ...block,
          language: block.language(this.options),
          instructions: block.instructions(this.options),
          code: block.code(this.options),
        });
      }
      return blocks;
    },
  },
  props: ['boilerplate', 'options'],
};
</script>

<style scoped>
.Content {
  background: linear-gradient(to bottom, #596876 0%, #262c32 100%);
  min-height: 100%;
}

.repo {
  position: absolute;
  opacity: 0.5;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  transition: all 0.3s;
}
.repo:hover {
  opacity: 1;
}
.repo img {
  width: 100%;
  height: 100%;
}

h1 {
  color: #dfe3e4;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  margin: 0;
}
h2 {
  font-size: 1.1em;
  margin: 5px 0;
  color: #c5c9ca;
}

section {
  padding: 20px;
}

header {
  margin-bottom: 50px;
}

.CodeBlock {
  margin-top: 40px;
}
</style>
