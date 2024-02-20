<template>
    <select v-if="type === 'select'" @change="handleSelectChange">
        <option v-for="(val, key) in modelValue" :value="key">{{ key }}</option>
    </select>
    <input
        v-else
        class="p-2 rounded-md border-2"
        :class="{ 'w-full': ['text', 'number'].includes(type) }"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :checked="modelValue"
        :required="required"
        @input="handleInput"
        @change="handleChange"
    />
</template>

<script setup>
    const emit = defineEmits(["update:modelValue"]);
    const { modelValue, placeholder, required } = defineProps({
        modelValue: [String, Number, Boolean, Object],
        placeholder: [String, Number],
        required: Boolean,
    });

    const type = computed(() => {
        switch (typeof modelValue) {
            case "number":
                return "number";
            case "boolean":
                return "checkbox";
            case "object":
                return "select";
            default:
                return "text";
        }
    });

    const handleInput = (event) => {
        if (type.value === "text") {
            emit("update:modelValue", event.target.value);
        }
        if (type.value === "number") {
            emit("update:modelValue", Number(event.target.value));
        }
    };

    const handleChange = (event) => {
        if (type.value === "checkbox") {
            emit("update:modelValue", event.target.checked);
        }
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        const updatedModelValue = {};

        for (const key in modelValue) {
            updatedModelValue[key] = key === selectedValue;
        }

        emit("update:modelValue", updatedModelValue);
    };
</script>
