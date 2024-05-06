<template>
  <main class="flex justify-center items-center">
    <section class="bg-mataWallGray-100 border-2 border-black flex flex-wrap justify-center items-center p-10 m-5">
      <div class="imgContainer p-3">
        <img class="img-fluid" src="../assets/loginView_Picture.svg" alt="loginView_Picture"
        title="loginView_Picture" width="300">
      </div>
      <div class="loginForm p-3">
        <h1 class="logo text-center">MetaWall</h1>
        <h5 class="text-center">到原宇宙展開全新社交圈</h5>
        <br>
        <nuxt-link class="routerLink" to="login">
          <button class="btn MetaWall_button py-1 w-full" type="button">登入帳號</button>
        </nuxt-link>
          
        <nuxt-link class="routerLink" to="signup">
          註冊帳號
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>

export default {

};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";

main{
  width: 100vw;
  height: 100vh;
}

section{
  opacity: 1;
  position: relative;
  min-height: 450px;
  .loginForm{
    height: 100%;
    .logo{
      font-family: "Paytone One", sans-serif;
      font-weight: 400;
      font-size: 50px;
      color: $MataWall_blue;
    }
    @media screen and (max-width: 400px) {
       .logo{
        font-size: 28px;
        padding: 0;
       }
       h5{
        font-size: 16px;
       }
    }
  }
}

</style>
