<template>
    <div class="bg w-full pt-20">
        <NuxtLayout name="section">
            <div class="flex">
                <div class="w-1/2 mt-20">
                    <h1 class="font-bold mb-2">Tambores Industriales</h1>
                    <h2 class="mb-10">
                        34 años ofreciendo calidad en elaboración, ensamble y reacondicionamiento de canecas metálicas,
                        cumpliendo todas las normas ambientales.
                    </h2>
                    <UiButton primary>Nuestros Servicios</UiButton>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
    .bg {
        background: no-repeat;
        background-image: url("/home/hero-section-bg.webp");
        background-size: cover;
        background-position: center;
        height: 760px;
    }
</style>
