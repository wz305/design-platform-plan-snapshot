/**
 * CAD 示例任务集
 * 
 * 用于验证 Phase 3.1 的完整数据流：
 * Task → TaskRuntime → VirtualCadDriver → VirtualCADModel
 * 
 * 包含：
 * - 正常执行流程
 * - 错误中断机制
 * - 查询操作验证
 * - 复杂场景测试
 */

import type { Task } from '../../shared/task';

/**
 * 基础 CAD 任务 - 创建几条走线
 * 
 * 验证最基本的对象创建流程
 */
export const basicCadTask: Task = {
  id: 'basic-cad-task',
  steps: [
    {
      id: 'create-track-1',
      op: 'CreateTrack',
      args: {
        net: 'GND',
        layer: 'Top',
        from: { x: 10, y: 20 },
        to: { x: 50, y: 20 }
      }
    },
    {
      id: 'create-track-2',
      op: 'CreateTrack',
      args: {
        net: 'VCC',
        layer: 'Bottom',
        from: { x: 15, y: 30 },
        to: { x: 45, y: 30 }
      }
    },
    {
      id: 'create-via-1',
      op: 'CreateVia',
      args: {
        net: 'GND',
        position: { x: 30, y: 20 },
        fromLayer: 'Top',
        toLayer: 'Bottom'
      }
    },
    {
      id: 'create-track-3',
      op: 'CreateTrack',
      args: {
        net: 'GND',
        layer: 'Bottom',
        from: { x: 30, y: 20 },
        to: { x: 30, y: 50 }
      }
    }
  ]
};

/**
 * 包含修改操作的 CAD 任务
 * 
 * 验证对象修改和删除功能
 */
export const modifyCadTask: Task = {
  id: 'modify-cad-task',
  steps: [
    {
      id: 'create-track-to-modify',
      op: 'CreateTrack',
      args: {
        net: 'DATA',
        layer: 'Top',
        from: { x: 10, y: 10 },
        to: { x: 40, y: 10 }
      }
    },
    {
      id: 'modify-track-position',
      op: 'ModifyTrack',
      args: {
        // 注意：这个 ID 会在运行时被替换为实际创建的对象 ID
        id: 'placeholder_id',
        to: { x: 60, y: 10 }
      }
    },
    {
      id: 'create-another-track',
      op: 'CreateTrack',
      args: {
        net: 'CLOCK',
        layer: 'Top',
        from: { x: 10, y: 20 },
        to: { x: 40, y: 20 }
      }
    },
    {
      id: 'delete-track',
      op: 'DeleteObject',
      args: {
        // 注意：这个 ID 会在运行时被替换
        id: 'placeholder_id'
      }
    }
  ]
};

/**
 * 包含失败的任务 - 测试错误处理
 * 
 * 验证：
 * - 错误中断机制
 * - TaskRuntime 错误状态
 * - 部分执行的模型状态
 */
export const failingCadTask: Task = {
  id: 'failing-cad-task',
  steps: [
    {
      id: 'create-track-before-fail',
      op: 'CreateTrack',
      args: {
        net: 'NET1',
        layer: 'Top',
        from: { x: 5, y: 5 },
        to: { x: 25, y: 5 }
      }
    },
    {
      id: 'intentional-fail',
      op: 'Fail',
      args: {
        reason: '测试错误中断机制'
      }
    },
    {
      id: 'this-step-should-not-execute',
      op: 'CreateTrack',
      args: {
        net: 'NET2',
        layer: 'Bottom',
        from: { x: 10, y: 10 },
        to: { x: 30, y: 10 }
      }
    }
  ]
};

/**
 * 查询操作任务 - 验证数据检索
 * 
 * 验证：
 * - 按网络查询
 * - 按层查询
 * - 查询结果格式
 */
