"use client";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconBook,
  IconQuestionMark,
  IconMessage,
  IconPlayerStopFilled,
  IconPlus,
  IconX,
  IconMaximize,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  animate,
} from "framer-motion";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export const Bubble = () => {
  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // const [inputFocus, setInputFocus] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type a message...");
  const [autoScroll, setAutoScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const messageHistoryRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    keepLastMessageOnError: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const blocks = [
    {
      icon: <IconBook className="h-6 w-6 text-purple-500" />,
      title: "Study Mode",
      content: "study mode",
    },
    {
      icon: <IconQuestionMark className="h-6 w-6 text-green-500" />,
      title: "Quiz Mode",
      content: "quiz me",
    },
  ];

  const handleBlockClick = (content: string) => {
    append({
      role: "user",
      content: content,
    });

    handleSubmit();
  };

  useEffect(() => {
    const handleUserScroll = () => {
      if (messageHistoryRef.current) {
        const isAtBottom =
          messageHistoryRef.current.scrollHeight -
            messageHistoryRef.current.scrollTop ===
          messageHistoryRef.current.clientHeight;
        setIsUserScrolledUp(!isAtBottom);
      }
    };

    messageHistoryRef.current?.addEventListener("scroll", handleUserScroll);

    return () => {
      messageHistoryRef.current?.removeEventListener(
        "scroll",
        handleUserScroll
      );
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setTimeout(() => {
        setShowScrollButton(!entry.isIntersecting);
      }, 100);
    });

    if (messagesEndRef.current) {
      const currentRef = messagesEndRef.current;
      observer.observe(currentRef);
      return () => {
        observer.unobserve(currentRef);
      };
    }
  }, [messages]);

  useEffect(() => {
    if (!isUserScrolledUp && messages.length) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isUserScrolledUp]);

  useEffect(() => {
    if (autoScroll && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  const scrollIntoView = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShowScrollButton(false);
      setIsUserScrolledUp(false);
      setAutoScroll(true);
    }
  };

  return (
    <div className={cn(
      "fixed bottom-10 right-10 flex flex-col items-end z-30 bubble-container",
      isExpanded && "bottom-0 right-0 w-screen h-screen bg-black/30 backdrop-blur-sm flex items-center justify-center"
    )}>
      <motion.div
        initial={false}
        animate={isExpanded ? {
          opacity: [0, 0, 1],
          scale: [1, 0.98, 1],
          y: [0, 10, 0],
          rotateX: [0, 5, 0]
        } : {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0
        }}
        transition={{ 
          duration: 0.3,
          times: [0, 0.4, 1]
        }}
        className={cn(
          "fixed md:relative inset-0 z-20",
          isExpanded && "w-[80%] h-[80%] relative"
        )}
      >
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="fixed md:hidden top-2 right-2 z-40"
          >
            <IconX />
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 20, rotateX: -10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "mb-4 h-screen md:h-[46vh] min-h-[76vh] w-full md:w-[30rem] bg-gray-100 rounded-lg flex flex-col justify-between overflow-hidden",
                isExpanded && "w-full h-full md:h-full md:w-full min-h-0 mb-0"
              )}
            >
              <div className="h-10 w-full bg-neutral-100 rounded-tr-lg rounded-tl-lg flex justify-between px-10 md:px-6 py-2 bg-gradient-to-l from-black via-gray-700 to-black">
                <div className="font-medium text-sm flex items-center gap-2 text-white">
                  <button 
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                      const element = document.querySelector('.bubble-container');
                      if (element) {
                        element.classList.toggle('scale-110');
                      }
                    }}
                    className="hover:bg-gray-800 p-1 rounded-full transition-colors"
                  >
                    <IconMaximize className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <motion.button
                      className="rounded-full bg-black text-white px-2 py-0.5 text-sm flex items-center justify-center gap-1 overflow-hidden"
                      onClick={() => setMessages([])}
                      whileHover="hover"
                      initial="initial"
                      animate="initial"
                      variants={{
                        initial: {
                          width: "4rem",
                        },
                        hover: {
                          width: "4rem",
                        },
                      }}
                    >
                      <motion.div
                        variants={{
                          initial: {
                            opacity: 0,
                            width: 0,
                          },
                          hover: {
                            opacity: 1,
                            width: "3.5rem",
                          },
                        }}
                      >
                        <IconPlus className="h-4 w-4 flex-shrink-0" />
                      </motion.div>
                      <motion.span>New</motion.span>
                    </motion.button>
                  )}
                </div>
              </div>

              {!messages.length && (
                <div className="px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-2  overflow-y-auto">
                  {blocks.map((block, index) => (
                    <motion.button
                      initial={{
                        opacity: 0,
                        filter: "blur(10px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 * index,
                      }}
                      key={block.title}
                      onClick={() => {
                        handleBlockClick(block.content);
                      }}
                      className="p-4 flex flex-col text-left justify-between rounded-2xl h-32 md:h-40 w-full bg-white"
                    >
                      {block.icon}
                      <div>
                        <div className="text-base font-bold text-black">
                          {block.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {block.content}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
              <div
                ref={messageHistoryRef}
                className="p-2 flex flex-1 overflow-y-auto"
              >
                <div className="flex flex-1 flex-col">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.role === "user" ? (
                        <UserMessage content={message.content} />
                      ) : (
                        <>
                          <AIMessage content={message.content} />
                        </>
                      )}
                    </div>
                  ))}
                  <div className="pb-10" ref={messagesEndRef} />{" "}
                  {/* Add this div as scroll anchor */}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-h-[10vh] py-1 px-5 relative"
              >
                {showScrollButton && (
                  <button
                    onClick={scrollIntoView}
                    className="absolute -top-10 left-1/2 -translate-x-1/2  h-8 w-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <IconArrowNarrowDown className="h-5 w-5" />
                  </button>
                )}
                <AnimatePresence>
                  {isLoading ? (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={stop}
                      className="absolute top-1/2 right-8 group -translate-y-1/2 bg-red-500 h-8 w-8 rounded-full flex items-center justify-center"
                    >
                      <IconPlayerStopFilled className="h-5 w-5 text-white group-hover:twhite group-hover:-translate-y-0.5 group-hover:rotate-12 transition duration-200" />
                    </motion.button>
                  ) : (
                    <button
                      type="submit"
                      className="absolute top-1/2 right-8 group -translate-y-1/2 bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center"
                    >
                      <IconArrowNarrowUp className="h-5 w-5 text-neutral-500 group-hover:text-black group-hover:-translate-y-0.5 group-hover:rotate-12 transition duration-200" />
                    </button>
                  )}
                </AnimatePresence>
                <textarea
                  ref={inputRef}
                  disabled={disabled}
                  className={`px-4 w-full pr-10 rounded-lg border-[#f2f2f2] text-black border py-[1rem] bg-white text-sm  [box-sizing:border-box] overflow-x-auto    inline-block focus:outline-none  transition duration-100`}
                  placeholder={placeholderText}
                  // onFocus={() => setInputFocus(true)}
                  // onBlur={() => setInputFocus(false)}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                  style={{ resize: "none" }}
                  rows={1}
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={cn(
          "h-14 w-14 relative z-10 group bg-white flex hover:bg-primary cursor-pointer items-center justify-center rounded-full shadow-derek transition duration-200",
          open ? "z-10" : "z-30",
          isExpanded && "hidden"
        )}
      >
        <IconMessage className="h-6 w-6 text-neutral-600 group-hover:text-black" />
      </button>
    </div>
  );
};

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="p-2 rounded-lg flex gap-2 items-start justify-end">
      <div className="text-sm px-4 py-2 rounded-lg shadow-derek w-fit bg-gradient-to-br from-pink-500 to-violet-600 text-white">
        {content}
      </div>
    </div>
  );
};

const AIMessage = ({ content }: { content: string }) => {
  return (
    <div className="p-2 rounded-lg flex gap-2 items-start">
      <div className="h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-green-500 to-violet-600">
      </div>
      <div className="text-sm px-2 py-2 rounded-lg shadow-derek w-fit bg-white text-black">
        <Markdown>{useAnimatedText(content)}</Markdown>
      </div>
    </div>
  );
};

let delimiter = "";

export function useAnimatedText(text: string) {
  const [cursor, setCursor] = useState(0);
  const [startingCursor, setStartingCursor] = useState(0);
  const [prevText, setPrevText] = useState(text);

  if (prevText !== text) {
    setPrevText(text);
    setStartingCursor(text.startsWith(prevText) ? cursor : 0);
  }

  useEffect(() => {
    const controls = animate(startingCursor, text.split(delimiter).length, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        setCursor(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [startingCursor, text]);

  return text.split(delimiter).slice(0, cursor).join(delimiter);
}
