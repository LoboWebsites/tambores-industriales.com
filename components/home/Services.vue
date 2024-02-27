<template>
    <NuxtLayout name="section">
        <div>
            <div class="m-auto text-center mb-20">
                <h2 class="font-bold mb-4">Nuestros Servicios</h2>
                <p>
                    Ofrecemos a nuestros clientes tambores metálicos abiertos y cerrados de 55 galones y IBC plásticos
                    de 1.000 litros, dando un excelente servicio de calidad.
                </p>
            </div>

            <div class="grid grid-cols-3 gap-10 mb-20">
                <div v-for="block in blocks" class="text-center">
                    <img :src="block.image" alt="imagen-servicio" class="w-40 h-40 rounded-md shadow-md m-auto" />
                    <h2 class="font-bold my-2">{{ block.title }}</h2>
                    <p>
                        {{ block.subtitle }}
                    </p>
                </div>
            </div>

            <div class="flex justify-center">
                <a href="/servicios">
                    <UiButton primary>Conoce más</UiButton>
                </a>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
    const blocks = [
        {
            title: "Tambor Cerrado",
            subtitle: `Metálico de 55 galones o 210 litros.`,
            image: "/home/tambor-cerrado.webp",
        },
        {
            title: "Tambor Abierto",
            subtitle: `Tapa removible con aro de cierre de tornillo o palanca con recubrimiento interno para uso de alimentos`,
            image: "/home/tambor-abierto.webp",
        },
        {
            title: "Contenedores Plásticos",
            subtitle: `Capacidad para 275 galones, de material PEHD macromolecular por soplado de extrusión.`,
            image: "/home/contenedores-plasticos.webp",
        },
    ];
</script>
