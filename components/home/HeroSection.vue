<template>
    <div class="bg w-full pt-20">
        <NuxtLayout name="section">
            <div class="flex">
                <div class="lg:w-1/2 mt-20 text-center lg:text-left">
                    <h1 class="font-bold">Tambores Industriales</h1>
                    <h2 class="mb-4 -mt-1 lg:-mt-4 italic">Un mundo de diferencia</h2>
                    <p class="mb-10 text-lg">
                        Desde 1989 trabajamos con envases para la industria química y alimentaria. Ofrecemos soluciones
                        en envases metálicos y plásticos para el almacenamiento y transporte de productos.
                    </p>
                    <UiButton primary class="m-auto lg:m-0" link="/servicios"> Nuestros Servicios </UiButton>
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

        @media (max-width: 1024px) {
            background-position: left;
        }
    }
</style>
