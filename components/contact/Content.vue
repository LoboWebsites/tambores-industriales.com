<template>
    <NuxtLayout name="section">
        <div class="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-20">
            <div>
                <div class="mb-8">
                    <p class="flex gap-2 items-center" v-for="(l, i) in contactLinks" :key="i">
                        <Icon :name="l.icon" />
                        <a :href="l.link" target="_blank" :alt="l.name" v-if="l.link" class="underline cursor-pointer">
                            {{ l.text }}
                        </a>
                        <span v-else>{{ l.text }}</span>
                    </p>
                </div>
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3977.184453506391!2d-74.231532!3d4.56083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMzMnMzkuMCJOIDc0wrAxMyc1My41Ilc!5e0!3m2!1sen!2sco!4v1709913587602!5m2!1sen!2sco"
                        width="100%"
                        height="450"
                        style="border: 0"
                        allowfullscreen
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <div>
                <FormsContact />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
    const { contactLinks } = useConstants();
</script>
