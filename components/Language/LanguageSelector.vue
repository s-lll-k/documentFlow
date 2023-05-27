<script>
export default {
    data() {
        return {
            languages: ["KZ", "RU", "EN"],
            selectedLanguage: 0,
        };
    },
    methods: {
        selectLanguage(i) {
            this.selectedLanguage = i;
        },
    },
};
</script>

<template>
    <div class="languages">
        <div
            v-for="(lang, index) in languages"
            :key="index"
            :class="{ active: selectedLanguage === index }"
            @click="selectLanguage(index)"
            class="languages__item"
        >
            {{ lang }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.languages {
    display: flex;
    align-items: center;

    position: absolute;
    top: 78px;
    right: 78px;

    &__item {
        cursor: pointer;
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;
        color: #6b6b6b;
        margin-right: 10px;

        &:last-of-type {
            margin-right: 0;
        }
    }
    .active {
        color: red !important;
    }
}
</style>
