<script>
export default {
    data() {
        return {
        };
    },
};
</script>

<template>
    <div class="content">
        <div class="content__buttons">
            <button class="content__btn" v-if="$store.getters.GET_USER.userRole === 2">
                <img src="@/assets/images/applications/colocol.png" />
            </button>
            <button class="content__btn">
                <img src="@/assets/images/applications/settings.png" />
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 60px;
    &__buttons {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    &__btn {
        border-width: 0;
        border-radius: 50%;
        margin-right: 18px;
        background: white;
        width: 42px;
        height: 42px;

        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 23px;
            height: 23px;
            object-fit: cover;
        }

        &:last-of-type {
            margin-right: 0;
        }
    }
}
</style>