import {
    FIND_MESSAGES,
    CLEAN_FIND_MESSAGES
} from "../constants/actions";
import _ from "lodash";

export const findMessages = (inputValue) => (dispatch, getState) => {
    const activeChatId = getState().chat.activeChat.chatId;
    const allMessages = getState().messages.allMessages
    const filteredMessages = _.filter(allMessages[activeChatId], message => {
        return message.text.indexOf(inputValue) !== -1
    })
    dispatch({
        type: FIND_MESSAGES,
        payload: filteredMessages
    })
}
export const cleanFindMessages = () => ({
    type: CLEAN_FIND_MESSAGES
})
