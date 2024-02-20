<template>
    <nav
        id="home-navbar"
        class="h-20 w-screen flex bg-transparent gap-8 items-center absolute top-0 left-0 z-50 px-12 lg:px-32 2xl:px-64"
        :class="{ '!bg-primary': primary, '!fixed': scrollHide }"
        data-aos="fade-in"
    >
        <div>
            <a href="#top">
                <NuxtImg src="placeholder.png" alt="logo" preload style="max-width: 40px" class="my-4 cursor-pointer" />
            </a>
        </div>

        <ul class="flex flex-grow gap-8 justify-center text-secondary-text">
            <li v-for="link in websiteLinks" class="self-center hidden md:flex">
                <UiPopup v-if="link.list" open-on-hover>
                    {{ link.name }} <Icon name="ic:baseline-arrow-drop-down" />
                    <template #content>
                        <div class="p-1 flex flex-col gap-4">
                            <a v-for="l in link.list" class="cursor-pointer" :href="l.navigateTo">
                                {{ l.name }}<UiHoverUnderline color="var(--primary)" />
                            </a>
                        </div>
                    </template>
                </UiPopup>
                <a v-else class="cursor-pointer" :href="link.navigateTo">
                    {{ link.name }}<UiHoverUnderline color="var(--secondary)" />
                </a>
            </li>

            <li class="md:hidden flex justify-end w-full relative">
                <UiPopup noItemsOverflow>
                    <Icon name="solar:hamburger-menu-linear" class="cursor-pointer" size="26" />
                    <template #content>
                        <div v-for="(link, i) in websiteLinks" :key="i" class="m-5">
                            <a class="cursor-pointer m-auto" :href="link.navigateTo"
                                >{{ link.name }}
                                <UiHoverUnderline color="black" />
                            </a>
                        </div>
                    </template>
                </UiPopup>
            </li>
        </ul>
    </nav>
</template>

<script setup>
    const { websiteLinks } = useConstants();

    const { primary, scrollHide } = defineProps({
        primary: Boolean,
        scrollHide: {
            type: Boolean,
            default: true,
        },
    });

    function setupScrollHide() {
        const navbar = document.getElementById("home-navbar");
        let prevScrollPos = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollPos = window.scrollY;

            if (prevScrollPos > currentScrollPos) {
                // Scrolling up
                navbar.style.transform = "translateY(0)";
            } else {
                // Scrolling down
                navbar.style.transform = `translateY(-${navbar.offsetHeight}px)`;
            }

            prevScrollPos = currentScrollPos;
        });
    }

    onMounted(() => {
        if (scrollHide) {
            setupScrollHide();
        }
    });
</script>
