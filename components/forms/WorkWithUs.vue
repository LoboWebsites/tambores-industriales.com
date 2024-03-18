<template>
    <form @submit.prevent.stop="onSubmit" class="form flex flex-col gap-4 text-left">
        <label for="input1">*Nombre Completo </label>
        <input
            id="input1"
            type="text"
            name="name"
            required
            class="bg-white rounded-lg h-12 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text"
            v-model="form.name"
        />

        <label for="input2">*Teléfono </label>
        <input
            id="input2"
            type="tel"
            name="phone"
            required
            class="bg-white rounded-lg h-12 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text"
            v-model="form.phone"
        />

        <label for="input3">Correo (Opcional) </label>
        <input
            id="input3"
            type="email"
            name="email"
            class="bg-white rounded-lg h-12 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text"
            v-model="form.email"
        />

        <label for="pdfFile">Hoja de vida (PDF) </label>
        <input type="file" id="pdfFile" name="pdfFile" accept=".pdf" @change="onPdfUpload" />

        <label for="input4">*Comentario </label>
        <textarea
            id="input4"
            name="comment"
            required
            class="bg-white rounded-lg h-24 px-4 py-2 duration-700 outline-transparent focus-visible:outline-primary text-primary-text resize-none"
            v-model="form.comment"
        />

        <UiButton type="submit" primary :disabled="submitBtn.disabled" class="duration-200" :class="submitBtn.class">
            {{ submitBtn.text }}
        </UiButton>
    </form>
</template>

<script setup>
    const form = ref({
        name: "",
        phone: "",
        email: "",
        attachments: [],
        comment: "",
    });

    const submitBtn = ref({
        text: "Enviar",
        disabled: false,
        class: "",
    });

    function onPdfUpload(event) {
        const pdf = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result.split(",")[1];
            form.value.attachments.push({ filename: `hoja-de-vida.pdf`, content: base64String });
        };

        reader.readAsDataURL(pdf);
    }

    async function onSubmit() {
        let subject = "Formulario de Contácto - Tamboresindustriales.com";
        let html = `
            <p>Una persona ha llenado el formulario de contacto de "Trabaja con nosotros":</p>
            <p><strong>Nombre completo:</strong> ${form.value.name}</p>
            <p><strong>Teléfono:</strong> ${form.value.phone}</p>
            <p><strong>Correo:</strong> ${form.value.email}</p>
            <p><strong>Comentario:</strong> ${form.value.comment}</p>
        `;
        await useFetch("/api/mail", { method: "post", body: { subject, html, attachments: form.value.attachments } });

        form.value.name = form.value.name.replaceAll(/\s/g, "");
        submitBtn.value.text = "Formulario enviado!";
        submitBtn.value.disabled = true;
    }
</script>

<style lang="scss" scoped>
    .form {
        max-width: 600px;
        min-width: 260px;

        @media (min-width: 768px) {
            min-width: 400px;
        }
    }
</style>
