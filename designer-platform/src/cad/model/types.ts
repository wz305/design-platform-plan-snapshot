/**
 * Virtual CAD Model 对象类型定义
 * 
 * 设计原则：
 * - 只保存"足以被画出来的信息"
 * - 不保存"为了画得像而存在的信息"
 * - 傻、直、可控
 */

import type { LayerId } from '../dsl/cadInstructions';

/**
 * 虚拟走线对象
 * 
 * 最小实现：只支持直线，不追求真实几何精度
 */
export interface VirtualTrack {
  /** 对象唯一标识 */
  id: string;
  /** 对象类型 */
  type: 'Track';
  /** 所属网络 */
  net: string;
  /** 所属层 */
  layer: LayerId;
  /** 起点坐标 */
  from: { x: number; y: number };
  /** 终点坐标 */
  to: { x: number; y: number };
  /** 创建时间戳 */
  createdAt: string;
  /** 最后修改时间戳 */
  modifiedAt: string;
}

/**
 * 虚拟过孔对象
 * 
 * 最小实现：只关心位置和层连接
 */
export interface VirtualVia {
  /** 对象唯一标识 */
  id: string;
  /** 对象类型 */
  type: 'Via';
  /** 所属网络 */
  net: string;
  /** 过孔位置 */
  position: { x: number; y: number };
  /** 起始层 */
  fromLayer: LayerId;
  /** 目标层 */
  toLayer: LayerId;
  /** 创建时间戳 */
  createdAt: string;
  /** 最后修改时间戳 */
  modifiedAt: string;
}

/**
 * 虚拟元件对象
 * 
 * Phase 3 最小实现：只占位，不涉及引脚等复杂结构
 */
export interface VirtualComponent {
  /** 对象唯一标识 */
  id: string;
  /** 对象类型 */
  type: 'Component';
  /** 元件名称 */
  name: string;
  /** 元件位置 */
  position: { x: number; y: number };
  /** 所属层 */
  layer: LayerId;
  /** 创建时间戳 */
  createdAt: string;
  /** 最后修改时间戳 */
  modifiedAt: string;
}

/**
 * 所有虚拟 CAD 对象的联合类型
 */
export type VirtualCadObject = VirtualTrack | VirtualVia | VirtualComponent;

/**
 * 虚拟 CAD 模型的只读快照
 * 
 * 用于 UI 渲染和检测，不提供修改能力
 */
export interface VirtualModelSnapshot {
  /** 所有走线 */
  tracks: Map<string, VirtualTrack>;
  /** 所有过孔 */
  vias: Map<string, VirtualVia>;
  /** 所有元件 */
  components: Map<string, VirtualComponent>;
  /** 模型版本号（用于变更检测） */
  version: number;
  /** 最后更新时间戳 */
  lastUpdated: string;
}

/**
 * 模型查询选项
 */
export interface QueryOptions {
  /** 网络过滤 */
  net?: string;
  /** 层过滤 */
  layer?: LayerId;
  /** 对象类型过滤 */
  type?: 'Track' | 'Via' | 'Component';
}

/**
 * 模型变更事件
 */
export interface ModelChangeEvent {
  /** 变更类型 */
  type: 'create' | 'update' | 'delete';
  /** 变更的对象类型 */
  objectType: 'Track' | 'Via' | 'Component';
  /** 变更的对象 ID */
  objectId: string;
  /** 变更前的对象（删除时存在） */
  before?: VirtualCadObject;
  /** 变更后的对象（创建/更新时存在） */
  after?: VirtualCadObject;
  /** 变更时间戳 */
  timestamp: string;
}
