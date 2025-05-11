<template>
    <div>
        <header class="bg-gray-800 text-white p-4">
            <nav class="flex items-center justify-between">
                <div class="flex space-x-4">
                    <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
                    <NuxtLink to="/dashboard">Dashboard</NuxtLink>
                </div>
                <div class="ml-auto flex space-x-4 items-center">
                    <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
                    <NuxtLink to="/contact" class="hover:underline">Contact</NuxtLink>
                    <Dropdown />
                </div>
            </nav>
        </header>
        <main class="p-4">
            <NuxtPage />
        </main>
    </div>
</template>