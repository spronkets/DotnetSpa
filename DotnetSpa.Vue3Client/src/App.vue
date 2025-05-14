<template>
  <header>
    <div class="site-name">
      <router-link to="/">DotnetSpa</router-link>
    </div>
  </header>

  <nav>
    <ul>
      <li>
        <router-link to="/dashboard">Dashboard</router-link>
      </li>
    </ul>
  </nav>

  <main>
    <router-view />
  </main>

  <footer>
    <span>Vue 3 Client by Kody Crossman</span>
  </footer>
</template>

<style lang="scss">
  @import '@/assets/styles/common';

  header {
    position: relative;
    grid-area: header;
    display: grid;
    grid-template-areas: "site-name left right";
    grid-template-columns: $navWidth 1fr auto;
    grid-template-rows: 4rem;
    font-size: $headerFontSize;
    background-color: $primaryColor;
    @include dynamic-font-color($primaryColor);

    .site-name {
      grid-area: site-name;
      padding-left: 2rem;

      a {
        font-size: $siteNameFontSize;
        font-weight: 500;
      }
    }

    .left {
      grid-area: left;
      padding: 0 2rem;
    }

    .right {
      grid-area: right;
      padding-right: 2rem;
    }

    a {
      @include center-vertically();
      display: inline-block;
      text-decoration: none;
      @include dynamic-font-color($primaryColor);
    }
  }

  nav {
    position: relative;
    grid-area: nav;
    padding: 1rem 0 1rem 2rem;
    font-size: $footerFontSize;
    background-color: $secondaryColor;
    @include dynamic-font-color($secondaryColor);

    a {
      text-decoration: none;
      @include dynamic-font-color($secondaryColor);
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  main {
    position: relative;
    grid-area: main;
    padding: 1rem 2rem;
    background-color: $tertiaryColor;
    @include dynamic-font-color($tertiaryColor);

    table {
      width: 100%;
      border-collapse: collapse;

      tr.table-header {
        td {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }

  footer {
    position: relative;
    grid-area: footer;
    padding: 1rem 2rem 1rem;
    font-size: $footerFontSize;
    text-align: right;
    background-color: $quaternaryColor;
    @include dynamic-font-color($quaternaryColor);
  }
</style>
