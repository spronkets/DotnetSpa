<template>
  <div class="edit-customer">
    <button v-on:click.stop="show()"><i class="fas fa-user-edit"></i></button>
    <div class="backdrop" v-on:click.stop="hide()" v-show="showDialog">
      <div class="dialog" v-on:click.stop="" v-show="showDialog">
        <div class="dialog-header">
          <div class="left">
            <div class="center-container">
              <strong>Edit Customer</strong>
            </div>
          </div>
          <div class="right">
            <div class="center-container">
              <a v-on:click.stop="hide()"><i class="fas fa-times"></i></a>
            </div>
          </div>
        </div>
        <div class="dialog-body">
          <form @submit.prevent="saveChanges()">
            <input v-model.trim="formCustomer.firstName" placeholder="First Name" title="First Name">
            <input v-model.trim="formCustomer.lastName" placeholder="Last Name" title="Last Name">
          </form>
        </div>
        <div class="dialog-footer">
          <div class="left">
            <div class="center-container">
              <button class="delete-button" v-on:click="deleteCustomer()">Delete</button>
            </div>
          </div>
          <div class="right">
            <div class="center-container">
              <button class="save-button" v-on:click="saveChanges()">Save</button>
              <button class="cancel-button" v-on:click="hide()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import CustomerModel from '../models/customer';

  @Component
  export default class EditCustomer extends Vue {
    @Prop() customer!: CustomerModel;
    formCustomer: CustomerModel = <CustomerModel>{};

    showDialog: boolean = false;

    show(): void {
      this.resetCustomer();
      this.showDialog = true;
    }

    hide(): void {
      this.showDialog = false;
    }

    saveChanges(): void {
      this.$store.commit('mergeCustomer', this.formCustomer)
      this.hide();
    }

    deleteCustomer(): void {
      this.$store.commit('deleteCustomer', this.formCustomer.id)
      this.hide();
    }

    private resetCustomer(): void {
      this.formCustomer = JSON.parse(JSON.stringify(this.customer || <CustomerModel>{}))
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/common';

  .backdrop {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 1rem;
    z-index: 100;
    background: rgba(black, 0.4);
    cursor: default;
  }

  .dialog {
    display: grid;
    grid-template-areas:
      "dialog-header"
      "dialog-body"
      "dialog-footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;

    background-color: $tertiaryColor;
    @include dynamic-font-color($tertiaryColor);

    min-height: 8rem;
    min-width: 16rem;
    max-height: calc(100% - 2rem);
    max-width: calc(100% - 2rem);

    &.full-size {
      height: calc(100% - 2rem);
      width: calc(100% - 2rem);
    }

    @include center();

    .dialog-header {
      position: relative;
      grid-area: dialog-header;
      display: grid;
      grid-template-areas: "left right";
      grid-template-columns: 1fr auto;
      grid-template-rows: 2rem;
      font-size: $headerFontSize;
      @include dynamic-font-color($tertiaryColor);

      .left {
        position: relative;
        grid-area: left;
        padding: 0 1.25rem;
      }

      .right {
        position: relative;
        grid-area: right;
        padding-right: 1.25rem;
      }

      .center-container {
        @include center-vertically();
      }

      span, a, button {
        display: inline-block;
      }

      a, button {
        cursor: pointer;
      }
    }

    .dialog-body {
      position: relative;
      grid-area: dialog-body;
      padding: 1rem 2rem;

      form {
        input {
          display: block;

          &:not(:first-child) {
            margin-top: 1rem;
          }
        }
      }
    }

    .dialog-footer {
      position: relative;
      grid-area: dialog-footer;
      display: grid;
      grid-template-areas: "left right";
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 2rem;
      font-size: $footerFontSize;

      .left {
        position: relative;
        grid-area: left;
        padding: 0 1.25rem;
      }

      .right {
        position: relative;
        grid-area: right;
        padding-right: 1.25rem;
      }

      .center-container {
        @include center-vertically();
      }

      span, a, button {
        display: inline-block;
      }

      a, button {
        cursor: pointer;
      }

      .delete-button {
        background-color: red;
      }

      .save-button {
        background-color: green;
      }

      .cancel-button {
        background-color: yellow;
      }

      button {
        border: none;
        text-align: center;
        text-decoration: none;
        color: black;
      }
    }
  }
</style>
