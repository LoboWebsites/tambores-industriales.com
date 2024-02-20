<template>
    <div class="relative w-full m-auto overflow-y-hidden">
        <div class="w-64 h-full absolute top-0 left-0">
            <slot name="sidebar" />
        </div>
        <div class="pl-64 h-screen">
            <nav class="h-20 w-full shadow-sm">
                <slot name="navbar" />
            </nav>
            <div class="overflow-y-auto h-full px-10 pt-4 pb-32">
                <slot name="body" />
            </div>
        </div>
    </div>
</template>
