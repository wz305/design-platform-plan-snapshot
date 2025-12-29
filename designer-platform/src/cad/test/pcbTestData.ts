/**
 * PCB 测试数据生成器
 * 
 * 目标：创建包含各种DRC违规的简单PCB测试用例
 * 
 * 包含的测试场景：
 * 1. 间距违规（走线之间距离过近）
 * 2. 线宽违规（走线过宽或过窄）
 * 3. 过孔违规（过孔位置不当）
 * 4. 网络连通性测试
 */

import type { Task } from '../../shared/task';

/**
 * 创建简单的PCB检查测试任务
 * 
 * 这个任务创建一个简单的2层PCB，包含：
 * - 板框轮廓
 * - 电源和地线走线（故意间距过近）
 * - 信号线
 * - 过孔
 * - 几个元件
 */
export function createSimplePCB(): Task {
  return {
    id: 'simple-pcb-check',
    steps: [
      // 1. 创建板框轮廓
      {
        id: 'create-board-outline',
        op: 'CreateTrack',
        args: {
          net: 'BOARD',
          layer: 'Top',
          from: { x: 0, y: 0 },
          to: { x: 100, y: 0 }
        }
      },
      {
        id: 'create-board-outline-2',
        op: 'CreateTrack',
        args: {
          net: 'BOARD',
          layer: 'Top',
          from: { x: 100, y: 0 },
          to: { x: 100, y: 80 }
        }
      },
      {
        id: 'create-board-outline-3',
        op: 'CreateTrack',
        args: {
          net: 'BOARD',
          layer: 'Top',
          from: { x: 100, y: 80 },
          to: { x: 0, y: 80 }
        }
      },
      {
        id: 'create-board-outline-4',
        op: 'CreateTrack',
        args: {
          net: 'BOARD',
          layer: 'Top',
          from: { x: 0, y: 80 },
          to: { x: 0, y: 0 }
        }
      },

      // 2. 创建电源走线（VCC）
      {
        id: 'vcc-trace-main',
        op: 'CreateTrack',
        args: {
          net: 'VCC',
          layer: 'Top',
          from: { x: 10, y: 10 },
          to: { x: 90, y: 10 }
        }
      },

      // 3. 创建地线走线（故意与电源线间距过近 - 只有0.15mm）
      {
        id: 'gnd-trace-close',
        op: 'CreateTrack',
        args: {
          net: 'GND',
          layer: 'Top',
          from: { x: 10, y: 10.15 }, // 仅0.15mm间距，违规！
          to: { x: 90, y: 10.15 }
        }
      },

      // 4. 创建正常间距的信号线
      {
        id: 'signal-trace-1',
        op: 'CreateTrack',
        args: {
          net: 'DATA0',
          layer: 'Top',
          from: { x: 10, y: 20 },
          to: { x: 90, y: 20 }
        }
      },
      {
        id: 'signal-trace-2',
        op: 'CreateTrack',
        args: {
          net: 'DATA1',
          layer: 'Top',
          from: { x: 10, y: 25 }, // 正常5mm间距
          to: { x: 90, y: 25 }
        }
      },

      // 5. 创建过细的走线（线宽违规）
      {
        id: 'thin-trace',
        op: 'CreateTrack',
        args: {
          net: 'CLK',
          layer: 'Top',
          from: { x: 10, y: 35 },
          to: { x: 90, y: 35 }
          // 注意：当前模型不支持线宽参数，这里先创建走线
          // 后续扩展时会添加width参数
        }
      },

      // 6. 创建过宽的走线（另一个线宽违规）
      {
        id: 'wide-trace',
        op: 'CreateTrack',
        args: {
          net: 'RESET',
          layer: 'Top',
          from: { x: 10, y: 45 },
          to: { x: 90, y: 45 }
          // 注意：当前模型不支持线宽参数
          // 后续扩展时会添加width参数
        }
      },

      // 7. 创建一些过孔
      {
        id: 'via-1',
        op: 'CreateVia',
        args: { 
          net: 'VCC',
          position: { x: 50, y: 10 },
          fromLayer: 'Top',
          toLayer: 'Bottom'
        }
      },
      {
        id: 'via-2',
        op: 'CreateVia',
        args: { 
          net: 'GND',
          position: { x: 50, y: 10.15 }, // 与VCC过孔间距过近，违规！
          fromLayer: 'Top',
          toLayer: 'Bottom'
        }
      },
      {
        id: 'via-3',
        op: 'CreateVia',
        args: { 
          net: 'DATA0',
          position: { x: 30, y: 20 },
          fromLayer: 'Top',
          toLayer: 'Bottom'
        }
      },

      // 8. 创建一些元件
      {
        id: 'component-1',
        op: 'CreateTrack', // 注意：当前没有CreateComponent指令，先用CreateTrack代替
        args: {
          net: 'U1',
          layer: 'Top',
          from: { x: 20, y: 60 },
          to: { x: 30, y: 60 }
        }
      },
      {
        id: 'component-2',
        op: 'CreateTrack',
        args: {
          net: 'U2',
          layer: 'Top',
          from: { x: 60, y: 60 },
          to: { x: 70, y: 60 }
        }
      },

      // 9. 查询操作（验证模型状态）
      {
        id: 'query-all-tracks',
        op: 'GetObjectsByLayer',
        args: {
          layer: 'Top',
          type: 'Track'
        }
      },
      {
        id: 'query-vcc-net',
        op: 'GetObjectsByNet',
        args: {
          net: 'VCC'
        }
      },
      {
        id: 'query-gnd-net',
        op: 'GetObjectsByNet',
        args: {
          net: 'GND'
        }
      },

      // 10. 运行间距检查（新增DRC功能）
      {
        id: 'check-clearance',
        op: 'CheckClearance',
        args: { 
          minClearance: 0.3, // 最小间距0.3mm
          netFilter: ['VCC', 'GND'], // 只检查电源和地线
          layerFilter: ['Top'] // 只检查顶层
        }
      },

      // 11. 运行线宽检查（预留功能）
      {
        id: 'check-trace-width',
        op: 'CheckTraceWidth',
        args: { 
          minWidth: 0.1, 
          maxWidth: 0.5,
          netFilter: ['VCC', 'GND']
        }
      },

      // 12. 故意失败测试（可选）
      // {
      //   id: 'test-failure',
      //   op: 'Fail',
      //   args: {
      //     reason: '测试错误处理机制'
      //   }
      // }
    ]
  };
}

