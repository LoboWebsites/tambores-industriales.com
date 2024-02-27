<template>
    <nav
        id="home-navbar"
        class="h-20 w-screen bg-transparent gap-8 absolute top-0 left-0 z-50"
        :class="{ '!bg-primary': primary, '!fixed': scrollHide }"
        data-aos="fade-in"
    >
        <div class="m-auto h-full flex items-center" :style="{ maxWidth: maxWidth.navbar }">
            <div>
                <a href="#top">
                    <NuxtImg
                        src="placeholder.png"
                        alt="logo"
                        preload
                        style="max-width: 40px"
                        class="my-4 cursor-pointer"
                    />
                </a>
            </div>
            <ul class="flex flex-grow gap-8 justify-end text-primary-text">
                <li v-for="link in websiteLinks" class="self-center hidden md:flex">
                    <UiPopup v-if="link.list" open-on-hover>
                        {{ link.name }} <Icon name="ic:baseline-arrow-drop-down" />
                        <template #content>
                            <div class="p-1 flex flex-col gap-4">
                                <a v-for="l in link.list" class="cursor-pointer" :href="l.navigateTo">
                                    {{ l.name }}
                                </a>
                            </div>
                        </template>
                    </UiPopup>
                    <a v-else class="cursor-pointer duration-300 hover:text-gray-400" :href="link.navigateTo">
                        {{ link.name }}
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
                <UiButton primary>Contáctanos</UiButton>
            </ul>
        </div>
    </nav>
</template>

<script setup>
    const { websiteLinks } = useConstants();
    const { maxWidth } = useLayout();

    const { bgColor, scrollHide } = defineProps({
        bgColor: String,
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
