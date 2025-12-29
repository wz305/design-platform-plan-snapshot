/**
 * CAD 指令 DSL v0.1
 * 
 * 设计原则：
 * - 行为层 DSL，不是 CAD API 映射
 * - 字符串 op，unknown args（不在 TS 层强校验）
 * - 可序列化、可记录、可回放
 * - 为虚拟 CAD 环境设计，不假设真实 CAD 语义
 */

/**
 * 支持的层类型（Phase 3 最小集合）
 */
export type LayerId = 'Top' | 'Bottom' | 'Inner1' | 'Inner2' | 'Inner3' | 'Inner4';

/**
 * CAD 对象的基础类型
 */
export type CadObjectType = 'Track' | 'Via' | 'Component';

/**
 * CreateTrack - 创建走线
 * 
 * 最小实现：只支持直线（两个点）
 * 不追求真实几何精度，只追求语义正确
 */
export type CreateTrackOp = {
  op: 'CreateTrack';
  args: {
    /** 走线网络名 */
    net: string;
    /** 所属层 */
    layer: LayerId;
    /** 起点坐标 */
    from: { x: number; y: number };
    /** 终点坐标 */
    to: { x: number; y: number };
  };
};

/**
 * DeleteObject - 删除对象
 * 
 * 通用的删除操作，支持所有对象类型
 */
export type DeleteObjectOp = {
  op: 'DeleteObject';
  args: {
    /** 要删除的对象 ID */
    id: string;
  };
};

/**
 * ModifyTrack - 修改走线
 * 
 * 只支持修改位置，不修改网络/层（保持对象稳定性）
 */
export type ModifyTrackOp = {
  op: 'ModifyTrack';
  args: {
    /** 要修改的走线 ID */
    id: string;
    /** 新的起点坐标（可选） */
    from?: { x: number; y: number };
    /** 新的终点坐标（可选） */
    to?: { x: number; y: number };
  };
};

/**
 * CreateVia - 创建过孔
 * 
 * 最小实现：只关心位置和连接的层
 */
export type CreateViaOp = {
  op: 'CreateVia';
  args: {
    /** 过孔网络名 */
    net: string;
    /** 过孔位置 */
    position: { x: number; y: number };
    /** 起始层 */
    fromLayer: LayerId;
    /** 目标层 */
    toLayer: LayerId;
  };
};

/**
 * Fail - 故意失败（测试用）
 * 
 * 用于测试错误处理和中断机制
 */
export type FailOp = {
  op: 'Fail';
  args?: {
    /** 失败原因描述 */
    reason?: string;
  };
};

/**
 * GetObjectsByNet - 按网络查询对象（为检测准备）
 * 
 * 查询操作，不修改模型
 */
export type GetObjectsByNetOp = {
  op: 'GetObjectsByNet';
  args: {
    /** 网络名 */
    net: string;
    /** 对象类型过滤（可选） */
    type?: CadObjectType;
  };
};

/**
 * GetObjectsByLayer - 按层查询对象（为检测准备）
 */
export type GetObjectsByLayerOp = {
  op: 'GetObjectsByLayer';
  args: {
    /** 层 ID */
    layer: LayerId;
    /** 对象类型过滤（可选） */
    type?: CadObjectType;
  };
};

/**
 * CheckClearance - 间距检查
 * 
 * 检查走线和过孔之间的最小间距
 */
export type CheckClearanceOp = {
  op: 'CheckClearance';
  args: {
    /** 最小间距要求（mm） */
    minClearance: number;
    /** 检查的网络过滤（可选） */
    netFilter?: string[];
    /** 检查的层过滤（可选） */
    layerFilter?: LayerId[];
  };
};

/**
 * CheckTraceWidth - 线宽检查
 * 
 * 检查走线宽度是否符合要求（当前为预留接口）
 */
export type CheckTraceWidthOp = {
  op: 'CheckTraceWidth';
  args: {
    /** 最小线宽（mm） */
    minWidth: number;
    /** 最大线宽（mm） */
    maxWidth: number;
    /** 检查的网络过滤（可选） */
    netFilter?: string[];
  };
};

/**
 * CAD 指令联合类型
 * 
 * 这是 Phase 3 的完整指令集 v0.1 + PCB检查指令
 */
export type CadInstruction = 
  | CreateTrackOp
  | DeleteObjectOp
  | ModifyTrackOp
  | CreateViaOp
  | FailOp
  | GetObjectsByNetOp
  | GetObjectsByLayerOp
  | CheckClearanceOp      // 新增：间距检查
  | CheckTraceWidthOp;    // 新增：线宽检查

/**
 * 指令类型守卫工具函数
 * 
 * 用于运行时类型检查，避免 TS 类型断言
 */
export const CadInstructionGuards = {
  isCreateTrack: (instruction: any): instruction is CreateTrackOp => 
    instruction?.op === 'CreateTrack',
    
  isDeleteObject: (instruction: any): instruction is DeleteObjectOp => 
    instruction?.op === 'DeleteObject',
    
  isModifyTrack: (instruction: any): instruction is ModifyTrackOp => 
    instruction?.op === 'ModifyTrack',
    
  isCreateVia: (instruction: any): instruction is CreateViaOp => 
    instruction?.op === 'CreateVia',
    
  isFail: (instruction: any): instruction is FailOp => 
    instruction?.op === 'Fail',
    
  isGetObjectsByNet: (instruction: any): instruction is GetObjectsByNetOp => 
    instruction?.op === 'GetObjectsByNet',
    
  isGetObjectsByLayer: (instruction: any): instruction is GetObjectsByLayerOp => 
    instruction?.op === 'GetObjectsByLayer',
    
  isCheckClearance: (instruction: any): instruction is CheckClearanceOp => 
    instruction?.op === 'CheckClearance',
    
  isCheckTraceWidth: (instruction: any): instruction is CheckTraceWidthOp => 
    instruction?.op === 'CheckTraceWidth',
};

/**
 * 支持的指令列表（用于 Driver 能力声明）
 */
export const SUPPORTED_CAD_OPS = [
  'CreateTrack',
  'DeleteObject', 
  'ModifyTrack',
  'CreateVia',
  'Fail',
  'GetObjectsByNet',
  'GetObjectsByLayer',
  'CheckClearance',      // 新增：间距检查
  'CheckTraceWidth'      // 新增：线宽检查
] as const;

/**
 * 指令执行结果类型定义
 */
export interface CadExecutionResult {
  /** 是否成功 */
  success: boolean;
  /** 创建/修改的对象 ID（如适用） */
  objectId?: string;
  /** 查询结果（如适用） */
  data?: unknown;
  /** 错误信息（如失败） */
  error?: string;
  /** 执行时间戳 */
  timestamp: string;
}
