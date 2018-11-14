import _ from 'lodash'

export default function selector({ auth, chat }) {
    const sortedChats = _.sortBy(chat.chats, el => (Date.now() - el.lastMessageTimestamp))
    return {
        sortedChats,
        auth,
        chat
    }
}