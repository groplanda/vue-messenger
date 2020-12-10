import firebase from 'firebase';
class User {
  constructor (id, url) {
    this.id = id; // id из firebase.auth
    this.url = url; // id из firebase.database
  }
}
const user = {
  state: () => ({
    user: null,
    users: null,
    filteredUser: null
  }),
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    },
    setSearchUsers (state, payload) {
      state.users = payload;
    },
    filterUser (state, payload) {
      state.filteredUser = state.users.filter(user => {
        return user.name.toLowerCase().indexOf(payload) !== -1;
      })
    }
  },
  actions: {
    /*
      Редактирование пользователя
    */
    async editUser({ commit }, user) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const image = user.avatar;
        // если прикреплено фото
        if(image) {
          const ext = image.name.slice(image.name.lastIndexOf('.')); // получим расширение файла
          const avatarRef = await firebase.storage().ref(`avatar/${user.id}${ext}`).put(image); // загрузим файл в firebase
          const avatar = await avatarRef.ref.getDownloadURL(); // получим ссылку на загруженный файл

          await firebase.database().ref('/users').child(user.id).update({ // обновим пользователя
            name: user.name,
            about: user.about,
            avatar });
        } else {
          await firebase.database().ref('/users').child(user.id).update({ // обновим пользователя
            name: user.name,
            about: user.about })
        }
        commit('setLoading', false);

      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;

      }
    },
    /*
      Получим всех пользователей
    */
    async fetchUsers({commit}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const usersRef = await firebase.database().ref('/users').once('value'),
              users = usersRef.val(); // получаем Object пользователей
        /*
          Создадим Array пользователей
        */
        const resultUsers = [];
        Object.keys(users).forEach(user => {
          let ob = users[user];
          resultUsers.push({
            url: user,
            id: ob.id,
            name: ob.name,
            email: ob.email,
            about: ob.about,
            avatar: ob.avatar,
            online: ob.online,
          })
        })
        commit('setSearchUsers', resultUsers);
        commit('setLoading', false);

      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    /*
      Получим пользователя по id из route.params
    */
    async getUserById({ commit }, id) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const userRef = await firebase.database().ref(`/users/${id}`).once('value'),
              user = userRef.val();
        return {
          ...user,
          url: id
        }
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    /*
      Регистрация пользователя
    */
    async registerUser({ commit, dispatch }, {email, password, name}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const query = await firebase.auth().createUserWithEmailAndPassword(email, password), // метод firebase вернет id database.auth
              id = query.user.uid;
        /*
          Вставим данные по default
        */
        await firebase.database().ref(`/users`).push(
          {
            name, email, id,
            about: 'Hello, i\'am use this app!',
            avatar: 'https://cdn.discordapp.com/icons/540351734862577666/59f174ee972fa87abf4b2816e70283a4.png'
          });
        const userUrl = await dispatch('getUserId', query.user.uid); // Получим id авторизированного пользователя

        dispatch('setOnlineStatus', {status: true, uid: userUrl}); // установим статус online true
        commit('setUser', new User(query.user.uid, userUrl));
        commit('setLoading', false);

      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message)
        throw error;
      }
    },
    /*
      Авторизация пользователя
    */
    async authUser({ commit, dispatch }, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const query = await firebase.auth().signInWithEmailAndPassword(email, password),  // метод firebase вернет id database.auth
              userUrl = await dispatch('getUserId', query.user.uid); // Получим id авторизированного пользователя

        dispatch('setOnlineStatus', {status: true, uid: userUrl}); // установим статус online true

        commit('setUser', new User(query.user.uid, userUrl));
        commit('setLoading', false);

      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message)
        throw error;
      }
    },
    /*
      Выход из системы
    */
    async logoutUser ({ commit, getters, dispatch }) {
      const uid = getters.getUser.url;
      try {
        await firebase.auth().signOut();

        dispatch('setOnlineStatus', {status: false, uid}); // установим статус online false

        commit('setUser', null);
      } catch (error) {
        commit('setError', error.message)
        throw error;
      }
    },
    /*
      Получим id авторизированного пользователя
      из firebase.database (велосипед)
    */
    async getUserId ({ commit }, uid) {
      try {
        const usersRef = await firebase.database().ref('/users').once('value'),
        users = usersRef.val();
        return Object.keys(users).find(user => {
          return users[user].id === uid;
        });
      } catch (error) {
        commit('setError', error.message)
        throw error;
      }
    },
    /*
      Функция автологина пользователя
      ( поддержание сессии )
    */
    async autoLoginUser ({ commit, dispatch }, user) {
      const userUrl = await dispatch('getUserId', user); // Получим id авторизированного пользователя
      commit('setUser', new User(user, userUrl));
    },
    /*
      Получение аватарок пользователей из массива id
      ( велосипед какой то )
    */
    async getUsersAvatar({commit}, arrayId) {
      commit('clearError');
      try {
        const avatarList = [];
        /*
          Перебираем массив id, создаем новый с id и img src
        */
        for(let id of arrayId) {
          const avatarRef = await firebase.database().ref(`/users/${id}/avatar`).once('value'),
          avatar = avatarRef.val();
          avatarList.push({id, avatar})
        }
        return avatarList; //вернем новый массив

        } catch (error) {
          commit('setError', error.message)
          throw error;
        }
    },
    /*
      установить статус online true / false
    */
    async setOnlineStatus({ commit }, {status, uid}) {
      commit('clearError');
      try {
        await firebase.database().ref('/users').child(uid).update({
          online: status,
        });
      } catch (error) {
        commit('setError', error.message)
        throw error;
      }
    },
    /*
      Фильтрация пользователей
    */
    filterUser ({commit}, payload) {
      commit('filterUser', payload);
    }
  },
  getters: {
    getUser (state) {
      return state.user;
    },
    getUserAuth (state) {
      return state.user !== null;
    },
    getFilterUsers (state) {
      return state.filteredUser ? state.filteredUser : state.users;
    }
  }
}
export default user;