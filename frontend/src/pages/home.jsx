import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/api"; // Sesuaikan path jika perlu
import { Plus, X } from "lucide-react";

const TerminalTab = ({ active, commands, currentCommand, onCommandChange, onKeyDown, username, mode }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current && active) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands, active]);

  if (!active) return null;

  return (
    <div ref={terminalRef} className="p-4 h-full overflow-y-auto text-gray-200 font-mono">
      {/* Command History */}
      {commands.map((cmd, index) => (
        <div key={index} className="mb-2">
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center">
              <span className="text-green-400">┌──(</span>
              <span className="text-green-400">{username}@cyberf</span>
              <span className="text-gray-400">)-[</span>
              <span className="text-blue-400">{cmd.cwd || "~"}</span>
              <span className="text-gray-400">]</span>
              <span className="ml-2 text-xs text-gray-500">[{mode} mode]</span>
            </div>
            {/* Footer (Prompt) */}
            <div className="flex items-center">
              <span className="text-green-400">└─$ </span>
              <span className="ml-2">{cmd.command}</span>
            </div>
          </div>
          <div className="text-gray-300 whitespace-pre-line mt-1">
            {cmd.output.startsWith("<img") ? (
              <div dangerouslySetInnerHTML={{ __html: cmd.output }} />
            ) : (
              cmd.output
            )}
          </div>
        </div>
      ))}
      {/* Current Command Input */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center">
          <span className="text-green-400">┌──(</span>
          <span className="text-green-400">{username}@cyberf</span>
          <span className="text-gray-400">)-[</span>
          <span className="text-blue-400">{commands.length > 0 && commands[commands.length - 1].cwd ? commands[commands.length - 1].cwd : "~"}</span>
          <span className="text-gray-400">]</span>
          <span className="ml-2 text-xs text-gray-500">[{mode} mode]</span>
        </div>
        {/* Footer (Prompt with Input) */}
        <div className="flex items-center">
          <span className="text-green-400">└─$ </span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => onCommandChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 ml-2 bg-transparent outline-none border-none text-gray-200"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

const Terminal = () => {
  const [username, setUsername] = useState("user");
  const [tabs, setTabs] = useState([
    {
      id: 1,
      commands: [
        {
          command: "welcome",
          output: `<img src='/aset/test.png' class="w-[43rem] py-5" alt='banner'/>Type 'help' to see list available commands.`,
          cwd: null,
        },
      ],
      currentCommand: "",
      history: [],
      historyIndex: -1,
      mode: "free",
      cwd: null,
    },
  ]);
  const [activeTab, setActiveTab] = useState(1);

  const getCommandRoot = (commandText) => {
    return commandText.trim().split(/\s+/)[0]?.toLowerCase() || "";
  };

  const baseHelpOutput = (mode) => `Available Commands:
- help: Display this message
- clear: Clear screen
- whoami: Show current user
- welcome: Welcome message
- tools: List of available tools
- tools-page: Open the Tools page
- mode free: Switch to free terminal mode
- mode restricted: Switch to restricted tool mode
- exit: Close current tab
- new-tab: Open a new tab
- google-dorking: Go to Google Dorking page

Current mode: ${mode}

Mode info:
- free: bebas ketik command apa saja seperti terminal biasa
- restricted: mode terbatas. Hanya command tool yang sudah terinstall yang bisa dijalankan`;

  const getWelcomeOutput = (mode) => `<img src='/aset/test.png' class="w-[43rem] py-5" alt='banner'/>
Type 'help' to see list available commands.
Current mode: ${mode}`;

  const getRestrictedFlowOutput = () => `Mode switched to restricted.

Flow restricted tool mode:
1. Jalankan 'tools' untuk lihat tools yang sudah terinstall.
2. Pakai 'tools-page' untuk buka halaman Tools.
3. Pilih tool lalu install atau check installation dari halaman Tools.
4. Setelah status installed, balik ke mode free dengan 'mode free'.

Saat mode restricted aktif, hanya command yang diawali nama tool terinstall yang bisa dieksekusi.`;

  // Ambil data user saat komponen mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.getUser();
        setUsername(response.name);
        setTabs(prev => {
          const updated = [...prev];
          updated[0].commands[0].command = `welcome ${response.name}`;
          updated[0].commands[0].output = getWelcomeOutput(updated[0].mode);
          updated[0].commands[0].cwd = updated[0].cwd || null;
          return updated;
        });
      } catch (err) {
        setUsername("user");
        setTabs(prev => {
          const updated = [...prev];
          updated[0].commands[0].command = "welcome user";
          updated[0].commands[0].output = getWelcomeOutput(updated[0].mode);
          updated[0].commands[0].cwd = updated[0].cwd || null;
          return updated;
        });
      }
    };

    fetchUser();
  }, []);

  const handleCommand = async (e) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const currentTab = tabs[tabIndex];
    const commandText = currentTab.currentCommand.trim();

    // Navigasi ↑ ↓ tetap sama
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (currentTab.history.length > 0) {
        const newIndex = Math.max(currentTab.historyIndex + 1, 0);
        const newCommand =
          currentTab.history[currentTab.history.length - 1 - newIndex] || "";
        setTabs((prev) => {
          const updated = [...prev];
          updated[tabIndex] = {
            ...updated[tabIndex],
            historyIndex: newIndex,
            currentCommand: newCommand,
          };
          return updated;
        });
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (currentTab.historyIndex >= 0) {
        const newIndex = currentTab.historyIndex - 1;
        const newCommand =
          currentTab.history[currentTab.history.length - 1 - newIndex] || "";
        setTabs((prev) => {
          const updated = [...prev];
          updated[tabIndex] = {
            ...updated[tabIndex],
            historyIndex: newIndex,
            currentCommand: newCommand,
          };
          return updated;
        });
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const updatedTabs = [...tabs];
      const tabIndex = updatedTabs.findIndex((tab) => tab.id === activeTab);
      const currentTab = updatedTabs[tabIndex];
      const currentMode = currentTab.mode || "free";
      const currentDisplayDirectory = currentTab.cwd && currentTab.cwd !== "~" ? currentTab.cwd : "~";
      const currentExecutionDirectory = currentTab.cwd && currentTab.cwd !== "~" ? currentTab.cwd : "";

      // Simpan ke history
      updatedTabs[tabIndex] = {
        ...currentTab,
        history: [...currentTab.history, commandText],
        historyIndex: -1,
      };

      // Keep the executed command visible in the prompt while output is rendered.
      setTabs([...updatedTabs]);

      // --- COMMAND HANDLER ---
      switch (commandText) {
        case "help":
          updatedTabs[tabIndex].commands = [
            ...currentTab.commands,
            {
              command: "help",
              output: baseHelpOutput(currentMode),
              cwd: currentDisplayDirectory,
            },
          ];
          break;

        case "clear":
          updatedTabs[tabIndex].commands = [];
          break;

        case "whoami":
          updatedTabs[tabIndex].commands = [
            ...currentTab.commands,
            {
              command: "whoami",
              output: `You are ${username}@cyberf. Welcome to the digital world!`,
              cwd: currentDisplayDirectory,
            },
          ];
          break;

        case "welcome":
          updatedTabs[tabIndex].commands = [
            ...currentTab.commands,
            {
              command: "welcome",
              output: getWelcomeOutput(currentMode),
              cwd: currentDisplayDirectory,
            },
          ];
          break;

        case "tools-page":
          updatedTabs[tabIndex].commands.push({
            command: "tools-page",
            output: "Redirecting to Tools page...",
            cwd: currentDisplayDirectory,
          });
          setTimeout(() => {
            window.location.href = "/tools";
          }, 500);
          break;

        case "mode free":
          updatedTabs[tabIndex].mode = "free";
          updatedTabs[tabIndex].commands.push({
            command: "mode free",
            output: "Mode switched to free. Kamu bisa ketik command apa saja seperti terminal biasa.",
            cwd: currentDisplayDirectory,
          });
          break;

        case "mode restricted":
        case "mode install":
          updatedTabs[tabIndex].mode = "restricted";
          updatedTabs[tabIndex].commands.push({
            command: commandText,
            output: getRestrictedFlowOutput(),
            cwd: currentDisplayDirectory,
          });
          break;

        case "tools":
          try {
            const res = await axiosInstance.get("/available-tools");

            const installedTools = res.data.data;

            if (installedTools.length === 0) {
              updatedTabs[tabIndex].commands.push({
                command: "tools",
                output: "Tidak ada tool yang terinstall.",
                cwd: currentDisplayDirectory,
              });
            } else {
              const toolsList = installedTools
                .map((tool) => `- ${tool.name} (${tool.category})`)
                .join("\n");

              updatedTabs[tabIndex].commands.push({
                command: "tools",
                output: `Berikut adalah tools yang sudah terinstall:\n${toolsList}\n\nGunakan seperti di CLI biasa.`,
                cwd: currentDisplayDirectory,
              });
            }
          } catch (err) {
            updatedTabs[tabIndex].commands.push({
              command: "tools",
              output: "Gagal mengambil daftar tools.",
              cwd: currentDisplayDirectory,
            });
          }
          break;

        case "mode":
          updatedTabs[tabIndex].commands.push({
            command: "mode",
            output: `Current mode: ${currentMode}
Use 'mode free' atau 'mode restricted' untuk pindah mode.`,
            cwd: currentDisplayDirectory,
          });
          break;

        case "new-tab":
          const nextTerminalNumber = tabs.length + 1;
          const newTab = {
            id: nextTerminalNumber,
            commands: [
              {
                command: `welcome ${username}`,
                output: `<img src='/aset/test.png' class="w-[43rem] py-5" alt='banner'/>
Type 'help' to see list available commands.`,
                cwd: currentTab.cwd || null,
              },
            ],
            currentCommand: "",
            history: [],
            historyIndex: -1,
            mode: currentMode,
            cwd: currentTab.cwd || null,
          };
          updatedTabs.push(newTab);
          setActiveTab(nextTerminalNumber);
          setTabs(updatedTabs);
          return;

        case "exit":
          if (tabs.length > 1) {
            const remainingTabs = tabs.filter((tab) => tab.id !== activeTab);
            setActiveTab(remainingTabs[0].id);
            setTabs(remainingTabs);
          }
          return;

        case "google-dorking":
          updatedTabs[tabIndex].commands.push({
            command: "google-dorking",
            output: "Redirecting to Google Dorking...",
            cwd: currentDisplayDirectory,
          });
          setTimeout(() => {
            window.location.href = "/google-dorking";
          }, 500);
          break;

        default:
          if (currentMode === "restricted") {
            try {
              const toolsResponse = await axiosInstance.get("/available-tools");
              const installedTools = Array.isArray(toolsResponse.data?.data) ? toolsResponse.data.data : [];
              const commandRoot = getCommandRoot(commandText);
              const isInstalledToolCommand = installedTools.some((tool) => tool.name?.toLowerCase() === commandRoot);

              if (!isInstalledToolCommand) {
                const installedToolNames = installedTools.length
                  ? installedTools.map((tool) => tool.name).join(", ")
                  : "belum ada tool yang terinstall";

                updatedTabs[tabIndex].commands.push({
                  command: commandText,
                  output: `Mode restricted aktif.
Command ini diblok karena bukan command tool yang terinstall.

Tool yang terinstall saat ini: ${installedToolNames}

Lanjutkan flow berikut:
1. Jalankan 'tools-page' untuk buka halaman Tools.
2. Install atau check installation tool yang kamu butuhkan.
3. Setelah tool terinstall, jalankan command tool itu di mode restricted.
4. Kalau mau command shell bebas, pindah ke 'mode free'.`,
                  cwd: currentDisplayDirectory,
                });
              } else {
                try {
                  const res = await axiosInstance.post("/run-command", {
                    command: commandText,
                    cwd: currentExecutionDirectory,
                  });

                  const resolvedWorkingDirectory = (res.data.working_directory && res.data.working_directory !== "~" ? res.data.working_directory : "") || currentExecutionDirectory || currentDisplayDirectory;

                  updatedTabs[tabIndex].commands.push({
                    command: commandText,
                    output: [
                      `Executed on: ${res.data.executed_on || "unknown"}`,
                      `Exit code: ${res.data.exit_code ?? "unknown"}`,
                      res.data.output || "Tidak ada output.",
                    ].join("\n"),
                    cwd: resolvedWorkingDirectory,
                  });
                  updatedTabs[tabIndex].cwd = resolvedWorkingDirectory;
                } catch (err) {
                  const resolvedWorkingDirectory = (err.response?.data?.working_directory && err.response?.data?.working_directory !== "~" ? err.response?.data?.working_directory : "") || currentExecutionDirectory || currentDisplayDirectory;
                  updatedTabs[tabIndex].commands.push({
                    command: commandText,
                    output: err.response?.data?.output || "Gagal menjalankan perintah.",
                    cwd: resolvedWorkingDirectory,
                  });
                  updatedTabs[tabIndex].cwd = resolvedWorkingDirectory;
                }
              }
            } catch (err) {
              updatedTabs[tabIndex].commands.push({
                command: commandText,
                output: "Gagal memeriksa daftar tools yang terinstall.",
                cwd: currentDisplayDirectory,
              });
            }
          } else {
            try {
              const res = await axiosInstance.post("/run-command", {
                command: commandText,
                cwd: currentExecutionDirectory,
              });

              const resolvedWorkingDirectory = (res.data.working_directory && res.data.working_directory !== "~" ? res.data.working_directory : "") || currentExecutionDirectory || currentDisplayDirectory;

              updatedTabs[tabIndex].commands.push({
                command: commandText,
                output: [
                  `Executed on: ${res.data.executed_on || "unknown"}`,
                  `Exit code: ${res.data.exit_code ?? "unknown"}`,
                  res.data.output || "Tidak ada output.",
                ].join("\n"),
                cwd: resolvedWorkingDirectory,
              });
              updatedTabs[tabIndex].cwd = resolvedWorkingDirectory;
            } catch (err) {
              const resolvedWorkingDirectory = (err.response?.data?.working_directory && err.response?.data?.working_directory !== "~" ? err.response?.data?.working_directory : "") || currentExecutionDirectory || currentDisplayDirectory;
              updatedTabs[tabIndex].commands.push({
                command: commandText,
                output: err.response?.data?.output || "Gagal menjalankan perintah.",
                cwd: resolvedWorkingDirectory,
              });
              updatedTabs[tabIndex].cwd = resolvedWorkingDirectory;
            }
          }
          break;
      }

      setTabs([...updatedTabs]);
    }
  };

  const addNewTab = () => {
    const newId = tabs.length + 1;
    const newTab = {
      id: newId,
      commands: [
        {
          command: `welcome ${username}`,
          output: `<img src='/aset/test.png' class="w-[43rem] py-5" alt='banner'/>
Type 'help' to see list available commands.`,
        },
      ],
      currentCommand: "",
      history: [],
      historyIndex: -1,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newId);
  };

  const closeTab = (id) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== id);
      setTabs(newTabs);
      setActiveTab(newTabs[0].id);
    }
  };

  const updateCommand = (value) => {
    const tabIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const updated = [...tabs];
    updated[tabIndex].currentCommand = value;
    setTabs(updated);
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] text-gray-200 font-mono">
      <div className="h-full flex flex-col">
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-sm ml-2">Cyber Forge Terminal</span>
        </div>

        {/* Tabs Bar */}
        <div className="bg-[#2d2d2d] border-b border-gray-700 flex items-center">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center px-4 py-2 border-r border-gray-700 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#1e1e1e] text-gray-200"
                  : "text-gray-400 hover:bg-[#343434]"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>Terminal {tab.id}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="ml-2 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addNewTab}
            className="p-2 text-gray-400 hover:text-gray-200"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-hidden">
          {tabs.map((tab) => (
            <TerminalTab
              key={tab.id}
              active={tab.id === activeTab}
              commands={tab.commands}
              currentCommand={tab.currentCommand}
              onCommandChange={updateCommand}
              onKeyDown={handleCommand}
              username={username}
              mode={tab.mode || "free"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal;