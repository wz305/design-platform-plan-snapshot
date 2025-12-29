/**
 * Virtual CAD Driver - 虚拟 CAD 执行器
 * 
 * 职责：
 * - 实现 Driver 接口
 * - 解析 DSL 指令
 * - 修改 Virtual CAD Model
 * - 返回执行结果 / 抛出错误
 * 
 * 特征：
 * - execute(op, args): Promise<unknown>
 * - 支持故意失败（用于测试）
 * - 行为可预测、可复现
 * - 不关心 UI，不关心 Runtime
 * 
 * 这是未来 AD / Cadence Driver 的"行为规范模板"
 */

import type { Driver } from '../../shared/driver';
import type { Step } from '../../shared/task';
import type { CadInstruction, CadExecutionResult } from '../dsl/cadInstructions';
import { VirtualCADModel } from '../model/VirtualCADModel';

/**
 * Virtual CAD Driver 实现
 * 
 * 将 CAD DSL 指令转换为对 Virtual CAD Model 的操作
 */
export class VirtualCadDriver implements Driver {
  private model: VirtualCADModel;
  private supportedOps: string[];

  constructor(model?: VirtualCADModel) {
    this.model = model || new VirtualCADModel();
    this.supportedOps = [
      'CreateTrack',
      'DeleteObject',
      'ModifyTrack', 
      'CreateVia',
      'Fail',
      'GetObjectsByNet',
      'GetObjectsByLayer',
      'CheckClearance',      // 新增：间距检查
      'CheckTraceWidth'      // 新增：线宽检查
    ];
  }

  /**
   * 返回 Driver 支持的指令列表
   */
  async listCapabilities(): Promise<string[]> {
    return [...this.supportedOps];
  }

  /**
   * 执行单个 Step
   * 
   * 这是 Driver 的核心方法，将 Step 转换为具体的 Model 操作
   */
  async execute(step: Step): Promise<unknown> {
    console.log(`[VirtualCadDriver] 正在执行步骤: ${step.id}`, {
      op: step.op,
      args: step.args
    });

    try {
      const result = await this.executeInstruction(step as CadInstruction);
      console.log(`[VirtualCadDriver] 步骤 ${step.id} 执行完成:`, result);
      return result;
    } catch (error) {
      console.error(`[VirtualCadDriver] 步骤 ${step.id} 执行失败:`, error);
      throw error;
    }
  }

