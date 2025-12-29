/**
 * Virtual CAD Model - 虚拟 CAD 模型
 * 
 * 职责：
 * - 承载"被操作的对象"
 * - 成为检测与可视化的唯一数据源
 * - 维护对象集合和层信息
 * - 提供稳定的 ID 和引用机制
 * 
 * 设计原则：
 * - 对象集合驱动，无几何计算
 * - 语义正确，不追求精度
 * - 状态可预测、可复现
 */

import type { 
  VirtualTrack, 
  VirtualVia, 
  VirtualComponent, 
  VirtualCadObject,
  VirtualModelSnapshot,
  ModelChangeEvent
} from './types';
import type { LayerId } from '../dsl/cadInstructions';

/**
 * Virtual CAD Model 核心实现
 */
export class VirtualCADModel {
  // 对象存储 - 使用 Map 保证 ID 稳定性和 O(1) 查找
  private tracks = new Map<string, VirtualTrack>();
  private vias = new Map<string, VirtualVia>();
  private components = new Map<string, VirtualComponent>();

  // 模型版本控制
  private version = 0;
  private lastUpdated = new Date().toISOString();

  // 变更监听器（为 UI 同步准备）
  private changeListeners: Set<(event: ModelChangeEvent) => void> = new Set();

  /**
   * 生成唯一对象 ID
   * 
   * 格式：{type}{timestamp}{random}
   * 示例：track_1703041234567_abc123
   */
  private generateId(type: 'track' | 'via' | 'component'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${type}_${timestamp}_${random}`;
  }

  /**
   * 获取当前时间戳
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * 触发模型变更事件
   */
  private emitChange(event: ModelChangeEvent): void {
    this.version++;
    this.lastUpdated = this.getTimestamp();
    
    // 通知所有监听器
    this.changeListeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('[VirtualCADModel] 变更监听器异常:', error);
      }
    });
  }

  /**
   * 创建走线
   */
  createTrack(
    net: string, 
    layer: LayerId, 
    from: { x: number; y: number }, 
    to: { x: number; y: number }
  ): string {
    const timestamp = this.getTimestamp();
    const track: VirtualTrack = {
      id: this.generateId('track'),
      type: 'Track',
      net,
      layer,
      from: { ...from },
      to: { ...to },
      createdAt: timestamp,
      modifiedAt: timestamp
    };

    this.tracks.set(track.id, track);
    
    this.emitChange({
      type: 'create',
      objectType: 'Track',
      objectId: track.id,
      after: track,
      timestamp
    });

    console.log(`[VirtualCADModel] 已创建走线: ${track.id} (${net}, ${layer})`);
    return track.id;
  }

  /**
   * 创建过孔
   */
  createVia(
    net: string,
    position: { x: number; y: number },
    fromLayer: LayerId,
    toLayer: LayerId
  ): string {
    const timestamp = this.getTimestamp();
    const via: VirtualVia = {
      id: this.generateId('via'),
      type: 'Via',
      net,
      position: { ...position },
      fromLayer,
      toLayer,
      createdAt: timestamp,
      modifiedAt: timestamp
    };

    this.vias.set(via.id, via);
    
    this.emitChange({
      type: 'create',
      objectType: 'Via',
      objectId: via.id,
      after: via,
      timestamp
    });

    console.log(`[VirtualCADModel] 已创建过孔: ${via.id} (${net}, ${fromLayer}->${toLayer})`);
    return via.id;
  }

  /**
   * 创建元件
   */
  createComponent(
    name: string,
    position: { x: number; y: number },
    layer: LayerId
  ): string {
    const timestamp = this.getTimestamp();
    const component: VirtualComponent = {
      id: this.generateId('component'),
      type: 'Component',
      name,
      position: { ...position },
      layer,
      createdAt: timestamp,
      modifiedAt: timestamp
    };

    this.components.set(component.id, component);
    
    this.emitChange({
      type: 'create',
      objectType: 'Component',
      objectId: component.id,
      after: component,
      timestamp
    });

    console.log(`[VirtualCADModel] 已创建元件: ${component.id} (${name})`);
    return component.id;
  }

  /**
   * 删除对象（通用）
   */
  deleteObject(id: string): boolean {
    // 尝试从各个集合中删除
    let deleted: VirtualCadObject | undefined;
    let objectType: 'Track' | 'Via' | 'Component' | undefined;

    if (this.tracks.has(id)) {
      deleted = this.tracks.get(id)!;
      this.tracks.delete(id);
      objectType = 'Track';
    } else if (this.vias.has(id)) {
      deleted = this.vias.get(id)!;
      this.vias.delete(id);
      objectType = 'Via';
    } else if (this.components.has(id)) {
      deleted = this.components.get(id)!;
      this.components.delete(id);
      objectType = 'Component';
    }

    if (deleted && objectType) {
      this.emitChange({
        type: 'delete',
        objectType,
        objectId: id,
        before: deleted,
        timestamp: this.getTimestamp()
      });

      console.log(`[VirtualCADModel] 已删除 ${objectType}: ${id}`);
      return true;
    }

    console.log(`[VirtualCADModel] 未找到要删除的对象: ${id}`);
    return false;
  }

  /**
   * 修改走线
   */
  modifyTrack(
    id: string, 
    from?: { x: number; y: number }, 
    to?: { x: number; y: number }
  ): boolean {
    const track = this.tracks.get(id);
    if (!track) {
      console.log(`[VirtualCADModel] 未找到要修改的走线: ${id}`);
      return false;
    }

    const before = { ...track };
    const timestamp = this.getTimestamp();

    // 更新字段
    if (from) {
      track.from = { ...from };
    }
    if (to) {
      track.to = { ...to };
    }
    track.modifiedAt = timestamp;

    this.emitChange({
      type: 'update',
      objectType: 'Track',
      objectId: id,
      before,
      after: { ...track },
      timestamp
    });

    console.log(`[VirtualCADModel] 已修改走线: ${id}`);
    return true;
  }

  /**
   * 获取对象（通用）
   */
  getObject(id: string): VirtualCadObject | undefined {
    return this.tracks.get(id) || 
           this.vias.get(id) || 
           this.components.get(id);
  }

  /**
   * 按网络查询对象
   */
  getObjectsByNet(net: string, type?: 'Track' | 'Via' | 'Component'): VirtualCadObject[] {
    const results: VirtualCadObject[] = [];

    if (!type || type === 'Track') {
      this.tracks.forEach(track => {
        if (track.net === net) results.push(track);
      });
    }

    if (!type || type === 'Via') {
      this.vias.forEach(via => {
        if (via.net === net) results.push(via);
      });
    }

    if (!type || type === 'Component') {
      this.components.forEach(() => {
        // 假设元件可能属于某个网络，Phase 3 暂不实现
      });
    }

    return results;
  }

  /**
   * 按层查询对象
   */
  getObjectsByLayer(layer: LayerId, type?: 'Track' | 'Via' | 'Component'): VirtualCadObject[] {
    const results: VirtualCadObject[] = [];

    if (!type || type === 'Track') {
      this.tracks.forEach(track => {
        if (track.layer === layer) results.push(track);
      });
    }

    if (!type || type === 'Via') {
      this.vias.forEach(via => {
        if (via.fromLayer === layer || via.toLayer === layer) results.push(via);
      });
    }

    if (!type || type === 'Component') {
      this.components.forEach(component => {
        if (component.layer === layer) results.push(component);
      });
    }

    return results;
  }

  /**
   * 获取模型快照（只读）
   */
  getSnapshot(): VirtualModelSnapshot {
    return {
      tracks: new Map(this.tracks),
      vias: new Map(this.vias),
      components: new Map(this.components),
      version: this.version,
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * 获取统计信息
   */
  getStats(): {
    tracks: number;
    vias: number;
    components: number;
    total: number;
    version: number;
  } {
    return {
      tracks: this.tracks.size,
      vias: this.vias.size,
      components: this.components.size,
      total: this.tracks.size + this.vias.size + this.components.size,
      version: this.version
    };
  }

  /**
   * 清空模型（测试用）
   */
  clear(): void {
    const timestamp = this.getTimestamp();
    
    // 记录所有被删除的对象
    const allObjects: VirtualCadObject[] = [];
    this.tracks.forEach(track => allObjects.push(track));
    this.vias.forEach(via => allObjects.push(via));
    this.components.forEach(component => allObjects.push(component));

    // 清空所有集合
    this.tracks.clear();
    this.vias.clear();
    this.components.clear();

    // 批量触发删除事件
    allObjects.forEach(obj => {
      this.emitChange({
        type: 'delete',
        objectType: obj.type,
        objectId: obj.id,
        before: obj,
        timestamp
      });
    });

    console.log('[VirtualCADModel] 模型已清空');
  }

  /**
   * 监听模型变更
   */
  onChange(listener: (event: ModelChangeEvent) => void): () => void {
    this.changeListeners.add(listener);
    
    // 返回取消监听的函数
    return () => {
      this.changeListeners.delete(listener);
    };
  }

  /**
   * 几何计算辅助：计算点到线段的最小距离
   */
  private pointToLineDistance(
    point: { x: number; y: number },
    lineStart: { x: number; y: number },
    lineEnd: { x: number; y: number }
  ): number {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) param = dot / lenSq;
    
    let xx, yy;
    
    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }
    
    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 几何计算辅助：计算两条线段之间的最小距离
   */
  private lineToLineDistance(
    line1Start: { x: number; y: number },
    line1End: { x: number; y: number },
    line2Start: { x: number; y: number },
    line2End: { x: number; y: number }
  ): number {
    // 计算四个端点到对方线段的距离，取最小值
    const dist1 = this.pointToLineDistance(line1Start, line2Start, line2End);
    const dist2 = this.pointToLineDistance(line1End, line2Start, line2End);
    const dist3 = this.pointToLineDistance(line2Start, line1Start, line1End);
    const dist4 = this.pointToLineDistance(line2End, line1Start, line1End);
    
    return Math.min(dist1, dist2, dist3, dist4);
  }

  /**
   * 几何计算辅助：计算两个点之间的距离
   */
  private pointDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 计算走线与走线之间的最小间距
   */
  calculateTrackClearance(track1: VirtualTrack, track2: VirtualTrack): number {
    // 不同层不需要检查间距
    if (track1.layer !== track2.layer) {
      return Infinity;
    }
    
    // 同网络不需要检查间距
    if (track1.net === track2.net) {
      return Infinity;
    }
    
    return this.lineToLineDistance(track1.from, track1.to, track2.from, track2.to);
  }

  /**
   * 计算走线与过孔之间的最小间距
   */
  calculateTrackViaClearance(track: VirtualTrack, via: VirtualVia): number {
    // 不同层不需要检查间距
    if (track.layer !== via.fromLayer && track.layer !== via.toLayer) {
      return Infinity;
    }
    
    // 同网络不需要检查间距
    if (track.net === via.net) {
      return Infinity;
    }
    
    // 计算过孔中心点到走线的最小距离
    return this.pointToLineDistance(via.position, track.from, track.to);
  }

  /**
   * 计算过孔与过孔之间的最小间距
   */
  calculateViaClearance(via1: VirtualVia, via2: VirtualVia): number {
    // 如果两个过孔不在同一层，不需要检查间距
    const via1Layers = [via1.fromLayer, via1.toLayer];
    const via2Layers = [via2.fromLayer, via2.toLayer];
    const hasCommonLayer = via1Layers.some(layer => via2Layers.includes(layer));
    
    if (!hasCommonLayer) {
      return Infinity;
    }
    
    // 同网络不需要检查间距
    if (via1.net === via2.net) {
      return Infinity;
    }
    
    // 计算两个过孔中心点的距离
    return this.pointDistance(via1.position, via2.position);
  }

  /**
   * 获取所有走线
   */
  getAllTracks(): VirtualTrack[] {
    return Array.from(this.tracks.values());
  }

  /**
   * 获取所有过孔
   */
  getAllVias(): VirtualVia[] {
    return Array.from(this.vias.values());
  }

  /**
   * 调试：打印当前模型状态
   */
  debug(): void {
    console.group('[VirtualCADModel] 当前状态');
    console.log('版本:', this.version);
    console.log('最后更新时间:', this.lastUpdated);
    console.log('统计信息:', this.getStats());
    
    console.group('走线');
    this.tracks.forEach((track, id) => {
      console.log(`${id}: ${track.net} (${track.layer}) ${JSON.stringify(track.from)} -> ${JSON.stringify(track.to)}`);
    });
    console.groupEnd();
    
    console.group('过孔');
    this.vias.forEach((via, id) => {
      console.log(`${id}: ${via.net} ${JSON.stringify(via.position)} (${via.fromLayer}->${via.toLayer})`);
    });
    console.groupEnd();
    
    console.group('元件');
    this.components.forEach((component, id) => {
      console.log(`${id}: ${component.name} ${JSON.stringify(component.position)} (${component.layer})`);
    });
    console.groupEnd();
    
    console.groupEnd();
  }
}
