import { useState, useEffect, useLayoutEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ChatsAPI from "../api/chats";
import { Chat } from "../@types/chats";

const useChats = (scrollbarRef: Nullable<Scrollbars>) => {
  const [chats, setChats] = useState<Chat[]>(Array(15).fill(null));

  const [chatsOffset, setChatsOffset] = useState(0);

  const [chatsAutoLoading, setChatsAutoLoading] =
    useState<Nullable<boolean>>(false);

  const [chatSearchQuery, setChatSearchQuery] = useState("");

  useLayoutEffect(() => {
    setChats(Array(15).fill(null));

    const controller = new AbortController();
    const searchQuery = chatSearchQuery.trim();

    scrollbarRef?.scrollToTop();

    setChatsOffset(0);
    handleLoadChats(0, searchQuery, false, controller);

    return () => {
      controller.abort();
    };
  }, [chatSearchQuery]);

  useEffect(() => {
    if (chatsAutoLoading) {
      handleLoadChats(chatsOffset, chatSearchQuery, true);
    }
  }, [chatsAutoLoading, chatsOffset]);

  const handleLoadChats = async (
    offset = 0,
    query = "",
    scrolling = false,
    controller?: AbortController
  ) => {
    const response = await ChatsAPI.getChats(offset, query, controller);

    if (
      response?.data &&
      typeof response.data === "object" &&
      response.status === 200 &&
      !("reason" in response.data)
    ) {
      const responseChats = response.data;

      if (scrolling) {
        setChats((prev) => [...prev, ...responseChats]);
      } else {
        setChats(response.data);
      }

      setChatsAutoLoading(
        responseChats.length < ChatsAPI.CHATS_LIMIT ? null : false
      );

      setChatsOffset((prev) => prev + ChatsAPI.CHATS_LIMIT);
    } else {
      console.log("Error: ", response?.data);
      setChatsAutoLoading(false);
    }
  };

  const reloadChats = async () => {
    scrollbarRef?.scrollToTop();
    setChatsOffset(0);
    await handleLoadChats(0, chatSearchQuery, false);
  };

  const handleScroll = () => {
    const scrollbar = scrollbarRef;

    if (scrollbar) {
      const clientHeight = scrollbar.getClientHeight();
      const scrollTop = scrollbar.getScrollTop();
      const scrollHeight = scrollbar.getScrollHeight();
      const delta = 150;

      if (
        clientHeight + scrollTop + delta >= scrollHeight &&
        !chatsAutoLoading &&
        chatsAutoLoading !== null
      ) {
        setChatsAutoLoading(true);
      }
    }
  };

  return {
    chats,
    chatSearchQuery,
    setChatSearchQuery,
    handleScroll,
    chatsAutoLoading,
    handleLoadChats,
    reloadChats,
  };
};

export default useChats;
