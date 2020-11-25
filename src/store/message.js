import firebase from 'firebase';

class Message {
  constructor (id, message, time) {
    this.id = id;
    this.message = message;
    this.time = time;
  }
}

export default {
  state: () => ({
    messages: null,
    chats: null,
  }),
  mutations: {
    setMessages (state, payload) {
      state.messages = payload;
    },
    pushMessage ( state, payload) {
      state.messages.push(payload)
    }
  },
  actions: {
    /*
      Старт чата
      users: Object
    */
    async startChat ({ commit, dispatch }, users) {
      commit('clearError');
      commit('setLoading', true);
      try {
        let url = await dispatch('findChat', users); // Поищем готовый чат
        if(!url) { // если его нет, то создадим
          url = await dispatch('createChat', users);
        }
        commit('setLoading', false);
        return url; // вернем url чтобы войти в чат с помощью route.push
      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    /*
      Создание чата
    */
    async createChat ({commit}, {to, from}) {
      commit('clearError');
      try {
        const members = {};
        members[to] = to;
        members[from] = from;
        const chatRef = await firebase.database().ref('chats').push({ members });
        commit('setMessages', null); //очистим state
        return chatRef.key; // вернем key == new url
      } catch(error) {
        commit('setError', error.message);
        throw error;
      }
    },
    /*
      Поиск существующего чата
    */
    async findChat ({commit}, {to, from}) {
      commit('clearError');
      try {
        const chatsRef = await firebase.database().ref('chats').once('value'),
              chats = chatsRef.val();
        let result = null;
        Object.keys(chats).forEach(chat => {
          if(chats[chat].members[to] == to && chats[chat].members[from] == from) {
            result = chat;
          }
        });
        return result;
      } catch(error) {
        commit('setError', error.message);
        throw error;
      }
    },
    /*
      Добавление сообщения
    */
    async sendMessage({commit}, {id, url, message}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        await firebase.database().ref(`chats/${url}/messages/${ new Date().getTime() }`).update({
          id, message
        })
        commit('pushMessage', new Message(id, message, new Date().getTime()));
        commit('setLoading', false);
      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    /*
      Получим все сообщения из чата
      по url из route.params
    */
    async fetchMessageById({dispatch, commit}, url) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const chatRef = await firebase.database().ref(`chats/${url}/messages`).once('value'), // получим Object сообщений по url из route.params
              messages = chatRef.val(),
              messageList = [],
              usersId = new Set(); // Set
        /*
          Создадим Array сообщений
        */
        Object.keys(messages).forEach(message => {
          const ob = messages[message]
          messageList.push(new Message(ob.id, ob.message, message));
          usersId.add(ob.id); // получим уникальные id собеседников (2)
        })
        const avatars = await dispatch('getUsersAvatar', usersId); // получим ключ и ссылку на аватарку

        commit('setMessages', messageList);
        commit('setLoading', false);
        return avatars; //вернем аватарки в компонент

      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    }
  },
  getters: {
    getMessages (state) {
      return state.messages;
    },
    getChats (state) {
      return state.chats;
    }
  }
}