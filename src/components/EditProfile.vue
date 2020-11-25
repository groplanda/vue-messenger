<template>
  <form
  @submit.prevent="onEdit"
  class="w-100"
  >
    <div
      class="register__form-row"
      :class="{ 'form-group--error': $v.info.name.$error }"
      >
        <input
        v-model.trim="info.name"
        type="text"
        class="chat-input"
        placeholder="Your first name*"
        />
        <span
        class="form-error"
        v-if="!$v.info.name.required"
        >Имя обязательно</span>
        <span
        class="form-error"
        v-if="!$v.info.name.minLength"
        >Имя должно содержать не менее {{$v.info.name.$params.minLength.min}} символов</span>
    </div>
    <div
      class="register__form-row"
      :class="{ 'form-group--error': $v.info.about.$error }"
      >
        <textarea
        v-model.trim="info.about"
        type="text"
        class="chat-input"
        placeholder="Write about you*"
        ></textarea>
        <span
        class="form-error"
        v-if="!$v.info.about.required"
        >Поле обязательно</span>
        <span
        class="form-error"
        v-if="!$v.info.about.minLength"
        >Поле должно содержать не менее {{$v.info.about.$params.minLength.min}} символов</span>
    </div>

    <div class="upload__form-row">
      <div class="upload__icon">
        <img src="@/assets/images/icons/upload.svg" alt="upload">
      </div>
      <label class="upload__label" for="inputFile">
        <span>{{ filename }}</span>
        <input
          id="inputFile"
          class="upload__input"
          @change="uploadImage"
          type="file"
          accept=".jpg, .jpeg, .png"
        />
      </label>
    </div>


    <button type="submit" class="button filled">Save</button>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      image: null,
    }
  },
  props: {
    info: {
      type: Object,
      required: true
    },
  },
  validations: {
    info: {
      name: {
        required,
        minLength: minLength(4)
      },
      about: {
        required,
        minLength: minLength(6)
      }
    }
  },
  computed: {
    filename () {
      if(this.image) {
        return this.image.name;
      }
      return 'Файл не выбран';
    }
  },
  methods: {
    uploadImage (event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$emit('setImage', reader.result)
      };
      this.image = file;
    },
    onEdit () {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const user = {
          id: this.info.url,
          name: this.info.name,
          about: this.info.about,
          avatar: this.image,
        };
        this.$store.dispatch('editUser', user)
        .then(() => {
          this.$emit('closeEdit')
        })
        .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style lang="scss">
  .upload__form-row {
    position: relative;
    height: 36px;
    border: 1px dashed #000;
    margin-bottom: 32px;
  }
  .upload__icon {
    position: absolute;
    left: 3px;
    top: 3px;
    width: 30px;
    z-index: 2;
  }
  .upload__label{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-left: 50px;
    padding-right: 50px;
    line-height: 36px;
    color: #999;
    font-size: 12px;
    overflow: hidden;
    word-wrap: break-word;
    z-index: 1;
  }
  .upload__input {
    position: absolute !important;
    height: 1px !important;
    width: 1px !important;
    padding: 0 !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    z-index: -1;
  }
</style>