export const queryCadTask: Task = {
  id: 'query-cad-task',
  steps: [
    {
      id: 'setup-create-tracks',
      op: 'CreateTrack',
      args: {
        net: 'GND',
        layer: 'Top',
        from: { x: 0, y: 0 },
        to: { x: 100, y: 0 }
      }
    },
    {
      id: 'setup-create-more-tracks',
      op: 'CreateTrack',
      args: {
        net: 'GND',
        layer: 'Bottom',
        from: { x: 0, y: 50 },
        to: { x: 100, y: 50 }
      }
    },
    {
      id: 'setup-create-vcc-track',
      op: 'CreateTrack',
      args: {
        net: 'VCC',
        layer: 'Top',
        from: { x: 0, y: 25 },
        to: { x: 100, y: 25 }
      }
    },
    {
      id: 'query-gnd-net',
      op: 'GetObjectsByNet',
      args: {
        net: 'GND',
        type: 'Track'
      }
    },
    {
      id: 'query-top-layer',
      op: 'GetObjectsByLayer',
      args: {
        layer: 'Top'
      }
    },
    {
      id: 'query-bottom-layer-tracks',
      op: 'GetObjectsByLayer',
      args: {
        layer: 'Bottom',
        type: 'Track'
      }
    }
  ]
};

/**
 * 复杂场景任务 - 模拟真实 PCB 操作
 * 
 * 验证：
 * - 多种对象类型
 * - 复杂的层间连接
 * - 批量操作
 */
export const complexCadTask: Task = {
  id: 'complex-cad-task',
  steps: [
    // 顶层走线
    {
      id: 'top-layer-track-1',
      op: 'CreateTrack',
      args: {
        net: 'CPU_DATA0',
        layer: 'Top',
        from: { x: 20, y: 30 },
        to: { x: 80, y: 30 }
      }
    },
    {
      id: 'top-layer-track-2',
      op: 'CreateTrack',
      args: {
        net: 'CPU_DATA0',
        layer: 'Top',
        from: { x: 80, y: 30 },
        to: { x: 80, y: 60 }
      }
    },
    // 层间连接
    {
      id: 'via-to-inner',
      op: 'CreateVia',
      args: {
        net: 'CPU_DATA0',
        position: { x: 80, y: 60 },
        fromLayer: 'Top',
        toLayer: 'Inner1'
      }
    },
    // 内层走线
    {
      id: 'inner-layer-track',
      op: 'CreateTrack',
      args: {
        net: 'CPU_DATA0',
        layer: 'Inner1',
        from: { x: 80, y: 60 },
        to: { x: 20, y: 60 }
      }
    },
    // 底层连接
    {
      id: 'via-to-bottom',
      op: 'CreateVia',
      args: {
        net: 'CPU_DATA0',
        position: { x: 20, y: 60 },
        fromLayer: 'Inner1',
        toLayer: 'Bottom'
      }
    },
    {
      id: 'bottom-layer-track',
      op: 'CreateTrack',
      args: {
        net: 'CPU_DATA0',
        layer: 'Bottom',
        from: { x: 20, y: 60 },
        to: { x: 20, y: 90 }
      }
    },
    // 添加一些干扰网络
    {
      id: 'power-track-1',
      op: 'CreateTrack',
      args: {
        net: 'VCC_3V3',
        layer: 'Top',
        from: { x: 10, y: 10 },
        to: { x: 90, y: 10 }
      }
    },
    {
      id: 'ground-track-1',
      op: 'CreateTrack',
      args: {
        net: 'GND',
        layer: 'Bottom',
        from: { x: 10, y: 90 },
        to: { x: 90, y: 90 }
      }
    },
    // 最终查询验证
    {
      id: 'query-complex-result',
      op: 'GetObjectsByNet',
      args: {
        net: 'CPU_DATA0'
      }
    },
    {
      id: 'query-all-top-objects',
      op: 'GetObjectsByLayer',
      args: {
        layer: 'Top'
      }
    }
  ]
};

/**
 * 所有 CAD 示例任务的映射
 * 
 * 方便在 UI 中选择和执行
 */
export const cadTaskExamples = {
  basic: basicCadTask,
  modify: modifyCadTask,
  failing: failingCadTask,
  query: queryCadTask,
  complex: complexCadTask
} as const;

/**
 * 任务描述映射
 * 用于 UI 显示
 */
export const cadTaskDescriptions = {
  basic: '基础 CAD 操作 - 创建走线和过孔',
  modify: '修改操作 - 修改和删除对象',
  failing: '错误处理 - 测试中断机制',
  query: '查询操作 - 按网络和层查询',
  complex: '复杂场景 - 多层 PCB 走线'
} as const;
