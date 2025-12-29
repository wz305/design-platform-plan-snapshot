import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Settings } from 'lucide-react';
import { ThemeButtonOriginalElement } from './ThemeButton';

interface GlobalControlsProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
}

export function GlobalControls({ onThemeToggle, isDarkMode = true }: GlobalControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const iconSize = 32;
  const themeToggleCompactWidth = 34;
  const themeToggleCompactHeight = 30;
  const themeToggleExpandedHeight = 30;
  const themeToggleSize = Number(((iconSize * 3) / 70).toFixed(2));
  const themeToggleScale = Number((themeToggleSize / 3).toFixed(2));
  const themeToggleWidth = 180 * themeToggleScale;
  const themeToggleExpandedWidth = themeToggleWidth + 1;
  const themeToggleShift = 0;
  const labelGap = 8;
  const panelPadding = 8;
  const iconRightTarget = 6;
  const toggleRightTarget = 5;
  const iconRight = iconRightTarget - panelPadding;
  const toggleRight = toggleRightTarget - panelPadding;
  const labelRight = iconRight + iconSize + labelGap;
  const expandedPanelWidth = themeToggleExpandedWidth + toggleRightTarget + 5;

  return (
    <>
      {/* Top-right Edge Toolbar */}
      <motion.div
        className="fixed top-0 right-0 z-40 select-none"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <motion.div
          className="relative flex flex-col gap-2 bg-[var(--app-panel)] backdrop-blur-sm border-l border-b border-[var(--app-border)] rounded-bl-lg px-2 py-2 shadow-lg overflow-hidden"
          animate={{ width: isExpanded ? expandedPanelWidth : 44 }}
          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {/* About */}
          <div className="relative h-8 w-full">
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 text-xs text-[var(--app-text-subtle)] whitespace-nowrap"
                  style={{ right: `${Math.max(labelRight, 0)}px` }}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                >
                  关于
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={() => setShowAbout(true)}
              className="absolute top-0 h-8 w-8 flex items-center justify-center hover:bg-[var(--app-accent-soft)] rounded transition-all group"
              style={{ right: `${iconRight}px` }}
              title="关于"
            >
              <Info className="w-4 h-4 text-[var(--app-text-subtle)] group-hover:text-[var(--app-accent)]" />
            </button>
          </div>

          {/* Settings */}
          <div className="relative h-8 w-full">
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 text-xs text-[var(--app-text-subtle)] whitespace-nowrap"
                  style={{ right: `${Math.max(labelRight, 0)}px` }}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  transition={{ duration: 0.18 }}
                >
                  设置
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={() => setShowSettings(true)}
              className="absolute top-0 h-8 w-8 flex items-center justify-center hover:bg-[var(--app-accent-soft)] rounded transition-all group"
              style={{ right: `${iconRight}px` }}
              title="设置"
            >
              <Settings className="w-4 h-4 text-[var(--app-text-subtle)] group-hover:text-[var(--app-accent)]" />
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="relative h-8 w-full">
            <motion.div
              className="absolute top-0 flex items-center overflow-hidden border border-[var(--app-border)] shadow-inner"
              style={{
                justifyContent: isDarkMode ? "flex-end" : "flex-start",
                background: "var(--app-panel)",
                right: `${toggleRight}px`,
              }}
              animate={{
                width: isExpanded ? themeToggleExpandedWidth : themeToggleCompactWidth,
                height: isExpanded ? themeToggleExpandedHeight : themeToggleCompactHeight,
                borderRadius: 999,
              }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              title={isDarkMode ? "切换到日间模式" : "切换到夜间模式"}
            >
              <div
                style={{
                  width: themeToggleExpandedWidth,
                  height: iconSize,
                  position: "relative",
                  transform: `translateX(${themeToggleShift}px)`,
                }}
              >
                <ThemeButtonOriginalElement
                  value={isDarkMode ? "dark" : "light"}
                  size={themeToggleSize}
                  onChange={(detail) => {
                    if (!onThemeToggle) return;
                    if (detail === "dark" && !isDarkMode) onThemeToggle();
                    if (detail === "light" && isDarkMode) onThemeToggle();
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAbout(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg shadow-2xl p-6 w-96 z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl text-[var(--app-text)] mb-4">关于</h2>
              <div className="space-y-3 text-sm text-[var(--app-text-muted)]">
                <p>
                  专业工程应用界面
                </p>
                <p>
                  极简工程工具界面，支持可展开面板、滑轨结构和径向菜单交互。
                </p>
                <div className="pt-4 border-t border-[var(--app-border)]">
                  <div className="text-xs text-[var(--app-text-faint)]">版本 1.0.0</div>
                </div>
              </div>
              <button
                onClick={() => setShowAbout(false)}
                className="mt-6 px-4 py-2 bg-[var(--app-accent)] hover:bg-[var(--app-accent-strong)] text-[var(--app-text-invert)] rounded transition-all w-full"
              >
                关闭
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg shadow-2xl p-6 w-96 z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl text-[var(--app-text)] mb-4">设置</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-[var(--app-text-muted)] group-hover:text-[var(--app-text)]">
                      自动保存
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-[var(--app-accent)]"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-[var(--app-text-muted)] group-hover:text-[var(--app-text)]">
                      显示网格
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-[var(--app-accent)]"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-[var(--app-text-muted)] group-hover:text-[var(--app-text)]">
                      吸附网格
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-[var(--app-accent)]"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm text-[var(--app-text-muted)] group-hover:text-[var(--app-text)]">
                      面板动画
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-[var(--app-accent)]"
                    />
                  </label>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="mt-6 px-4 py-2 bg-[var(--app-accent)] hover:bg-[var(--app-accent-strong)] text-[var(--app-text-invert)] rounded transition-all w-full"
              >
                关闭
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
