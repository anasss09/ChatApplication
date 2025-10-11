import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../utils/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axios.get("message/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isUsersLoading: false })
        }
    },

    getMessage: async (userId) => {
        set({ isMessagesLoading: true})
        try {
            const res = await axios.get(`/message/${userId}`)
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })

}))