/**
 * 创建更复杂的PCB测试用例（用于后续测试）
 */
export function createComplexPCB(): Task {
  return {
    id: 'complex-pcb-check',
    steps: [
      // 顶层走线
      {
        id: 'top-layer-trace-1',
        op: 'CreateTrack',
        args: {
          net: 'VCC_3V3',
          layer: 'Top',
          from: { x: 5, y: 5 },
          to: { x: 95, y: 5 }
        }
      },
      {
        id: 'top-layer-trace-2',
        op: 'CreateTrack',
        args: {
          net: 'GND',
          layer: 'Top',
          from: { x: 5, y: 5.1 }, // 间距违规
          to: { x: 95, y: 5.1 }
        }
      },

      // 底层走线（通过过孔连接）
      {
        id: 'bottom-layer-trace-1',
        op: 'CreateTrack',
        args: {
          net: 'VCC_3V3',
          layer: 'Bottom',
          from: { x: 10, y: 50 },
          to: { x: 90, y: 50 }
        }
      },

      // 连接过孔
      {
        id: 'via-top-bottom-1',
        op: 'CreateVia',
        args: { 
          net: 'VCC_3V3',
          position: { x: 10, y: 5 },
          fromLayer: 'Top',
          toLayer: 'Bottom'
        }
      },
      {
        id: 'via-top-bottom-2',
        op: 'CreateVia',
        args: { 
          net: 'VCC_3V3',
          position: { x: 10, y: 50 },
          fromLayer: 'Bottom',
          toLayer: 'Top'
        }
      },

      // 内层走线
      {
        id: 'inner-layer-trace-1',
        op: 'CreateTrack',
        args: {
          net: 'DATA_BUS',
          layer: 'Inner1',
          from: { x: 20, y: 30 },
          to: { x: 80, y: 30 }
        }
      },
      {
        id: 'inner-layer-trace-2',
        op: 'CreateTrack',
        args: {
          net: 'ADDR_BUS',
          layer: 'Inner2',
          from: { x: 20, y: 40 },
          to: { x: 80, y: 40 }
        }
      },

      // 查询各层对象
      {
        id: 'query-top-layer',
        op: 'GetObjectsByLayer',
        args: {
          layer: 'Top'
        }
      },
      {
        id: 'query-bottom-layer',
        op: 'GetObjectsByLayer',
        args: {
          layer: 'Bottom'
        }
      },
      {
        id: 'query-inner1-layer',
        op: 'GetObjectsByLayer',
        args: {
          layer: 'Inner1'
        }
      }
    ]
  };
}

/**
 * PCB测试用例描述
 */
export const pcbTestDescriptions = {
  'simple-pcb-check': '简单PCB检查 - 包含间距违规、线宽违规等基础DRC测试',
  'complex-pcb-check': '复杂PCB检查 - 多层板、过孔、网络连接等高级DRC测试'
};

/**
 * 所有PCB测试任务
 */
export const pcbTestExamples = {
  'simple-pcb-check': createSimplePCB(),
  'complex-pcb-check': createComplexPCB()
};
