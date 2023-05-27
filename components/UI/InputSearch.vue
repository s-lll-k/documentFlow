<script>
export default {};
</script>

<template>
    <div class="content">
        <SearchComponent width="250px" />
        <div class="content__buttons">
            <div>
                <img src="@/assets/images/applications/colocol.png" />
            </div>
            <div>
                <img src="@/assets/images/applications/settings.png" />
            </div>
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

        div {
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
}
</style>