  /**
   * 执行具体的 CAD 指令
   */
  private async executeInstruction(instruction: CadInstruction): Promise<CadExecutionResult> {
    const timestamp = new Date().toISOString();

    // 处理失败指令（测试用）
    if (instruction.op === 'Fail') {
      const reason = instruction.args?.reason || 'Unknown error';
      throw new Error(`[VirtualCadDriver] 故意失败: ${reason}`);
    }

    // 处理创建走线
    if (instruction.op === 'CreateTrack') {
      const { net, layer, from, to } = instruction.args;
      
      // 基础验证
      if (!net || !layer || !from || !to) {
        return {
          success: false,
          error: 'CreateTrack 缺少必需参数: net, layer, from, to',
          timestamp
        };
      }

      const objectId = this.model.createTrack(net, layer, from, to);
      
      return {
        success: true,
        objectId,
        timestamp
      };
    }

    // 处理删除对象
    if (instruction.op === 'DeleteObject') {
      const { id } = instruction.args;
      
      if (!id) {
        return {
          success: false,
          error: 'DeleteObject 缺少必需参数: id',
          timestamp
        };
      }

      const success = this.model.deleteObject(id);
      
      return {
        success,
        objectId: id,
        timestamp
      };
    }

    // 处理修改走线
    if (instruction.op === 'ModifyTrack') {
      const { id, from, to } = instruction.args;
      
      if (!id) {
        return {
          success: false,
          error: 'ModifyTrack 缺少必需参数: id',
          timestamp
        };
      }

      const success = this.model.modifyTrack(id, from, to);
      
      return {
        success,
        objectId: id,
        timestamp
      };
    }

    // 处理创建过孔
    if (instruction.op === 'CreateVia') {
      const { net, position, fromLayer, toLayer } = instruction.args;
      
      // 基础验证
      if (!net || !position || !fromLayer || !toLayer) {
        return {
          success: false,
          error: 'CreateVia 缺少必需参数: net, position, fromLayer, toLayer',
          timestamp
        };
      }

      const objectId = this.model.createVia(net, position, fromLayer, toLayer);
      
      return {
        success: true,
        objectId,
        timestamp
      };
    }

    // 处理按网络查询
    if (instruction.op === 'GetObjectsByNet') {
      const { net, type } = instruction.args;
      
      if (!net) {
        return {
          success: false,
          error: 'GetObjectsByNet 缺少必需参数: net',
          timestamp
        };
      }

      const objects = this.model.getObjectsByNet(net, type);
      const data = objects.map(obj => ({
        id: obj.id,
        type: obj.type,
        net: 'net' in obj ? obj.net : undefined,
        layer: 'layer' in obj ? obj.layer : undefined,
        // 对于走线，包含几何信息
        ...(obj.type === 'Track' && {
          from: obj.from,
          to: obj.to
        }),
        // 对于过孔，包含位置信息
        ...(obj.type === 'Via' && {
          position: obj.position,
          fromLayer: obj.fromLayer,
          toLayer: obj.toLayer
        }),
        // 对于元件，包含位置和名称
        ...(obj.type === 'Component' && {
          name: obj.name,
          position: obj.position
        })
      }));
      
      return {
        success: true,
        data: {
          net,
          type: type || 'all',
          count: data.length,
          objects: data
        },
        timestamp
      };
    }

    // 处理按层查询
    if (instruction.op === 'GetObjectsByLayer') {
      const { layer, type } = instruction.args;
      
      if (!layer) {
        return {
          success: false,
          error: 'GetObjectsByLayer 缺少必需参数: layer',
          timestamp
        };
      }

      const objects = this.model.getObjectsByLayer(layer, type);
      const data = objects.map(obj => ({
        id: obj.id,
        type: obj.type,
        net: 'net' in obj ? obj.net : undefined,
        layer: 'layer' in obj ? obj.layer : undefined,
        // 对于走线，包含几何信息
        ...(obj.type === 'Track' && {
          from: obj.from,
          to: obj.to
        }),
        // 对于过孔，包含位置信息
        ...(obj.type === 'Via' && {
          position: obj.position,
          fromLayer: obj.fromLayer,
          toLayer: obj.toLayer
        }),
        // 对于元件，包含位置和名称
        ...(obj.type === 'Component' && {
          name: obj.name,
          position: obj.position
        })
      }));
      
      return {
        success: true,
        data: {
          layer,
          type: type || 'all',
          count: data.length,
          objects: data
        },
        timestamp
      };
    }

    // 处理间距检查
    if (instruction.op === 'CheckClearance') {
      const { minClearance, layerFilter } = instruction.args;
      const netFilter = instruction.args?.netFilter;
      
      if (!minClearance || minClearance <= 0) {
        return {
          success: false,
          error: 'CheckClearance 缺少必需参数或参数无效: minClearance > 0',
          timestamp
        };
      }

      const violations: any[] = [];
      const tracks = this.model.getAllTracks();
      const vias = this.model.getAllVias();
      
      // 检查走线之间的间距
      for (let i = 0; i < tracks.length; i++) {
        for (let j = i + 1; j < tracks.length; j++) {
          const track1 = tracks[i];
          const track2 = tracks[j];
          
          // 应用网络过滤
          if (netFilter && (!netFilter.includes(track1.net) || !netFilter.includes(track2.net))) {
            continue;
          }
          
          // 应用层过滤
          if (layerFilter && (!layerFilter.includes(track1.layer) || !layerFilter.includes(track2.layer))) {
            continue;
          }
          
          const distance = this.model.calculateTrackClearance(track1, track2);
          if (distance < minClearance) {
            violations.push({
              type: 'TrackToTrack',
              object1Id: track1.id,
              object2Id: track2.id,
              net1: track1.net,
              net2: track2.net,
              layer: track1.layer,
              distance: Number(distance.toFixed(3)),
              required: minClearance,
              location: {
                x: (track1.from.x + track2.from.x) / 2,
                y: (track1.from.y + track2.from.y) / 2
              }
            });
          }
        }
      }
      
      // 检查走线与过孔之间的间距
      for (const track of tracks) {
        for (const via of vias) {
          // 应用网络过滤
          if (netFilter && (!netFilter.includes(track.net) || !netFilter.includes(via.net))) {
            continue;
          }
          
          // 应用层过滤
          if (layerFilter && (!layerFilter.includes(track.layer) || 
              (!layerFilter.includes(via.fromLayer) && !layerFilter.includes(via.toLayer)))) {
            continue;
          }
          
          const distance = this.model.calculateTrackViaClearance(track, via);
          if (distance < minClearance) {
            violations.push({
              type: 'TrackToVia',
              trackId: track.id,
              viaId: via.id,
              trackNet: track.net,
              viaNet: via.net,
              layer: track.layer,
              distance: Number(distance.toFixed(3)),
              required: minClearance,
              location: {
                x: via.position.x,
                y: via.position.y
              }
            });
          }
        }
      }
      
      // 检查过孔之间的间距
      for (let i = 0; i < vias.length; i++) {
        for (let j = i + 1; j < vias.length; j++) {
          const via1 = vias[i];
          const via2 = vias[j];
          
          // 应用网络过滤
          if (netFilter && (!netFilter.includes(via1.net) || !netFilter.includes(via2.net))) {
            continue;
          }
          
          // 应用层过滤
          const via1Layers = [via1.fromLayer, via1.toLayer];
          const via2Layers = [via2.fromLayer, via2.toLayer];
          const hasCommonLayer = via1Layers.some(layer => layerFilter ? layerFilter.includes(layer) : true) &&
                                via2Layers.some(layer => layerFilter ? layerFilter.includes(layer) : true);
          
          if (!hasCommonLayer) {
            continue;
          }
          
          const distance = this.model.calculateViaClearance(via1, via2);
          if (distance < minClearance) {
            violations.push({
              type: 'ViaToVia',
              via1Id: via1.id,
              via2Id: via2.id,
              net1: via1.net,
              net2: via2.net,
              distance: Number(distance.toFixed(3)),
              required: minClearance,
              location: {
                x: (via1.position.x + via2.position.x) / 2,
                y: (via1.position.y + via2.position.y) / 2
              }
            });
          }
        }
      }
      
      return {
        success: true,
        data: {
          checkType: 'Clearance',
          minClearance,
          violations: violations,
          summary: `间距检查完成: 发现 ${violations.length} 处违规 (最小间距要求: ${minClearance}mm)`
        },
        timestamp
      };
    }

    // 处理线宽检查（预留接口）
    if (instruction.op === 'CheckTraceWidth') {
      const { minWidth, maxWidth } = instruction.args;
      const netFilter = instruction.args?.netFilter;
      
      if (!minWidth || !maxWidth || minWidth <= 0 || maxWidth <= 0 || minWidth > maxWidth) {
        return {
          success: false,
          error: 'CheckTraceWidth 参数无效: 需要 0 < minWidth <= maxWidth',
          timestamp
        };
      }

      // 注意：当前模型不支持线宽参数，这里返回预留结果
      // 后续扩展VirtualTrack类型时可以添加width字段
      const tracks = this.model.getAllTracks();
      const violations: any[] = [];
      
      // 预留：检查线宽的逻辑
      // 当前只是统计走线数量，实际线宽检查需要扩展数据模型
      if (netFilter) {
        // 网络过滤预留
      }
      
      // 预留：检查线宽的逻辑
      // 当前只是统计走线数量，实际线宽检查需要扩展数据模型
      
      return {
        success: true,
        data: {
          checkType: 'TraceWidth',
          minWidth,
          maxWidth,
          violations: violations,
          summary: `线宽检查完成: ${tracks.length} 条走线 (线宽范围: ${minWidth}mm - ${maxWidth}mm)`,
          note: '当前版本为预留接口，需要扩展VirtualTrack类型支持width字段'
        },
        timestamp
      };
    }

    // 不支持的指令
    return {
      success: false,
      error: `不支持的指令: ${(instruction as any).op}`,
      timestamp
    };
  }

  /**
   * 获取底层的 Virtual CAD Model
   * 
   * 注意：这是用于测试和调试的方法，正常情况下 Driver 不应该暴露 Model
   */
  getModel(): VirtualCADModel {
    return this.model;
  }

  /**
   * 重置 Driver 状态（清空 Model）
   * 
   * 主要用于测试场景
   */
  reset(): void {
    this.model.clear();
    console.log('[VirtualCadDriver] 驱动已重置：模型已清空');
  }

  /**
   * 获取 Model 统计信息
   * 
   * 用于调试和监控
   */
  getStats() {
    return this.model.getStats();
  }

  /**
   * 调试：打印当前状态
   */
  debug(): void {
    console.group('[VirtualCadDriver] 当前状态');
    console.log('支持的指令:', this.supportedOps);
    this.model.debug();
    console.groupEnd();
  }
}
