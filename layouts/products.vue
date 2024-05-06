<template>
    <header>
        <nav>
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                
            </ul>
        </nav>
    </header>
    <!--以下 slot 會套用 pages 的內容-->
    <slot/>

    <footer>
        <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/products">Products</NuxtLink></li>
    </ul>
    </footer>

</template>