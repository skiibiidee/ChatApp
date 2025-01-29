
      // Skibidi Chat Script =>
      const wasLoggedIn = false;
      // Objects
      const settingsInfo = {
        loading_time: {
          default: 0.5,
          type: "number",
          name: "Extra loading time when page open in seconds (max 15s)",
          handle: (startUp) => {
            const progressBar = document.getElementById("load-progress");
            progressBar.style.setProperty(
              "--loading-time",
              `${settings.loading_time}s`,
            );
            progressBar.classList.add("animate-progress");
          },
        },
        profile_length_to_display: {
          default: 4,
          type: "number",
          name: "Number of profiles shown on chat header",
        },
        toast_duration: {
          default: 3,
          type: "number",
          name: "Toast duration (s)",
        },
        toast_distance_to_bottom: {
          default: 5,
          type: "number",
          name: "Toast distance to bottom (em)",
          handle: (startUp) => {
            document.getElementById("toast-container").style.bottom =
              `${settings.toast_distance_to_bottom}em`;
            if (!startUp) {
              showToast(
                `Toast distance to bottom set to ${settings.toast_distance_to_bottom}.`,
              );
            }
          },
        },
        toast_size: {
          default: 20,
          type: "number",
          name: "Toast font size",
          handle: (startUp) => {
            if (!startUp) {
              showToast(`Toast Font Size set to ${settings.toast_size}.`);
            }
          },
        },
        toast_close_btn_initial_opacity: {
          default: 0.5,
          type: "number",
          name: "Toast close button initial opacity",
        },
        default_chat_name: {
          default: "New Chat",
          type: "string",
          name: "Default chat name",
        },
        background_image: {
          default: "",
          type: "string",
          name: "Background image file (url)",
          handle: (startUp) => {
            updateBackgroundImage();
          },
        },
        background_image_opacity: {
          default: 0.5,
          type: "number",
          name: "Background image opacity",
          handle: (startUp) => {
            updateBackgroundImage();
          },
        },
        message_opacity: {
          default: 90,
          type: "number",
          name: "Message background opacity % (reload)",
        },
        text_color: {
          default: "white",
          type: "drop",
          options: ["white", "black", "gray", "zinc"],
          name: "Text color (reload)",
          handle: (startUp) => {
            if (startUp) {
              for (let i = 100; i < 1000; i += 100) {
                const needsReplacing = [
                  `.text-textcolor-${i}`,
                  `.border-textcolor-${i}`,
                  `.bg-textcolor-${i}`,
                  `.from-textcolor-${i}`,
                  `.to-textcolor-${i}`,
                ];
                const replacer = [
                  `text-${settings.text_color}-${i}`,
                  `border-${settings.text_color}-${i}`,
                  `bg-${settings.text_color}-${i}`,
                  `from-${settings.text_color}-${i}`,
                  `to-${settings.text_color}-${i}`,
                ];

                for (
                  let replaceIndex = 0;
                  replaceIndex < needsReplacing.length;
                  replaceIndex++
                ) {
                  const elements = document.querySelectorAll(
                    needsReplacing[replaceIndex],
                  );
                  for (
                    let elementIndex = 0;
                    elementIndex < elements.length;
                    elementIndex++
                  ) {
                    const element = elements[elementIndex];
                    element.classList.remove(
                      needsReplacing[replaceIndex].slice(1),
                    );
                    element.classList.add(replacer[replaceIndex]);
                  }
                }
              }
            }
          },
        },
        primary_color: {
          default: "black",
          type: "drop",
          options: [
            "black",
            "white",
            "slate",
            "gray",
            "zinc",
            "neutral",
            "stone",
          ],
          name: "Primary color (reload)",
          handle: (startUp) => {
            if (startUp) {
              for (let i = 100; i < 1000; i += 100) {
                const needsReplacing = [
                  `.bg-color-${i}`,
                  `.border-color-${i}`,
                  `.from-color-${i}`,
                  `.to-color-${i}`,
                ];
                const replacer = [
                  `bg-${settings.primary_color}-${i}`,
                  `border-${settings.primary_color}-${i}`,
                  `from-${settings.primary_color}-${i}`,
                  `to-${settings.primary_color}-${i}`,
                ];

                for (
                  let replaceIndex = 0;
                  replaceIndex < needsReplacing.length;
                  replaceIndex++
                ) {
                  const elements = document.querySelectorAll(
                    needsReplacing[replaceIndex],
                  );
                  for (
                    let elementIndex = 0;
                    elementIndex < elements.length;
                    elementIndex++
                  ) {
                    const element = elements[elementIndex];
                    element.classList.remove(
                      needsReplacing[replaceIndex].slice(1),
                    );
                    element.classList.add(replacer[replaceIndex]);
                  }
                }
              }
            }
          },
        },
        secondary_color: {
          default: "blue",
          type: "drop",
          options: [
            "black",
            "white",
            "blue",
            "slate",
            "gray",
            "zinc",
            "neutral",
            "stone",
            "red",
            "orange",
            "amber",
            "yellow",
            "lime",
            "green",
            "emerald",
            "teal",
            "cyan",
            "sky",
          ],
          name: "Secondary color (reload)",
          handle: (startUp) => {
            if (startUp) {
              for (let i = 100; i < 1000; i += 100) {
                const needsReplacing = [
                  `.bg-secondarycolor-${i}`,
                  `.border-secondarycolor-${i}`,
                  `.from-secondarycolor-${i}`,
                  `.to-secondarycolor-${i}`,
                ];
                const replacer = [
                  `bg-${settings.secondary_color}-${i}`,
                  `border-${settings.secondary_color}-${i}`,
                  `from-${settings.secondary_color}-${i}`,
                  `to-${settings.secondary_color}-${i}`,
                ];
                for (
                  let replaceIndex = 0;
                  replaceIndex < needsReplacing.length;
                  replaceIndex++
                ) {
                  const elements = document.querySelectorAll(
                    needsReplacing[replaceIndex],
                  );
                  for (
                    let elementIndex = 0;
                    elementIndex < elements.length;
                    elementIndex++
                  ) {
                    const element = elements[elementIndex];
                    element.classList.remove(
                      needsReplacing[replaceIndex].slice(1),
                    );
                    element.classList.add(replacer[replaceIndex]);
                  }
                }
              }
            }
          },
        },
        show_id_instead: {
          default: false,
          type: "boolean",
          name: "Show id instead of username in chat logs",
        },
        prevent_right_click: {
          default: false,
          type: "boolean",
          name: "Prevent right click",
        },
        show_send_button: {
          default: true,
          type: "boolean",
          name: "Show send button",
          handle: (startUp) => {
            document.getElementById("send-btn").style.display =
              settings.show_send_button && !isMobile ? "" : "none";
          },
        },
        show_version_displays: {
          default: true,
          type: "boolean",
          name: "Show version displays",
          handle: (startUp) => {
            if (!settings.show_version_displays) {
              const versionDisplays = document.querySelectorAll(".version");
              for (let i = 0; i < versionDisplays.length; i++) {
                versionDisplays[i].classList.add("hidden");
              }
            }
          },
        },
        message_box_focus: {
          default: true,
          type: "boolean",
          name: "Focus message box after actions",
        },
        auto_login: {
          default: false,
          type: "boolean",
          name: "Auto Login based on saved details",
        },
        sort_by_self_timestamp: {
          default: false,
          type: "boolean",
          name: "Sort chats by last time interactive with",
        },
      };
      const settings = {};
      let currentUser = null;
      let currentChat = null;
      let uploadedFile = null;
      let uploadedFileMimeType = null;
      let fileName = null;
      let replyingTo = null;
      // Maps
      let userColors = new Map();
      // Arrays
      const userColorsList = [
        "background: linear-gradient(to right, #E53E3E, #f76b25);",
        "background: linear-gradient(to right, #38A169, #2F855A);",
        "background: linear-gradient(to right, #805AD5, #6B46C1);",
        "background: linear-gradient(to right, #D69E2E, #B7791F);",
        "background: linear-gradient(to right, #3182CE, #2B6CB0);",
        "background: linear-gradient(to right, #DD6B20, #C05621);",
        "background: linear-gradient(to right, #319795, #2C7A7B);",
        "background: linear-gradient(to right, #B83280, #97266D);",
        "background: linear-gradient(to right, #5A67D8, #4C51BF);",
        "background: linear-gradient(to right, #718096, #4A5568);",
      ];

      let userChats = [];
      let stickers = [];
      // Numbers
      let nextColorIndex = 0;
      let msgsSinceLastShow = 0;
      let msgLastTimestamp = 0;
      let pageindex = 0;
      // Strings
      let lastMessageDay = null;
      let lastMessageSender = null;
      // Booleans
      let focused = true;
      let isMobile = false;
      let isDraggingOver = false;
      let autoLoginTriggered = false;
      //----------------------------------------------//
      // Utility Functions
      function setHeaderProfiles(currentChat) {
        const div = document.getElementById("chat-header-profiles");
        div.innerHTML = "";
        const lengthToDisplay = settings.profile_length_to_display;
        for (
          let i = 0;
          i < lengthToDisplay && i < currentChat.participants.length;
          i++
        ) {
          const img = document.createElement("img");
          img.src = `${rootUrl}/pfp/${currentChat.participants[i]}`;
          img.className =
            `relative cursor-pointer inline-block h-8 w-8 rounded-full border-2 border-${
              currentChat.participants[i] === currentChat.admin.id
                ? settings.secondary_color
                : settings.primary_color
            }-600 object-cover object-center hover:z-10 focus:z-10`;
          img.addEventListener("click", () => {
            showUserProfile({
              username: currentChat.participantsUsernames[i].username,
              id: currentChat.participants[i],
            }, currentChat);
          });
          div.appendChild(img);
        }
        if (currentChat.participants.length > lengthToDisplay) {
          const span = document.createElement("span");
          span.className = [
            "relative",
            "cursor-pointer",
            "inline-block",
            "h-8",
            "w-8",
            "rounded-full",
            `bg-${settings.primary_color}-800`,
            `border-2`,
            `border-${settings.primary_color}-500`,
            "object-cover",
            "object-center",
            "hover:z-10",
            "focus:z-10",
            `text-${settings.text_color}-700`,
            "text-center",
            "flex",
            "items-center",
            "justify-center",
          ].join(" ");

          span.textContent = `+${
            currentChat.participants.length - lengthToDisplay
          }`;

          span.addEventListener("click", () => {
            document.getElementById("chat-settings-modal").classList.remove(
              "hidden",
            );
          });

          div.appendChild(span);
        }
      }

      function updateBackgroundImage() {
        const img = new Image();
        img.onload = function () {
          document.getElementById("message-container").style.backgroundImage =
            `linear-gradient(rgba(0, 0, 0, ${
              1 - settings.background_image_opacity
            }), rgba(0, 0, 0, ${
              1 - settings.background_image_opacity
            })), url(${img.src})`;
        };
        img.src = `${settings.background_image}?t=${Date.now()}`;
      }

      function markdown(src) {
        const rx_lt = /</g;
        const rx_gt = />/g;
        const rx_space = /\t|\r|\uf8ff/g;
        const rx_escape = /\\([\\\|`*_{}\[\]()#+\-~])/g;
  const rx_hr = /^([*\-=_] *){3,}$/gm;
  const rx_blockquote = /\n *&gt; *([^]*?)(?=(\n|$){2})/g;
  const rx_list =
    /\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g;
  const rx_listjoin = /<\/(ol|ul)>\n\n<\1>/g;
  const rx_highlight =
    /(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g;
        const rx_code = /\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g;
  const rx_link =
    /((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g;
        const rx_table = /\n(( *\|.*?\| *\n)+)/g;
        const rx_thead = /^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/;
        const rx_row = /.*\n/g;
        const rx_cell = /\||(.*?[^\\])\|/g;
        const rx_heading = /(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g;
        const rx_para = /(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g;
        const rx_stash = /-\d+\uf8ff/g;

        function replace(rex, fn) {
          src = src.replace(rex, fn);
        }

        function element(tag, content) {
          return "<" + tag + ">" + content + "</" + tag + ">";
        }

        function blockquote(src) {
          return src.replace(rx_blockquote, function (all, content) {
            return element(
              "blockquote",
              blockquote(highlight(content.replace(/^ *&gt; */gm, ""))),
            );
          });
        }

        function list(src) {
          return src.replace(rx_list, function (all, ind, ol, num, low, content) {
            const entry = element(
              "li",
              highlight(
                content.split(
                  RegExp("\n ?" + ind + "(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +", "g"),
                ).map(list).join("</li><li>"),
              ),
            );

            return "\n" +
              (ol
                ? '<ol start="' + (num
                  ? ol + '">'
                  : parseInt(ol, 36) - 9 + '" style="list-style-type:' +
                    (low ? "low" : "upp") + 'er-alpha">') +
                  entry + "</ol>"
                : element("ul", entry));
          });
        }

        function highlight(src) {
          return src.replace(
            rx_highlight,
            function (all, _, p1, emp, sub, sup, small, big, p2, content) {
              return _ + element(
                emp
                  ? (p2 ? "strong" : "em")
                  : sub
                  ? (p2 ? "s" : "sub")
                  : sup
                  ? "sup"
                  : small
                  ? "small"
                  : big
                  ? "big"
                  : "code",
                highlight(content),
              );
            },
          );
        }

        function unesc(str) {
          return str.replace(rx_escape, "$1");
        }

        const stash = [];
        let si = 0;

        src = "\n" + src + "\n";

        replace(rx_lt, "&lt;");
        replace(rx_gt, "&gt;");
        replace(rx_space, "  ");

        // blockquote
        src = blockquote(src);

        // horizontal rule
        replace(rx_hr, "<hr/>");

        // list
        src = list(src);
        replace(rx_listjoin, "");

        // code
        replace(rx_code, function (all, p1, p2, p3, p4) {
          stash[--si] = element(
            "pre",
            element("code", p3 || p4.replace(/^    /gm, "")),
          );
          return si + "\uf8ff";
        });

        // link or image
        replace(rx_link, function (all, p1, p2, p3, p4, p5, p6) {
          stash[--si] = p4
            ? p2
              ? '<img src="' + p4 + '" alt="' + p3 + '"/>'
              : '<a href="' + p4 + '">' + unesc(highlight(p3)) + "</a>"
            : p6;
          return si + "\uf8ff";
        });

        // table
        replace(rx_table, function (all, table) {
          var sep = table.match(rx_thead)[1];
          return "\n" + element(
            "table",
            table.replace(rx_row, function (row, ri) {
              return row == sep ? "" : element(
                "tr",
                row.replace(rx_cell, function (all, cell, ci) {
                  return ci
                    ? element(
                      sep && !ri ? "th" : "td",
                      unesc(highlight(cell || "")),
                    )
                    : "";
                }),
              );
            }),
          );
        });

        // heading
        replace(rx_heading, function (all, _, p1, p2) {
          return _ + element("h" + p1.length, unesc(highlight(p2)));
        });

        // paragraph
        replace(rx_para, function (all, content) {
          return element("p", unesc(highlight(content)));
        });

        // stash
        replace(rx_stash, function (all) {
          return stash[parseInt(all)];
        });

        return src.trim();
      }

      function showDesc(text) {
        document.getElementById("loading-page-desc").textContent = text;
      }

      async function showLoadingPage() {
        const loading_page = document.getElementById("loading-page");
        loading_page.classList.remove("hidden");
        loading_page.classList.remove("opacity-0");
        return new Promise((r) =>
          setTimeout(
            () => {
              if (settings.loading_time !== 0) {
                loading_page.classList.add("opacity-0");
                setTimeout(() => loading_page.classList.add("hidden"), 500);
              } else {
                loading_page.classList.add("hidden");
              }
              r();
            },
            settings.loading_time <= 15 && settings.loading_time >= 0
              ? settings.loading_time * 1000
              : settings.loading_time > 15
              ? 15 * 1000
              : settingsInfo.loading_time.default * 1000,
          )
        );
      }

      function isJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }

      async function trackRunTime(f) {
        const t1 = Date.now();
        await f();
        const t2 = Date.now();
        const tt = t2 - t1;
        return tt;
      }
      //----------------------------------------------//
      // Scrolling Functions
      function triggerScroll() {
        const element = document.getElementById("message-container");
        if (
          Math.abs(
            element.scrollHeight - element.scrollTop - element.clientHeight,
          ) < element.clientHeight
        ) {
          scroll();
        }
      }

      function scroll() {
        const element = document.getElementById("message-container");
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
      //----------------------------------------------//
      // Chat rendering Functions
      function getColorForUser(username) {
        if (!userColors.has(username)) {
          userColors.set(username, userColorsList[nextColorIndex]);
          nextColorIndex = (nextColorIndex + 1) % userColorsList.length;
        }
        return userColors.get(username);
      }

      function getChatLogHtml(message, chat) {
        switch (message.action) {
          case "account_delete":
            return `Admin ${
              settings.show_id_instead
                ? message.userActed.id
                : message.userActed.username
            } deleted their account, deleting this chat.`;
          case "create_chat":
            return `Chat ${
              settings.show_id_instead ? chat.id : message.value
            } created by ${
              settings.show_id_instead
                ? message.userActed.id
                : message.userActed.username
            }.`;
          case "change_chat_name":
            return `Chat name changed from ${message.value[0]} to ${
              message.value[1]
            }.`;
          case "delete_chat":
            return `Chat deleted by admin ${
              settings.show_id_instead
                ? message.userActed.id
                : message.userActed.username
            }.`;
          case "add_user":
            return `Admin ${
              settings.show_id_instead
                ? message.userActed.id
                : message.userActed.username
            } added user ${
              settings.show_id_instead
                ? message.userActedOn.id
                : message.userActedOn.username
            }.`;
          case "remove_user":
            if (message.userActed.id === message.userActedOn.id) {
              return `${
                settings.show_id_instead
                  ? message.userActed.id
                  : message.userActed.username
              } left the chat.`;
            }
            return `Admin ${
              settings.show_id_instead
                ? message.userActed.id
                : message.userActed.username
            } removed user ${
              settings.show_id_instead
                ? message.userActedOn.id
                : message.userActedOn.username
            }.`;
          default:
            return "Chat log error";
        }
      }

      function setStickerInfoContent(sticker) {
        document.getElementById("sticker-info-name").textContent = sticker.fileName;
        document.getElementById("sticker-info-img").src =
          `${rootUrl}/attachment/${sticker.data}`;
        document.getElementById("sticker-info-save-btn").textContent =
          Object.keys(stickers).includes(sticker.data)
            ? "Unsave Sticker"
            : "Save Sticker";
        document.getElementById("sticker-info-save-btn").onclick = () => {
          if (
            !Object.keys(stickers).includes(sticker.data)
          ) {
            stickers[sticker.data] = {
              fileName: sticker.fileName,
            };
            localStorage.setItem("chatapp:stickers", JSON.stringify(stickers));
            updateStickersDisplay();
            showToast("Saved sticker.");
            setStickerInfoContent(sticker);
          } else {
            delete stickers[sticker.data];
            localStorage.setItem("chatapp:stickers", JSON.stringify(stickers));
            updateStickersDisplay();
            showToast("Unsaved sticker.");
            setStickerInfoContent(sticker);
          }
        };
        document.getElementById("sticker-info-modal").classList.remove(
          "hidden",
        );
      }

      function appendMessage(message, bulk, timeStamp) {
        if (
          lastMessageDay !==
            formatDateToYearMonthDay(new Date(message.timestamp))
        ) {
          lastMessageDay = formatDateToYearMonthDay(
            new Date(message.timestamp),
          );
          addTimeDisplay(message.timestamp);
        }
        const messageContainer = document.getElementById("message-container");
        if (message.type === "chat" && message.action) {
          const messageElement = document.createElement("div");
          const messageDiv = document.createElement("div");
          const messageSpan = document.createElement("span");
          messageElement.classList.add(
            "w-100",
            "mt-2",
            "break-keep",
            "flex",
            "justify-center",
            "items-center",
            "gap-2",
          );
          messageDiv.className =
            `px-4 py-2 bg-opacity-${settings.message_opacity} rounded-lg max-w-sm mx-auto text-center text-${settings.text_color}-400 bg-${settings.primary_color}-800 shadow-md`;
          messageSpan.className = "text-sm font-medium";
          messageSpan.textContent = getChatLogHtml(message, currentChat);
          messageDiv.appendChild(messageSpan);
          messageElement.appendChild(messageDiv);
          messageContainer.appendChild(messageElement);
          lastMessageSender = null;
          if (!bulk) {
            triggerScroll();
          }
          return;
        }
        const isSent = message.username === currentUser?.username;
        let showUsername = message.username !== lastMessageSender ||
          message.timestamp - msgLastTimestamp >= 5 * 60 * 1000;
        if (!showUsername) msgsSinceLastShow++;
        if (msgsSinceLastShow > 20 || showUsername) {
          showUsername = true;
          msgsSinceLastShow = 0;
        }
        const msgOuter = document.createElement("div");
        msgOuter.setAttribute("data-message-id", message.id);
        msgOuter.classList.add("w-100", "flex", "group", "outer-msg", `bg-${settings.secondary_color}-600`, "bg-opacity-0", "transition-all", "duration-1000", "ease-in-out");

        const messageElement = document.createElement("div");
        messageElement.classList.add(
          `bg-opacity-${settings.message_opacity}`,
          "message-bubble",
          "p-2",
          "rounded-lg",
          "max-w-[80%]",
          "min-w-[25ch]",
          "inline-block",
          "w-auto",
          "justify-center",
          "relative", // To position the triangle relative to the message bubble
        );

        if (isSent) {
          messageElement.classList.add(
            "sent",
            "right-0",
            `bg-${settings.secondary_color}-600`,
            `text-${settings.text_color}-900`,
          );
          msgOuter.classList.add("justify-end");
          messageElement.style = "border-top-right-radius: 0%;";
        } else {
          messageElement.classList.add(
            "received",
            `bg-${settings.primary_color}-700`,
          );
          messageElement.style = "border-top-left-radius: 0%;";
        }
        if (showUsername) {
          messageElement.classList.add("mt-4");
          if (isSent) {
            messageElement.classList.add("mr-2");
          } else {
            messageElement.classList.add("ml-2");
          }
        } else {
          messageElement.classList.add("mt-2");
          if (isSent) {
            messageElement.classList.add("mr-12");
          } else {
            messageElement.classList.add("ml-12");
          }
        }
        if (showUsername) {
          const div = document.createElement("div");
          div.className = "mb-1 flex items-center justify-between";
          const usernameSpan = document.createElement("span");
          if (isSent) {
            usernameSpan.className =
              `text-${settings.text_color}-900 text-base font-bold cursor-pointer`;
          } else {
            usernameSpan.className = `text-base font-bold cursor-pointer`;
            usernameSpan.style = `${
              getColorForUser(message.username)
            }; -webkit-background-clip: text; -webkit-text-fill-color: transparent;`;
          }
          usernameSpan.textContent = isSent ? "You" : message.username;
          usernameSpan.addEventListener("click", () => {
            showUserProfile(
              { username: message.username, id: message.senderId },
              currentChat,
            );
          });
          const timestampSpan = document.createElement("span");
          timestampSpan.className = `ml-5 text-sm text-${settings.text_color}-500`;
          timestampSpan.textContent = getTimestamp(message.timestamp);
          div.appendChild(usernameSpan);
          div.appendChild(timestampSpan);
          messageElement.appendChild(div);
        }

        if (message.reply) {
          const replyDisplay = document.createElement("div");
          replyDisplay.addEventListener("click", () => {
            const msg = Array.from(document.querySelectorAll(".outer-msg")).find((
              m,
            ) => m.getAttribute("data-message-id") === message.reply);
            if (msg) {
              msg.scrollIntoView({ behavior: "smooth", block: "start" });
              msg.classList.add("bg-opacity-50")
              msg.classList.remove("bg-opacity-0")
              setTimeout(()=>{
                msg.classList.add("bg-opacity-0")
                msg.classList.remove("bg-opacity-50")
              },1000)
            }
          });
          replyDisplay.className =
            `reply-display h-10 cursor-pointer p-2 bg-${settings.primary_color}-800 rounded-md mb-2 flex items-center truncate text-ellipsis`;

          // Create a colored line on the left
          const coloredLine = document.createElement("div");
          coloredLine.className = `h-full w-[0.125rem] rounded-l-md flex-shrink-0`;
          replyDisplay.appendChild(coloredLine);
          const replySenderDiv = document.createElement("div")
          replySenderDiv.className = "overflow-hidden flex"
          const replySenderSpan = document.createElement("span");
          replySenderSpan.className = `text-sm ml-2 text-${settings.text_color}-400`; // Add margin to the left

          replySenderDiv.appendChild(replySenderSpan)
          replyDisplay.appendChild(replySenderDiv);
          messageElement.appendChild(replyDisplay);

          socket.emit("get_message_by_id", {
            chatId: currentChat.id,
            messageId: message.reply,
          }, (response) => {
            if (response.error) replySenderSpan.textContent = `Deleted`;
            else {
              replySenderSpan.textContent = `${response.message.username}: ${
                response.message.message
                  ? response.message.message
                  : (response.message.attachment
                    ? "attachment"
                    : (response.message.sticker ? "sticker" : "Message"))
              }`;
              coloredLine.style = `${getColorForUser(response.message.username)}`;
            }
          });
        }

        if (message.attachment !== undefined) {
          if (
            message.attachment.fileName !== undefined &&
            message.attachment.data !== undefined &&
            (message.attachment.mime.startsWith("image"))
          ) {
            const imageDisplay = document.createElement("div");
            const detailsDisplay = document.createElement("div");
            const imageNameDisplay = document.createElement("button");
            const imageNameDisplaySvg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            const showpath = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            const fileNameSpan = document.createElement("span");
            const downloadFileBtn = document.createElement("button");
            const downloadFileDiv = document.createElement("div");
            downloadFileDiv.className = "relative inline-block group";
            const downloadFilePopOverDiv = document.createElement("div");
            const downloadFilePopOver = document.createElement("p");

            const downloadImageBtnSvg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            const downloadpath = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            const image = document.createElement("img");
            imageDisplay.className =
              `block mb-1 w-full justify-between text-wrap overflow-visible break-all items-center border border-${settings.primary_color}-600 bg-${settings.primary_color}-800 hover:bg-${settings.primary_color}-700 text-${settings.text_color}-700 rounded-lg shadow-md transition-all`;
            detailsDisplay.className =
              `flex border-b-2 border-${settings.primary_color}-500 w-full justify-between align-middle text-wrap break-all items-center`;
            imageNameDisplay.className = "inline-flex align-middle p-2";
            //imageNameDisplay.onclick = () =>
            //  openImage(imageNameDisplay.parentNode.parentNode);

            imageNameDisplaySvg.setAttribute("fill", "currentColor");
            imageNameDisplaySvg.setAttribute(
              "class",
              "inline-flex mr-5 w-6 h-6",
            );
            imageNameDisplaySvg.setAttribute(
              "xmlns",
              "http://www.w3.org/2000/svg",
            );
            imageNameDisplaySvg.setAttribute("viewBox", "0 0 32 32");

            showpath.setAttribute(
              "d",
              "M0 26.016q0 2.496 1.76 4.224t4.256 1.76h20q2.464 0 4.224-1.76t1.76-4.224v-20q0-2.496-1.76-4.256t-4.224-1.76h-20q-2.496 0-4.256 1.76t-1.76 4.256v20zM4 26.016v-20q0-0.832 0.576-1.408t1.44-0.608h20q0.8 0 1.408 0.608t0.576 1.408v20q0 0.832-0.576 1.408t-1.408 0.576h-20q-0.832 0-1.44-0.576t-0.576-1.408zM6.016 24q0 0.832 0.576 1.44t1.408 0.576h16q0.832 0 1.408-0.576t0.608-1.44v-0.928q-0.224-0.448-1.12-2.688t-1.6-3.584-1.28-2.112q-0.544-0.576-1.12-0.608t-1.152 0.384-1.152 1.12-1.184 1.568-1.152 1.696-1.152 1.6-1.088 1.184-1.088 0.448q-0.576 0-1.664-1.44-0.16-0.192-0.48-0.608-1.12-1.504-1.6-1.824-0.768-0.512-1.184 0.352-0.224 0.512-0.928 2.24t-1.056 2.56v0.64zM6.016 9.024q0 1.248 0.864 2.112t2.112 0.864 2.144-0.864 0.864-2.112-0.864-2.144-2.144-0.864-2.112 0.864-0.864 2.144z",
            );
            fileNameSpan.textContent = message.attachment.fileName;
            downloadFileBtn.className =
              `flex-grow align-middle border-l-2 border-${settings.primary_color}-500 p-2`;
            downloadFileBtn.onclick = () =>
              download(
                `${rootUrl}/attachment/${message.attachment.data}`,
                message.attachment.fileName,
              );

            downloadImageBtnSvg.setAttribute("stroke", "currentColor");
            downloadImageBtnSvg.setAttribute("fill", "none");
            downloadImageBtnSvg.setAttribute(
              "class",
              `inline-flex h-5 w-5 text-${settings.text_color}-700`,
            );
            downloadImageBtnSvg.setAttribute(
              "xmlns",
              "http://www.w3.org/2000/svg",
            );
            downloadImageBtnSvg.setAttribute("viewBox", "0 0 24 24");

            downloadpath.setAttribute("stroke-width", "2");
            downloadpath.setAttribute("stroke-linecap", "round");
            downloadpath.setAttribute("stroke-linejoin", "round");
            downloadpath.setAttribute(
              "d",
              "M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12",
            );
            downloadFilePopOverDiv.className =
              `px-2 text-nowrap py-1 absolute w-auto transition-delay-500 bg-${settings.primary_color}-700 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 delay-1000 z-10`;
            downloadFilePopOver.className =
              ` text-${settings.text_color}-700 text-sm`;
            downloadFilePopOver.textContent = "Download file.";
            downloadFilePopOverDiv.appendChild(downloadFilePopOver);
            imageNameDisplaySvg.appendChild(showpath);
            imageNameDisplay.appendChild(imageNameDisplaySvg);
            imageNameDisplay.appendChild(fileNameSpan);
            downloadImageBtnSvg.appendChild(downloadpath);
            downloadFileBtn.appendChild(downloadImageBtnSvg);
            downloadFileDiv.appendChild(downloadFileBtn);
            if (!isSent) {
              downloadFileDiv.appendChild(downloadFilePopOverDiv);
            }
            detailsDisplay.appendChild(imageNameDisplay);
            detailsDisplay.appendChild(downloadFileDiv);

            image.className = "h-48 mx-auto w-auto max-w-full object-contain";
            image.src = `${rootUrl}/attachment/${message.attachment.data}`;
            image.alt = message.attachment.fileName;
            //image.onclick = () => openImage(image.parentNode);
            imageDisplay.appendChild(detailsDisplay);
            imageDisplay.appendChild(image);

            messageElement.appendChild(imageDisplay);
          } else if (
            message.attachment.fileName !== undefined &&
            message.attachment.mime !== undefined &&
            message.attachment.mime === "text/html"
          ) {
            const attachmentButton = document.createElement("button");
            const filenameSpan = document.createElement("span");
            const svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            const g = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "g",
            );
            const paths = [
              "M378.413,0H208.297h-13.182L185.8,9.314L57.02,138.102l-9.314,9.314v13.176v265.514 c0,47.36,38.528,85.895,85.896,85.895h244.811c47.353,0,85.881-38.535,85.881-85.895V85.896C464.294,38.528,425.766,0,378.413,0z M432.497,426.105c0,29.877-24.214,54.091-54.084,54.091H133.602c-29.884,0-54.098-24.214-54.098-54.091V160.591h83.716 c24.885,0,45.077-20.178,45.077-45.07V31.804h170.116c29.87,0,54.084,24.214,54.084,54.092V426.105z",
              "M163.164,253.19c-5.097,0-8.867,3.652-8.867,9.482v23.453c0,0.489-0.251,0.734-0.726,0.734h-26.993 c-0.475,0-0.726-0.245-0.726-0.734v-23.453c0-5.831-3.771-9.482-8.868-9.482c-5.222,0-8.993,3.652-8.993,9.482v65.144 c0,5.83,3.645,9.475,8.868,9.475c5.111,0,8.993-3.645,8.993-9.475v-24.305c0-0.489,0.251-0.734,0.726-0.734h26.993 c0.475,0,0.726,0.244,0.726,0.734v24.305c0,5.83,3.77,9.475,8.867,9.475c5.223,0,8.993-3.645,8.993-9.475v-65.144 C172.157,256.841,168.387,253.19,163.164,253.19z",
              "M235.249,253.923h-47.284c-5.46,0-8.993,3.282-8.993,8.023c0,4.615,3.533,7.897,8.993,7.897h13.978 c0.488,0,0.726,0.244,0.726,0.726v57.247c0,5.711,3.771,9.475,8.882,9.475c5.223,0,8.993-3.764,8.993-9.475v-57.247 c0-0.482,0.237-0.726,0.726-0.726h13.978c5.46,0,8.993-3.282,8.993-7.897C244.242,257.204,240.709,253.923,235.249,253.923z",
              "M318.253,253.19c-5.348,0-8.267,2.919-10.934,9.238l-17.26,39.862h-0.489l-17.623-39.862 c-2.794-6.319-5.712-9.238-11.06-9.238c-5.948,0-9.845,4.134-9.845,10.697v64.781c0,5.467,3.408,8.623,8.268,8.623 c4.622,0,8.029-3.156,8.029-8.623v-39.868h0.6l12.89,29.653c2.541,5.837,4.608,7.541,8.742,7.541c4.133,0,6.2-1.704,8.756-7.541 l12.764-29.653h0.601v39.868c0,5.467,3.281,8.623,8.141,8.623c4.874,0,8.156-3.156,8.156-8.623v-64.781 C327.987,257.323,324.216,253.19,318.253,253.19z",
              "M389.36,320.645h-29.408c-0.489,0-0.726-0.244-0.726-0.734v-57.24c0-5.712-3.77-9.482-8.867-9.482 c-5.237,0-8.993,3.77-8.993,9.482v64.899c0,5.349,3.518,8.993,8.993,8.993h39.002c5.475,0,8.994-3.282,8.994-8.022 C398.354,323.926,394.835,320.645,389.36,320.645z",
            ];

            attachmentButton.className =
              `flex mb-1 w-full justify-between overflow-auto text-wrap break-all items-center p-2 bg-${settings.primary_color}-800 border border-${settings.primary_color}-600 hover:bg-${settings.primary_color}-700 text-${settings.text_color}-700 rounded-lg shadow-md transition-all`;
            attachmentButton.onclick = () =>
              openPreview(
                message.attachment.data,
                message.attachment.fileName,
              );

            svg.setAttribute("class", "inline-flex h-5 w-5 mr-5");
            svg.setAttribute("fill", "currentColor");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("viewBox", "0 0 512 512");

            paths.forEach((d) => {
              const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path",
              );
              path.setAttribute("class", `text-${settings.text_color}-900`);
              path.setAttribute("d", d);
              g.appendChild(path);
            });
            svg.appendChild(g);
            attachmentButton.appendChild(svg);
            filenameSpan.textContent = message.attachment.fileName;
            attachmentButton.appendChild(filenameSpan);
            messageElement.appendChild(attachmentButton);
          } else {
            const attachmentButton = document.createElement("button");
            const downloadFilePopOverDiv = document.createElement("div");
            const downloadFileDiv = document.createElement("div");
            downloadFileDiv.className = `relative inline-block group w-full mb-1`;
            const downloadFilePopOver = document.createElement("p");
            downloadFilePopOverDiv.className =
              `px-2 text-nowrap py-1 absolute w-auto transition-delay-500 bg-${settings.primary_color}-700 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 delay-1000 z-10`;
            downloadFilePopOver.className =
              ` text-${settings.text_color}-700 text-sm`;
            downloadFilePopOver.textContent = "Download file.";
            downloadFilePopOverDiv.appendChild(downloadFilePopOver);
            const svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg",
            );
            const path = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "path",
            );
            const filenameSpan = document.createElement("span");

            attachmentButton.className =
              `flex w-full justify-between overflow-auto text-wrap break-all items-center p-2 bg-${settings.primary_color}-800 border border-${settings.primary_color}-600 hover:bg-${settings.primary_color}-700 text-${settings.text_color}-700 rounded-lg shadow-md transition-all`;
            attachmentButton.onclick = () =>
              download(
                `${rootUrl}/attachment/${message.attachment.data}`,
                message.attachment.fileName,
              );

            svg.setAttribute("class", "inline-flex h-5 w-5 mr-5");
            svg.setAttribute("stroke", "currentColor");
            svg.setAttribute("fill", "none");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("viewBox", "0 0 24 24");

            path.setAttribute(
              "d",
              "M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12",
            );
            path.setAttribute("stroke-width", "2");
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            svg.appendChild(path);
            attachmentButton.appendChild(svg);
            filenameSpan.textContent = message.attachment.fileName;
            downloadFileDiv.appendChild(attachmentButton);
            if (!isSent) {
              downloadFileDiv.appendChild(downloadFilePopOverDiv);
            }

            attachmentButton.appendChild(filenameSpan);
            messageElement.appendChild(downloadFileDiv);
          }
        }
        const msgDiv = document.createElement("div");
        msgDiv.className = "text-base text-wrap break-words";
        msgDiv.textContent = message.message;
        if (message.sticker) {
          msgDiv.addEventListener("click", () => {
            setStickerInfoContent(message.sticker);
          });
          msgDiv.classList.add("cursor-pointer");
          const image = document.createElement("img");

          image.className = "h-48 w-auto object-contain";
          image.src = `${rootUrl}/attachment/${message.sticker.data}`;
          image.alt = message.sticker.fileName;
          msgDiv.classList.add("object-contain");
          msgDiv.appendChild(image);
          if (!showUsername) {
            messageElement.classList.remove("min-w-[25ch]");
          }
        }

        messageElement.appendChild(msgDiv);
        const controlsContainer = document.createElement("div");

        controlsContainer.className = `flex ${
          isSent ? "mr-2" : "ml-2"
        } items-center group-hover:opacity-100 opacity-0`; // small margin to separate from the message bubble

        // Create the vertical ellipsis button.
        const moreBtn = document.createElement("button");
        moreBtn.className = "cursor-pointer";
        moreBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-${settings.text_color}-500" fill="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="5" r="2"/>
      <circle cx="12" cy="12" r="2"/>
      <circle cx="12" cy="19" r="2"/>
    </svg>
  `;
        controlsContainer.appendChild(moreBtn);
        msgOuter.appendChild(controlsContainer);

        // When the more button is clicked, show a context menu.
        moreBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent the click from bubbling up.

          // Remove any existing context menu.
          const existingMenu = document.querySelector(".context-menu");
          if (existingMenu) {
            if (
              existingMenu.getAttribute("data-message-id") ===
                moreBtn.parentNode.parentNode.getAttribute("data-message-id")
            ) {
              existingMenu.remove();
              return;
            }
            existingMenu.remove();
          }

          // Create the context menu.
          const contextMenu = document.createElement("div");
          contextMenu.setAttribute("data-message-id", message.id);
          contextMenu.className =
            `context-menu absolute bg-${settings.primary_color}-800 text-${settings.text_color}-700 rounded-lg shadow-md z-50`;

          // Position the menu below the more button.
          const btnRect = moreBtn.getBoundingClientRect();
          if (btnRect.top > window.innerHeight / 2) {
            // Position upward: set bottom relative to viewport
            // We add window.scrollY to account for page scroll.
            contextMenu.style.bottom = window.innerHeight - btnRect.top +
              window.scrollY + "px";
            contextMenu.style.left = btnRect.left + window.scrollX + "px";
            contextMenu.style.top = "auto";
          } else {
            // Position downward: set top relative to viewport
            contextMenu.style.top = btnRect.bottom + window.scrollY + "px";
            contextMenu.style.left = btnRect.left + window.scrollX + "px";
            contextMenu.style.bottom = "auto";
          }

          // Add menu options.
          // For messages sent by the current user, include the "Delete" option.
          if (message.senderId === currentUser.id) {
            const deleteOption = document.createElement("div");
            deleteOption.textContent = "Delete Message";
            deleteOption.className =
              "px-4 py-2 hover:bg-opacity-75 bg-opacity-100 cursor-pointer text-sm";
            deleteOption.onclick = async (evt) => {
              evt.stopPropagation();
              if (
                await createConfirmModal(
                  "Are you sure you want to delete this message?",
                )
              ) {
                socket.emit("delete_message", {
                  chatId: currentChat.id,
                  messageId: message.id,
                });
              }
              contextMenu.remove();
            };
            contextMenu.appendChild(deleteOption);
          }

          // Add the Reply option.
          const replyOption = document.createElement("div");
          replyOption.textContent = "Reply";
          replyOption.className =
            "px-4 py-2 hover:bg-opacity-75 bg-opacity-100 cursor-pointer text-sm";
          replyOption.onclick = function (evt) {
            evt.stopPropagation();
            replyingTo = message; // Set the global reply variable to this message.
            displayReplyDisplay();
            contextMenu.remove();
            if(settings.message_box_focus){
              document.getElementById("message-input").focus();
            }
          };
          contextMenu.appendChild(replyOption);

          // Add the Reply option.
          if(message.message){
            const copyOption = document.createElement("div");
            copyOption.textContent = "Copy";
            copyOption.className =
              "px-4 py-2 hover:bg-opacity-75 bg-opacity-100 cursor-pointer text-sm";
            copyOption.onclick = function (evt) {
              evt.stopPropagation();
              navigator.clipboard.writeText(message.message);
              showToast('Copied message.')
              contextMenu.remove();
            };
            contextMenu.appendChild(copyOption);
          }
          // Add the Info option, which calls openMessageInfoModal.
          const infoOption = document.createElement("div");
          infoOption.textContent = "Info";
          infoOption.className =
            "px-4 py-2 hover:bg-opacity-75 bg-opacity-100 cursor-pointer text-sm";
          infoOption.onclick = function (evt) {
            evt.stopPropagation();
            openMessageInfoModal(message);
            contextMenu.remove();
          };
          contextMenu.appendChild(infoOption);

          document.body.appendChild(contextMenu);

          // Close the menu when clicking outside.
          const closeContextMenu = function (event) {
            if (!contextMenu.contains(event.target)) {
              contextMenu.remove();
              document.removeEventListener("click", closeContextMenu);
            }
          };
          document.addEventListener("click", closeContextMenu);
        });

        const shouldAddPfpFirst = !isSent;

        if (showUsername) {
          const pfp = document.createElement("img");
          pfp.className =
            "w-10 h-10 rounded-full object-cover profile-pic cursor-pointer";
          pfp.src = `${rootUrl}/pfp/${message.senderId}?v=${timeStamp}`;
          pfp.addEventListener("click", () => {
            showUserProfile(
              { username: message.username, id: message.senderId },
              currentChat,
            );
          });

          if (shouldAddPfpFirst) {
            msgOuter.appendChild(pfp);

            msgOuter.appendChild(messageElement);
            msgOuter.appendChild(controlsContainer);
          } else {
            msgOuter.appendChild(controlsContainer);

            msgOuter.appendChild(messageElement);

            msgOuter.appendChild(pfp);
          }
        } else {
          if (shouldAddPfpFirst) {
            msgOuter.appendChild(messageElement);
            msgOuter.appendChild(controlsContainer);
          } else {
            msgOuter.appendChild(controlsContainer);

            msgOuter.appendChild(messageElement);
          }
        }

        messageContainer.appendChild(msgOuter);
        lastMessageSender = message.username;
        msgLastTimestamp = message.timestamp;
        if (!bulk) {
          triggerScroll();
        }

        function addTimeDisplay(timestamp) {
          const d = new Date(timestamp);
          const messageElement = document.createElement("div");
          messageElement.classList.add(
            "w-100",
            "mt-4",
            "mb-4",
            "break-keep",
            "flex",
            "items-center",
            "justify-center",
            "gap-4",
          );

          // Create divider lines
          const leftDivider = document.createElement("div");
          leftDivider.className =
            `h-[1px] flex-1 bg-${settings.primary_color}-500 bg-opacity-30`;

          const timeDisplayDiv = document.createElement("div");
          timeDisplayDiv.className =
            `px-4 py-1.5 bg-opacity-${settings.message_opacity} rounded-full text-center text-${settings.text_color}-400 bg-${settings.primary_color}-800 shadow-md`;

          const timeDisplaySpan = document.createElement("span");
          timeDisplaySpan.className = "text-sm font-medium";
          timeDisplaySpan.textContent = d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          const rightDivider = document.createElement("div");
          rightDivider.className =
            `h-[1px] flex-1 bg-${settings.primary_color}-500 bg-opacity-30`;

          timeDisplayDiv.appendChild(timeDisplaySpan);
          messageElement.appendChild(leftDivider);
          messageElement.appendChild(timeDisplayDiv);
          messageElement.appendChild(rightDivider);

          document.getElementById("message-container").appendChild(messageElement);
          lastMessageSender = null;
        }

        function formatDateToYearMonthDay(date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so add 1
          const day = String(date.getDate()).padStart(2, "0"); // Pad single-digit days with leading zero
          return `${year}${month}${day}`; // Format as yyyyMMdd
        }
      }

      function getTimestamp(timestamp) {
        const d = new Date(timestamp);
        const now = new Date();
        // Helper function to format date as dd/mm/yy hh:mm
        function formatDate(date) {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = String(date.getFullYear()).slice(2); // Get last 2 digits of year
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
        // Check if the date is today
        const isSameDay = d.toDateString() === now.toDateString();
        if (isSameDay) {
          return formatDate(d).slice(9); // Only return the time part (hh:mm)
        }
        // Check if the date is yesterday
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const isYesterday = d.toDateString() === yesterday.toDateString();
        if (isYesterday) {
          return `Yesterday at ${formatDate(d).slice(9)}`; // Only return the time part (hh:mm)
        }
        // Check if the date is within the past 7 days but not today or yesterday
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        if (d > weekAgo) {
          // Get the day of the week (e.g., "Monday")
          const dayOfWeek = d.toLocaleString("en-us", {
            weekday: "long",
          });
          return `${dayOfWeek} at ${formatDate(d).slice(9)}`; // Return "Day at hh:mm"
        }
        // If the date is older than a week, return the formatted date (dd/mm/yy hh:mm)
        return formatDate(d);
      }

      function openImage(btn) {
        btn.firstElementChild.classList.toggle("hidden");
        btn.lastElementChild.classList.toggle("hidden");
      }

      function download(url, fileName) {
        fetch(url)
          .then((response) => response.blob())
          .then((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch(console.error);
      }

      function openPreview(id, filename) {
        const previewContainer = document.getElementById("html-preview");
        const previewIframe = document.getElementById("html-preview-iframe");
        const previewDownload = document.getElementById(
          "html-preview-download",
        );
        const previewOpen = document.getElementById("html-preview-open");
        const previewName = document.getElementById("html-preview-name");

        previewIframe.src = `${rootUrl}/file/${id}`;
        previewDownload.onclick = () => {
          download(`${rootUrl}/attachment/${id}`, filename);
        };
        previewOpen.onclick = () => {
          openPage(`${rootUrl}/file/${id}`);
        };
        previewName.textContent = filename;
        previewContainer.classList.remove("hidden");
      }

      function openPage(link) {
        const newWindow = window.open(
          link,
          pageindex == 0 ? "_blank" : "Window-" + String(pageindex),
        );
        pageindex++;
      }

      function renderChatList() {
        const chatList = document.getElementById("chat-list");
        chatList.innerHTML = "";
        if (currentChat) {
          document.getElementById("chat-details").innerHTML = "";
          document
            .getElementById("chat-details")
            .appendChild(getChatDetails(currentChat));
        }
        if (userChats.length === 0) {
          document.getElementById("create-chat-btn").classList.add("hidden");
          const newChatButton = document.createElement("button");
          newChatButton.textContent = "No chats to show.";
          newChatButton.className =
            `w-full text-${settings.text_color}-900 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 bg-${settings.secondary_color}-600`;
          newChatButton.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <span class="text-break overflow-wrap text-center">Create New Chat</span>`;
          newChatButton.onclick = async () => {
            const chatName = await createPromptModal(
              "Enter chat name:",
              settings.default_chat_name,
              30,
            );
            if (chatName) {
              socket.emit("create_chat", {
                name: chatName.slice(0, 30),
              });
            }
          };
          chatList.appendChild(newChatButton);
          return;
        } else {
          document.getElementById("create-chat-btn").classList.remove("hidden");
        }

        userChats.sort(
          (a, b) => {
            if (settings.sort_by_self_timestamp) {
              return b.userLastMessageTimestamp - a.userLastMessageTimestamp;
            } else {
              return b.lastMessage.timestamp - a.lastMessage.timestamp;
            }
          },
        );

        userChats.forEach((chat) => {
          const chatElement = document.createElement("div");
          chatElement.setAttribute("chat-name", chat.name);
          chatElement.setAttribute(
            "last-message",
            chat.lastMessage?.message || null,
          );
          chatElement.classList.add(
            "group",
            "chat-item",
            "transition-all",
            "ease-in-out",
            "duration-150",
            "p-4",
            "rounded-lg",
            "border-2",
            "hover:border-opacity-50",
            `border-${settings.primary_color}-200`,
            `border-opacity-0`,
            "cursor-pointer",
            `active:bg-${settings.primary_color}-600`,
            "flex",
            "items-center",
            "gap-4",
          );

          if (currentChat && currentChat.id === chat.id) {
            chatElement.classList.add(`bg-${settings.primary_color}-700`);
          }

          const chatPicture = document.createElement("img");
          chatPicture.src = `${rootUrl}/chatpicture/${chat.id}`;
          chatPicture.classList.add(
            "w-11",
            "h-11",
            "rounded-full",
            "object-cover",
            "flex-shrink-0",
          );
          chatElement.appendChild(chatPicture);

          const chatContent = document.createElement("div");
          chatContent.classList.add("flex-1", "min-w-0");

          const chatTitle = document.createElement("div");
          chatTitle.classList.add(
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
            "font-semibold",
            "break-keep",
            "overflow-hidden",
            "truncate",
            "flex",
            "items-center",
            "justify-between",
          );

          const chatName = document.createElement("span");
          chatName.classList.add(
            `text-${settings.text_color}-900`,
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
            "text-base",
            "font-bold",
          );
          chatName.textContent = chat.name;

          const chatTimestamp = document.createElement("span");
          chatTimestamp.classList.add(
            "ml-5",
            "text-sm",
            "whitespace-nowrap",
            "overflow-hidden",
            "text-ellipsis",
            `text-${settings.text_color}-500`,
          );
          chatTimestamp.textContent = chat?.lastMessage?.timestamp
            ? getTimestamp(chat.lastMessage.timestamp)
            : "";

          chatTitle.appendChild(chatName);
          chatTitle.appendChild(chatTimestamp);

          const messagePreview = document.createElement("div");
          messagePreview.classList.add(
            "inline-flex",
            "text-sm",
            `text-${settings.text_color}-500`,
            "whitespace-nowrap",
            "text-ellipsis",
            "break-keep",
            "overflow-hidden",
            "truncate",
          );
          const bottomDiv = document.createElement("div");
          bottomDiv.className = "flex justify-between overflow-hidden";
          const unreadSpan = document.createElement("span");
          unreadSpan.className =
            `py-0 px-2 ml-4 text-sm inline-flex rounded-full bg-red-500 ${
              chat.userUnread ? (chat.userUnread > 0 ? "" : "hidden") : "hidden"
            }`;
          unreadSpan.textContent = chat.userUnread;
          const messageSender = chat.lastMessage?.username
            ? `${chat.lastMessage.username}: `
            : "";
          const lastMessage = chat.lastMessage?.message
            ? chat.lastMessage.message
            : (chat.lastMessage?.sticker
              ? "Sticker"
              : (chat.lastMessage?.attachment
                ? "Attachment"
                : (chat.lastMessage?.type === "chat" && chat.lastMessage.action
                  ? getChatLogHtml(chat.lastMessage, chat)
                  : "No messages")));
          messagePreview.textContent = `${messageSender}${lastMessage}`;
          bottomDiv.appendChild(messagePreview);
          bottomDiv.appendChild(unreadSpan);
          chatContent.appendChild(chatTitle);
          chatContent.appendChild(bottomDiv);
          chatElement.appendChild(chatContent);

          chatElement.addEventListener("click", () => {
            socket.emit("read_chat", { chatId: chat.id });
            switchToChat(chat);
            if (chat) {
              document.getElementById("chat-details").innerHTML = "";
              document
                .getElementById("chat-details")
                .appendChild(getChatDetails(chat));
            }
          });

          chatList.appendChild(chatElement);
        });
      }

      function openMessageInfoModal(message) {
        const modal = document.getElementById("message-info-modal");
        const modalContent = modal.querySelector(".modal-content");
        document.getElementById("message-info-id").textContent = message.id;
        document.getElementById("message-info-sender").textContent =
          message.username;
        document.getElementById("message-info-timestamp").textContent = new Date(
          message.timestamp,
        ).toLocaleString();

        const messageInfoContent = document.getElementById("message-info-content");
        const messageInfoSticker = document.getElementById("message-info-sticker");
        const messageInfoAttachment = document.getElementById(
          "message-info-attachment",
        );
        const messageInfoReply = document.getElementById("message-info-reply");

        if (message.message) {
          messageInfoContent.classList.remove("hidden");
          messageInfoContent.textContent = message.message;
        } else {
          messageInfoContent.classList.add("hidden");
        }

        messageInfoSticker.classList.toggle("hidden", !message.sticker);
        messageInfoSticker.textContent = message.sticker?.fileName;

        messageInfoAttachment.classList.toggle("hidden", !message.attachment);
        messageInfoAttachment.textContent = message.attachment?.fileName;

        messageInfoReply.classList.toggle("hidden", !message.reply);
        messageInfoReply.textContent = message.reply;

        modal.classList.remove("hidden");
      }

      function closeMessageInfoModal() {
        const modal = document.getElementById("message-info-modal");
        modal.classList.add("hidden");
      }

      function displayReplyDisplay() {
        const replyDisplay = document.getElementById("reply-display");
        const replyMessage = document.getElementById("reply-display-message");
        const replySender = document.getElementById("reply-display-sender");

        if (replyingTo) {
          replyDisplay.classList.remove("hidden");
          replyMessage.textContent = replyingTo.message; // Assuming replyingTo has a message property
          replySender.textContent = `Replying to ${replyingTo.username}: `; // Assuming replyingTo has a username property
        } else {
          replyDisplay.classList.add("hidden");
        }
      }

      function showUserProfile(user, chat) {
        const leaveButton = document.getElementById("other-profile-leave-btn");
        const removeButton = document.getElementById(
          "other-profile-remove-btn",
        );

        if (user.id === currentUser.id) {
          document.getElementById("other-pfp").classList.add(
            "group-hover:opacity-50",
          );
          document.getElementById("other-hover-svg").classList.add(
            "group-hover:opacity-100",
          );
        } else {
          document.getElementById("other-pfp").classList.remove(
            "group-hover:opacity-50",
          );
          document.getElementById("other-hover-svg").classList.remove(
            "group-hover:opacity-100",
          );
        }

        document.getElementById("other-change-pfp-btn").onclick = () => {
          if (user.id === currentUser.id) {
            document.getElementById("pfp-upload").click();
          } else {
            window.open(`${rootUrl}/pfp/${user.id}`, "_blank");
          }
        };
        document
          .getElementById("other-profile-modal")
          .classList.remove("hidden");
        document.getElementById("other-profile-username-display").textContent =
          user.username;
        document.getElementById("other-pfp").src = `${rootUrl}/pfp/${user.id}`;

        document.getElementById("other-profile-user-id").textContent = user.id;
        leaveButton.classList.add("hidden");
        removeButton.classList.add("hidden");
        if (chat) {
          if (currentUser.id === chat.admin.id && user.id !== currentUser.id) {
            leaveButton.classList.add("hidden");
            removeButton.classList.remove("hidden");
            removeButton.onclick = () => removeUser(user.id, user.username);
          } else if (
            currentUser.id !== chat.admin.id &&
            user.id === currentUser.id
          ) {
            leaveButton.classList.remove("hidden");
            removeButton.classList.add("hidden");
            leaveButton.onclick = leaveChat;
          }
        }
        socket.emit("user_lookup", { userId: user.id }, (user) => {
          if (
            document.getElementById("other-profile-user-id").textContent ===
              user.id
          ) {
            document.getElementById(
              "other-profile-user-creation",
            ).textContent = new Date(user.creationTime).toString();
          }
        });
      }

      function getChatDetails(chat) {
        if (!chat) return null;

        const sortedParticipants = chat.participantsUsernames.sort((a, b) => {
          if (a.id === chat.admin.id) return -1;
          if (b.id === chat.admin.id) return 1;
          if (a.id === currentUser.id) return -1;
          if (b.id === currentUser.id) return 1;
          return 0;
        });

        const container = document.createElement("div");

        sortedParticipants.forEach((participant) => {
          const participantElement = document.createElement("button");
          participantElement.addEventListener("click", () => {
            showUserProfile(participant, chat);
          });
          participantElement.classList.add(
            "transition-all",
            "ease-in-out",
            "duration-150",
            "border-2",
            "hover:border-opacity-50",
            "border-opacity-0",
            `border-${settings.primary_color}-200`,
            "participant-item",
            "flex",
            "w-full",
            "justify-between",
            "items-center",
            "mb-2",
            "p-3",
            `bg-${settings.primary_color}-700`,
            "rounded-lg",
          );

          const leftSide = document.createElement("div");
          leftSide.classList.add("flex", "items-center", "gap-3");

          // Profile Picture
          const profilePic = document.createElement("img");
          profilePic.src = `${rootUrl}/pfp/${participant.id}`;
          profilePic.classList.add(
            "w-10",
            "h-10",
            "rounded-full",
            "object-cover",
          );

          const nameBlock = document.createElement("div");
          nameBlock.classList.add("block");

          const username = document.createElement("span");
          username.classList.add(
            `text-${settings.text_color}-900`,
            "font-medium",
            "inline-flex",
            "break-all",
          );
          username.textContent = participant.username;

          const topGroup = document.createElement("div");
          topGroup.className = "flex items-center block";
          topGroup.appendChild(username);

          const userId = document.createElement("span");
          userId.classList.add(`text-${settings.text_color}-400`, "text-sm");
          userId.textContent = `${participant.id}`;

          const bottomGroup = document.createElement("div");
          bottomGroup.className = "flex";
          bottomGroup.appendChild(userId);

          nameBlock.appendChild(topGroup);
          nameBlock.appendChild(bottomGroup);

          leftSide.appendChild(profilePic); // Add profile picture
          leftSide.appendChild(nameBlock); // Add user details

          const rightSide = document.createElement("div");
          rightSide.classList.add("flex", "items-center", "gap-2");

          if (participant.id === chat.admin.id) {
            const adminBadge = document.createElement("span");
            adminBadge.classList.add(
              "bg-red-600",
              `text-${settings.text_color}-900`,
              "text-xs",
              "font-semibold",
              "px-2",
              "py-1",
              "ml-5",
              "rounded-lg",
            );
            adminBadge.textContent = "Admin";
            rightSide.appendChild(adminBadge);
          }

          if (participant.id === currentUser.id) {
            const selfBadge = document.createElement("span");
            selfBadge.classList.add(
              `bg-${settings.secondary_color}-600`,
              `text-${settings.text_color}-900`,
              "text-xs",
              "font-semibold",
              "px-2",
              "py-1",
              "ml-5",
              "rounded-lg",
            );
            selfBadge.textContent = "You";
            rightSide.appendChild(selfBadge);
          }

          participantElement.appendChild(leftSide);
          participantElement.appendChild(rightSide);

          container.appendChild(participantElement);
        });

        return container; // Return the generated elements as a string
      }

      //----------------------------------------------//
      // Chat interaction Functions
      async function removeUser(id, username) {
        const confirmed = await createConfirmModal(
          `Are you sure to remove ${username} from the chat?`,
        );
        const chatId = currentChat?.id;
        if (confirmed && chatId) {
          socket.emit("remove_user_from_chat", {
            chatId,
            userIdToRemove: id,
          });
        }
      }

      async function leaveChat() {
        const confirmed = await createConfirmModal(
          "Are you sure you want to leave this chat?",
        );
        if (confirmed) {
          if (currentChat) {
            if (currentChat) {
              socket.emit("leave_chat", {
                chatId: currentChat.id,
              });
            }
          }
        }
      }

      function triggerFileInput() {
        const fileInput = document.getElementById("file-chooser");
        fileInput.click();
      }

      function resetFileInput() {
        const fileInput = document.getElementById("file-chooser");
        fileInput.value = "";
      }

      function switchToChat(chat) {
        if (chat.id === currentChat?.id) {
          return;
        }
        if (isMobile) {
          mobileSwitchToPane(2);
        }
        msgsSinceLastShow = 0;
        msgLastTimestamp = 0;
        lastMessageDay = null;
        uploadedFile = null;
        uploadedFileMimeType = null;
        fileName = null;
        replyingTo = null;
        displayReplyDisplay();
        resetFileInput();
        displayUploadedFile();
        document.title = "Chat";
        updateBackgroundImage();
        document.getElementById("participants-search-bar").value = "";
        document.getElementById("message-container").innerHTML = "";
        document.getElementById("chat-header-whole").classList.remove("hidden");
        document.getElementById("form-div").classList.remove("hidden");

        document.getElementById("chat-header").classList.remove("hidden");
        document
          .getElementById("chat-header-members")
          .classList.remove("hidden");
        document
          .getElementById("message-container")
          .classList.add("overflow-y-auto");
        document
          .getElementById("message-container")
          .classList.remove("overflow-y-hidden");

        document.getElementById("message-container").classList.remove("hidden");
        document.getElementById("home-container").classList.add("hidden");
        currentChat = chat;
        socket.emit("join_chat", {
          chatId: chat.id,
        });
        if (chat) {
          document.getElementById("chat-details").innerHTML = "";
          document
            .getElementById("chat-details")
            .appendChild(getChatDetails(chat));
        }
        const isAdmin = chat.admin.id === currentUser.id;
        if (isAdmin) {
          document.getElementById("delete-chat-btn").disabled = false;
          document.getElementById("delete-chat-btn").classList.remove("hidden");
          document.getElementById("leave-chat-btn").disabled = true;
          document.getElementById("leave-chat-btn").classList.add("hidden");
        } else {
          document.getElementById("delete-chat-btn").disabled = true;
          document.getElementById("delete-chat-btn").classList.add("hidden");
          document.getElementById("leave-chat-btn").disabled = false;
          document.getElementById("leave-chat-btn").classList.remove("hidden");
        }
        document.getElementById("chat-title").textContent = chat.name;
        document.getElementById("settings-chat-name").textContent = chat.name;
        document.getElementById("chat-members").textContent =
          chat.participants.length;
        document.getElementById("chat-settings-picture").src =
          `${rootUrl}/chatpicture/${chat.id}`;
        document.getElementById("chat-picture").src =
          `${rootUrl}/chatpicture/${chat.id}`;

        setHeaderProfiles(currentChat);
        document.getElementById("settings-chat-members").textContent =
          chat.participants.length;
        renderChatList();
      }

      function displayUploadedFile() {
        if (uploadedFile) {
          document
            .getElementById("filename-display")
            .classList.remove("hidden");
          document.getElementById("filename-display-name").textContent = fileName;
        } else {
          document.getElementById("filename-display").classList.add("hidden");
          document.getElementById("filename-display-name").textContent = "";
        }
      }

      function updateStickersDisplay() {
        const stickerListElement = document.getElementById("sticker-list");
        stickerListElement.innerHTML = "";
        Object.keys(stickers).forEach((data) => {
          const element = document.createElement("li");
          element.className =
            `cursor-pointer inline-block rounded-lg border border-opacity-25 hover:border-opacity-50 m-2 ml-auto border-${settings.primary_color}-300 bg-${settings.primary_color}-700 p-3 w-24 h-24`;
          const img = document.createElement("img");
          img.className = "w-full h-full object-contain";
          img.src = `${rootUrl}/attachment/${data}`;
          img.alt = stickers[data].fileName;
          element.appendChild(img);
          element.addEventListener("click", () => {
            socket.emit("send_sticker", {
              reply: replyingTo ? replyingTo.id : null,
              data: data,
              fileName: stickers[data].fileName,
            });
            replyingTo = null;
            displayReplyDisplay();
          });
          stickerListElement.appendChild(element);
        });
      }

      function toHome() {
        socket.emit("to_home");
        uploadedFile = null;
        uploadedFileMimeType = null;
        fileName = null;
        replyingTo = null;
        displayReplyDisplay();
        resetFileInput();
        displayUploadedFile();
        currentChat = null;
        renderChatList();
        document.getElementById("home-container").classList.remove("hidden");
        document.getElementById("down-arrow-btn").classList.add("hidden");
        document.getElementById("message-container").classList.add("hidden");
        document.getElementById("form-div").classList.add("hidden");
        document.getElementById("sticker-menu").classList.add("hidden");
        document.getElementById("sticker-info-modal").classList.add("hidden");
        document.getElementById("chat-settings-modal").classList.add("hidden");
        document.getElementById("search-user-modal").classList.add("hidden");
        document.getElementById("user-profile-modal").classList.add("hidden");
        document.getElementById("chat-header").classList.add("hidden");
        document.getElementById("chat-header-members").classList.add("hidden");
        document
          .getElementById("message-container")
          .classList.remove("overflow-y-auto");

        if (!isMobile) {
          document.getElementById("chat-header-whole").classList.add("hidden");
        } else {
          document
            .getElementById("chat-header-whole")
            .classList.remove("hidden");
        }

        document
          .getElementById("message-container")
          .classList.add("overflow-y-hidden");

        document.getElementById("chat-title").textContent = "Chat Name";
        document.getElementById("chat-members").textContent = "0";
        document.getElementById("settings-chat-members").textContent = "0";
        document.getElementById("settings-chat-name").textContent = "Chat Name";
      }
      //----------------------------------------------//
      // Popup modals functions
      function showToast(message) {
        const toastContainer = document.getElementById("toast-container");
        const toast = document.createElement("div");
        const toastId = "toast-" + Date.now();
        toast.id = toastId;
        toast.className =
          `flex backdrop-blur-sm text-wrap break-all max-w-[60vw] bg-opacity-70 items-center justify-center bg-${settings.primary_color}-800 text-${settings.text_color}-900 px-4 py-2 rounded-lg shadow-lg mb-2 animate-fade-in group`;
        toast.style.fontSize = settings.toast_size + "px";
        const textSpan = document.createElement("span");
        textSpan.className = "inline-flex flex-grow";
        textSpan.textContent = message;
        const closeBtn = document.createElement("button");
        closeBtn.className =
          `inline-flex ml-auto text-${settings.text_color}-900 rounded-full items-center justify-center opacity-${
            settings.toast_close_btn_initial_opacity * 100
          } group-hover:opacity-100 transition-opacity`;
        closeBtn.style =
          `width: ${settings.toast_size}px; height: ${settings.toast_size}px;`;
        closeBtn.addEventListener("click", () => {
          toast.remove();
        });
        closeBtn.innerHTML = "&times;";
        toast.appendChild(textSpan);
        toast.appendChild(closeBtn);
        toastContainer.appendChild(toast);
        setTimeout(() => {
          const toastElement = document.getElementById(toastId);
          if (toastElement) {
            toastElement.classList.add("animate-fade-out");
            setTimeout(() => {
              if (document.getElementById(toastId)) {
                toastElement.remove();
              }
            }, 200);
          }
        }, settings.toast_duration * 1000);
      }

      function createConfirmModal(message) {
        return new Promise((resolve) => {
          const modal = document.createElement("div");
          modal.id = "confirm-modal";
          modal.classList.add(
            "fixed",
            "inset-0",
            "bg-black-900",
            "bg-opacity-25",
            "flex",
            "items-center",
            "justify-center",
            "z-50",
          );

          // Modal content wrapper
          const modalContent = document.createElement("div");
          modalContent.classList.add(
            `bg-${settings.primary_color}-800`,
            "border-2",
            `border-${settings.primary_color}-700`,
            "p-6",
            "rounded-lg",
            "max-w-lg",
            "w-full",
          );

          // Message section
          const messageDiv = document.createElement("div");
          messageDiv.classList.add("mb-4");

          const messageHeader = document.createElement("h2");
          messageHeader.classList.add(
            "text-xl",
            "font-bold",
            `text-${settings.text_color}-900`,
          );
          messageHeader.textContent = message;

          messageDiv.appendChild(messageHeader);
          modalContent.appendChild(messageDiv);

          // Buttons section
          const buttonContainer = document.createElement("div");
          buttonContainer.classList.add("flex", "justify-end", "gap-2");

          // Cancel button
          const cancelButton = document.createElement("button");
          cancelButton.id = "confirm-modal-cancel";
          cancelButton.classList.add(
            "transition-all",
            "ease-in-out",
            "duration-150",
            "border-2",
            "hover:border-opacity-50",
            "border-opacity-0",
            `border-${settings.primary_color}-200`,
            `bg-${settings.primary_color}-600`,
            `hover:bg-${settings.primary_color}-700`,
            `text-${settings.text_color}-900`,
            "font-semibold",
            "py-2",
            "px-4",
            "rounded-lg",
          );
          cancelButton.textContent = "Cancel";

          // Confirm button
          const confirmButton = document.createElement("button");
          confirmButton.id = "confirm-modal-confirm";
          confirmButton.classList.add(
            "transition-all",
            "ease-in-out",
            "duration-150",
            "border-2",
            "hover:border-opacity-50",
            "border-opacity-0",
            `border-${settings.primary_color}-200`,
            `bg-${settings.secondary_color}-600`,
            `hover:bg-${settings.secondary_color}-700`,
            `text-${settings.text_color}-900`,
            "font-semibold",
            "py-2",
            "px-4",
            "rounded-lg",
          );
          confirmButton.textContent = "Confirm";

          // Append buttons to container
          buttonContainer.appendChild(cancelButton);
          buttonContainer.appendChild(confirmButton);

          // Append container to modal content
          modalContent.appendChild(buttonContainer);

          // Append modal content to modal
          modal.appendChild(modalContent);

          // Add the modal to the document body
          document.body.appendChild(modal);
          document
            .getElementById("confirm-modal-confirm")
            .addEventListener("click", () => {
              document.body.removeChild(modal);
              resolve(true);
            });
          document
            .getElementById("confirm-modal-cancel")
            .addEventListener("click", () => {
              document.body.removeChild(modal);
              resolve(false);
            });
          modal.addEventListener("click", (e) => {
            if (e.target.id === "confirm-modal") {
              document.body.removeChild(modal);
              resolve(false);
            }
          });
        });
      }

      function createPromptModal(message, defaultValue = "", maxLength = 250) {
        return new Promise((resolve) => {
          const modal = document.createElement("div");
          modal.id = "prompt-modal";
          modal.className =
            "fixed inset-0 bg-black-900 bg-opacity-25 flex items-center justify-center z-50";
          const modalContent = document.createElement("div");
          modalContent.classList.add(
            `bg-${settings.primary_color}-800`,
            "border-2",
            `border-${settings.primary_color}-700`,
            "p-6",
            "rounded-lg",
            "max-w-lg",
            "w-full",
          );

          // Create the message header
          const header = document.createElement("div");
          header.classList.add("mb-4");

          const title = document.createElement("h2");
          title.classList.add(
            "text-xl",
            "font-bold",
            `text-${settings.text_color}-900`,
            "mb-4",
          );
          title.textContent = message;

          const input = document.createElement("input");
          input.type = "text";
          input.setAttribute("autocomplete", "off");
          input.id = "prompt-modal-input";
          input.classList.add(
            "w-full",
            "p-3",
            `bg-transparent`,
            `text-${settings.text_color}-900`,
            "rounded-lg",
            "focus:outline-none",
            "border",
            `border-${settings.primary_color}-600`,
          );
          input.value = "";
          input.placeholder = defaultValue;
          input.maxLength = maxLength;

          header.appendChild(title);
          header.appendChild(input);

          // Create action buttons
          const actions = document.createElement("div");
          actions.classList.add("flex", "justify-end", "gap-2");

          const cancelButton = document.createElement("button");
          cancelButton.id = "prompt-modal-cancel";
          cancelButton.classList.add(
            "transition-all",
            "ease-in-out",
            "duration-150",
            "border-2",
            "hover:border-opacity-50",
            "border-opacity-0",
            `border-${settings.primary_color}-200`,
            `bg-${settings.primary_color}-600`,
            `hover:bg-${settings.primary_color}-700`,
            `text-${settings.text_color}-900`,
            "font-semibold",
            "py-2",
            "px-4",
            "rounded-lg",
          );
          cancelButton.textContent = "Cancel";

          const submitButton = document.createElement("button");
          submitButton.id = "prompt-modal-submit";
          submitButton.classList.add(
            "transition-all",
            "ease-in-out",
            "duration-150",
            "border-2",
            "hover:border-opacity-50",
            "border-opacity-0",
            `border-${settings.primary_color}-200`,
            `bg-${settings.secondary_color}-600`,
            `hover:bg-${settings.secondary_color}-700`,
            `text-${settings.text_color}-900`,
            "font-semibold",
            "py-2",
            "px-4",
            "rounded-lg",
          );
          submitButton.textContent = "Submit";

          actions.appendChild(cancelButton);
          actions.appendChild(submitButton);

          // Combine all elements
          modalContent.appendChild(header);
          modalContent.appendChild(actions);
          modal.appendChild(modalContent);
          document.body.appendChild(modal);
          input.focus();

          function handleSubmit() {
            const value = document.getElementById("prompt-modal-input").value;
            document.body.removeChild(modal);
            resolve(value || defaultValue);
          }
          document
            .getElementById("prompt-modal-submit")
            .addEventListener("click", handleSubmit);
          document
            .getElementById("prompt-modal-cancel")
            .addEventListener("click", () => {
              document.body.removeChild(modal);
              resolve(null);
            });
          input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          });
          modal.addEventListener("click", (e) => {
            if (e.target.id === "prompt-modal") {
              document.body.removeChild(modal);
              resolve(null);
            }
          });
        });
      }
      //----------------------------------------------//
      // Setup Functions
      function startFocusPolling() {
        setInterval(() => {
          if (focused !== document.hasFocus()) {
            focused = document.hasFocus();
            if (focused) {
              if (currentChat) {
                socket.emit("read_chat", { chatId: currentChat.id });
              }
            }
          }
        }, 50);
      }
      function setSocketEvents_data() {
        socket.on("version", async (v) => {
          if (v !== version) {
            if (rootUrl !== "") {
              const confirmed = await createConfirmModal(
                `Client and Server version mismatch. Server running ${v} while client on ${version}. Download new version from "${rootUrl}"?`,
              );
              if (confirmed) {
                window.open(`${rootUrl}/download`, target = "_blank");
              }
            } else {
              const confirmed = await createConfirmModal(
                `Client out of date. Server running ${v} while client on ${version}. Reload?`,
              );
              if (confirmed) {
                window.location.reload();
              }
            }
          }
        });
        socket.on("connect_error", () => {
          showToast("Failed to connect. Retrying...");
          setTimeout(() => socket.connect(), 3000);
        });

        socket.on("disconnect", () => {
          showToast("Disconnected from server.");
        });

        socket.on("connect", () => {
          console.log("Connected to the server.");
          showToast("Connected to server.");
          document.getElementById("chat-page").classList.add("hidden");
          document.getElementById("login-page").classList.remove("hidden");
          currentUser = null;
          currentChat = null;
          userChats = [];
          msgsSinceLastShow = 0;
          msgLastTimestamp = 0;
          lastMessageDay = null;
          userColors = new Map();
          const savedUsername = localStorage.getItem("chatapp:username");
          const savedPassword = localStorage.getItem("chatapp:password");
          if (savedUsername && savedPassword) {
            document.getElementById("username").value = savedUsername;
            document.getElementById("password").value = savedPassword;
          }
          document.getElementById("register-btn").disabled = false;
          document.getElementById("login-btn").disabled = false;

          // Check if we were previously logged in and auto-login is enabled
          if (
            (settings.auto_login && autoLoginTriggered === false) ||
            (settings.auto_login && wasLoggedIn)
          ) {
            autoLoginTriggered = true;
            if (savedUsername && savedPassword) {
              socket.emit("login", {
                username: savedUsername,
                password: savedPassword,
              });
            }
          }
        });
        socket.on("message_deleted", (data) => {
          const { chatId, messageId } = data;
          if (currentChat && currentChat.id === chatId) {
            const messageElement = document.querySelector(
              `[data-message-id="${messageId}"]`,
            );
            if (messageElement) {
              messageElement.remove();
            }
          }
        });
        socket.on("chats_list", (chats) => {
          if (userChats.length == 0) {
            userChats = chats;
            if (!isMobile) {
              toHome();
            } else {
              toHome();
              mobileSwitchToPane(1);
            }
          } else {
            userChats = chats;
          }
          const index = userChats.findIndex(
            (chat) => chat.id === currentChat?.id,
          );
          if (index > -1) {
            currentChat = userChats[index];
            document.getElementById("chat-title").textContent = currentChat.name;
            document.getElementById("chat-members").textContent =
              currentChat.participants.length;
            document.getElementById("chat-settings-picture").src =
              `${rootUrl}/chatpicture/${userChats[index].id}`;
            document.getElementById("chat-picture").src = `${rootUrl}/chatpicture/${
              userChats[index].id
            }`;

            document.getElementById("settings-chat-members").textContent =
              currentChat.participants.length;
            setHeaderProfiles(currentChat);

            document.getElementById("settings-chat-name").textContent =
              currentChat.name;
          }
          renderChatList();
        });
        socket.on("chat_messages", ({ chatId, messages }) => {
          if (currentChat && currentChat?.id === chatId) {
            const messageContainer = document.getElementById("message-container");
            messageContainer.innerHTML = "";
            lastMessageSender = null;
            const timeStamp = Date.now();
            messages.forEach((message) => {
              appendMessage(message, true, timeStamp);
            });

            requestAnimationFrame(() => {
              document.getElementById("message-container").scrollTo({
                top: document.getElementById("message-container").scrollHeight,
                behavior: "instant",
              });
            });
          }
        });
        socket.on("message_received", ({ chatId, message }) => {
          if (currentChat && currentChat?.id === chatId) {
            const timeStamp = Date.now();
            appendMessage(message, false, timeStamp);
          }
        });
      }

      function setSocketEvents_responses() {
        socket.on("authenticated", async (user) => {
          currentUser = user;

          // Save credentials
          localStorage.setItem("chatapp:username", user.username);
          localStorage.setItem("chatapp:password", user.password);

          // Update UI elements
          document.getElementById("login-page").classList.add("hidden");
          document.getElementById("chat-page").classList.remove("hidden");
          getColorForUser(user.username);

          // Set profile info
          document.getElementById("profile-username-display").textContent =
            user.username;
          document.getElementById("self-pfp").src = `${rootUrl}/pfp/${user.id}`;
          document.getElementById("profile-user-visibility").textContent =
            currentUser.private ? "Private" : "Public";
          document.getElementById("profile-user-id").textContent = user.id;
          document.getElementById("home-id-display").textContent = user.id;
          document.getElementById("profile-user-creation").textContent = new Date(
            user.creationTime,
          ).toString();

          // Show loading and navigate
          showDesc("Logging in...");
          await showLoadingPage();
          toHome();
          if (isMobile) {
            mobileSwitchToPane(1);
          }
          showToast("Logged in successfully.");
        });

        socket.on("registered", (user) => {
          showDesc("Logging in...");
          showLoadingPage();
          currentUser = user;

          // Save credentials
          localStorage.setItem("chatapp:username", user.username);
          localStorage.setItem("chatapp:password", user.password);

          // Update UI elements
          document.getElementById("login-page").classList.add("hidden");
          document.getElementById("chat-page").classList.remove("hidden");
          getColorForUser(user.username);

          // Set profile info
          document.getElementById("profile-username-display").textContent =
            user.username;
          document.getElementById("self-pfp").src = `${rootUrl}/pfp/${user.id}`;
          document.getElementById("profile-user-visibility").textContent =
            currentUser.private ? "Private" : "Public";
          document.getElementById("profile-user-id").textContent = user.id;
          document.getElementById("home-id-display").textContent = user.id;
          document.getElementById("profile-user-creation").textContent = new Date(
            user.creationTime,
          ).toString();

          // Navigate
          toHome();
          if (isMobile) {
            mobileSwitchToPane(1);
          }
          showToast("Registered and logged in successfully.");
        });
        socket.on("registration_failed", () => {
          showToast("Registration failed. Try another username.");
        });
        socket.on("authentication_failed", () => {
          showToast("Authentication failed. Wrong password or username.");
        });
        socket.on("profile_set", () => {
          showToast("Profile Picture set. Reload for changes to take effect.");
        });
        socket.on("chat_picture_set", () => {
          showToast("Chat Picture set. Reload for changes to take effect.");
        });
        socket.on("sticker_created", ({ data, fileName }) => {
          if (Object.keys(stickers).includes(data)) {
            return;
          }
          stickers[data] = { fileName };
          localStorage.setItem("chatapp:stickers", JSON.stringify(stickers));
          updateStickersDisplay();
        });
        socket.on("user_added", (data) => {
          const { chatId, chat, user } = data;
          const index = userChats.findIndex(
            (chat) => chat.id === currentChat?.id,
          );
          if (index > -1) {
            userChats[index] = chat;
            currentChat = userChats[index];
            document.getElementById("chat-title").textContent = currentChat.name;
            document.getElementById("chat-members").textContent =
              currentChat.participants.length;
            document.getElementById("chat-settings-picture").src =
              `${rootUrl}/chatpicture/${userChats[index].id}`;
            document.getElementById("chat-picture").src = `${rootUrl}/chatpicture/${
              userChats[index].id
            }`;
            setHeaderProfiles(currentChat);
            document.getElementById("settings-chat-members").textContent =
              currentChat.participants.length;
          }
          renderChatList();
          showToast(`User ${user.password} has been added to ${chatId}.`);
        });
        socket.on("add_user_failed", () => {
          showToast("Failed to add user to chat.");
        });
        socket.on("user_removed", (data) => {
          const { user, chatId } = data;
          document
            .getElementById("other-profile-modal")
            .classList.add("hidden");
          showToast(`User ${user.username} has been removed from ${chatId}`);
        });
        socket.on("remove_user_failed", (data) => {
          const { user, chatId } = data;
          showToast(`Failed to remove user ${user.username} from ${chatId}`);
        });
        socket.on("removed_from_chat", (data) => {
          const { chatId } = data;
          showToast(`You have been removed from ${chatId} by the Admin.`);
          if (chatId === currentChat?.id) {
            if (!isMobile) {
              toHome();
            } else {
              toHome();
              mobileSwitchToPane(1);
            }
          }
        });
        socket.on("chat_deleted", ({ chatId }) => {
          showToast(`Chat of id: ${chatId} has been deleted.`);
          document
            .getElementById("chat-settings-modal")
            .classList.add("hidden");
          if (!isMobile) {
            toHome();
          } else {
            mobileSwitchToPane(1);
          }
        });
        socket.on("delete_chat_failed", () => {
          showToast(`Chat failed to delete.`);
        });
        socket.on("chat_created", (chat) => {
          if (userChats.length == 0) {
            userChats.push(chat);
          }
          switchToChat(chat);
        });
        socket.on("chat_failed_to_create", () => {
          showToast(`Failed to create chat.`);
        });
        socket.on("left_chat", ({ chatId }) => {
          showToast(`You left chat of id: ${chatId}.`);
          document
            .getElementById("chat-settings-modal")
            .classList.add("hidden");
          document
            .getElementById("other-profile-modal")
            .classList.add("hidden");
          if (!isMobile) {
            toHome();
          } else {
            toHome();
            mobileSwitchToPane(1);
          }
        });
        socket.on("leave_chat_failed", () => {
          showToast(`Failed to leave chat.`);
        });
        socket.on("account_deleted", () => {
          showToast("Account deleted.");
          localStorage.removeItem("chatapp:password")
          localStorage.removeItem("chatapp:username")
          document.getElementById("logout-btn").click();
        });
        socket.on("account_failed_to_delete", () => {
          showToast("Account failed to delete.");
        });
        socket.on("chat_name_edited", () => {
          showToast("Chat name edited.");
        });
        socket.on("chat_name_editing_failed", () => {
          showToast("Failed to edit chat name.");
        });
      }

      function mobileSwitchToPane(paneNumber) {
        const left_pane = document.getElementById("left-pane");
        const right_pane = document.getElementById("right-pane");
        if (paneNumber === 2) {
          left_pane.style.display = "none";
          right_pane.style.display = "flex";
        } else {
          if (currentChat) {
            toHome();
          }
          left_pane.style.display = "flex";
          right_pane.style.display = "none";
        }
      }

      function prepareMobileCode() {
        const mobile_back_btn = document.getElementById("mobile-back-btn");
        mobile_back_btn.addEventListener("click", () => {
          toHome();
          mobileSwitchToPane(1);
        });

        function changeMobileState() {
          const x = window.matchMedia("(max-width: 600px)");
          if (isMobile !== x.matches) {
            if (x.matches) {
              isMobile = true;

              const left_pane = document.getElementById("left-pane");
              const right_pane = document.getElementById("right-pane");
              left_pane.style.display = "flex";
              right_pane.style.display = "none";
              toHome();
            } else {
              isMobile = false;

              const left_pane = document.getElementById("left-pane");
              const right_pane = document.getElementById("right-pane");
              left_pane.style.display = "flex";
              right_pane.style.display = "flex";
              toHome();
            }
          }
        }

        changeMobileState();

        window.addEventListener("resize", changeMobileState);
      }

      function prepareUserLogin() {
        const savedUsername = localStorage.getItem("chatapp:username");
        const savedPassword = localStorage.getItem("chatapp:password");
        if (savedUsername && savedPassword) {
          document.getElementById("username").value = savedUsername;
          document.getElementById("password").value = savedPassword;
        }
      }

      function setHtmlContentListeners_loginPage() {
        document.getElementById("login-btn").addEventListener("click", () => {
          const username = DOMPurify.sanitize(
            document.getElementById("username").value,
          );
          const password = DOMPurify.sanitize(
            document.getElementById("password").value,
          );
          if (username.length < 4) {
            showToast("Username too short. Username must be > 4 characters.");
          } else {
            socket.emit("login", {
              username,
              password,
            });
          }
        });
        document
          .getElementById("register-btn")
          .addEventListener("click", () => {
            const username = DOMPurify.sanitize(
              document.getElementById("username").value,
            );
            const password = DOMPurify.sanitize(
              document.getElementById("password").value,
            );
            if (username.length < 4) {
              showToast("Username too short. Username must be > 4 characters.");
            } else {
              socket.emit("register", {
                username,
                password,
              });
            }
          });
      }

      function setHtmlContentListeners_mainChatPage() {
        document.body.addEventListener("contextmenu", function (e) {
          if (settings.prevent_right_click) {
            e.preventDefault();
          }
        });

        document.getElementById("open-game-btn").addEventListener(
          "click",
          async () => {
            const res = await fetch(`${rootUrl}/game`);
            const json = await res.json();
            const url = json.url;
            document.getElementById("game-screen").classList.remove("hidden");
            document.getElementById("game-iframe").src = url;
          },
        );

        const searchUserInput = document.getElementById("search-user-input");
        const searchUserList = document.getElementById("search-user-list");
        const searchUserBtn = document.getElementById("search-user-btn");
        const searchUserModal = document.getElementById("search-user-modal");
        const settingsBtn = document.getElementById("open-settings-menu-btn");

        searchUserBtn.addEventListener("focus", () => {
          searchUserModal.classList.remove("hidden");
          searchUserModal.classList.add("opacity-100");
          searchUserModal.classList.remove("opacity-0");
          searchUserInput.focus();
        });

        searchUserInput.addEventListener("input", () => {
          socket.emit(
            "search_user",
            { query: searchUserInput.value.trim() },
            (users) => {
              searchUserList.innerHTML = users.length > 0 ? "" : `
              <div class="flex w-full justify-center items-center p-4 rounded-lg bg-${settings.primary_color}-600">
<span class="text-${settings.text_color}-700 font-semibold">
                    ${
                searchUserInput.value.length < 4
                  ? "Type at least 4 characters to search"
                  : "No users found matching your search"
              }
                  </span>
                </div>
              `;
              for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const userElement = document.createElement("div");
                userElement.addEventListener("click", () => {
                  showUserProfile({ id: user.id, username: user.username });
                });
                userElement.classList.add(
                  "gap-3",
                  "cursor-pointer",
                  "transition-all",
                  "ease-in-out",
                  "duration-150",
                  "border-2",
                  "hover:border-opacity-50",
                  "border-opacity-0",
                  `border-${settings.primary_color}-200`,
                  "participant-item",
                  "flex",
                  "w-full",
                  "justify-start",
                  "items-center",
                  "mb-2",
                  "p-3",
                  `bg-${settings.primary_color}-700`,
                  "rounded-lg",
                );

                const profilePic = document.createElement("img");
                profilePic.src = `${rootUrl}/pfp/${user.id}`;
                profilePic.classList.add(
                  "w-10",
                  "h-10",
                  "rounded-full",
                  "object-cover",
                );

                const details = document.createElement("div");
                details.classList.add("block", "items-center");

                const username = document.createElement("span");
                username.classList.add(
                  `text-${settings.text_color}-900`,
                  "font-medium",
                  "inline-flex",
                  "break-all",
                );
                username.textContent = user.username;

                const topGroup = document.createElement("div");
                topGroup.className = "flex items-center block";
                topGroup.appendChild(username);

                const userId = document.createElement("span");
                userId.classList.add(
                  `text-${settings.text_color}-400`,
                  "text-sm",
                );
                userId.textContent = `${user.id}`;

                const bottomGroup = document.createElement("div");
                bottomGroup.className = "flex";
                bottomGroup.appendChild(userId);
                details.appendChild(topGroup);
                details.appendChild(bottomGroup);

                userElement.appendChild(profilePic);
                userElement.appendChild(details);

                searchUserList.appendChild(userElement);
              }
            },
          );
        });

        searchUserModal.addEventListener("click", (e) => {
          if (e.target.id === "search-user-modal") {
            searchUserModal.classList.remove("opacity-100");
            searchUserModal.classList.add("opacity-0");
            setTimeout(() => {
              searchUserModal.classList.add("hidden");
            }, 250);
          }
        });

        settingsBtn.addEventListener("click", (event) => {
          const settingsMenu = document.getElementById("settings-menu");
          settingsMenu.classList.remove("opacity-0");
          settingsMenu.classList.remove("hidden");
          settingsMenu.classList.add("opacity-100");
        });

        document
          .getElementById("create-chat-btn")
          .addEventListener("click", async () => {
            const chatName = await createPromptModal(
              "Enter chat name:",
              settings.default_chat_name,
              30,
            );
            if (chatName) {
              socket.emit("create_chat", {
                name: chatName.slice(0, 30),
              });
            }
          });

        document
          .getElementById("chats-search-bar")
          .addEventListener("input", (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const chatItems = document.querySelectorAll(".chat-item");

            chatItems.forEach((chatItem) => {
              const chatName = chatItem.getAttribute("chat-name");
              const lastMessage = chatItem.getAttribute("last-message");
              if (chatName && lastMessage) {
                if (
                  chatName.includes(searchTerm) ||
                  lastMessage.includes(searchTerm)
                ) {
                  chatItem.style.display = "";
                } else {
                  chatItem.style.display = "none";
                }
              }
            });
          });

        document.getElementById("home-btn").addEventListener("click", () => {
          if (isMobile) {
            toHome();
            mobileSwitchToPane(2);
            return;
          }
          toHome();
        });
      }

      function setHtmlContentListeners_chatContainer() {
        const addStickerBtn = document.getElementById("add-sticker-btn");
        document
          .getElementById("sticker-upload")
          .addEventListener("change", async () => {
            if (!document.getElementById("sticker-upload").files[0]) {
              return;
            }

            const file = document.getElementById("sticker-upload").files[0];
            const maxSizeInBytes = 1 * 1024 * 1024;
            if (!file) {
              return;
            }
            if (file.size > maxSizeInBytes) {
              showToast("File size too big. Max of 1mb.");
              return;
            }

            const fileName = await createPromptModal(
              "Sticker Name: ",
              "sticker",
              20,
            );
            if (!fileName) return;
            const reader = new FileReader();

            reader.onload = (e) => {
              const arrayBuffer = e.target.result;

              showToast(`Sticker ${fileName} uploaded.`);
              socket.emit("make_sticker", {
                file: arrayBuffer,
                mime: file.type,
                fileName: fileName,
              });
            };
            reader.onerror = function (error) {
              console.error("Error reading file:", error);
              showToast("An error occurred while encoding the file.");
            };
            reader.readAsArrayBuffer(file);
          });

        addStickerBtn
          .addEventListener("click", () => {
            document.getElementById("sticker-upload").click();
          });
        document.getElementById("send-sticker-btn").addEventListener(
          "click",
          () => {
            document.getElementById("sticker-menu").classList.remove("hidden");
          },
        );
        document.getElementById("sticker-menu").addEventListener("click", (e) => {
          if (e.target.id === "sticker-menu") {
            document.getElementById("sticker-menu").classList.add("hidden");
          }
        });
        document.getElementById("sticker-info-modal").addEventListener(
          "click",
          (e) => {
            if (e.target.id === "sticker-info-modal") {
              document.getElementById("sticker-info-modal").classList.add("hidden");
            }
          },
        );
        document
          .getElementById("chat-page")
          .addEventListener("dragover", (event) => {
            event.preventDefault();
          });
        document
          .getElementById("chat-page")
          .addEventListener("drop", (event) => {
            event.preventDefault(); // Allow drop
            const dt = event.dataTransfer;
            const files = dt.files;

            if (files.length > 0) {
              // Assign the first file to the file input
              const file = files[0];
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);

              // Replace file input files with the new file
              document.getElementById("file-chooser").files = dataTransfer.files;
              if (!document.getElementById("file-chooser").files[0]) {
                return;
              }
              prepareFile();
            }
          });

        document.getElementById("chat-header").addEventListener("click", () => {
          if (!currentChat) return;
          document
            .getElementById("chat-settings-modal")
            .classList.remove("hidden");
        });
        document.getElementById("chat-members-container").addEventListener(
          "click",
          () => {
            if (!currentChat) return;
            document
              .getElementById("chat-settings-modal")
              .classList.remove("hidden");
          },
        );
        document
          .getElementById("message-form")
          .addEventListener("submit", (e) => {
            e.preventDefault();
            document.title = "Chat";
            const messageInput = document.getElementById("message-input");
            const message = messageInput.value.trim().slice(0, 250);
            if ((message || uploadedFile) && currentUser) {
              if (uploadedFile && uploadedFileMimeType) {
                socket.emit("send_message", {
                  reply: replyingTo ? replyingTo.id : null,
                  message,
                  attachment: {
                    uploadedFile,
                    mimeType: uploadedFileMimeType,
                    fileName,
                  },
                });
                uploadedFile = null;
                uploadedFileMimeType = null;
                fileName = null;
                resetFileInput();
                displayUploadedFile();
              } else {
                socket.emit("send_message", {
                  reply: replyingTo ? replyingTo.id : null,
                  message,
                });
              }
              replyingTo = null;
              displayReplyDisplay();
              messageInput.value = "";
            }
          });
        document
          .getElementById("down-arrow-btn")
          .addEventListener("click", () => {
            scroll();
          });
        document
          .getElementById("message-container")
          .addEventListener("scroll", (event) => {
            const downArrowBtn = document.getElementById("down-arrow-btn");
            const messageContainer = document.getElementById("message-container");
            const scrolledAllTheWay = messageContainer.scrollHeight -
                messageContainer.scrollTop -
                messageContainer.clientHeight <=
              0;
            if (scrolledAllTheWay) {
              downArrowBtn.classList.add("hidden");
            } else {
              if (currentChat) {
                downArrowBtn.classList.remove("hidden");
              }
            }
          });

        document
          .getElementById("file-chooser")
          .addEventListener("change", () => {
            if (!document.getElementById("file-chooser").files[0]) {
              return;
            }
            prepareFile();
          });
        document
          .getElementById("add-attachment-btn")
          .addEventListener("click", () => {
            document.getElementById("file-chooser").click();
          });
        document
          .getElementById("reset-file-btn")
          .addEventListener("click", () => {
            resetFileInput();
            fileName = null;
            uploadedFile = null;
            uploadedFileMimeType = null;

            displayUploadedFile();
          });

        function prepareFile() {
          const inputElement = document.getElementById("file-chooser");
          const file = inputElement.files[0];
          const maxSizeInBytes = 1 * 1024 * 1024;
          if (!file) {
            return;
          }
          if (file.size > maxSizeInBytes) {
            showToast("File size too big. Max of 1mb.");
            resetFileInput();
            displayUploadedFile();
            return;
          }

          const reader = new FileReader();

          reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            uploadedFile = arrayBuffer;
            uploadedFileMimeType = file.type;
            fileName = file.name;
            displayUploadedFile();
            showToast(`File ${fileName} uploaded.`);
            if (settings.message_box_focus) {
              document.getElementById("message-input").focus();
            }
          };
          reader.onerror = function (error) {
            console.error("Error reading file:", error);
            showToast("An error occurred while encoding the file.");
          };
          reader.readAsArrayBuffer(file);
        }
      }

      function setHtmlContentListeners_chatSettingsModal() {
        document.getElementById("chat-settings-modal").addEventListener(
          "click",
          (e) => {
            if (e.target.id === "chat-settings-modal") {
              document.getElementById("chat-settings-modal").classList.add(
                "hidden",
              );
            }
          },
        );
        document
          .getElementById("participants-search-bar")
          .addEventListener("input", (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const participantItems = document.querySelectorAll(".participant-item");

            participantItems.forEach((participantItem) => {
              const participantName = participantItem.firstElementChild
                .firstElementChild.textContent.toLowerCase();
              const participantId = participantItem.firstElementChild
                .lastElementChild.textContent.toLowerCase();
              if (
                participantName.includes(searchTerm) ||
                participantId.includes(searchTerm)
              ) {
                participantItem.style.display = "";
              } else {
                participantItem.style.display = "none";
              }
            });
          });
        document
          .getElementById("close-chat-settings-btn")
          .addEventListener("click", () => {
            document
              .getElementById("chat-settings-modal")
              .classList.add("hidden");
            document.getElementById("participants-search-bar").value = "";
            const participantItems = document.querySelectorAll(".participant-item");

            participantItems.forEach((participantItem) => {
              participantItem.style.display = "";
            });
          });
        document
          .getElementById("edit-name-btn")
          .addEventListener("click", async () => {
            if (currentChat) {
              const newName = await createPromptModal(
                "Enter chat name:",
                settings.default_chat_name,
                30,
              );
              if (newName) {
                const confirmed = await createConfirmModal(
                  `Are you sure you want to change the chat name to "${
                    newName.slice(
                      0,
                      30,
                    )
                  }"?`,
                );
                if (confirmed) {
                  socket.emit("edit_chat_name", {
                    newName: newName.slice(0, 30),
                    chatId: currentChat.id,
                  });
                }
              }
            }
          });
        document
          .getElementById("add-user-btn")
          .addEventListener("click", async () => {
            const userId = await createPromptModal(
              "Enter userid to add:",
              "user-abc123",
              11,
            );
            if (userId && currentChat) {
              socket.emit("add_user_to_chat", {
                chatId: currentChat.id,
                userId: userId.trim().slice(0, 11),
              });
            }
          });
        document
          .getElementById("delete-chat-btn")
          .addEventListener("click", async () => {
            const confirmed = await createConfirmModal(
              "Are you sure you want to delete this chat?",
            );
            if (confirmed) {
              if (currentChat) {
                socket.emit("delete_chat", {
                  chatId: currentChat.id,
                });
              }
            }
          });
        document
          .getElementById("leave-chat-btn")
          .addEventListener("click", leaveChat);
        document
          .getElementById("chat-picture-upload")
          .addEventListener("change", async () => {
            if (!document.getElementById("chat-picture-upload").files[0]) {
              return;
            }

            const file = document.getElementById("chat-picture-upload").files[0];
            const maxSizeInBytes = 256 * 1024;
            if (!file) {
              return;
            }
            if (file.size > maxSizeInBytes) {
              showToast("File size too big. Max of 256kb.");
              return;
            }

            const confirm = await createConfirmModal(
              "Change Chat Profile Picture?",
            );
            if (!confirm) return;
            const reader = new FileReader();

            reader.onload = (e) => {
              const arrayBuffer = e.target.result;

              showToast(`Changing chat profile picture.`);
              socket.emit("set_chat_picture", {
                file: arrayBuffer,
                mime: file.type,
                chatId: currentChat.id,
              });
            };
            reader.onerror = function (error) {
              console.error("Error reading file:", error);
              showToast("An error occurred while encoding the file.");
            };
            reader.readAsArrayBuffer(file);
          });

        document.getElementById("change-chat-picture-btn")
          .addEventListener("click", () => {
            document.getElementById("chat-picture-upload").click();
          });
      }

      function setHtmlContentListeners_userSettingsModal() {
        const settingsContent = document.getElementById("settings-content");
        const settingsContainer = document.getElementById("settings-container");
        const closeSettings = document.getElementById("close-settings-btn");
        closeSettings.addEventListener("click", () => {
          settingsContainer.classList.add("hidden");
        });
        settingsContainer.addEventListener("click", (e) => {
          if (e.target.id === "settings-container") {
            settingsContainer.classList.add("hidden");
          }
        });
        const openSettings = document.getElementById("open-settings-btn");
        openSettings.addEventListener("click", () => {
          settingsContainer.classList.remove("hidden");
          const settingsMenu = document.getElementById("settings-menu");
          settingsMenu.classList.remove("opacity-100");
          settingsMenu.classList.add("opacity-0");
          setTimeout(() => {
            settingsMenu.classList.add("hidden");
          }, 250);
        });

        document
          .getElementById("reset-settings-btn")
          .addEventListener("click", async () => {
            const confirmed = await createConfirmModal(
              "Are you sure you want to reset all settings to default?",
            );
            if (confirmed) {
              Object.keys(settings).forEach((key) => {
                settings[key] = settingsInfo[key].default;
                const settingInput = document.getElementById(`setting:${key}`);
                if (settingInput) {
                  switch (settingsInfo[key].type) {
                    case "boolean":
                      settingInput.checked = settings[key];
                      break;
                    case "string":
                      settingInput.value = settings[key];
                      break;
                    case "number":
                      settingInput.value = settings[key];
                      break;
                    case "drop":
                      settingInput.value = settings[key];
                  }
                }
                if (settingsInfo[key].handle) {
                  settingsInfo[key].handle(false);
                }
              });
              localStorage.setItem(
                "chatapp:settings",
                JSON.stringify(settings),
              );
              showToast("Settings reset.");
            }
          });
      }

      function setHtmlContentListeners_userProfileModal() {
        document.getElementById("user-profile-modal").addEventListener(
          "click",
          (e) => {
            if (e.target.id === "user-profile-modal") {
              document.getElementById("user-profile-modal").classList.add("hidden");
            }
          },
        );

        document
          .getElementById("delete-account-btn")
          .addEventListener("click", async () => {
            const confirmed = await createConfirmModal(
              "Are you sure you want to delete your account? All chats where you are the admin will be deleted.",
            );
            if (confirmed) {
              socket.emit("delete_account");
            }
          });
        document.getElementById("profile-user-visibility").addEventListener(
          "click",
          () => {
            socket.emit(
              "set_private",
              { private: !currentUser.private },
              (user) => {
                currentUser = user;
                document.getElementById("profile-user-visibility").textContent =
                  user.private ? "Private" : "Public";
                showToast(
                  `Account visibility set to ${
                    user.private ? "Private" : "Public"
                  }`,
                );
              },
            );
          },
        );
        document.getElementById("change-pfp-btn")
          .addEventListener("click", () => {
            document.getElementById("pfp-upload").click();
          });
        document
          .getElementById("pfp-upload")
          .addEventListener("change", async () => {
            if (!document.getElementById("pfp-upload").files[0]) {
              return;
            }

            const file = document.getElementById("pfp-upload").files[0];
            const maxSizeInBytes = 256 * 1024;
            if (!file) {
              return;
            }
            if (file.size > maxSizeInBytes) {
              showToast("File size too big. Max of 256kb.");
              return;
            }

            const confirm = await createConfirmModal(
              "Change Profile Picture?",
            );
            if (!confirm) return;
            const reader = new FileReader();

            reader.onload = (e) => {
              const arrayBuffer = e.target.result;

              showToast(`Changing profile picture.`);
              socket.emit("set_profile_picture", {
                file: arrayBuffer,
                mime: file.type,
              });
            };
            reader.onerror = function (error) {
              console.error("Error reading file:", error);
              showToast("An error occurred while encoding the file.");
            };
            reader.readAsArrayBuffer(file);
          });
      }

      function setHtmlContentListeners_otherProfileModal() {
        document
          .getElementById("other-profile-modal")
          .addEventListener("click", (e) => {
            if (e.target.id === "other-profile-modal") {
              document.getElementById("other-profile-modal").classList.add(
                "hidden",
              );
            }
          });
      }

      function setHtmlContentListeners_htmlPreview() {
      }

      function setHtmlContentListeners_messageInfo() {
        const messageInfoModal = document.getElementById("message-info-modal");
        messageInfoModal.addEventListener("click", (e) => {
          if (e.target.id === "message-info-modal") {
            messageInfoModal.classList.add("hidden");
          }
        });
      }

      function setHtmlContentListeners_settingsMenu() {
        const settingsMenu = document.getElementById("settings-menu");
        settingsMenu.addEventListener("click", (e) => {
          if (e.target.id === "settings-menu") {
            settingsMenu.classList.remove("opacity-100");
            settingsMenu.classList.add("opacity-0");
            setTimeout(() => {
              settingsMenu.classList.add("hidden");
            }, 250);
          }
        });
        document
          .getElementById("open-profile-btn")
          .addEventListener("click", () => {
            const settingsMenu = document.getElementById("settings-menu");
            settingsMenu.classList.remove("opacity-100");
            settingsMenu.classList.add("opacity-0");
            setTimeout(() => {
              settingsMenu.classList.add("hidden");
            }, 250);
            document
              .getElementById("user-profile-modal")
              .classList.remove("hidden");
          });

        document.getElementById("logout-btn").addEventListener("click", () => {
          socket.disconnect();
          socket.connect();
          document.getElementById("chat-page").classList.add("hidden");
          document
            .getElementById("chat-settings-modal")
            .classList.add("hidden");
          document.getElementById("sticker-menu").classList.add("hidden");
          document.getElementById("search-user-modal").classList.add("hidden");
          document
            .getElementById("search-user-modal")
            .classList.remove("opacity-100");
          document
            .getElementById("search-user-modal")
            .classList.add("opacity-0");

          const settingsMenu = document.getElementById("settings-menu");
          settingsMenu.classList.remove("opacity-100");
          settingsMenu.classList.add("opacity-0");
          setTimeout(() => {
            settingsMenu.classList.add("hidden");
          }, 250);
          document.getElementById("user-profile-modal").classList.add("hidden");
          document.getElementById("login-page").classList.remove("hidden");
          showToast("Logged out.");
          wasLoggedIn = false;
        });
      }

      function setHtmlContentListeners_changelogModal() {
        document.getElementById("changelog-modal").addEventListener(
          "click",
          (e) => {
            if (e.target.id === "changelog-modal") {
              document.getElementById("changelog-modal").classList.add("hidden");
            }
          },
        );

        document.getElementById("open-changelog").addEventListener("click", () => {
          document.getElementById("changelog-modal").classList.remove("hidden");
        });
      }

      function setHtmlContentListeners_modals() {
        setHtmlContentListeners_messageInfo();
        setHtmlContentListeners_chatSettingsModal();
        setHtmlContentListeners_userSettingsModal();
        setHtmlContentListeners_settingsMenu();
        setHtmlContentListeners_htmlPreview();
        setHtmlContentListeners_userProfileModal();
        setHtmlContentListeners_otherProfileModal();
        setHtmlContentListeners_changelogModal();
      }

      function setSocketEvents() {
        setSocketEvents_data();
        setSocketEvents_responses();
      }

      function setHtmlContentListeners() {
        setHtmlContentListeners_loginPage();
        setHtmlContentListeners_mainChatPage();
        setHtmlContentListeners_chatContainer();
        setHtmlContentListeners_modals();
      }

      function setHtmlContent() {
        document.getElementById("login-page-version").textContent = version;
        document.getElementById("chats-search-bar").value = "";
        document.getElementById("participants-search-bar").value = "";
        document.getElementById("home-version-display").textContent = version;
        document.getElementById("download-link").href = `${rootUrl}/download`;

        updateBackgroundImage();

        document.getElementById("message-container").style.backgroundSize = "cover";
        document.getElementById("message-container").style.backgroundPosition =
          "center";
        setChangelog();
      }

      async function setChangelog() {
        const response = await fetch(`${rootUrl}/changelog.md`);
        if (response.ok) {
          const text = await response.text();
          if (text) {
            const html = markdown(text);
            const div = document.getElementById("changelog");
            if (div && html) {
              div.innerHTML = html;
            }
          }
        }
      }

      function setAppSettings() {
        const userAppSettingsString = localStorage.getItem("chatapp:settings");
        if (userAppSettingsString && isJsonString(userAppSettingsString)) {
          const userAppSettings = JSON.parse(userAppSettingsString);
          Object.entries(settingsInfo).forEach((entry) => {
            const [key, _] = entry;
            if (Object.keys(userAppSettings).includes(key)) {
              const userAppSettingsValue = userAppSettings[key];
              const settingValue = getSettingValue(key, userAppSettingsValue);
              if (settingValue !== null) {
                settings[key] = settingValue;
                return;
              }
            }
            // Default
            settings[key] = settingsInfo[key].default;
            return;
          });
        } else {
          Object.entries(settingsInfo).forEach((entry) => {
            const [key, value] = entry;
            settings[key] = value.default;
          });
        }

        localStorage.setItem("chatapp:settings", JSON.stringify(settings));

        function getSettingValue(key, settingValue) {
          switch (settingsInfo[key].type) {
            case "number":
              const numberValue = Number(settingValue);
              if (numberValue === "NaN") {
                return null;
              }
              return numberValue;
            case "boolean":
              const booleanValue = [true, false].includes(settingValue)
                ? settingValue
                : null;
              if (booleanValue === null) {
                return null;
              }
              return booleanValue;
            case "string":
              if (settingValue) {
                return settingValue;
              }
              return null;
            case "drop":
              if (settingValue) {
                return settingValue;
              }
              return null;
          }
          return null;
        }
      }

      function renderAppSettings() {
        const settingsContent = document.getElementById("settings-content");
        Object.keys(settings).forEach((key) => {
          const settingDiv = document.createElement("div");
          settingDiv.className =
            `flex text-${settings.text_color}-700 mt-0 justify-between items-center border-b border-${settings.primary_color}-700 py-2`;
          settingDiv.style.marginTop = "0px";
          const settingLabel = document.createElement("label");
          settingLabel.textContent = settingsInfo[key].name;
          settingLabel.htmlFor = `setting:${key}`;
          const parentDiv = document.createElement("div");
          parentDiv.className = "inline-flex items-center ml-5";

          switch (settingsInfo[key].type) {
            case "number":
              const settingInputNumber = document.createElement("input");
              settingInputNumber.id = `setting:${key}`;
              settingInputNumber.type = "number";
              settingInputNumber.setAttribute("autocomplete", "off");
              settingInputNumber.step = "0.01";
              settingInputNumber.classList.add(
                "bg-transparent",
                "border",
                `border-${settings.primary_color}-600`,
                `text-${settings.text_color}-700`,
                "text-sm",
                "rounded-lg",
                `focus:ring-${settings.secondary_color}-500`,
                "p-2",
              );
              settingInputNumber.addEventListener("change", () => {
                settings[key] = settingInputNumber.value;
                localStorage.setItem(
                  "chatapp:settings",
                  JSON.stringify(settings),
                );
              });
              settingInputNumber.value = settings[key];
              parentDiv.appendChild(settingInputNumber);
              if (settingsInfo[key].handle) {
                settingInputNumber.addEventListener("change", () => {
                  settingsInfo[key].handle(false);
                });
                settingsInfo[key].handle(true);
              }
              break;
            case "boolean":
              const settingInputBool = document.createElement("input");
              settingInputBool.id = `setting:${key}`;
              settingInputBool.type = "checkbox";
              settingInputBool.checked = settings[key];
              parentDiv.appendChild(settingInputBool);
              settingInputBool.addEventListener("change", () => {
                settings[key] = settingInputBool.checked;
                localStorage.setItem(
                  "chatapp:settings",
                  JSON.stringify(settings),
                );
              });

              const stylizedCheckbox = document.createElement("label");
              stylizedCheckbox.className =
                "flex items-center cursor-pointer relative";

              settingInputBool.className =
                `peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-lg shadow hover:shadow-md border border-${settings.primary_color}-600 checked:bg-${settings.secondary_color}-600 checked:border-${settings.secondary_color}-600`;

              const checkmark = document.createElement("span");
              checkmark.className =
                `absolute text-${settings.text_color}-900 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none`;

              const svg = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg",
              );
              svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
              svg.classList.add("h-4", "w-4");
              svg.setAttribute("viewBox", "0 0 20 20");
              svg.setAttribute("fill", "currentColor");
              svg.setAttribute("stroke", "currentColor");
              svg.setAttribute("stroke-width", "1");

              const path = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "path",
              );
              path.setAttribute("fill-rule", "evenodd");
              path.setAttribute(
                "d",
                "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
              );
              path.setAttribute("clip-rule", "evenodd");
              svg.appendChild(path);
              checkmark.appendChild(svg);

              stylizedCheckbox.appendChild(settingInputBool);
              stylizedCheckbox.appendChild(checkmark);
              parentDiv.appendChild(stylizedCheckbox);

              settingInputBool.addEventListener("change", () => {
                settings[key] = settingInputBool.checked;
                localStorage.setItem(
                  "chatapp:settings",
                  JSON.stringify(settings),
                );
              });
              if (settingsInfo[key].handle) {
                settingInputBool.addEventListener("change", () => {
                  settingsInfo[key].handle(false);
                });
                settingsInfo[key].handle(true);
              }
              break;
            case "string":
              const settingInputString = document.createElement("input");
              settingInputString.id = `setting:${key}`;
              settingInputString.setAttribute("autocomplete", "off");
              settingInputString.type = "text";
              settingInputString.classList.add(
                "bg-transparent",
                "border",
                `border-${settings.primary_color}-600`,
                `text-${settings.text_color}-700`,
                "text-sm",
                "rounded-lg",
                `focus:ring-${settings.secondary_color}-500`,
                "p-2",
              );
              settingInputString.addEventListener("change", () => {
                settings[key] = settingInputString.value;
                localStorage.setItem(
                  "chatapp:settings",
                  JSON.stringify(settings),
                );
              });
              settingInputString.value = settings[key];
              parentDiv.appendChild(settingInputString);
              if (settingsInfo[key].handle) {
                settingInputString.addEventListener("change", () => {
                  settingsInfo[key].handle(false);
                });
                settingsInfo[key].handle(true);
              }
              break;
            case "drop":
              const dropdown = document.createElement("select");
              dropdown.id = `setting:${key}`;
              dropdown.className =
                `block w-full px-4 py-2 bg-opacity-50 bg-${settings.primary_color}-900 text-${settings.text_color}-700 border border-${settings.primary_color}-300 rounded-md`;
              const labelOption = document.createElement("option");
              labelOption.disabled = true;
              labelOption.selected = true;
              labelOption.textContent = "Select a color";
              settingsInfo[key].options.forEach((color) => {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
                dropdown.appendChild(option);
              });
              dropdown.addEventListener("change", () => {
                settings[key] = dropdown.value;
                localStorage.setItem(
                  "chatapp:settings",
                  JSON.stringify(settings),
                );
              });
              dropdown.value = settings[key];
              parentDiv.appendChild(dropdown);
              if (settingsInfo[key].handle) {
                dropdown.addEventListener("change", () => {
                  settingsInfo[key].handle(false);
                });
                settingsInfo[key].handle(true);
              }
              break;
          }

          settingDiv.appendChild(settingLabel);
          settingDiv.appendChild(parentDiv);
          settingsContent.appendChild(settingDiv);
        });
      }

      function setStickers() {
        const data = localStorage.getItem("chatapp:stickers");
        if (data && data !== null && data !== undefined) {
          stickers = JSON.parse(data);
        } else {
          stickers = {};
          localStorage.setItem("chatapp:stickers", JSON.stringify(stickers));
        }
      }

      async function checkStickersValidity() {
        const stickerKeys = Object.keys(stickers);
        console.log("Stickers keys:", stickerKeys); // Ensure stickers is valid

        for (let i = 0; i < stickerKeys.length; i++) {
          try {
            const key = stickerKeys[i];
            console.log("Checking sticker:", key); // Log current sticker
            const response = await fetch(`${rootUrl}/attachment/${key}`);
            const responseText = await response.text(); // Get the response as text
            if (response.status === 404 && responseText === "Not Found") {
              console.error(`Sticker not found: ${key}`);
              delete stickers[key]; // Use key instead of stickerKeys[i]
              localStorage.setItem("chatapp:stickers", JSON.stringify(stickers));
            } else {
              console.log("Valid response for sticker:", key); // Log success
            }
          } catch (err) {
            console.error("Error processing sticker:", err.message, err.cause || "");
            delete stickers[stickerKeys[i]];
            localStorage.setItem("chatapp:stickers", JSON.stringify(stickers));
          }
        }
        updateStickersDisplay();
      }

      async function runFunctions() {
        setStickers();
        setAppSettings();
        renderAppSettings();
        setHtmlContent();
        setHtmlContentListeners();
        setSocketEvents();
        prepareUserLogin();
        startFocusPolling();
        prepareMobileCode();
        checkStickersValidity();
        updateStickersDisplay();
        showDesc("Starting up...");
        showLoadingPage();
      }
      //----------------------------------------------//
      // Main
      async function main() {
        window.addEventListener("online", () => {
          console.log("Online");
          autoLoginTriggered = false; // Reset autoLoginTriggered when online
        });
        window.addEventListener("offline", () => {
          console.log("Offline");
          autoLoginTriggered = false;
        });
        const setupTime = await trackRunTime(runFunctions);
        showToast(`Chat App loaded in ${setupTime}ms.`);
      }

      window.onload = main;