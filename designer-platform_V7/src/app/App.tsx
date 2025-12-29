import React, { useState } from 'react';
import { DockablePanel, SubPanel } from './components/DockablePanel';
import { RadialMenu, RadialMenuRing } from './components/RadialMenu';
import { GlobalControls } from './components/GlobalControls';
import { ConsoleExpandedPage } from '@/dev_console/ConsoleExpandedPage';
import { 
  Layers, 
  FileText, 
  Activity, 
  Database, 
  Terminal, 
  Settings, 
  Code,
  Zap,
  Clock,
  Bell,
  Grid3x3,
  Eye,
  EyeOff,
  Lock,
  LockOpen
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { DevADMockLauncher } from '@/dev/DevADMockLauncher';


export default function App() {
  const [radialMenu, setRadialMenu] = useState<{ x: number; y: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const themeClass = isDarkMode ? "dark" : "";

  // Left panel sub-panels
  const leftSubPanels: SubPanel[] = [
    {
      id: 'components',
      icon: <Code className="w-4 h-4" />,
      name: '元件',
      summary: '24个可用',
      content: (
        <div className="space-y-2">
          {[
            { name: '电阻', count: 8, category: '被动' },
            { name: '电容', count: 6, category: '被动' },
            { name: '电感', count: 3, category: '被动' },
            { name: '二极管', count: 4, category: '主动' },
            { name: '三极管', count: 5, category: '主动' },
            { name: '运放', count: 7, category: '主动' },
            { name: '连接器', count: 12, category: '结构' }
          ].map(comp => (
            <div
              key={comp.name}
              className="p-2 bg-[var(--app-panel-alt)] hover:bg-[var(--app-panel-hover)] border border-[var(--app-border)] rounded transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[var(--app-text)]">{comp.name}</div>
                  <div className="text-xs text-[var(--app-text-faint)] mt-0.5">{comp.category}</div>
                </div>
                <span className="text-xs text-[var(--app-text-subtle)] bg-[var(--app-chip-bg)] px-2 py-0.5 rounded group-hover:bg-[var(--app-accent)] group-hover:text-[var(--app-text-invert)] transition-all">
                  {comp.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'files',
      icon: <FileText className="w-4 h-4" />,
      name: '文件',
      summary: '项目内5个',
      content: (
        <div className="space-y-1">
          {[
            { name: 'main_schematic.sch', size: '2.4 KB', modified: '2小时前' },
            { name: 'power_supply.sch', size: '1.2 KB', modified: '5小时前' },
            { name: 'signal_processing.sch', size: '3.1 KB', modified: '1天前' },
            { name: 'netlist_export.txt', size: '8.2 KB', modified: '2天前' },
            { name: 'project_config.json', size: '512 B', modified: '3天前' }
          ].map(file => (
            <div
              key={file.name}
              className="p-2 hover:bg-[var(--app-panel-hover)] rounded transition-all cursor-pointer group"
            >
              <div className="text-sm text-[var(--app-text)] truncate group-hover:text-[var(--app-accent)]">
                {file.name}
              </div>
              <div className="flex gap-3 mt-0.5">
                <span className="text-xs text-[var(--app-text-faint)]">{file.size}</span>
                <span className="text-xs text-[var(--app-text-faint)]">{file.modified}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'history',
      icon: <Clock className="w-4 h-4" />,
      name: '历史',
      summary: '15分钟前保存',
      content: (
        <div className="space-y-2">
          {[
            { version: 'v1.2.4', time: '15分钟前', author: '系统', changes: '自动保存检查点' },
            { version: 'v1.2.3', time: '1小时前', author: '用户', changes: '修改电源走线' },
            { version: 'v1.2.2', time: '3小时前', author: '用户', changes: '新增滤波元件' },
            { version: 'v1.2.1', time: '5小时前', author: '系统', changes: '自动保存检查点' },
            { version: 'v1.2.0', time: '1天前', author: '用户', changes: '原理图大改' }
          ].map(item => (
            <div
              key={item.version}
              className="p-2 bg-[var(--app-panel-alt)] border border-[var(--app-border)] rounded hover:border-[var(--app-accent)] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1">
                <span className="text-sm text-[var(--app-accent)]">{item.version}</span>
                <span className="text-xs text-[var(--app-text-faint)]">{item.time}</span>
              </div>
              <div className="text-xs text-[var(--app-text-subtle)]">{item.changes}</div>
              <div className="text-xs text-[var(--app-text-faint)] mt-0.5">by {item.author}</div>
            </div>
          ))}
        </div>
      )
    }
  ];

  // Right panel sub-panels
  const rightSubPanels: SubPanel[] = [
    {
      id: 'properties',
      icon: <Settings className="w-4 h-4" />,
      name: '属性',
      summary: '12项可编辑',
      content: (
        <div className="space-y-3">
          <div>
            <div className="text-xs text-[var(--app-text-subtle)] mb-2 uppercase tracking-wider">变换</div>
            <div className="space-y-1.5">
              {[
                { label: 'X', value: '100.00', unit: 'mm' },
                { label: 'Y', value: '200.00', unit: 'mm' },
                { label: '宽', value: '50.00', unit: 'mm' },
                { label: '高', value: '30.00', unit: 'mm' },
                { label: '旋转', value: '0.00', unit: '度' }
              ].map(prop => (
                <div key={prop.label} className="flex items-center gap-2">
                  <span className="text-[var(--app-text-subtle)] w-4 text-xs">{prop.label}</span>
                  <input
                    type="text"
                    defaultValue={prop.value}
                    className="flex-1 bg-[var(--app-panel-alt)] border border-[var(--app-border)] px-2 py-1 rounded text-xs text-[var(--app-text)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                  />
                  <span className="text-[var(--app-text-faint)] text-xs w-8">{prop.unit}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-[var(--app-text-subtle)] mb-2 uppercase tracking-wider">Electrical</div>
            <div className="space-y-1.5">
              {[
                { label: '数值', value: '10k', unit: 'Ω' },
                { label: '误差', value: '5', unit: '%' },
                { label: '功率', value: '0.25', unit: 'W' },
                { label: '电压', value: '50', unit: 'V' }
              ].map(prop => (
                <div key={prop.label} className="flex items-center gap-2">
                  <span className="text-[var(--app-text-subtle)] w-16 text-xs">{prop.label}</span>
                  <input
                    type="text"
                    defaultValue={prop.value}
                    className="flex-1 bg-[var(--app-panel-alt)] border border-[var(--app-border)] px-2 py-1 rounded text-xs text-[var(--app-text)] focus:border-[var(--app-accent)] focus:outline-none transition-colors"
                  />
                  <span className="text-[var(--app-text-faint)] text-xs w-8">{prop.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'layers',
      icon: <Layers className="w-4 h-4" />,
      name: '层',
      summary: '共8层，显示6层',
      content: (
        <div className="space-y-0.5">
          {[
            { name: '顶层铜', visible: true, locked: false, color: '#EF4444' },
            { name: '顶层丝印', visible: true, locked: false, color: '#F3F4F6' },
            { name: '顶层阻焊', visible: true, locked: false, color: '#10B981' },
            { name: '内层 1', visible: false, locked: false, color: '#F59E0B' },
            { name: '内层 2', visible: false, locked: false, color: '#F59E0B' },
            { name: '底层铜', visible: true, locked: false, color: '#3B82F6' },
            { name: '底层丝印', visible: true, locked: false, color: '#F3F4F6' },
            { name: '底层阻焊', visible: true, locked: true, color: '#10B981' }
          ].map((layer, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-1 py-1.5 hover:bg-[var(--app-panel-hover)] rounded transition-colors group"
            >
              <button className="p-0.5">
                {layer.visible ? (
                  <Eye className="w-3 h-3 text-[var(--app-text-subtle)] group-hover:text-[var(--app-accent)]" />
                ) : (
                  <EyeOff className="w-3 h-3 text-[var(--app-text-faint)]" />
                )}
              </button>
              <div
                className="w-3 h-3 rounded border border-[var(--app-border)]"
                style={{ backgroundColor: layer.color }}
              />
              <span className={`flex-1 text-xs ${layer.visible ? 'text-[var(--app-text)]' : 'text-[var(--app-text-faint)]'}`}>
                {layer.name}
              </span>
              <button className="p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {layer.locked ? (
                  <Lock className="w-3 h-3 text-[var(--app-text-subtle)]" />
                ) : (
                  <LockOpen className="w-3 h-3 text-[var(--app-text-subtle)]" />
                )}
              </button>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'notifications',
      icon: <Bell className="w-4 h-4" />,
      name: '提醒',
      summary: '3条新消息',
      content: (
        <div className="space-y-1.5">
          {[
            { type: 'warning', title: '设计规则检查', message: '第1层走线间距低于最小值', time: '5分钟前' },
            { type: 'info', title: '自动保存完成', message: '项目已成功保存', time: '15分钟前' },
            { type: 'error', title: '连接错误', message: '检测到网络连接不匹配', time: '1小时前' }
          ].map((notif, idx) => (
            <div
              key={idx}
              className={`p-2 rounded border ${
                notif.type === 'error'
                  ? 'bg-red-500/10 border-red-500/30'
                  : notif.type === 'warning'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <div className="flex items-start justify-between mb-0.5">
                <span className={`text-xs ${
                  notif.type === 'error'
                    ? 'text-red-400'
                    : notif.type === 'warning'
                    ? 'text-yellow-400'
                    : 'text-blue-400'
                }`}>
                  {notif.title}
                </span>
                <span className="text-[10px] text-[var(--app-text-faint)]">{notif.time}</span>
              </div>
              <div className="text-[10px] text-[var(--app-text-muted)]">{notif.message}</div>
            </div>
          ))}
        </div>
      )
    }
  ];

  // Top panel sub-panels
  const topSubPanels: SubPanel[] = [
    {
      id: 'tools',
      icon: <Grid3x3 className="w-4 h-4" />,
      name: '工具',
      summary: '快捷入口',
      content: (
        <div className="grid grid-cols-8 gap-1.5">
          {[
            { name: '选择', shortcut: 'V' },
            { name: '移动', shortcut: 'M' },
            { name: '旋转', shortcut: 'R' },
            { name: '镜像', shortcut: 'X' },
            { name: '导线', shortcut: 'W' },
            { name: '总线', shortcut: 'B' },
            { name: '标注', shortcut: 'L' },
            { name: '电源', shortcut: 'P' },
            { name: '地线', shortcut: 'G' },
            { name: '文字', shortcut: 'T' },
            { name: '测量', shortcut: 'Ctrl+M' },
            { name: '缩放', shortcut: 'Z' }
          ].map(tool => (
            <button
              key={tool.name}
              className="p-2 bg-[var(--app-panel-alt)] hover:bg-[var(--app-accent)] border border-[var(--app-border)] hover:border-[var(--app-accent)] text-[var(--app-text)] hover:text-[var(--app-text-invert)] rounded transition-all group"
            >
              <div className="text-xs">{tool.name}</div>
              <div className="text-[10px] text-[var(--app-text-faint)] group-hover:text-[var(--app-text)] mt-0.5">{tool.shortcut}</div>
            </button>
          ))}
        </div>
      )
    },
    {
      id: 'view',
      icon: <Activity className="w-4 h-4" />,
      name: '视图',
      summary: '显示选项',
      content: (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="text-xs text-[var(--app-text-subtle)] uppercase tracking-wider">显示</div>
            {[
              { label: '显示网格', checked: true },
              { label: '显示标尺', checked: true },
              { label: '显示辅助线', checked: false },
              { label: '吸附网格', checked: true },
              { label: '显示原点', checked: true }
            ].map(option => (
              <label key={option.label} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked={option.checked}
                  className="w-3 h-3 accent-[var(--app-accent)]"
                />
                <span className="text-xs text-[var(--app-text-muted)] group-hover:text-[var(--app-text)]">{option.label}</span>
              </label>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-xs text-[var(--app-text-subtle)] uppercase tracking-wider">缩放</div>
            <div className="space-y-1">
              {['适配屏幕', '100%', '200%', '400%', '自定义'].map(zoom => (
                <button
                  key={zoom}
                  className="w-full px-2 py-1 text-left text-xs bg-[var(--app-panel-alt)] hover:bg-[var(--app-accent)] border border-[var(--app-border)] text-[var(--app-text-muted)] hover:text-[var(--app-text-invert)] rounded transition-all"
                >
                  {zoom}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  // Bottom panel sub-panels
  const bottomSubPanels: SubPanel[] = [
    {
      id: 'console',
      icon: <Terminal className="w-4 h-4" />,
      name: '控制台',
      summary: '3条警告',
      content: (
        <ConsoleExpandedPage />
      )
    },
    {
      id: 'data',
      icon: <Database className="w-4 h-4" />,
      name: '检查器',
      summary: '24条网络连接',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--app-border)]">
                <th className="text-left text-[var(--app-text-subtle)] pb-1.5 pr-4">网络ID</th>
                <th className="text-left text-[var(--app-text-subtle)] pb-1.5 pr-4">网络名称</th>
                <th className="text-left text-[var(--app-text-subtle)] pb-1.5 pr-4">节点数</th>
                <th className="text-left text-[var(--app-text-subtle)] pb-1.5 pr-4">长度</th>
                <th className="text-left text-[var(--app-text-subtle)] pb-1.5 pr-4">状态</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'N001', name: 'VCC_3V3', nodes: 12, length: '245mm', status: '正常' },
                { id: 'N002', name: 'GND', nodes: 28, length: '892mm', status: '正常' },
                { id: 'N003', name: 'SIG_CLK', nodes: 4, length: '67mm', status: '正常' },
                { id: 'N004', name: 'SIG_DATA', nodes: 8, length: '134mm', status: '告警' },
                { id: 'N005', name: 'USB_DP', nodes: 3, length: '45mm', status: '正常' },
                { id: 'N006', name: 'USB_DM', nodes: 3, length: '48mm', status: '正常' },
                { id: 'N007', name: 'I2C_SDA', nodes: 5, length: '89mm', status: '正常' },
                { id: 'N008', name: 'I2C_SCL', nodes: 5, length: '91mm', status: '正常' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-[var(--app-border-muted)] hover:bg-[var(--app-panel-hover)]">
                  <td className="text-[var(--app-text-faint)] py-1.5 pr-4 font-mono text-[10px]">{row.id}</td>
                  <td className="text-[var(--app-text)] py-1.5 pr-4">{row.name}</td>
                  <td className="text-[var(--app-text-muted)] py-1.5 pr-4">{row.nodes}</td>
                  <td className="text-[var(--app-text-muted)] py-1.5 pr-4">{row.length}</td>
                  <td className="py-1.5 pr-4">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        row.status === '正常'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  ];

  // Radial menu rings
  const radialMenuRings: RadialMenuRing[] = [
    {
      id: 'actions',
      label: '操作',
      items: [
        { id: 'copy', label: '复制', action: () => console.log('Copy') },
        { id: 'cut', label: '剪切', action: () => console.log('Cut') },
        { id: 'delete', label: '删除', action: () => console.log('Delete') },
        { id: 'save', label: '保存', action: () => console.log('Save') }
      ]
    },
    {
      id: 'files',
      label: '文件',
      items: [
        { id: 'upload', label: '导入', action: () => console.log('Import') },
        { id: 'download', label: '导出', action: () => console.log('Export') },
        { id: 'search', label: '查找', action: () => console.log('Search') },
        { id: 'filter', label: '筛选', action: () => console.log('Filter') }
      ]
    }
  ];

  // Right-click and hold for radial menu
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      e.preventDefault();
      setRadialMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div 
      className={`w-screen h-screen bg-[var(--app-bg)] text-[var(--app-text)] overflow-hidden relative ${themeClass}`}
    >
      {/* Main Canvas */}
      <div
        className="absolute inset-0"
        onMouseDown={handleCanvasMouseDown}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="w-full h-full bg-gradient-to-br from-[var(--app-bg-deep)] to-[var(--app-bg)] relative">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(var(--app-grid) 1px, transparent 1px),
                linear-gradient(90deg, var(--app-grid) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />
          
          {/* Canvas indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-3">
              <Zap className="w-12 h-12 text-[var(--app-accent)] mx-auto opacity-15" />
              <div className="text-[var(--app-text-ghost)] text-sm select-none">工程画布</div>
              <div className="text-xs text-[var(--app-text-faint)] select-none">右键按住呼出菜单</div>
            </div>
          </div>
        </div>
      </div>

      {/* Four Dockable Panels */}
      <DockablePanel attachmentSide="left" subPanels={leftSubPanels} radialMenuActive={!!radialMenu} />
      <DockablePanel attachmentSide="right" subPanels={rightSubPanels} radialMenuActive={!!radialMenu} />
      <DockablePanel attachmentSide="top" subPanels={topSubPanels} radialMenuActive={!!radialMenu} />
      <DockablePanel attachmentSide="bottom" subPanels={bottomSubPanels} radialMenuActive={!!radialMenu} />

      {/* Global Controls */}
      <GlobalControls onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />

      {import.meta.env.DEV ? <DevADMockLauncher /> : null}

      {/* Radial Menu */}
      <AnimatePresence>
        {radialMenu && (
          <RadialMenu
            position={radialMenu}
            rings={radialMenuRings}
            onClose={() => setRadialMenu(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
