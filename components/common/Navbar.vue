<template>
    <nav
        id="home-navbar"
        class="gap-8 absolute top-0 left-0 z-50 duration-500 text-white"
        :class="{ '!fixed': scrollHide, '!bg-transparent': transparentOnTop }"
        :style="{ 'background-color': bgColor, color: colorOnTop }"
    >
        <div class="m-auto h-full flex items-center">
            <div>
                <a href="#top">
                    <NuxtImg :src="logoSrc" alt="logo" preload style="max-width: 190px" class="my-4 cursor-pointer" />
                </a>
            </div>
            <ul class="flex flex-grow gap-8 justify-end">
                <li
                    v-for="link in websiteLinks"
                    class="self-center hidden lg:flex font-bold"
                    :class="{ '!hidden': link.isCta }"
                >
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
                <li class="lg:hidden flex justify-end w-full relative">
                    <UiPopup noItemsOverflow class="flex items-center">
                        <Icon name="solar:hamburger-menu-linear" class="cursor-pointer" size="26" />
                        <template #content>
                            <div
                                v-for="(link, i) in websiteLinks"
                                :key="i"
                                class="m-5"
                                :class="{ '!hidden': link.isCta }"
                            >
                                <a class="cursor-pointer m-auto" :href="link.navigateTo"
                                    >{{ link.name }}
                                    <UiHoverUnderline color="black" />
                                </a>
                            </div>
                        </template>
                    </UiPopup>
                </li>
                <li class="list-none hidden md:block">
                    <div>
                        <UiButton id="cta-btn" :primary="ctaPrimary" :secondary="ctaSecondary" link="/contactanos#top">
                            Contáctanos
                        </UiButton>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
    const { websiteLinks } = useConstants();

    const { bgColor, scrollHide, transparentOnTop, colorOnTop } = defineProps({
        logoSrc: String,
        bgColor: String,
        transparentOnTop: Boolean,
        colorOnTop: String,
        scrollHide: {
            type: Boolean,
            default: true,
        },
        ctaPrimary: Boolean,
        ctaSecondary: Boolean,
    });

    const transparentTransition = ref(false);

    function setupScrollHide() {
        const navbar = document.getElementById("home-navbar");
        const cta = document.getElementById("cta-btn");
        let prevScrollPos = window.scrollY;

        window.addEventListener("scroll", () => {
            const currentScrollPos = window.scrollY;

            if (prevScrollPos > currentScrollPos) {
                // Scrolling up
                navbar.style.transform = "translateY(0)";
                if (transparentOnTop && currentScrollPos === 0) {
                    navbar.classList.add("!bg-transparent");
                    navbar.classList.remove("!text-white");
                    cta.firstChild.classList.remove("!bg-secondary");
                    if (colorOnTop) {
                        navbar.classList.add(`!text-${colorOnTop}`);
                    }
                }
            } else {
                // Scrolling down
                navbar.style.transform = `translateY(-${navbar.offsetHeight}px)`;
                if (transparentOnTop && !transparentTransition.value) {
                    transparentTransition.value = true;
                    setTimeout(() => {
                        navbar.classList.remove("!bg-transparent");
                        navbar.classList.add("!text-white");
                        navbar.classList.remove(`!text-${colorOnTop}`);
                        cta.firstChild.classList.add("!bg-secondary");
                        transparentTransition.value = false;
                    }, 500);
                }
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
