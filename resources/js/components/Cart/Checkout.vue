<template>
    <div>
        <v-container>
            <cart-content v-if="this.$store.getters.totalPrice > 0"></cart-content>
            <v-card v-if="this.$store.getters.totalPrice <= 0"
                class="d-flex justify-center mb-6"
            >
                    <router-link to="/">
                <v-btn text>
                    В вашей корзине нет покупок
                        <v-icon color="red" large>
                            mdi-cart-remove
                        </v-icon>
                </v-btn>
                    </router-link>
            </v-card>
            <v-layout>
                <v-flex>
                    <v-form @submit.prevent="submit" v-model="valid" v-show="this.$store.getters.totalPrice > 0">
                        <strong>Информация покупателя</strong>
                        <v-text-field label="Имя"
                                      :rules="[rules.required]"
                                      v-model="form.name"></v-text-field>
                        <v-text-field label="Фамилия"
                                      :rules="[rules.required]"
                                      v-model="form.lastName"></v-text-field>
                        <v-text-field label="Телефон"
                                      :rules="[rules.required]"
                                      v-model="form.phone"></v-text-field>
                        <v-text-field label="Email"
                                      :rules="rules.emailRule"
                                      type="email" v-model="form.email"></v-text-field>
                        <v-checkbox v-model="form.delivery" label="Доставить на дом"></v-checkbox>
                        <strong>Адрес доставки</strong>
                        <div v-if="form.delivery">
                            <v-text-field label="Город"
                                          :rules="[rules.required]"

                                          v-model="form.city"></v-text-field>
                            <v-text-field label="Индекс"
                                          :rules="[rules.required]"

                                          v-model="form.postcode"></v-text-field>
                            <v-text-field label="Адрес"
                                          :rules="[rules.required]"

                                          v-model="form.address"></v-text-field>
                            <v-text-field label="Комментарий к заказу" v-model="form.comments"></v-text-field>
                        </div>
                        <div v-else>
                            <v-alert type="info" :value="true">
                                <p>Самовывоз</p>
                                г. Москва,
                                улица Серебрякова 16
                            </v-alert>
                        </div>
                        <v-btn type="submit" :disabled="!valid">
                            Оформить заказ
                        </v-btn>
                        <v-btn @click="clear">Очистить форму</v-btn>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    const CartContent = () => import('./CartContent');
    export default {
        components: {CartContent},
        data() {
            return {
                valid: false,
                email: null,
                rules: {
                    required: value => !!value || 'Поле обязательно к заполнению.',
                    min: v => v.length >= 6 || 'Пароль должен быть более 6 знаков',
                    emailRule: [
                        v => !!v || 'Поле E-mail дожно быть заполнено',
                        v => /.+@.+/.test(v) || 'E-mail должен быть настоящим',
                    ],
                    confirm: v => v === this.password || 'Пароли не совпадают'
                },
                form: {
                    name: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    city: '',
                    address: '',
                    postcode: '',
                    delivery: false,
                    comments: '',
                    cart_total: this.$store.getters.totalPrice
                }
            }
        },
        methods: {
            clear() {
                this.form.name = '';
                this.form.lastName = '';
                this.form.phone = '';
                this.form.email = '';
                this.form.city = '';
                this.form.address = '';
                this.form.postcode = '';
                this.form.delivery = '';
                this.form.comments = ''
            },
            getErrors(error) {
                Object.values(error.data.errors).forEach((err) => {
                    return this.$notification.error(err.toString(), {timer: 5})
                });
            },
            submit() {
                this.$store.commit('prepareOrder', this.form);
                this.$store.dispatch('storeOrder', this.$store.getters.order)
                    .then(res => this.orderStored(), error =>  this.getErrors(error)
            )
        },
            orderStored() {
                this.$store.commit('clearCart');
                this.$notification.new('Ваш заказ успешно оформлен!', {timer: 10});
                this.$router.push('/');
            }
        },
    }
</script>

<style scoped>

</style>
